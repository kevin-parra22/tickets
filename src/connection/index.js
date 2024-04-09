const Connection = require('tedious').Connection;
const Request = require('tedious').Request;

var config = {
    server: 'IDE07282\SQLEXPRESS02',
    authentication: {
        type: 'default',
        options: {
            username: "kparra",
            password: "kparra"
        }
    },
    options: {
        port: 1433,
        database: 'Support_Tickets',
    }
}

const connection = new Connection(config);

connection.connect();

connection.on('connect', (err) => {
    if(err){
        console.log("Something went wrong");
        throw err; 
    }
    executeStatement();
});

function executeStatement(){
    const request = new Request("SELECT 24/2", (err, rowCont) => {
        if(err){
            throw err;
        }
        connection.close();
    });
    request.on('row', (columns) => {
        console.log(columns);
    })
    connection.execSql(request);

}

/*const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    port: '3306',
    database: 'sakila',
    user: 'root',
    password: 'root',
});
//Password de la database: Ideal2024$$ Username: root
//Read/Write 6446 Read Only 6447 Read/write 6448 Read Only 6449
module.exports = connection;*/
