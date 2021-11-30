const express = require('express');
const router = express.Router();
const JobBoardAccessor = require('./models/JobBoard.Model');


// const jobBoards = [
//   {   
//       name:'charizard',
//       health: 10,
//   },
//   {
//       name: 'pikachu',
//       health: 50,
//   }
// ]


// https://www.amazon.com/dp/B074LRF639/


// Returns all known jobBoard
router.get('/findAll', function(request, response) {
  return JobBoardAccessor.getAlljobBoard()
    .then(JobBoardAccessor => response.status(200).send(jobBoardResponse))
    .catch(error => response.status(400).send(error))
})

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

router.post('/create', (request, response) => {
  const {name, health} = request.body;
  if(!name || !health) {
    return response.status(422).send("Missing data");
  }
  
  return JobBoardAccessor.findjobBoardByName(name)
    .then((jobBoardResponse) => {
      if(jobBoardResponse.length) {
        response.status(402).send("jobBoard with that name already exists")
      } else {
        JobBoardAccessor.insertjobBoard(request.body)
          .then(jobBoardResponse => response.status(200).send(jobBoardResponse))
          .catch(error => response.status(400).send(error))
        
      }

    }
      
    
    )

  // jobBoards.push({
  //   name: name,
  //   health: health,
  // })

  // response.send("Success!")

})

router.get('/about', function(req, res) {
  res.send('Food is the best');
});

module.exports = router; // <== Look at our new friend, module.exports!