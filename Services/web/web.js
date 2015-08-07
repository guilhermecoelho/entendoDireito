var http = require('http');
var https = require('https');
var express = require('express');
var cors = require('cors');
var mysql = require('mysql');
var bodyParser = require('body-parser');


//conexão db

//conecta com o banco
function conectaBanco(){

	var conn = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "root",
		database: "ned"
	});

	conn.connect(function(err){
		if(!err) {
			console.log("Conectado com sucesso\n");  
		} else {
			console.log("Erro ao conectar:"+err+"\n");  
		}
	});
	return conn;
}

//instancia variaveis
var app = express();

//habilita cors
app.use(cors());

//habilita serialização headers
app.use(bodyParser.urlencoded({ extended : true }));	

//insere usuario
app.post('/salvar', function(req, res){
	console.log(JSON.stringify(req.body));
	console.log(req.body.nome);

	conn.connect(function(err){
		if(!err) {
		    console.log("Conectado com sucesso\n");  
		} else {
		    console.log("Erro ao conectar:"+err+"\n");  
		}
	});
});

app.get('/checaEmail/:email', function(req, res){

	var conn = conectaBanco();
	var query = 'SELECT COUNT(*) AS count FROM user WHERE st_email  = "'+req.params.email+'"';

	conn.query(query, function(err, rows, fields) {

  		if (!err){
    		console.log('The solution is: ', rows);
    		res.send(rows);
    	}
  		else{
    		console.log('Error while performing Query.');
    		res.send(err);
  		}
  		conn.end();
  		console.log('conexão encerrada.');
  	});
	

});

//executa
app.listen(3001);
console.log('executando');