const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
  const getHash = (password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
    })
  }
  const createUsers = (req, res) => {
    getHash(req.body.password, hash => {
      const password = hash

      app
        .db('users')
        .insert({
          name: req.body.name,
          email: req.body.email,
          password,
          dpto: req.body.departamento,
        })
        .then(_ => res.status(200).send('Usuário cadastrado com sucesso!'))
        .catch(err => res.status(400).json(err))
    })
  }

  const getUsers = (req, res) => {
    app
      .db('users')
      .orderBy('id')
      .then(users => res.json(users))
      .catch(err => res.status(400).json(err))
  }
  return { createUsers, getUsers }
}
