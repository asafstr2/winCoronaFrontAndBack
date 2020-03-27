const router = require('express').Router();
let User = require('../models/users.model');
let UserSession = require('../models/UserSession');
let sessionTime= (1000*60)*10


router.route('/signin').post((req, res, next) => {
    const { body } = req;
    console.log(body)
    let {
        firstName,
        lastName,
        email,
        password
    } = body;
    if (!firstName) {
        res.status(400).json('Error : first name cannot be blank ')
    }

    email = email.toLowerCase();
    User.find({ email })
        .then(user => {
            if (user.length > 0) {
                console.log("email is taken")
                res.status(400).json('Error : email is taken')
            }
            else {
                let newUser = new User(req.body);
                newUser.password = newUser.generateHash(password);

                newUser.save()
                    .then(() => res.json('user added!'))
                    .catch(err => res.status(400).json('Error' + err));
            }
        })
        .catch(err => res.status(400).json('Error' + err));

})




router.route('/login').post((req, res, next) => {
    const { body } = req;
    let {
        email,
        password
    } = body;
    email = email.toLowerCase();

    if (!email) {
        res.status(400).json('Error : first name cannot be blank ')
    }


    User.find({ email })
        .then(users => {
            if (users.length !== 1)
                res.status(400).json('Error :wrong email')
            const user = users[0]

            if (!user.validPassword(password)) {
                res.status(400).json('Error : not auth')
                console.log(" not auth")
            }
            else {
                const userSession = new UserSession();
                userSession.userId = user._id
                console.log(userSession)
                userSession.save()
                    .then((doc) => {
                    res.send({
                        success: true,
                        message: "valid sign in",
                        token: doc._id})
                        setTimeout(() => {
                            UserSession.findByIdAndRemove(doc._id)
                             .then(() => console.log("removed"))
                             .catch(err => res.status(400).json('Error' + err));
                          }, sessionTime);
                    })
                    .catch(err => res.status(400).json('Error' + err));
            }
        })
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/verify').get((req, res, next) => {
   const {token}= req.query
   UserSession.find({ _id:token ,isDeleted:false})
    .then((user) => {
        if(user.length !== 1)
        res.status(400).json('Error :invalid')
        res.send (user)})
    .catch(err => res.status(400).json('Error :invalid'));
});

router.route('/verify2').get((req, res, next) => {
    const {token}= req.query
    UserSession.find({ _id:token ,isDeleted:false})
     .then((user) => {
         if(user.length !== 1)
         res.status(400).json('Error :invalid')
         res.send (user)})
     .catch(err => res.status(400).json('Error :invalid'));
 });









module.exports = router;