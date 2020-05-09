const alasql = window.alasql;

// Create database
var db = new alasql.Database();

// Create table with column definitions
db.exec('CREATE TABLE person (name STRING, sex STRING, income INT)');

// Fill table with data
db.tables.person.data = [ { name: 'bill' , sex:'M', income:50000 },
                    { name: 'sara' , sex:'F', income:100000 },
                    { name: 'mara' , sex:'F', income:-1 }];

export default {
    database: db
};