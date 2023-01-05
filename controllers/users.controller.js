const { request, response } = require("express");
const { insertarDatos } = require("../database/actions-database");

const crearUsuario = async(req = request, res = response) => {

    const { nombre, correo } = req.body;

    const usuario = {
        id: 0,
        nombre: '', 
        correo: ''
    }
    try {
        const data = await insertarDatos(nombre, correo, (err, rows) => {
            // console.log('rows', rows);
        });
        console.log('data', data );
    } catch (err) {
        return res.status(400).json({msg: 'Este correo ya existe'});
    }

    res.json({
        nombre,
        correo
    });
}

const obtenerUsuarios = (req = request, res = response) => {

}

const obtenerUsuario = (req = request, res = response) => {

}

const actualizarUsuario = (req = request, res = response) => {

}

const borrarUsuario = (req = request, res = response) => {

}

module.exports = {
    crearUsuario,
    obtenerUsuario,
    obtenerUsuarios,
    actualizarUsuario,
    borrarUsuario
};