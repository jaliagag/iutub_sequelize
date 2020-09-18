// formato json

const router = require('express').Router();

const apiFilmsRouter = require('./api/films');
const apiUsersRouter = require('./api/users')

router.use('/films', apiFilmsRouter) // todas las rutas que con /films me lo mandas al gestor de rutas apiFilmsRouter
router.use('/users', apiUsersRouter)

module.exports = router;