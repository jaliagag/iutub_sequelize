// formato json

const router = require('express').Router();

const middlware = require('./middlwares')
const apiFilmsRouter = require('./api/films');
const apiUsersRouter = require('./api/users')

router.use('/films', middlware.checkToken, apiFilmsRouter) // todas las rutas que con /films me lo mandas al gestor de rutas apiFilmsRouter
router.use('/users', apiUsersRouter)

module.exports = router;