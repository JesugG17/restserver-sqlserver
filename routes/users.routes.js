const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, obtenerUsuarios } = require('../controllers/users.controller');
const { existeCorreo } = require('../helpers/validators');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();


router.get('/', obtenerUsuarios);

router.get('/:id');

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'No es un correo valido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('correo').custom( existeCorreo ),
    validarCampos
],crearUsuario);

router.put('/:id');

router.delete('/:id');

module.exports = router;