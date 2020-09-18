const router = require('express').Router();
const bcrypt = require('bcryptjs');
const {User} = require('../../db');
const {check, validationResult} = require('express-validator');
const moment = require('moment');
const jwt = require('jwt-simple');

router.post('/register', [
    check('username', 'el nombre de usuario es obligatorio').not().isEmpty(),
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    check('email', 'el email debe estar correcot').isEmail()
],  async (req, res)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errores: errors.array() })
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create(req.body);
    res.json(user);

});

router.post('/login', async(req, res)=>{
    const user = await User.findOne({ where: { emaul: req.body.email }});
    if(user){
        const iguales = bcrypt.compareSync(req.body.password, user.password);
        if(iguales){
            res.json({ success: createToken(user) })
        } else {
            res.json({ error: 'error en usuario y/o contraseña'});    
        }
    } else {
        res.json({ error: 'error en usuario y/o contraseña'});
    }
});

// generar el token

const createToken = (user)=>{
    const payload = {
        usuarioId: user.id
        ,createdAt: moment().unix()
        ,expiredAt: moment().add(5, 'minutes').unix()
    }

    return jwt.encode(payload, 'frase_secreta_o_key')
}

module.exports = router;