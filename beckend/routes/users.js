const router = require('express').Router();
let User = require('../models/users.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/add').post((req, res) => {
    console.log(req.body)
    const username = req.body;
    const newUser = new User( username );

    newUser.save()
        .then(() => res.json('user added!'))
        .catch(err => res.status(400).json('Error' + err));
})

router.route('/:id').get((req,res)=>{
    User.findById(req.params.id)
    .then((user)=>res.json(user))
    .catch(err => res.status(400).json('Error' + err));
})

router.route('/:id').delete((req,res)=>{
    User.findByIdAndDelete(req.params.id)
    .then(()=>res.json('user deleted'))
    .catch(err => res.status(400).json('Error' + err));
})


router.route('/update/:id').put((req, res) => {
    const username = req.body;
    console.log(req.body)
    User.findByIdAndUpdate(req.params.id,{username})
    .then((user)=>res.json('user updated'+user))
    .catch(err => res.status(400).json('Error' + err));
})



module.exports = router;