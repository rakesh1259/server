const { response, Router } = require('express');
const express = require('express');
const router = express.Router()
const signuptemp=require("./models/Registermodel")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const FlightModel = require('./models/FlightModel');
const HotelModel =require('./models/HotelModel');
const ContactModel =require('./models/ContactModel');
router.post('/register',async (req,res)=>{
    const saltpwd = await bcrypt.genSalt(10);
    const securepassword = await bcrypt.hash(req.body.password,saltpwd);
    const signupuser = new signuptemp({
        name:req.body.name,
        email:req.body.email,
        password:securepassword
    })
    signupuser.save()
    .then(data=>{
        res.json(data);
    })
    .catch(e=>{
        res.json(e);
    })
});
router.post('/flight',async(req,res)=>{
    const source=req.body.source;
  const destination=req.body.destination;
  const typeoftravel = req.body.typeoftravel;
  const dateofjourney= req.body.doj;
  const ReturnDate=req.body.dor;
  const passengers=req.body.passengers;
  const flight = new FlightModel({source:source, destination:destination,typeoftravel:typeoftravel,dateofjourney:dateofjourney,ReturnDate:ReturnDate,passengers:passengers});
  try{
    await flight.save();
    res.send("Inserted Values");
    console.log(flight);
  }
    catch(err){
      console.log(err);
    }
})
router.post('/hotel',async(req,res)=>{
  const location=req.body.location;
const TypeofRoom=req.body.TypeofRoom;
const Checkin = req.body.Checkin;
const CheckOut= req.body.CheckOut;
const Guests=req.body.guests;
const hotels = new HotelModel({location:location, TypeofRoom:TypeofRoom,Checkin:Checkin,CheckOut:CheckOut,Guests:Guests});
try{
  await hotels.save();
  res.send("Inserted Values");
}
  catch(err){
    console.log(err);
  }
})
router.post('/contact',async(req,res)=>{
  const Name=req.body.Name;
const Email=req.body.Email;
const Phone = req.body.Phone;
const Message= req.body.Message;
const contacts = new ContactModel({Name:Name, Email:Email,Phone:Phone,Message:Message});
try{
  await contacts.save();
  res.send("Inserted Values");
}
  catch(err){
    console.log(err);
  }
})
router.post('/login',async (req,res)=>{
  const usercheck = await signuptemp.findOne({ email: req.body.email });
  if (usercheck == null) {
    res.send("newuser");
  } else {
    const validate = await bcrypt.compare(
      req.body.password,
      usercheck.password
    );
    if (!validate) {
      res.send("invalid");
    } else {
      signuptemp
        .findOne({ email: req.body.email })
        // if email exists
        .then((user) => {
          // compare the password entered and the hashed password found
          bcrypt
            .compare(req.body.password, user.password)
            // if the passwords match
            .then((passwordCheck) => {
              // check if password matches
              if (!passwordCheck) {
                return res.status(400).send({
                  message: "Passwords does not match",
                  error,
                });
              }
              //   create JWT token
              const token = jwt.sign(
                {
                  userId: user._id,
                  userEmail: user.email,
                 
                },
                "RANDOM-TOKEN",
                { expiresIn: "2h" }
              );

              //   return success response
              res.status(200).send({
                message: "Login Successful",
                email: user.email,
                role: user.role,
                token,
              });
            })
            // catch error if password does not match
            .catch((error) => {
              res.status(400).send({
                message: "Passwords does not match",
                error,
              });
            });
        })
        // catch error if email does not exist
        .catch((e) => {
          res.status(404).send({
            message: "Email not found",
            e,
          });
        });
    }
  }
});
router.get("/flight1", async (req, res) => {
  try {
    const history = await FlightModel.find();
    res.send(history);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.delete('/delete/:id',async (req,res) => {
  const source = req.params.id;
  const result = await FlightModel.deleteOne({_id : source});
  console.log("1234567890");
  res.send(result);
})
module.exports=router