const connection = require('./connection');

const getAllactors = async () => {
    const [query] = await connection.execute('SELECT * FROM sakila.actor');
    return query;
};

module.exports = { getAllactors }