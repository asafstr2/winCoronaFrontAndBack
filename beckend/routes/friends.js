const router=require('express').Router();
let Friend =require('../models/friends.model');

router.route('/').get((req,res) =>{
    user.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error'+err));
});

router.route('/add').post((req,res)=>{
    const friendname = req.body.friendname;
    const newFriend = new Friend({friendname});

    newFriend.save()
    .then(()=>res.json('Friend added!'))
    .catch(err => res.status(400).json('Error'+err));
})

module.exports=router;