const router = require("express").Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User.model.js')
const uploaderMiddleware = require("../middlewares/uploader.middleware")

const { verifyToken } = require("../middlewares/verifyToken")


router.post('/signup', uploaderMiddleware.single('avatar'), (req, res, next) => {
    const { name, lastName, avatar, email, password } = req.body

    User.create({ email, password, name, avatar, lastName })
        .then(() => res.sendStatus(201))
        .catch(err => next(err))

})


router.post('/login', (req, res, next) => {

    const { email, password } = req.body;

    if (email === '' || password === '') {
        res.status(400).json({ errorMessages: ["Provide email and password."] });
        return;
    }

    User
        .findOne({ email })
        .then(foundUser => {

            if (!foundUser) {

                res.status(401).json({ errorMessages: ["User not found."] })
                return;
            }

            if (foundUser.validatePassword(password)) {

                const authToken = foundUser.signToken()
                res.status(200).json({ authToken })

            }
            else {
                res.status(401).json({ errorMessages: ["Incorrect password"] });
            }

        })
        .catch(err => next(err));
})

router.get('/verify', verifyToken, (req, res, next) => {

    res.json(req.payload)

})


module.exports = router