const sql = require('mssql');

const existeCorreo = async( correo = '' ) => {

    const usuario = await sql.query(`SELECT * FROM Usuarios WHERE Correo = '${ correo }'`);
    if (usuario.recordset.length === 1) {
        throw new Error('Este correo ya existe');
    }

}

const existeIdUsuario = async( id = '' ) => {
    
    const usuario = await sql.query(`SELECT * FROM Usuarios WHERE id = ${ id }`);
    if (usuario.recordset.length === 0) {
        throw new Error(`El usuario con el id ${ id } no existe`);
    }

}

module.exports = {
    existeCorreo,
    existeIdUsuario
}