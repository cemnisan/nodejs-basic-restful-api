const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config')

const UserSchema = require('../Model/Users');


router.post('/register',(req, res) => {
  const {username,password} = req.body;

  bcrypt.hash(password, 10, (err, hash) =>{

    const User = new UserSchema({
      username,
      password:hash
    });

    const promise = User.save();
    promise.then((data) =>{
      res.json(data);

    }).catch((err) =>{
      res.json(err)

    })
  });
})

router.post('/authenticate',(req, res, next) => {
  const {username,password} = req.body;
  UserSchema.findOne({
    username
  },(err,user)=>{
    if(!user){
      res.json({status:false,message:'This username not found.'})

    }else{
      bcrypt.compare(password,user.password).then((result) =>{
        if(!result){
          res.json({status:false,message:'Wrong password.'})
        }else{
          const payload = {
            username
          }
          const token = jwt.sign(payload,secret.api_secret_key);
          res.json({
            status:true,
            token
          });
        }
      });
    }
  });
});

module.exports = router;
