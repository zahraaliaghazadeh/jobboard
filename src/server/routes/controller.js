const bcrypt = require('bcrypt');
const statusCode = require('http-status-codes').default;
const express = require('express');
const router = express.Router();
const UserAccessor = require('./models/User.Model');
const JobBoardAccessor = require('./models/JobBoard.Model');
const jwt = require('jsonwebtoken');
const authParser = require('../auth/auth.middleware');

const CODE_INVALID_CREDENTIALS = 'INVALID_CREDENTIALS';

const SALT_ROUNDS = 10;

// https://www.amazon.com/dp/B074LRF639/

router.get('/test', function (req, res) {
  res.send('Test');
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
  try {
    const job = await JobBoardAccessor.getJobById(id)
    console.log(job);
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
    console.log(jobs);
    res.status(statusCode.OK);
    res.send(jobs);
  } catch (err) {
    console.error(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR);
    res.send({ success: false, err: err })
  }
})


router.get('/job/favorite', authParser, async function (req, res) {
  // const userId = '61a5bfb48305a9ad9740e4ec'; // TODO replace once login implemented
  const userId = req.userId;
  try {
    const favoriteJobIds = await UserAccessor.getFavoriteJobIds(userId);
    const favoriteJobs = await JobBoardAccessor.getJobByIds(favoriteJobIds);
    res.send({
      favoriteJobIds: favoriteJobIds,
      favoriteJobs: favoriteJobs
    })
  } catch (err) {
    console.error(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR);
    res.send({ err: err })
  }
})

router.post('/job/favorite', async function (req, res) {
  const body = req.body;
  const userId = '61a5bfb48305a9ad9740e4ec'; // TODO replace once login implemented
  const jobId = body.jobId;
  try {
    await UserAccessor.appendFavoriteJobId(userId, jobId);
  } catch (err) {
    console.error(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR);
    res.send({ success: false, err: err })
  }
  res.send({ success: true })
})


router.delete('/job/favorite/:id', async function (req, res) {
  const userId = '61a5bfb48305a9ad9740e4ec'; // TODO replace once login implemented
  const jobId = req.params.id;
  try {
    await UserAccessor.removeFavoriteJobId(userId, jobId);
  } catch (err) {
    console.error(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR);
    res.send({ success: false, err: err })
  }
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
    const payload = {
      userId: user._id,
      username: user.username
    }
    const token = jwt.sign(payload, process.env.SUPER_SECRET, {
      expiresIn: '14d' // optional cookie expiration date
    });
    console.log('success');
    return res.cookie('token', token, {httpOnly: true})
      .status(statusCode.OK).send({ success: 'true', username: user.username });
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
    .then(() => {
      res.status(200)
      res.send({ success: 'true' })
    })
    .catch((err) => {
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