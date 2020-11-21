const jwt = require('jsonwebtoken');
const secret_key = require('../config');

module.exports = (req,res,next) =>{
    try{
        const token = req.headers['x-access-token'] || req.query.token || req.body.token
        const decoded = jwt.verify(token,secret_key.api_secret_key);
        req.decode = decoded;
        next();
    }catch (err){
        res.json({status:false,message:"you can't view this page because you are not logged in."})
    }

}

