const mongoose = require('mongoose')
const Joi = require('Joi')

const employeeSchema = new mongoose.Schema({
   
    firstName: String,
    lastName: String,
    profilePicture: String,
    email: String,
    phoneNumber: String,
    address: String,
    status: Boolean
})

//Worksheet 6 
function ValidateEmployee(employee)
{
  const driverJoiSchema = Joi.object({
      name: Joi.String().min(2).required()
  })

  const employeeJoiSchema = Joi.object({
    firstName:  Joi.String().min(3).required(),
    lastName: Joi.String(),
    profilePicture: Joi.String(),
    email:  Joi.String(),
    phoneNumber:  Joi.String(),
    address: Joi.String(),
    status: Joi.boolean()
  })
  
  return employeeJoiSchema.validate(employee);
}

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = {Employee, ValidateEmployee}

