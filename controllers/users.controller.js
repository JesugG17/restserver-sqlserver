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

    const id = req.params.id;

    const { recordset } = await sql.query(`SELECT * FROM Usuarios WHERE id = ${ id }`);

    const result = {
        result: recordset[0]
    }

    res.json( result );

}

const actualizarUsuario = async(req = request, res = response) => {

    const { nombre, correo } = req.body;
    const id = req.params.id;

    const query = `UPDATE Usuarios SET nombre='${ nombre }', correo='${correo}' WHERE id=${ id }`;
    await sql.query( query );
    const { recordset } = await sql.query(`SELECT * FROM Usuarios WHERE id=${ id }`);

    res.json( recordset );

}

const borrarUsuario = async(req = request, res = response) => {
    const id = req.params.id;

    const query = `DELETE FROM Usuarios WHERE id=${ id }`;

    const [{recordset}] = await Promise.all([
        await sql.query(`SELECT * FROM Usuarios WHERE id=${ id }`),
        await sql.query( query )
    ])

    // console.log( data );


    res.json( recordset );
}

module.exports = {
    crearUsuario,
    obtenerUsuario,
    obtenerUsuarios,
    actualizarUsuario,
    borrarUsuario
};