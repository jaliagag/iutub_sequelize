const router = require('express').Router();

// las peticiones que ingresen aquí ya tendrán el prefijo /film/router

const { Film } = require('../../db');

router.get('/', async (req, res)=>{
    console.log(req.usuarioId);
    const films = await Film.findAll(); // devuelve todas las películas
    res.json(films);
})

router.post('/', async(req, res)=>{
    const film = await Film.create(req.body);
    res.json(film);
})

router.put('/:filmId', async (req, res)=>{
    await Film.update(req.body, {
        where: { id: req.params.filmId}
    });
    res.json({ success: 'se ha modificado'})
})

router.delete('/:filmId', async (req, res)=>{
    await Film.destroy({
        where: { id: req.params.filmId}
    });
    res.json({ success: 'se ha eliminado'})
})


module.exports = router;