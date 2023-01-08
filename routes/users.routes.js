const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, obtenerUsuarios, obtenerUsuario } = require('../controllers/users.controller');
const { existeCorreo, existeIdUsuario } = require('../helpers/validators');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();


router.get('/', obtenerUsuarios);

router.get('/:id',[
    check('id').custom( existeIdUsuario ),
    validarCampos
], obtenerUsuario);

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