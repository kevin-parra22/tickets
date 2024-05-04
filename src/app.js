const express = require('express');
const app = express();
const sql = require('mssql');
const bodyParser = require('body-parser');
const { TYPES } = require('tedious');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const dotenv = require('dotenv').config();

// Configure SQL connection 
const config = {
    server: process.env.SERVER1,
    authentication: {
        type: 'default',
        options: {
            userName: process.env.USER1, 
            password: process.env.PASS1, 
            //userName: "sqlconnection01",
            //password: "Delicias01"
        }
    },
    options: {
        port: 1433 ,
        database: 'Support_Tickets',
        encrypt: true,
        trustServerCertificate: true,

    }
};

const config2 = {
    server: process.env.SERVER1,
    authentication: {
        type: 'default',
        options: {
            userName: process.env.USER1,
            password: process.env.PASS1,
            //userName: "sqlconnection01",
            //password: "Delicias01"
        }
    },
    options: {
        port: 1433 ,
        database: 'Apps_General',
        encrypt: true,
        trustServerCertificate: true,
    }
};
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Define the routes where the data appears

app.get('/data', async (req,res) =>{
    res.render('index')
});
app.get('/insertData', async (req,res) => {
    res.render('insert')
});
app.get('/login', async (req,res) =>{
    res.render('login')
})

async function connectTo(){
    try {

        await sql.connect(config);
        console.log("Success")

        await sql.connect(config2);
        console.log("Success");
        
    } catch (error) {
        console.error("Failed:", error);
    }
}

connectTo();
// Define API endpoint to fetch data
app.get('/', async (req, res) => {
  try {
    // Connect to SQL Server
    await sql.connect(config);
    // Execute SQL query
    //const result = await sql.query`SELECT * FROM dbo.ticket_prueba`;
    const id_ticket = '26385887-CF15-40D9-AF54-F1C6BFF254A0';
    //const id_ticket = sql.UniqueIdentifier;
    // Send response with data
    const result = await sql.query`EXEC spGetTicketInfotoEdit @id_ticket = ${id_ticket};`
    res.json(result.recordset);
    console.log(result.recordset);
    console.log("Connected to the database")
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }

});

/*app.post('/insertData', async (req, res) => {
    try {
        const { ticket_name, description, sub_category  } = req.body; // Replace with your actual column names

        //if(!id_level || !difficult_name || !description) {
            //return res.status(400).json({ error: 'All fields are required' });
        //}
        console.log('Received Ticket Name:', ticket_name);
        // Connect to SQL Server
        await sql.connect(config);
        // Execute SQL query
        await sql.query`INSERT INTO dbo.ticket_prueba (ticket_name, description, sub_category) VALUES (${ticket_name}, ${description}, ${sub_category})`;
        // Send response
        res.json({ success: true, message: 'Data inserted successfully' });
        console.log("Inserted data into the database");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' }); 
    }
});*/

app.post('/insertData', async (req, res) => {
    try {
      // Connect to SQL Server
      await sql.connect(config);

      // Declare variables required by the stored procedure
      
      const id_ticket = uuidv4();;
      const comment = req.body.comment;
      const comment_concat = req.body.comment_concat;
      const id_creator = uuidv4();;
      const date = moment().format('YYYY-MM-DD HH:mm:ss.SSS');;
      const HowSaveChat = req.body.HowSaveChat;
      const id_task = uuidv4();;
      
      
      // Execute stored procedure with variables
      const result = await sql.query`EXEC spSaveChat @id_ticket = ${id_ticket}, @comment = ${comment}, @comment_concat = ${comment_concat}, @id_creator = ${id_creator} , @date = ${date}, @HowSaveChat = ${HowSaveChat}, @id_task = ${id_task};`;
      
      // Send response with success message or result
      res.json({ message: 'Data inserted successfully' });
      console.log("Data inserted successfully");
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.set('views', __dirname + '/views')

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

