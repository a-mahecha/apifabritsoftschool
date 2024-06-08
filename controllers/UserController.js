const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let mysql = require('mysql');
let { configconnection, security } = require('../config.js');

function valida(plist){

var res = true;
  for (let index = 0; index < plist.length; index++) {
    const element = plist[index];
    if(element == null || element == undefined) {res = false; break;} 
  }
  return res;
}

exports.user_login = (req, res, next) => {
  
  var wusuario = req.body.Usuario;
  var wcontrasena = req.body.Contrasena;

  if(!valida([wusuario, wcontrasena])) {
    return res.status(500).json({
      message: "invalid data"
    });     
  }

  let connection = mysql.createConnection(configconnection);
 
  let sql = `CALL SP_User_Login(?,?)`;
  let data = [wusuario, wcontrasena];

  try {
    connection.query(sql, data, (err, results, fields) => {
      if (err) {
        console.error('err from callback: ' + err.stack);
        res.status(500).send(err);
      }else{
        if (results[0].length > 0) {
          let wuser = results[0][0];
          const token = jwt.sign(
            {
              identificacion: wuser.Identificacion
            },
            security.secretkey,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            identificacion: wuser.Identificacion,
            imginstitucion: wuser.LogoBase64,
            nombreinstitucion: wuser.Nombre,
            nombrecontactpinstitucion: wuser.NombreContacto
          });     
        }else{
          return res.status(500).json({
            message: "Auth fail"
          });     
        }
      }      
    });
  } catch (e) {
    console.error('err thrown: ' + e.stack);
    res.status(500).json({message: e.stack});
  }
  
  connection.end();

};

exports.userbyid_get = (req, res, next) => {
  
  var widentificacion = req.body.Identificacion;

  let connection = mysql.createConnection(configconnection);
 
  let sql = `CALL SP_UserById_G(?)`;
  
  try {
    connection.query(sql, widentificacion, (err, results, fields) => {
      if (err) {
        console.error('err from callback: ' + err.stack);
        res.status(500).send(err);
      }else{
        res.json(results[0]);
        
      }      
    });
  } catch (e) {
    console.error('err thrown: ' + e.stack);
    res.status(500).json({message: e.stack});
  }
  
  connection.end();

};

exports.userbyuser_get = (req, res, next) => {
  
  var wusuario = req.body.Usuario;

  let connection = mysql.createConnection(configconnection);
 
  let sql = `CALL SP_UserByUser_G(?)`;
  
  try {
    connection.query(sql, wusuario, (err, results, fields) => {
      if (err) {
        console.error('err from callback: ' + err.stack);
        res.status(500).send(err);
      }else{
        res.json(results[0]);
        
      }      
    });
  } catch (e) {
    console.error('err thrown: ' + e.stack);
    res.status(500).json({message: e.stack});
  }
  
  connection.end();

};

exports.userbyemail_get = (req, res, next) => {
  
  var wemail = req.body.Email;

  let connection = mysql.createConnection(configconnection);
 
  let sql = `CALL SP_UserByEmail_G(?)`;
  
  try {
    connection.query(sql, wemail, (err, results, fields) => {
      if (err) {
        console.error('err from callback: ' + err.stack);
        res.status(500).send(err);
      }else{
        res.json(results[0]);
        
      }      
    });
  } catch (e) {
    console.error('err thrown: ' + e.stack);
    res.status(500).json({message: e.stack});
  }
  
  connection.end();

};

exports.user_get = (req, res, next) => {    
  
  let connection = mysql.createConnection(configconnection);
 
  let sql = `CALL SP_User_G`;
  
  try {
    connection.query(sql, (err, results, fields) => {
      if (err) {
        console.error('err from callback: ' + err.stack);
        res.status(500).send(err);
      }else{
        res.json(results[0]);
        
      }      
    });
  } catch (e) {
    console.error('err thrown: ' + e.stack);
    res.status(500).json({message: e.stack});
  }
  
  connection.end();
};

exports.user_enable = (req, res, next) => {

  var widentificacion = req.body.Identificacion;

  let connection = mysql.createConnection(configconnection);
 
  let sql = `CALL SP_UserEnable_U(?,?)`;
  let data = [widentificacion, true];
  
  try {
    connection.query(sql, data, (err, results, fields) => {
      if (err) {
        console.error('err from callback: ' + err.stack);
        res.status(500).send(err);
      }else{
        res.json(results[0]);
        
      }      
    });
  } catch (e) {
    console.error('err thrown: ' + e.stack);
    res.status(500).json({message: e.stack});
  }
  
  connection.end();  

};

exports.user_disable = (req, res, next) => {    
  var widentificacion = req.body.Identificacion;

  let connection = mysql.createConnection(configconnection);
 
  let sql = `CALL SP_UserEnable_U(?,?)`;
  let data = [widentificacion, false];
  
  try {
    connection.query(sql, data, (err, results, fields) => {
      if (err) {
        console.error('err from callback: ' + err.stack);
        res.status(500).send(err);
      }else{
        res.json(results[0]);
        
      }      
    });
  } catch (e) {
    console.error('err thrown: ' + e.stack);
    res.status(500).json({message: e.stack});
  }
  
  connection.end();  
};

exports.user_delete = (req, res, next) => {    
  var widentificacion = req.body.Identificacion;

  let connection = mysql.createConnection(configconnection);
 
  let sql = `CALL SP_User_D(?)`;
  let data = [widentificacion];  
  
  try {
    connection.query(sql, data, (err, results, fields) => {
      if (err) {
        console.error('err from callback: ' + err.stack);
        res.status(500).send(err);
      }else{
        res.json(results[0]);
        
      }      
    });
  } catch (e) {
    console.error('err thrown: ' + e.stack);
    res.status(500).json({message: e.stack});
  }
  
  connection.end();
};

exports.user_create = (req, res, next) => {

  var widentificacion = req.body.Identificacion;
  var wnombre = req.body.Nombre;
  var wapellido = req.body.Apellido;
  var wemail = req.body.Email;
  var wtelefono = req.body.Telefono;
  var winstitucion = req.body.Institucion;
  var wusuario = req.body.Usuario;
  var wcontrasena = req.body.Contrasena;
  var wactivo = req.body.Activo;

  let data = [widentificacion, wnombre, wapellido, wemail, wtelefono, winstitucion, wusuario, wcontrasena, wactivo];
  
  if(!valida(data)) {
    return res.status(500).json({
      message: "invalid data"
    });     
  }

  let connection = mysql.createConnection(configconnection);
 
  let sql = `CALL SP_User_I(?,?,?,?,?,?,?,?,?)`;

  try {
    connection.query(sql, data, (err, results, fields) => {
      if (err) {
        console.error('err from callback: ' + err.stack);
        res.status(500).send(err);
      }else{
        res.json(results[0]);
      }      
    });
  } catch (e) {
    console.error('err thrown: ' + e.stack);
    res.status(500).json({message: e.stack});
  } 

  connection.end();
};
