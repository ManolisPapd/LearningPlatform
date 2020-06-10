insert into USER(id,name,surname,email,username,password) values (1,'Admin','Admin','admin@email.com','admin','admin');
insert into USER(id,name,surname,email,username,password) values (2,'Kostas','Kostopoulos','kostas@email.com','user1','test');
insert into USER(id,name,surname,email,username) values (3,'Nikos','Nikolopoulos','nikos@email.com','user2');
insert into USER(id,name,surname,email,username) values (4,'Verdi','Verdiponos','verdi@email.com','user3');

insert into COURSE(id,name,description,image)
values (1,
        'SQL Course',
        'SQL is a database computer language designed for the retrieval and management of data in a database. In this course we will dive into the world of relational databases.',
        'https://i.imgur.com/NVabbm4.png');
insert into COURSE(id,name,description,image) values (2,'ALGORITHMS_COURSE','ALGORITHMS COURSE DESCRIPTION','https://blog-c7ff.kxcdn.com/blog/wp-content/uploads/2019/11/Banner-Blog-1A-1.jpg');

insert into USER_COURSE(id,user_id,course_id) values (1,1,1);


DROP TABLE IF EXISTS SECTION;
CREATE TABLE SECTION(id INT AUTO_INCREMENT PRIMARY KEY ,
                  name VARCHAR(50000),
                  course_id INT,
                  information VARCHAR(50000));
insert into SECTION(id,name,course_id,information)
values (1,'Course Overview',1,'{ "id": "overview",
"details" : [
		{
			"header" : "SQL Tutorial",
			"context" : "SQL is a standard language for storing, manipulating and retrieving data in databases.Our SQL tutorial will teach you how to use SQL in: MySQL, SQL Server, MS Access, Oracle, Sybase, Informix, Postgres, and other database systems."
		},
		{
			"header" : "Examples in Each Chapter",
			"context" : "With our online SQL editor, you can edit the SQL statements, and click on a button to view the result aslas lasdkasdkasd kaskas dkas daskdas kdas kdas kasd kasd kaskas dkas dkasd kaska sdkasdk."
		}

	]}');

insert into SECTION(id,name,course_id,information)
values (2,'Statistics',1,'{ "id" : "statistics"}');

insert into SECTION(id,name,course_id,information)
values (3,'Section 1: Introduction to SQL world',1,'{
    "id": "text_material",
    "paragraph": [
    			{
    				"title": "What is SQL?",
    				"paragraph" : "SQL stands for Structured Query Language and lets you access and manipulate databases. SQL became a standard of the American National Standards Institute (ANSI) in 1986, and of the International Organization for Standardization (ISO) in 1987. As the name suggests, it is used when we have structured data (in the form of tables). All databases that are not relational (or do not use fixed structure tables to store data) and therefore do not use SQL, are called NoSQL databases. Examples of NoSQL are MongoDB, DynamoDB, Cassandra, etc."
    			},
    			{
    				"title": "What Can SQL do?",
    				"paragraph" : "SQL can execute queries against a database, can retrieve data from a database, can insert records in a database, can update records in a database, can delete records from a database, can create new databases, can create new tables in a database, can create stored procedures in a database, can create views in a database and can set permissions on tables, procedures, and views. SQL is just a query language, it is not a database. To perform SQL queries, you need to install any database, for example, Oracle, MySQL, MongoDB, PostGre SQL, SQL Server, DB2, etc."
    			},
    			{
    				"title": "More Information",
                    "video": "FR4QIeZaPeM",
    				"paragraph" : "SQL is designed for a specific purpose: to query data contained in a relational database. SQL is a set-based, declarative programming language, not an imperative programming language like C or BASIC. However, extensions to Standard SQL add procedural programming language functionality, such as control-of-flow constructs. In addition to the standard SQL/PSM extensions and proprietary SQL extensions, procedural and object-oriented programmability is available on many SQL platforms via DBMS integration with other languages. The SQL standard defines SQL/JRT extensions (SQL Routines and Types for the Java Programming Language) to support Java code in SQL databases. Microsoft SQL Server 2005 uses the SQLCLR (SQL Server Common Language Runtime) to host managed .NET assemblies in the database, while prior versions of SQL Server were restricted to unmanaged extended stored procedures primarily written in C. PostgreSQL lets users write functions in a wide variety of languages—including Perl, Python, Tcl, JavaScript (PL/V8) and C."
    			},
    			{
    				"title": "Portability Hurdles",
    				"paragraph" : "SQL code can rarely be ported between database systems without modifications. There are several reasons for this lack of portability between database systems like, the complexity and size of the SQL standard means that most implementors do not support the entire standard, the standard does not specify database behavior in several important areas, leaving implementations to decide how to behave, the SQL standard precisely specifies the syntax that a conforming database system must implement. However, the standard''s specification of the semantics of language constructs is less well-defined, leading to ambiguity, many database vendors have large existing customer bases; where the newer version of the SQL standard conflicts with the prior behavior of the vendor''s database, the vendor may be unwilling to break backward compatibility, there is little commercial incentive for vendors to make it easier for users to change database suppliers, users evaluating database software tend to place other factors such as performance higher in their priorities than standards conformance."
    			}

    	]
}');

insert into SECTION(id,name,course_id,information)
values (4,'Section 2: Syntax and Tables',1,'{
    "id": "text_material",
    "paragraph": [
    			{
    				"title": "SQL Syntax",
    				"paragraph" : "SQL follows some unique set of rules and guidelines called syntax. Here, we are providing all the basic SQL syntax. SQL is not case sensitive. Generally SQL keywords are written in uppercase. SQL statements are dependent on text lines. We can place a single SQL statement on one or multiple text lines. You can perform most of the action in a database with SQL statements. SQL depends on relational algebra and tuple relational calculus."

                },
    			{
    				"title": "SQL Statement",
                    "image": "https://i.imgur.com/ZhwfJW5.png",
    				"paragraph" : "SQL statements are started with any of the SQL commands/keywords like SELECT, INSERT, UPDATE, DELETE, ALTER, DROP etc. and the statement ends with a semicolon (;). Below you can find an example."

                },
                {
    				"title": "First Glance of SQL Commands",
    				"paragraph" : "These are the some important SQL command: SELECT: it extracts data from a database, DELETE: it deletes data from database, CREATE TABLE: it creates a new table, ALTER TABLE: it is used to modify the table, ALTER TABLE: it is used to modify the table,DROP TABLE: it deletes a table, INSERT INTO: it inserts new data into a database."

                },
                {
    				"title": "Data Types",
                    "image": "https://cdn.journaldev.com/wp-content/uploads/2017/11/sql-data-types.png"

                },
                {
    				"title": "SQL Operators",
                    "image": "https://i.imgur.com/D137cPc.png"

                },
                {
    				"title": "Database",
                    "image": "https://i.imgur.com/RWRib1P.png",
    				"paragraph" : "The SQL CREATE DATABASE statement is used by a developer to create a database. SQL DROP statement is used to delete or remove indexes from a table in the database. SQL RENAME DATABASE is used when you need to change the name of your database. Sometimes it is used because you think that the original name is not more relevant to the database or you want to give a temporary name to that database."

                },
    			{
    				"title": "Introduction to Tables",
                    "image": "https://i.imgur.com/zs1g5BF.png",
    				"paragraph" : "Table is a collection of data, organized in terms of rows and columns. In DBMS term, table is known as relation and row as tuple. A table has a specified number of columns, but can have any number of rows. Table is the simple form of data storage. A table is also considered as a convenient representation of relations. The SQL Table variable is used to create, modify, rename, copy and delete tables. Table variable was introduced by Microsoft."

                },
                {
    				"title": "Create Table ",
                    "image": "https://i.imgur.com/WFwb2v9.png",
    				"paragraph" : "SQL CREATE TABLE statement is used to create table in a database. If you want to create a table, you should name the table and define its column and each column''s data type. The data type of the columns may vary from one database to another. For example, NUMBER is supported in Oracle database for integer value whereas INT is supported in MySQL. Above you can see an example to create a STUDENTS table with ID as primary key and NOT NULL are the constraint showing that these fields cannot be NULL while creating records in the table."

                },
                {
    				"title": "Advanced Table Statements",
    				"paragraph" : " A SQL DROP TABLE statement is used to delete a table definition and all data from a table, The DELETE statement is used to delete rows from a table. If you want to remove a specific row from a table you should use WHERE condition, SQL RENAME TABLE syntax is used to change the name of a table. Sometimes, we choose non-meaningful name for the table. So it is required to be changed. A truncate SQL statement is used to remove all rows (complete data) from a table. It is similar to the DELETE statement with no WHERE clause. Truncate table is faster and uses lesser resources than DELETE TABLE command. The ALTER TABLE statement is used to add, modify or delete columns in an existing table. It is also used to rename a table. You can also use SQL ALTER TABLE command to add and drop various constraints on an existing table."

                },
                {
    				"title": "Select Statement ",
    				"paragraph" : "The most commonly used SQL command is SELECT statement. It is used to query the database and retrieve selected data that follow the conditions we want. In simple words, we can say that the select statement used to query or retrieve data from a table in the database. Below you can see the syntax of select statement. Here expression is the column that we want to retrieve. Tables indicate the tables, we want to retrieve records from."

                },
                {
    				"title": "",
                    "image": "https://i.imgur.com/CEwjcVk.png"

                },
    			{
    				"title": "Important Select Statements",
    				"paragraph" : "There are some optional clauses in SELECT statement but very useful, [WHERE Clause] : It specifies which rows to retrieve, [GROUP BY Clause] : Groups rows that share a property so that the aggregate function can be applied to each group, [HAVING Clause] : It selects among the groups defined by the GROUP BY clause, [ORDER BY Clause] : It specifies an order in which to return the rows."

                },
                {
    				"title": "Insert Statement ",
                    "image": "https://i.imgur.com/3HbomK6.png",
    				"paragraph" : "SQL INSERT statement is a SQL query. It is used to insert a single or a multiple records in a table. There are two ways to insert data in a table: By SQL insert into statement and  specifying column names or Without specifying column names."

                },
                {
    				"title": "Examples",
                    "image": "https://i.imgur.com/Ayju6kt.png"

                },
                {
    				"title": "",
                    "image": "https://i.imgur.com/nZMYEBK.png",
    				"paragraph" : "The SQL COUNT() function is used to return the number of rows in a query. The COUNT() function is used with SQL SELECT statement and it is very useful to count the number of rows in a table having enormous data."

                },
                {
    				"title": "",
                    "image": "https://i.imgur.com/6S1mgSO.png",
    				"paragraph" : "It is also known as SQL SUM() function. It is used in a SQL query to return summed value of an expression. If you want to know how the combined total salary of all employee whose salary is above 20000 per month."

                },
    			{
    				"title": "",
                    "image": "https://i.imgur.com/59TU7Yi.png",
    				"paragraph" : "This is how an SQL \"AND\" condition can be used in the SQL INSERT statement."

                },
                {
    				"title": "",
                    "image": "https://i.imgur.com/2mIvEuC.png",
    				"paragraph" : "The SQL OR condition is used in a SQL query to create a SQL statement where records are returned when any one of the condition met. It can be used in a SELECT statement, INSERT statement, UPDATE statement or DELETE statement."

                },
                {
    				"title": "",
                    "image": "https://i.imgur.com/zbCVVLw.png",
    				"paragraph" : "Generic example of an insert statement."

                }


    	]
}');

insert into SECTION(id,name,course_id,information)
values (5,'Section 3: Advanced queries',1,'{"id" : "text_material", "paragraph": "TEXT MATERIAL"}');

insert into SECTION(id,name,course_id,information)
values (6,'Section 4: Join Clauses',1,'{"id" : "text_material", "paragraph": "TEXT MATERIAL"}');

insert into SECTION(id,name,course_id,information)
values (7,'Section 5: Triggers',1,'{"id" : "text_material", "paragraph": "TEXT MATERIAL"}');

insert into SECTION(id,name,course_id,information)
values (8,'Final Quiz',1,'{"id" : "final_quiz"}');

insert into SECTION(id,name,course_id,information)
values (9,'Options',1,'{"id" : "options"}');

DROP TABLE IF EXISTS QUIZ;
CREATE TABLE QUIZ(id INT AUTO_INCREMENT PRIMARY KEY ,
type VARCHAR(255),
details VARCHAR(50000),
section_id INT,
for_section INT,
when_failed INT);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (1, 'multiple',
'{"question": "What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
3,1,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (2, 'multiple',
'{"question": "SECOND QUESTION BIG BOY HEHYEHEY", "a" : "DYASNAO", "b" : "Digna i koi","c" : "Lalala al a","d" : "E stou manika na dagarada","correct" : "a"}',
3,1,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (3, 'code',
'{
	"question" : "Create a query that will select from runners when person is not on query, you can use triggers",
	"sql" : "https://i.imgur.com/mR2aXuB.png",
    "correctQuery" : "SELECT * FROM person WHERE sex=''F'' AND income > 60000"
}', 3,1,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (4, 'code',
'{
"question" : "Create a query that will select from runners when person is not on query, you can use triggers",
"sql" : "https://i.imgur.com/wb17Fmy.png",
"correctQuery" : "SELECT * FROM person WHERE sex=''F'' AND income > 60000"
}',
                                                                                 3,1,0);




insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (5, 'multiple',
                                                                                 '{"question": "What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 4,1,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (6, 'multiple',
                                                                                 '{"question": "SECOND QUESTION BIG BOY HEHYEHEY", "a" : "DYASNAO", "b" : "Digna i koi","c" : "Lalala al a","d" : "E stou manika na dagarada","correct" : "a"}',
                                                                                 4,1,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (7, 'code',
                                                                                 '{
                                                                                     "question" : "Create a query that will select from runners when person is not on query, you can use triggers",
                                                                                     "sql" : "https://i.imgur.com/mR2aXuB.png",
                                                                                     "correctQuery" : "SELECT * FROM person WHERE sex=''F'' AND income > 60000"
                                                                                 }', 4,1,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (8, 'code',
                                                                                 '{
                                                                                 "question" : "Create a query that will select from runners when person is not on query, you can use triggers",
                                                                                 "sql" : "https://i.imgur.com/wb17Fmy.png",
                                                                                 "correctQuery" : "SELECT * FROM person WHERE sex=''F'' AND income > 60000"
                                                                                 }',
                                                                                 4,1,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (9, 'multiple',
                                                                                 '{"question": "What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 5,1,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (10, 'multiple',
                                                                                 '{"question": "SECOND QUESTION BIG BOY HEHYEHEY", "a" : "DYASNAO", "b" : "Digna i koi","c" : "Lalala al a","d" : "E stou manika na dagarada","correct" : "a"}',
                                                                                 5,1,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (11, 'code',
                                                                                 '{
                                                                                     "question" : "Create a query that will select from runners when person is not on query, you can use triggers",
                                                                                     "sql" : "https://i.imgur.com/mR2aXuB.png",
                                                                                     "correctQuery" : "SELECT * FROM person WHERE sex=''F'' AND income > 60000"
                                                                                 }', 5,1,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (12, 'code',
                                                                                 '{
                                                                                 "question" : "Create a query that will select from runners when person is not on query, you can use triggers",
                                                                                 "sql" : "https://i.imgur.com/wb17Fmy.png",
                                                                                 "correctQuery" : "SELECT * FROM person WHERE sex=''F'' AND income > 60000"
                                                                                 }',
                                                                                 5,1,0);


insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (13, 'multiple',
                                                                                 '{"question": "1What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 3,0,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (14, 'multiple',
                                                                                 '{"question": "2What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 3,0,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (15, 'multiple',
                                                                                 '{"question": "3What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 3,0,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (16, 'multiple',
                                                                                 '{"question": "4What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 3,0,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (17, 'multiple',
                                                                                 '{"question": "5What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 3,0,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (18, 'multiple',
                                                                                 '{"question": "XFAILEDEDDD What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 3,0,1);


insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (19, 'multiple',
                                                                                 '{"question": "6What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 4,0,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (20, 'multiple',
                                                                                 '{"question": "7What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 4,0,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (21, 'multiple',
                                                                                 '{"question": "8What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 4,0,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (22, 'multiple',
                                                                                 '{"question": "9What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 4,0,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (23, 'multiple',
                                                                                 '{"question": "10What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 4,0,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (24, 'multiple',
                                                                                 '{"question": "YFAILEDEDDD What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 4,0,1);


