const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const Users = require('./auth-modules.js');
const { jwtSecret } = require('../config/secret.js')

router.get("/", (req, res) => {
  res.json({message: "auth server is working"})
})


router.post('/register', (req, res) => {
  // implement registration
  const user = req.body

  const hash = bcrypt.hashSync(user.password, 12)

  user.password = hash

  Users.add(user)
    .then(newUser => {

      res.status(201).json(newUser)
    })
    .catch(err => {
      res.status(404).json({message: "couldn't create user"})
    })
});

router.post('/login', (req, res) => {
  // implement login
  const {username, password} = req.body

  Users.findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)){
        // create token and generate token function
        const token = generateToken(user)

        res.status(200).json({message: `Welcome ${user.username}`, token})
      } else {
        res.status(401).json({ message: "Invalid Credentials" })
      }

    })
    .catch(({name, message, stack, code, error}) => {
      console.log("error", error)
      res.status(500).json({ name, message, stack, code});
    })

});

function generateToken(user){
  const payload ={
    subject: user.id,
    username: user.username
  }
  const secret = jwtSecret

  const options = {
    expiresIn: '1h'
  }

    return jwt.sign(payload, secret, options)
}

module.exports = router;
