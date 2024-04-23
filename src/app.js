/*const express = require('express');
const app = express();
const http = require('http').Server(app);

const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const tedious = require('tedious');
//const connect = require('./connection/connection');
const TYPES = require('tedious').TYPES;

app.use(express.json());

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
        executeStatement();
    }
    
});

function executeStatement() {  
    var request = new Request("SELECT * from dbo.ticket_Difficult", function(err) {  
    if (err) {  
        console.log(err);}  
    });  
    var result = "";  
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
          if (column.value === null) {  
            console.log(column.value);  
          } else {  
            result+= column.value + " ";  
          }  
        });  
        console.log(result);  
        result ="";  
    });  

    request.on('done', function(rowCount, more) {  
    console.log(rowCount + ' rows returned');  
    });  
    
    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {
        connection.close();
    });
    connection.execSql(request);  
}

function executeStatement1() {  
    var request = new Request("INSERT INTO dbo.ticket_Difficult (id_level, difficult_name, description) VALUES (@id_level, @difficult_name, @description);", function(err) {  
     if (err) {  
        console.log(err);}  
    });  
    request.addParameter('id_level', TYPES.NVarChar, 'E0FFF747-EF24-48E9-BB92-E9E0B51361FA');  
    request.addParameter('difficult_name', TYPES.NVarChar , 'Kevin Chiquito');
    request.addParameter('description', TYPES.NVarChar, 'Un Kevin mas abajo del Kevin normal');  
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
          if (column.value === null) {  
            console.log('NULL');  
          } else {  
            console.log("Product id of inserted item is " + column.value);  
          }  
        });  
    });

    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {
        connection.close();
    });
    connection.execSql(request);  
}

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.set('views', __dirname + '/views')

app.get('/', (req, res) => {
    res.render('index')
})

const PORT = 3000;

http.listen(PORT, () => {
    console.log(`Application being listened on localhost:${PORT}`)
});*/

const express = require('express');
const app = express();
const sql = require('mssql');

// Configure SQL connection
const config = {
    server: 'IDE07282\\SQLEXPRESS02',
    //server:'192.168.2.124',
    authentication: {
        type: 'default',
        options: {
            userName: "kparra",
            password: "kparra",
            //userName: "sqlconnection01",
            //password: "Delicias01"
        }
    },
    options: {
        port: 1433 ,
        database: 'Support_Tickets',
        encrypt: true,
        trustServerCertificate: true
    }
};

// Define API endpoint to fetch data
app.get('/data', async (req, res) => {
  try {
    // Connect to SQL Server
    await sql.connect(config);
    // Execute SQL query
    const result = await sql.query`SELECT * FROM dbo.ticket_TicketGeneral`;
    // Send response with data
    res.json(result.recordset);
    console.log("Connected to the database")
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

