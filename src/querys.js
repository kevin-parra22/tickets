/*function executeStatement(){
    const request = new Request("SELECT * from dbo.ticket_TicketGeneral", (err, rowCount) => {
        if(err){
            console.error("Error executing statement: " + err.message);
            throw err;
        }
        connection.close();
    });

    const results = [];

    request.on('row', (columns) => {
        const row = [];
        columns.forEach(column => {
            row[column.metadata.colName] = column.value;
        });
        results.push(row);
    });

    request.on('requestCompleted', () => {
        io.emit('data', results);
    });

    connection.execSql(request);
}*/
