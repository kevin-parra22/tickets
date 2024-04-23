const Connection = require('tedious').Connection;
const Request = require('tedious').Request;

var config = {
    server: 'IDE07282\\SQLEXPRESS02',
    authentication: {
        type: 'default',
        options: {
            userName: "kparra",
            password: "kparra"
        }
    },
    options: {
        port: 1433 ,
        database: 'Support_Tickets',
        encrypt: true,
        trustServerCertificate: true
    }
}

const connection = new Connection(config);

connection.connect();

connection.on('connect', (err) => {
    if(err){
        console.error("Error: " + err.message); 
    } else {
        console.log("Connected successfully to the database");
    }
    
});


