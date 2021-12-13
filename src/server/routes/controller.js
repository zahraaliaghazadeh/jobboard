const bcrypt = require('bcrypt');
const statusCode = require('http-status-codes').default;
const express = require('express');
const router = express.Router();
const UserAccessor = require('./models/User.Model');
const UserExistsError = require("./models/User.Model").UserExistsError;
const JobBoardAccessor = require('./models/JobBoard.Model');
const authParser = require('../auth/auth.middleware');

const CODE_INVALID_CREDENTIALS = 'INVALID_CREDENTIALS';

const SALT_ROUNDS = 10;



// router.get('/test', function (req, res) {
//   // res.send('Test');
//   return res.cookie('test', 'hi', { httpOnly: true})
//     .status(statusCode.OK).send('test');
// })

router.get('/username', function (req, res) {
  const username = req.session.username;
  res.send({
    username: username
  })
})



router.post('/job/create', async function (req, res) {
  const body = req.body;
  try {
    await JobBoardAccessor.insertJob(body);
  } catch (err) {
    console.error(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR);
    res.send({ success: false, err: err })
  }
  res.send({ success: true })
})

router.get('/job/id/:id', async function (req, res) {
  const id = req.params.id;
  const userId = req.session.userId;
  try {
    const job = await JobBoardAccessor.getJobById(id)
    if (userId) {
      const favoriteJobStatuses = await UserAccessor.getFavoriteJobStatuses(userId);
      const favoriteJobIds = favoriteJobStatuses.map((s) => (s.id))
      job._doc.isLoggedIn = true;
      job._doc.isFavorited = favoriteJobIds.includes(id);
      res.status(statusCode.OK);
      res.send(job);
      return;
    }
    res.status(statusCode.OK);
    res.send(job);
  } catch (err) {
    console.error(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR);
    res.send({ success: false, err: err })
  }
})

router.get('/job/search', async function (req, res) {
  const query = req.query.query;
  try {
    const jobs = await JobBoardAccessor.findJob(query);
    res.status(statusCode.OK);
    res.send(jobs);
  } catch (err) {
    console.error(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR);
    res.send({ success: false, err: err })
  }
})



router.get('/job', authParser, async function (req, res) {
  const userId = req.userId;
  try {
    const jobIds = await UserAccessor.getJobIds(userId);
    const jobs = await JobBoardAccessor.getJobByIds(jobIds);
    res.send({
      jobIds: jobIds,
      jobs: jobs
    })
  } catch (err) {
    console.error(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR);
    res.send({ err: err })
  }
})

router.post('/job', authParser, async function (req, res) {
  const body = req.body;
  const userId = req.userId;
  const job = body.job;
  job.timestamp = new Date();
  try {
    const newJob = await JobBoardAccessor.insertJob(job);
    await UserAccessor.appendJobId(userId, newJob._id);
  } catch (err) {
    console.error(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR);
    res.send({ success: false, err: err })
  }
  res.send({ success: true })
})

router.put('/job/:id', authParser, async function (req, res) {
  const jobId = req.params.id;
  const job = req.body.job;
  job.timestamp = new Date();
  try {
    await JobBoardAccessor.updateJob(jobId, job);
    res.send({ success: true })
  } catch (err) {
    console.error(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR);
    res.send({ success: false, err: err })
  }
})

router.delete('/job/:id',  authParser, async function (req, res) {
  const userId = req.userId;
  const jobId = req.params.id;
  try {
    await UserAccessor.removeJobId(userId, jobId);
    await JobBoardAccessor.deleteJob(jobId)
    res.send({ success: true })
  } catch (err) {
    console.error(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR);
    res.send({ success: false, err: err })
  }
})


router.get('/job/favorite', authParser, async function (req, res) {
  const userId = req.userId;
  try {
    const favoriteJobStatuses = await UserAccessor.getFavoriteJobStatuses(userId);
    const favoriteJobIds = favoriteJobStatuses.map((status) => (status.id));
    const favoriteJobs = await JobBoardAccessor.getJobByIds(favoriteJobIds);
    const jobIdToStatusMap = {}
    favoriteJobStatuses.forEach((status) => {
      jobIdToStatusMap[status.id] = status.status;
    })
    const favoriteJobsWithStatuses = favoriteJobs.map((job) => ({
      ...job._doc,
      status: jobIdToStatusMap[job.id]
    }))
    res.send({
      // favoriteJobIds: favoriteJobIds,
      // favoriteJobs: favoriteJobs
      favoriteJobs: favoriteJobsWithStatuses
    })
  } catch (err) {
    console.error(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR);
    res.send({ err: err })
  }
})


router.post('/job/favorite', authParser, async function (req, res) {
  const jobStatus = req.body;
  const userId = req.userId;
  try {
    // await UserAccessor.appendFavoriteJobId(userId, jobId);
    await UserAccessor.appendFavoriteJobStatus(userId, jobStatus);
  } catch (err) {
    console.error(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR);
    res.send({ success: false, err: err })
  }
  res.send({ success: true })
})

router.put('/job/favorite/:id', authParser, async function (req, res) {
  const userId = req.userId;
  const jobStatus = req.body;
  try {
    // await UserAccessor.appendFavoriteJobId(userId, jobId);
    await UserAccessor.updateFavoriteJobStatus(userId, jobStatus);
  } catch (err) {
    console.error(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR);
    res.send({ success: false, err: err })
  }
  res.send({ success: true })
})


router.delete('/job/favorite/:id',  authParser, async function (req, res) {
  const userId = req.userId;
  const jobId = req.params.id;
  try {
    await UserAccessor.removeJobStatus(userId, jobId);
  } catch (err) {
    console.error(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR);
    res.send({ success: false, err: err })
  }
  res.send({ success: true })
})


router.get('/logout', authParser, async function (req, res) {
  req.session.destroy();
  res.send({ success: true })
})

router.post('/login', async function (req, res) {
  const body = req.body;
  try {
    const user = await UserAccessor.getUserByName(body.username);
    if (user === null || !bcrypt.compareSync(body.password, user.password)) {
      res.status(statusCode.BAD_REQUEST)
      res.send({
        success: 'false',
        errorCode: CODE_INVALID_CREDENTIALS
      });
      return;
    }
    // const payload = {
    //   userId: user._id,
    //   username: user.username
    // }
    // const token = jwt.sign(payload, process.env.SUPER_SECRET, {
    //   expiresIn: '14d' // optional cookie expiration date
    // });
    // return res.cookie('token', token, { httpOnly: true, sameSite: 'lax' })
    //   .status(statusCode.OK).send({ success: 'true', username: user.username });
    req.session.username = user.username;
    req.session.userId = user._id;
    // console.log(req.session);
    return res.status(200).send({ username: user.username });
  } catch (err) {
    console.error("Error while creating user", err)
    res.status(500)
    res.send(err)
  }
})


router.post('/register', function (req, res) {
  const body = req.body;
  bcrypt.hash(body.password, SALT_ROUNDS)
    .then((hash) => {
      const user = {
        username: body.username,
        password: hash
      }
      return UserAccessor.createNewUser(user)
    })
    .then((user) => {
      req.session.username = user.username;
      req.session.userId = user._id;
      res.status(200)
      res.send({ success: 'true' })
    })
    .catch((err) => {
      if (err instanceof UserExistsError) {
        res.status(statusCode.BAD_REQUEST)
        res.send({ errorMessages: ['username already exists, please try a different one']});
        return;
      }
      console.error("Error while creating user", err)
      res.status(500)
      res.send(err)
    });
})

// Returns all known jobBoard
// router.get('/findAll', function(request, response) {
//   return JobBoardAccessor.getAlljobBoard()
//     .then(JobBoardAccessor => response.status(200).send(jobBoardResponse))
//     .catch(error => response.status(400).send(error))
// })

// router.get('/find/:jobBoardName', function(req, res) {
  
//   // const jobBoardQuery = req.query.q;
//   const jobBoardQuery = req.params.jobBoardName;
//   // const foundjobBoard = jobBoards.find((jobBoard) => jobBoard.name === jobBoardQuery)
//   let foundjobBoard = null;
  
//   for (let jobBoard of jobBoards) {
//     if (jobBoard.name === jobBoardQuery) {
//       console.log(jobBoard)
//       foundjobBoard = jobBoard
//     }
//   } 
//   if (!foundjobBoard) {
//     return res.status(404).send("No jobBoard found!");
//   }

//   res.send(foundjobBoard);
  
// });

// router.post('/create', (request, response) => {
//   const {name, health} = request.body;
//   if(!name || !health) {
//     return response.status(422).send("Missing data");
//   }
//
//   return JobBoardAccessor.findjobBoardByName(name)
//     .then((jobBoardResponse) => {
//       if(jobBoardResponse.length) {
//         response.status(402).send("jobBoard with that name already exists")
//       } else {
//         JobBoardAccessor.insertjobBoard(request.body)
//           .then(jobBoardResponse => response.status(200).send(jobBoardResponse))
//           .catch(error => response.status(400).send(error))
//
//       }
//
//     }
//
//
//     )
//
//   // jobBoards.push({
//   //   name: name,
//   //   health: health,
//   // })
//
//   // response.send("Success!")
//
// })

router.get('/about', function(req, res) {
  res.send('Food is the best');
});

module.exports = router; // <== Look at our new friend, module.exports!