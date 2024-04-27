const express = require('express');
const app = express();
const sql = require('mssql');
const bodyParser = require('body-parser');
//const pool = require('pg');

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


// Define API endpoint to fetch data
app.get('/', async (req, res) => {
  try {
    // Connect to SQL Server
    await sql.connect(config);
    // Execute SQL query
    const result = await sql.query`SELECT * FROM dbo.ticket_prueba`;
    // Send response with data
    //const result = await sql.query`EXEC spGetTicketInfotoEdit @id_ticket ='26385887-CF15-40D9-AF54-F1C6BFF254A0';`
    res.json(result.recordset);
    console.log(result.recordset);
    console.log("Connected to the database")
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }

});

app.post('/insertData', async (req, res) => {
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
});

/*app.get('/', async (req, res) => {
    try {
        await pool.connect();
        const result = await pool.request().execute('dbo.spGetTicketMain');
        const proc = {
            id_ticket: result.recordset,
        };

        res.json(proc);
    } catch (error) {
        res.status(500).json(error);
        console.error(error)
        
    }
});*/

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.set('views', __dirname + '/views')

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

