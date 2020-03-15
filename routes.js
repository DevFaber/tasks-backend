module.exports = app => {
  app.post('/signup', app.controllers.user.createUsers)
  app.post('/signin', app.controllers.auth.signIn)

  app
    .route('/users')
    .all(app.config.security.authenticate())
    .get(app.controllers.user.getUsers)

  app
    .route('/tasks')
    .all(app.config.security.authenticate())
    .get(app.controllers.task.getTask)
    .post(app.controllers.task.createTask)

  app
    .route('/tasks/:id')
    .all(app.config.security.authenticate())
    .delete(app.controllers.task.removeTask)

  app
    .route('/tasks/:id/toggle')
    .all(app.config.security.authenticate())
    .put(app.controllers.task.toggleTask)
}
