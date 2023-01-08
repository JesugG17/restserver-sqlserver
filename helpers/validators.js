const { sqlConfig } = require('../database/conectar-db');
const sql = require('mssql');

const existeCorreo = async( correo = '' ) => {
    await sql.connect(sqlConfig);
    const usuario = await sql.query(`SELECT * FROM Usuarios WHERE Correo = '${ correo }'`);
    if (usuario.recordset.length === 1) {
        throw new Error('Este correo ya existe');
    }

}


module.exports = {
    existeCorreo
}