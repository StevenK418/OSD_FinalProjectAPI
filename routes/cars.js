//AXIOS Implementation
const axios = require('axios');
const express = require('express');
const router = express.Router();

const {Car, ValidateCar} = require('../models/cars');

//GET ALL EMPLOYEES
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(process.env.API_GATEWAY + '/cars');
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
  axios.post(`${process.env.API_GATEWAY}/cars`, data, config)
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

  axios.put(`${process.env.API_GATEWAY}/cars/`+ req.params.id, userData)
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
  const car= await axios.delete(`${process.env.API_GATEWAY}/cars/`+ req.params.id);
  if (car)
    res.status(204).send();
  else
    res.status(404).json(`Car with that ID ${req.params.id} was not found`)
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
    const car = await axios.get(`${process.env.API_GATEWAY}/cars/`+req.params.id)
    if(car)
    {
      res.json(car.data);
    }
    else{
      res.status(404).send("car not found!");
    }
  }
  catch(error)
  {
    res.status(404).send("Not found! ID was Not valid format!" + error);
  }
  })

module.exports = router;