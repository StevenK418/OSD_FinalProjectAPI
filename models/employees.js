const mongoose = require('mongoose')
const Joi = require('joi')

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
  const employeeJoiSchema = Joi.object({
      firstName: Joi.string,
      lastName: Joi.string,
      profilePicture: Joi.string,
      email: Joi.string,
      phoneNumber: Joi.string,
      address: Joi.string,
      status: Joi.boolean
  })
 
  return employeeJoiSchema.validate(employee);
}

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = {Employee, ValidateEmployee}

