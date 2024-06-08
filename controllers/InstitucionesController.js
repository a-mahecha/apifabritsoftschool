const jwt = require("jsonwebtoken");
let mysql = require('mysql');
var Busboy = require('busboy');
var path = require('path');
var fs = require('fs');
let { configconnection } = require('../config.js');

function valida(plist){

  var res = true;
    for (let index = 0; index < plist.length; index++) {
      const element = plist[index];
      if(element == null || element == undefined) {res = false; break;} 
    }
    return res;
  }

exports.institucion_get = (req, res, next) => {    
  
  let connection = mysql.createConnection(configconnection);
 
  let sql = `CALL SP_Institucion_G`;
  
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

exports.institucion_create = (req, res, next) => {

  var wnombre = req.body.Nombre;
  var wnombrecontacto = req.body.NombreContacto;
  var wdireccion = req.body.Direccion;
  var wemail = req.body.Email;
  var wtelefono = req.body.Telefono;
  var imagebase64 = req.body.ImageBase64;
  let data = [wnombre, wnombrecontacto, wdireccion, wtelefono, wemail, true, imagebase64];
  
  if(!valida([wnombre, wnombrecontacto, wdireccion, wtelefono, wemail,])) {
    return res.status(500).json({
      message: "invalid data"
    });     
  }

  let connection = mysql.createConnection(configconnection);
 
  let sql = `CALL SP_Institucion_I(?,?,?,?,?,?,?)`;

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

exports.image_upload= (req, res, next) => {
  var busboy = new Busboy({ headers: req.headers });
  try {
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

      var saveTo = path.join(__dirname, '../public/uploads/' + filename);
      console.log(saveTo);
      file.pipe(fs.createWriteStream(saveTo));
    });
  
    busboy.on('finish', function() {
      res.writeHead(200, { 'Connection': 'close' });
      res.end("That's all folks!");
    }); 
  } catch (e) {
    console.error('err thrown: ' + e.stack);
    res.status(500).json({message: e.stack});
  } 
    
  return req.pipe(busboy);    
}
