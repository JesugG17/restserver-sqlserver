const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario } = require('../controllers/users.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();


router.get('/');

router.get('/:id');

router.post('/',[
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('correo', 'no es un correo valido').isEmail(),
    validarCampos
],crearUsuario);

router.put('/:id');

router.delete('/:id');

module.exports = router;