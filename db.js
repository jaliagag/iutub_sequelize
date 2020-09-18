// configuración de la db

const Sequelize = require('sequelize');

const FilmModel = require('./models/films')
const UserModel = require('./models/users')

const sequelize = new Sequelize('test_iutub', 'root', '', {
    host: 'localhost'
    ,dialect: 'mysql'
}) 

// new Sequelize('nombre db', 'user name', 'password', {
    // host: 'localhost',
    // dialect: 'mysql'
//})

const Film = FilmModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize)

sequelize.sync({ force: false })
.then(()=>{
    console.log('Tablas sincronizadas')
})

module.exports = {
    Film
    ,User
}