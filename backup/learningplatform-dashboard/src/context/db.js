const alasql = window.alasql;

// Create database
var db = new alasql.Database();

// Create table with column definitions
db.exec('CREATE TABLE person (name STRING, sex STRING, income INT)');

db.exec('CREATE TABLE author (id INT, name STRING, surname STRING)');
db.exec('CREATE TABLE books (id INT, title STRING, ISBN STRING, date_published DATE, price FLOAT)');
db.exec('CREATE TABLE students (id INT, name STRING, surname STRING)');
db.exec('CREATE TABLE orders (order_id INT, student_id INT, book_id INT, order_date DATE)');
db.exec('CREATE TABLE cars (car_id INT, brand VARCHAR, model VARCHAR)');

// Fill table with data
db.tables.person.data = [ { name: 'bill' , sex:'M', income:50000 },
                    { name: 'sara' , sex:'F', income:100000 },
                    { name: 'mara' , sex:'F', income:-1 }];

db.tables.author.data = [ { id: 1, name: "Robert C.", surname: "Martin"},
                            { id: 2, name: "Robert", surname: "Sedgewick"},
                            { id: 3, name: "Joshua", surname: "Bloch"},
                            { id: 4, name: "Richard", surname: "Helm"}];
                
db.tables.students.data = [ { id: 1, name: "Jack", surname: "Jackson"},
{ id: 2, name: "Max", surname: "Calloway"},
{ id: 3, name: "Jeremy", surname: "Isiah"},
{ id: 4, name: "Mick", surname: "Foley"},
]

db.tables.books.data = [ { id: 1, title: "Clean Code", author_id:1, ISBN: "9780132350884", date_published: "2008-08-11", price:45.5},
{ id: 1, title: "Clean Architecture", author_id:1, ISBN: "9780134494166", date_published: "2017-09-20", price:32.6},
{ id: 1, title: "Algorithms (4th Edition)", author_id:2, ISBN: "9780134494166", date_published: "2011-04-03", price:44.98},
{ id: 1, title: "Effective Java", author_id:3, ISBN: "0134685997", date_published: "2018-01-06", price:19.6},
{ id: 1, title: "Agile Principles, Patterns, and Practices in C#", author_id:1, ISBN: "0131857258", date_published: "2006-07-30", price:25.34},
{ id: 1, title: "Design Patterns: Elements of Reusable Object-Oriented Software", author_id:4, ISBN: "0201633612", date_published: "1994-10-21", price:27.15}];

db.tables.person.data = [ { order_id: 1, student_id:1, book_id:1, order_date: "2020-04-11"},
{ order_id: 2, student_id:1, book_id:3, order_date: "2020-05-06"},
{ order_id: 3, student_id:1, book_id:4, order_date: "2020-05-06"},
{ order_id: 4, student_id:2, book_id:2, order_date: "2020-03-26"},
{ order_id: 5, student_id:4, book_id:5, order_date: "2020-03-19"},
{ order_id: 6, student_id:4, book_id:6, order_date: "2020-03-19"}];

export default {
    database: db
};