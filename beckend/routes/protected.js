const router = require('express').Router();
let User = require('../models/users.model');
let UserSession = require('../models/UserSession');


router.use((req, res, next)=>{
    const {token}= req.query
    UserSession.find({ _id:token ,isDeleted:false})
     .then((user) => {
         if(user.length !== 1)
         res.status(400).json('Error :invalid')
         return next();})
     .catch(err => res.status(400).json('Error :invalid token'));
 })


 router.route('/user').get((req, res, next) => {
    const {token}= req.query
    UserSession.findById(token)
     .then((user) => {  
         console.log(user)
         const {userId}=user
    User.findById(userId)
    .then((user)=>res.json(user))
    .catch(err => res.status(400).json('Error' + err));})
 });



 router.route('/user').delete((req, res, next) => {
    const {token}= req.query
    UserSession.findByIdAndRemove(token)
     .then((user) => {  
        console.log(user)
         const {userId}=user
    User.findByIdAndRemove(userId)
    .then((user)=>res.json("deleted"))
    .catch(err => res.status(400).json('Error' + err));})
 });

 router.route('/logout').post((req, res, next) => {
    const {token}= req.query
    UserSession.findByIdAndRemove(token)
     .then((user) => res.send(user.userId+"logged out"))
 });



module.exports = router;