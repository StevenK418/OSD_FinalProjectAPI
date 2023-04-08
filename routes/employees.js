// const express = require('express');
// const router = express.Router();

// const {Employee, ValidateEmployee} = require('../models/employees');

// // Get routes
// //New get using db
// router.get('/', async (req, res) => {
  
//     //Worksheet 5 Filtering functionality
//     const { firstName, lastName, profilePicture, email, phoneNumber, address, status, limit, pagesize } = req.query;

//     let filter = {};

//     if(firstName)
//     {
//       filter.employee_model = {$regex: `${firstName}`, $options: `i`}
//     }

//     if(lastName)
//     {
//       filter.lastName = lastName
//     }

//     if(profilePicture)
//     {
//       filter.profilePicture = profilePicture
//     }

//     if(email)
//     {
//       filter.email = email
//     }

//     if(phoneNumber)
//     {
//       filter.phoneNumber = phoneNumber
//     }

//     if(address)
//     {
//       filter.address = address
//     }

//     if(status)
//     {
//       filter.status = status
//     }

//     let pageSizeNumber = parseInt(pagesize);

//     if(isNaN(pageSizeNumber))
//     {
//       pageSizeNumber = 0;
//     }

//     let limitNumber = parseInt(limit);

//     if(isNaN(limitNumber))
//     {
//       limitNumber = 0;
//     }

//     //Print a table of the filtered results. 
//     console.table(filter);

//     //Get list of employees
//     const employees = await Employee.
//                         find(filter).
//                         limit(pageSizeNumber).
//                         sort({firstName: 1, status : -1}).
//                         skip(limit, pageSizeNumber).
//                         select('firstName lastName profilePicture email phoneNumber address status');
//     res.json(employees);
//     //end of testing
// })

// //Get employee by id
// router.get('/:id', async (req,res) => {
// try
// {
//   const employee = await employee.findById(req.params.id);
//   if(employee)
//   {
//     res.json(employee);
//   }
//   else{
//     res.status(404).send("employee not found!");
//   }
// }
// catch(error)
// {
//   res.status(404).send("Not found! ID was Not valid format!" + error);
// }
// })

// //Post routes
// //Post new employee to the database
// router.post('/', async (req, res) => {

// let employee = new employee(req.body);
// let result = Validateemployee(req.body)

// if (result.error) {
//   res.status(412).json(result.error);
//   return;
// }

// try {
//     employee = await employee.save()
//     res
//     .location(`${employee._id}`)
//     .status(201)
//     .json(employee)
// }
// catch (error){
//     res.status(500).send('db_error ' + error)
// }
// });


// //PUT routes
// router.put('/:id', async (req, res)=>{
// try 
// {
//   let employee = await employee.findByIdAndUpdate(req.params.id, req.body);
//   employee = await employee.save();
//   res
//   .location(`${employee._id}`)
//   .status(200)
//   .json(employee)
// } 
// catch (error) 
// {
//   res.status(500).send("dbError" + error);
// }
// })

// module.exports = router;

//AXIOS Implementation
const axios = require('axios');
const express = require('express');
const router = express.Router();

const {Employee, ValidateEmployee} = require('../models/employees');

//GET ALL EMPLOYEES
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(process.env.API_GATEWAY + '/employees');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from API Gateway');
  }
});

//POST
router.post('/', (req, res) => {
  const data = req.body;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  axios.post(`${process.env.API_GATEWAY}/employees`, data, config)
    .then((response) => {
      console.log(req.body);
      res.send(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error');
    });
});

//PUT
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const userData = req.body;

  axios.put(`${process.env.API_GATEWAY}/employees/`+ req.params.id, userData)
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//DELETE
//This works but returns nothing to express so a 204 no content ill be thrown but
//record will be deleted via lambda. 
router.delete('/:id', async (req, res) => {
try 
{
  const employee = await axios.delete(`${process.env.API_GATEWAY}/employees/`+ req.params.id);
  if (employee)
    res.status(204).send();
  else
    res.status(404).json(`employee with that ID ${req.params.id} was not found`)
}
catch 
{
  res.status(404).json(`funny id ${req.params.id} was not found`);
}
})

//GETs an employee with specific id
router.get('/:id', async (req,res) => {
  try
  {
    const employee = await axios.get(`${process.env.API_GATEWAY}/employees/`+req.params.id)
    if(employee)
    {
      res.json(employee.data);
    }
    else{
      res.status(404).send("employee not found!");
    }
  }
  catch(error)
  {
    res.status(404).send("Not found! ID was Not valid format!" + error);
  }
  })

module.exports = router;