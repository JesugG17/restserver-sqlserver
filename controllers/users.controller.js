const { request, response } = require("express");
const bcrypt = require('bcrypt');
const sql = require('mssql');


const crearUsuario = async(req = request, res = response) => {

    const { nombre, password, correo } = req.body;

    const salt = bcrypt.genSaltSync();
    const newPassword = bcrypt.hashSync(password, salt);

    await sql.query(`INSERT Usuarios(nombre, correo, pass, vig) VALUES('${ nombre }', '${ correo }', '${ newPassword }', 1)`);
    const { recordset } = await sql.query(`SELECT * FROM Usuarios WHERE Correo = '${ correo }'`);
    
    const usuario = {
        id: recordset[0].id,
        nombre: recordset[0].nombre,
        correo: recordset[0].correo,
        vig: recordset[0].vig
    };

    res.json( usuario );
}

const obtenerUsuarios = async(req = request, res = response) => {

    const { recordset, rowsAffected } = await sql.query('SELECT * FROM USUARIOS');
    
    const results = {
        total: rowsAffected[0],
        results: recordset
    }
    res.json(results);

}

const obtenerUsuario = async(req = request, res = response) => {

}

const actualizarUsuario = async(req = request, res = response) => {

}

const borrarUsuario = async(req = request, res = response) => {

}

module.exports = {
    crearUsuario,
    obtenerUsuario,
    obtenerUsuarios,
    actualizarUsuario,
    borrarUsuario
};