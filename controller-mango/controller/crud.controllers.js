// const dbConnect = require('../config/connection');
require('../config/connection');
const CrudModel = require('../model/crud.model');
const mongodb = require('mongodb');
const express = require('express');
const app = express();
const { validateData } = require('../model/validate');
// const userRouter = require('../routes/user.routes')
const sendMail = require('../model/mail');
const router = express.Router();

// router.use(express.json());
app.use(express.json());

// app.use('/user', userRouter);


const showUser = async (req, res) => {
  try {
    const data = await CrudModel.find();
    console.log(data);
    res.send(data);
  } catch (error) {
    res.send({ error: "Error Fetching Data! Please try again" });
    
  }
  
  
}

const CreateUser = async (req, res) => {
  try {
    // Validate the request body using Joi schema
    const { error, value } = validateData(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the email already exists in the database
    const existingUser = await CrudModel.findOne({ email: value.email });

    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // If validation passes and email doesn't exist, create a new instance of CrudModel
    const data = new CrudModel(req.body);

    // Save the data
    const result = await data.save();

    const toMail = value.email;
    const subject = 'Heyyy.....! Welcome to Our Platform';
    const text = 'Congratulations! You are Registered Successfully';

    // Attempt to send the email
    try {
      await sendMail(toMail, subject, text);
      res.send({ result: "Inserted successfully" });
    } catch (emailError) {
      console.log('Error sending email:', emailError);
      res.status(500).send({ error: "Error sending email" });
    }
  } catch (error) {
    res.status(500).send({ error: "Error! Please try again" });
  }
};

  // const UpdateUser = async (req, res) => {
  //   try {
  //     const { error} = validateData(req.body);
  //     if(error){
  //       return res.status(400).json({ error: error.details[0].message });
  //     }
  //           console.log(req.params._id);
  //           const data = await CrudModel.updateOne(
  //             { _id: new mongodb.ObjectId(req.params._id) },
  //             { $set: req.body }
  //           );
  //           res.send({ data: "Updated successfully" });
  //         } catch (error) {
  //           res.send({ error: "error is not successfully" });
  //         }
  // }

  const UpdateUser = async (req, res) => {
    try {
      const { error } = validateData(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      // Assuming your user model has an 'email' field
      const existingUser = await CrudModel.findOne({ email: req.body.email });
  
      if (existingUser && existingUser._id.toString() !== req.params._id) {
        // If an existing user is found with the same email but different ID
        return res.status(400).json({ error: "Email already exists" });
      }
  
      console.log(req.params._id);
      const data = await CrudModel.updateOne(
        { _id: new mongodb.ObjectId(req.params._id) },
        { $set: req.body }
      );
  
      res.send({ data: "Updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Update failed" });
    }
  };
  

  
const DeletedUser = async (req, res) => {
  try {
          console.log(req.params.id);
          const result = await CrudModel.deleteOne({ _id: new mongodb.ObjectId(req.params.id) }); //new mongodb.ObjectId(req.params.id) isliye use hota hai kyunki MongoDB mein har document ka unique identifier _id field hota hai jo generally ObjectId type ka hota hai. Yeh code req.params.id se ek unique identifier generate karta hai jo specific document ko identify karne ke liye use hota hai. Is ObjectId ko use karke specific document ko delete karne ke liye deleteOne function ko call kiya jata hai.
          res.send(result);
        } catch (error) {
          res.send({ error: "Error! Try Again" });
      
        }
      
}

module.exports = { CreateUser, showUser, UpdateUser, DeletedUser }
