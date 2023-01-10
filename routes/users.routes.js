const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, obtenerUsuarios, obtenerUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/users.controller');
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

router.put('/:id', [
    check('id').custom(existeIdUsuario),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('correo', 'No es un correo valido').isEmail(),
    check('correo').custom( existeCorreo ),
    validarCampos
], actualizarUsuario);

router.delete('/:id', [
    check('id').custom(existeIdUsuario),
    validarCampos
],borrarUsuario);

module.exports = router;