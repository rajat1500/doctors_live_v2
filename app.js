const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
const fast2sms = require('fast-two-sms');
require('dotenv').config();



var val = 0;


mongoose.connect("mongodb+srv://rajat:test123@cluster0.iy1ks.mongodb.net/doctorslive", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const detaildoctorloginSchmea= new mongoose.Schema({
  doctoremail:String,
  doctorpass:String
});
const Detaildoctorlogin= mongoose.model("Detaildoctorlogin",detaildoctorloginSchmea)



const detailpatientSchema = new mongoose.Schema({
  mobile: Number,
  department: String,
  fullname: String,
  email: String,
  dob: String,
  weight: Number,
  height: Number,
  fathersname: String,
  mothersname: String,
  marital: String,
  allergy: String,
  address: String,
  city: String,
  state: String,
  zip: Number,
  addhar: Number
});
const Detailpatient = mongoose.model("Detailpatient", detailpatientSchema)


const patientSchema = new mongoose.Schema({
  mobile: Number,
  email: String,
  name: String,
  kindofpatient: String,
  password: String
});
const Patient = mongoose.model("Patient", patientSchema)



app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");
app.use(express.static("public"));




app.get("/", function(req, res) {
  res.render("index")
})






app.post("/loginverification", function(req, res) {
  val = Math.floor(1000 + Math.random() * 9000);
  const mobile = req.body.mobilelogged;
  console.log(mobile)
  console.log(val)
  var options = {
    authorization: process.env.API_KEY,
    message: val,
    numbers: [mobile]
  }
  fast2sms.sendMessage(options)
});



app.post('/login', function(req, res) {
  const mobile = req.body.mobilelogged;
  const pass = req.body.pass;
  const enteredotp = parseInt(req.body.enteryourotp);
  if (!pass.length) {
    console.log(enteredotp)

    if (enteredotp == val) {
      Detailpatient.findOne({
        mobile: mobile
      }, function(err, found) {
        if (err) {
          console.log(err)
        } else {
          if (found == null) {
            // console.log("dostuff")
            Patient.findOne({
              mobile: mobile
            }, function(err, foundUser) {
              if (err) {
                console.log(err);
              } else {
                if (foundUser == null) {
                  res.render("notregistered")
                } else {
                  res.render("userdetailAtlas", {
                    details: foundUser
                  })
                }
              }
            });
          } else {
            res.render("finaldetails", {
              finaldetails: found
            })
          }
        }
      });
    } else {
      res.render("fail");
    }
  } else {
    Patient.findOne({
      password: pass
    }, function(err, foundpass) {
      if (err) {
        console.log(err)
      } else {
        if (foundpass == null) {
          res.render("fail")
        } else {
          Detailpatient.findOne({
            mobile: mobile
          }, function(err, found) {
            if (err) {
              console.log(err)
            } else {
              if (found == null) {
                // console.log("dostuff")
                Patient.findOne({
                  mobile: mobile
                }, function(err, foundUser) {
                  if (err) {
                    console.log(err);
                  } else {
                    if (foundUser == null) {
                      res.render("notregistered")
                    } else {
                      res.render("userdetailAtlas", {
                        details: foundUser
                      })
                    }
                  }
                });
              } else {
                res.render("finaldetails", {
                  finaldetails: found
                })
              }
            }
          });
        }
      }
    });
  }



});






app.post("/completeuserdetail", function(req, res) {
  const mobile1 = req.body.mobile;
  const department0 = req.body.department;
  const fullname2 = req.body.fullname;
  const email3 = req.body.email;
  const dob4 = req.body.dob;
  const weight5 = req.body.weight;
  const height6 = req.body.height;
  const fathersname7 = req.body.fathersname;
  const mothersname8 = req.body.mothersname;
  const marital9 = req.body.marital;
  const allergy10 = req.body.allergy;
  const address11 = req.body.address;
  const city12 = req.body.city;
  const state13 = req.body.state;
  const zip14 = req.body.zip;
  const addhar15 = req.body.addhar;
  const detailpatient = new Detailpatient({
    mobile: mobile1,
    department: department0,
    fullname: fullname2,
    email: email3,
    dob: dob4,
    weight: weight5,
    height: height6,
    fathersname: fathersname7,
    mothersname: mothersname8,
    marital: marital9,
    allergy: allergy10,
    address: address11,
    city: city12,
    state: state13,
    zip: zip14,
    addhar: addhar15
  });
  detailpatient.save();
  Detailpatient.findOne({
    mobile: mobile1
  }, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        res.render("finaldetails", {
          finaldetails: foundUser
        })
      }
    }
  });
});









app.post('/otpverification', function(req, res) {
  val = Math.floor(1000 + Math.random() * 9000);
  console.log(val)
  const mobile = req.body.mobilenumber;
  var options = {
    authorization: process.env.API_KEY,
    message: val,
    numbers: [mobile]
  }
  fast2sms.sendMessage(options)
});






app.post('/register', function(req, res) {
  const mobile = req.body.mobilenumber;
  const email = req.body.email;
  const name = req.body.name;
  const kindofpatient = req.body.kindofpatient;
  const password = req.body.password;
  const otp = parseInt(req.body.verifyotp);
  const patient = new Patient({
    mobile: mobile,
    email: email,
    name: name,
    kindofpatient: kindofpatient,
    password: password
  });
  if (otp === val) {
    patient.save();
    res.render("success");
  } else {
    res.render("fail");
  }
});






let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("server is running at 3000");
})






// doctorslogin///////////////////////////////////////////////////////////////////////


app.get("/doctorslogin",function(req,res){
  res.render("doctorslogin")
});



app.post("/postdoctorlogin",function(req,res){
  const doctoremail=req.body.doctoremail;
  const doctorpassword=req.body.doctorpassword;
  const doctordepartment=req.body.doctordepartment;
  Detaildoctorlogin.findOne({
    doctoremail:doctoremail,
    doctorpass:doctorpassword
  },function(err,foundemail){
    if(err){console.log(err)}
    else{
      if(foundemail==null){ res.render("fail")}
      else{
        Detailpatient.find({department: doctordepartment},function(err, founduserdata) {
          if (!err) {
            res.render("patientdetailfordoctor",{
              details: founduserdata
            });
          }
        });


      }}
    });


  console.log(doctoremail)
  console.log(doctorpassword)
  console.log(doctordepartment)
})
