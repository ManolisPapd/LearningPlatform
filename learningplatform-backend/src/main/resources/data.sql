insert into USER(id,name,surname,email,username,password) values (1,'Admin','Admin','user@email.com','user','user');
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
			"header" : "SQL Course",
			"context" : "SQL is a standard language for storing, manipulating and retrieving data in databases. In this course you will first learn about general information about SQL in order to understand why SQL is one of the most important parts of software development. Then you will start learning about what can you do in SQL and the important commands to start using SQL. After that, you will dive into on more advanced parts of the SQL and see the true power of it. Later, you will learn and be familiarised with the concept of joining table. In the final section, you will meet the advanced topic of triggers and when and why they are being used."
		},
		{
			"header" : "Assessment",
			"context" : "There are available quizzes that cover the material for each section. There will be multiple choice and coding questions that will require you to think and write the correct query in order to pass the assessment. To successfully pass the sections assessment, you need at least four correct answers."
		},
		{
			"header" : "Overall Assessment",
			"context" : "After studying each section, you can take the overall assessment. There you will find multiple choice and coding questions from all the sections of this course. The questions will be presented to you randomly each time you are taking the overall assessment. Here, if you fail a question, the learning material for the corresponding section will be available for you again to study them inside the overall assessment component."
		}
        ,
		{
			"header" : "Statistics",
			"context" : "You can find statistics for each section about the quiz for each one of them and the overall assessment. It will be marked accordinly if you passed this section or not. On graphs you can see how many correct or wrong answers you gave."
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
    				"paragraph" : "A SQL DROP TABLE statement is used to delete a table definition and all data from a table, The DELETE statement is used to delete rows from a table. If you want to remove a specific row from a table you should use WHERE condition, SQL RENAME TABLE syntax is used to change the name of a table. Sometimes, we choose non-meaningful name for the table. So it is required to be changed. A truncate SQL statement is used to remove all rows (complete data) from a table. It is similar to the DELETE statement with no WHERE clause. Truncate table is faster and uses lesser resources than DELETE TABLE command. The ALTER TABLE statement is used to add, modify or delete columns in an existing table. It is also used to rename a table. You can also use SQL ALTER TABLE command to add and drop various constraints on an existing table."

                },
                {
    				"title": "Primary Key",
                    "image" : "https://i.imgur.com/6soiOAV.png",
    				"paragraph" : "A column or columns is called primary key (PK) that uniquely identifies each row in the table. If you want to create a primary key, you should define a PRIMARY KEY constraint when you create or modify a table. When multiple columns are used as a primary key, it is known as composite primary key. In designing the composite primary key, you should use as few columns as possible. It is good for storage and performance both, the more columns you use for primary key the more storage space you require. Inn terms of performance, less data means the database can process faster. Primary key enforces the entity integrity of the table, always has unique data, a primary key length cannot be exceeded than 900 bytes, a primary key cannot have null value, there can be no duplicate value for a primary key and a table can contain only one primary key constraint. The main advantage of this uniqueness is that we get fast access."

                },
                {
    				"title": "Foreign Key",
    				"image" : "https://i.imgur.com/2vjDpdK.png",
                    "paragraph" : "In the relational databases, a foreign key is a field or a column that is used to establish a link between two tables. In simple words you can say that, a foreign key in one table used to point primary key in another table. The foreign key constraint is generally prevents action that destroy links between tables.It also prevents invalid data to enter in foreign key column."

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
values (5,'Section 3: Advanced Queries',1,'{
    "id": "text_material",
    "paragraph": [
    			{
    				"title": "Sum",
                    "image" : "https://i.imgur.com/8u3bM4Y.png",
    				"paragraph" : "It is also known as SQL SUM() function. It is used in a SQL query to return summed value of an expression. If you want to know how the combined total salary of all employee whose salary is above 20000 per month."

                },
                {
    				"title": "",
                    "image" : "https://i.imgur.com/AfzcA76.png",
    				"paragraph" : ""

                },
                {
    				"title": "Date",
                    "image" : "",
    				"paragraph" : "SQL SELECT DATE is used to retrieve a date from a database. If you want to find a particular date from a database, you can use this statement."

                },
                {
    				"title": "",
                    "image" : "https://i.imgur.com/EeMl8ae.png",
    				"paragraph" : ""

                },
                {
    				"title": "",
                    "image" : "https://i.imgur.com/MAR0Cfu.png",
    				"paragraph" : ""

                },
                {
    				"title": "Handling Empty Data ",
                    "image" : "",
    				"paragraph" : "Null values are used to represent missing unknown data. There can be two conditions: Where SQL is NULL and Where SQL is NOT NULL. If in a table, a column is optional, it is very easy to insert data in column or update an existing record without adding a value in this column. This means that field has null value. Note: we should not compare null value with 0. They are not equivalent."

                },
                {
    				"title": "",
                    "image" : "https://i.imgur.com/Nh3PrW0.png",
    				"paragraph" : ""

                },
                {
    				"title": "",
                    "image" : "https://i.imgur.com/Rnc67uN.png",
    				"paragraph" : ""

                },
                {
    				"title": "Distinct",
                    "image" : "",
    				"paragraph" : "The SQL DISTINCT command is used with SELECT key word to retrieve only distinct or unique data.In a table, there may be a chance to exist a duplicate value and sometimes we want to retrieve only unique values. In such scenarios, SQL SELECT DISTINCT statement is used. Note: SQL SELECT UNIQUE and SQL SELECT DISTINCT statements are same."

                },
                {
    				"title": "",
                    "image" : "https://i.imgur.com/rNvhMjF.png",
    				"paragraph" : ""

                },
                {
    				"title": "Order By ",
                    "image" : "https://i.imgur.com/ZIGEnlu.png",
    				"paragraph" : "The SQL ORDER BY clause is used for sorting data in ascending and descending order based on one or more columns. Some databases sort query results in ascending order by default. Ascending Order: This statement is used to sort data in ascending order. If you miss the ASC attribute, SQL ORDER BY query takes ascending order by default. Descebdubg Order: This statement is used to sort data in descending order. You should use the DESC attribute in your ORDER BY clause as follows."

                },
                {
    				"title": "",
                    "image" : "https://i.imgur.com/0AbN3kK.png",
    				"paragraph" : ""

                },
                {
    				"title": "Update",
                    "image" : "",
    				"paragraph" : "The SQL commands (UPDATE and DELETE) are used to modify the data that is already in the database. The SQL DELETE command uses a WHERE clause. SQL UPDATE statement is used to change the data of the records held by tables. Which rows is to be update, it is decided by a condition. To specify condition, we use WHERE clause."

                },
                {
    				"title": "",
                    "image" : "https://i.imgur.com/8eIhGZP.png",
    				"paragraph" : ""

                }
    	]
}');

insert into SECTION(id,name,course_id,information)
values (6,'Section 4: Join Clauses',1,'{
    "id": "text_material",
    "paragraph": [
    			{
    				"title": "The Concept of Joining Tables ",
                    "image" : "https://lucysong0622.files.wordpress.com/2018/09/inner-join.gif?w=329&h=227",
                    "video" : "KTvYHEntvn8",
                    "paragraph" : "As the name shows, JOIN means to combine something. In case of SQL, JOIN means \"to combine two or more tables\". The SQL JOIN clause takes records from two or more tables in a database and combines it together. ANSI standard SQL defines five types of JOIN : inner join, left outer join, right outer join, full outer join and cross join. In the process of joining, rows of both tables are combined in a single table."
                },
                {
    				"title": "",
                    "image" : "https://www.w3schools.com/sql/img_innerjoin.gif",
    				"paragraph" : ""

                },
                {
    				"title": "Why SQL JOIN is used?",
                    "image" : "",
                    "paragraph" : "If you want to access more than one table through a select statement. If you want to combine two or more table then SQL JOIN statement is used .it combines rows of that tables in one table and one can retrieve the information by a SELECT statement. The joining of two or more tables is based on common field between them. SQL INNER JOIN also known as simple join is the most common type of join."

                },
                {
    				"title": "RIGHT JOIN ",
                    "image" : "https://www.w3schools.com/sql/img_rightjoin.gif",
    				"paragraph" : "The SQL right join returns all the values from the rows of right table. It also includes the matched values from left table but if there is no matching in both tables, it returns NULL."

                },
                {
    				"title": "",
                    "image" : "https://i.imgur.com/EGg1Lv4.png",
                    "paragraph" : ""

                },
                {
    				"title": "",
                    "image" : "https://i.imgur.com/W2Cjw1a.png",
    				"paragraph" : ""

                },
                {
    				"title": "LEFT JOIN ",
                    "image" : "https://www.w3schools.com/sql/img_leftjoin.gif",
    				"paragraph" : "The SQL left join returns all the values from the left table and it also includes matching values from right table, if there are no matching join value it returns NULL."

                },
                {
    				"title": "",
                    "image" : "https://i.imgur.com/V6wKXEr.png",
                    "paragraph" : ""

                },
                {
    				"title": "",
                    "image" : "https://i.imgur.com/gI8GSJX.png",
    				"paragraph" : ""

                },
                {
    				"title": "FULL JOIN",
                    "image" : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSttmxIcQUhzEAqXMXMj2ve4-VRj8A4Nuee4jl6fHStPFJMIuSF&usqp=CAU",
                    "paragraph" : "The SQL full join is the result of combination of both left and right outer join and the join tables have all the records from both tables. It puts NULL on the place of matches not found. SQL full outer join is used to combine the result of both left and right outer join and returns all rows (don''t care its matched or unmatched) from the both participating tables."

                },
                {
    				"title": "",
                    "image" : "https://i.imgur.com/8LOpnOK.png",
    				"paragraph" : ""

                }
    	]
}');

insert into SECTION(id,name,course_id,information)
values (7,'Section 5: Triggers',1,'{
    "id": "text_material",
    "paragraph": [
    			{
    				"title": "Trigger",
                    "image" : "",
                    "paragraph" : "A trigger is a stored procedure in database which automatically invokes whenever a special event in the database occurs. For example, a trigger can be invoked when a row is inserted into a specified table or when certain table columns are being updated. SQL Server triggers are special stored procedures that are executed automatically in response to the database object, database, and server events. SQL Server provides three type of triggers: Data manipulation language (DML) triggers which are invoked automatically in response to INSERT, UPDATE, and DELETE events against tables, Data definition language (DDL) triggers which fire in response to CREATE, ALTER, and DROP statements. DDL triggers also fire in response to some system stored procedures that perform DDL-like operations and Logon triggers which fire in response to LOGON events"
                },
                {
    				"title": "",
                    "image" : "",
                    "video" : "k0S4P-a6d5w",
                    "paragraph" : ""
                },
                {
    				"title": "Create Trigger",
                    "image" : "",
                    "paragraph" : "The CREATE TRIGGER statement allows you to create a new trigger that is fired automatically whenever an event such as INSERT, DELETE, or UPDATE occurs against a table."
                },
                {
    				"title": "",
                    "image" : "https://i.imgur.com/USS2REA.png",
                    "paragraph" : "The schema_name is the name of the schema to which the new trigger belongs. The schema name is optional. The trigger_name is the user-defined name for the new trigger. The table_name is the table to which the trigger applies. The event is listed in the AFTER clause. The event could be INSERT, UPDATE, or DELETE. A single trigger can fire in response to one or more actions against the table. The NOT FOR REPLICATION option instructs SQL Server not to fire the trigger when data modification is made as part of a replication process. The sql_statements is one or more Transact-SQL used to carry out actions once an event occurs."
                },
                {
    				"title": "Practical Example of a Trigger Creation",
                    "image" : "",
                    "paragraph" : ""
                },
                {
    				"title": "",
                    "image" : "https://i.imgur.com/YaEST2E.png",
                    "paragraph" : ""
                },{
    				"title": "",
                    "image" : "https://i.imgur.com/bsOWv8Z.png",
                    "paragraph" : "Above SQL statement will create a trigger in the student database in which whenever subjects marks are entered, before inserting this data into the database, trigger will compute those two values and insert with the entered values. i.e.."
                },
                {
    				"title": "",
                    "image" : "https://i.imgur.com/iOU7CA4.png",
                    "paragraph" : "In this way trigger can be creates and executed in the databases."
                },
                {
    				"title": "Disabling a Trigger",
                    "image" : "",
                    "paragraph" : "Sometimes, for the troubleshooting or data recovering purpose, you may want to disable a trigger temporarily."
                },
                {
    				"title": "",
                    "image" : "https://i.imgur.com/l5FiJc9.png",
                    "paragraph" : "In this syntax: First, specify the name of the schema to which the trigger belongs and the name of the trigger that you want to disable after the DISABLE TRIGGER keywords. Second, specify the table name or view that the trigger was bound to if the trigger is a DML trigger. Use DATABASE if the trigger is DDL database-scoped trigger, or SERVER if the trigger is DDL server-scoped trigger. An example below."
                },
                {
    				"title": "",
                    "image" : "https://i.imgur.com/ukf3VcN.png",
                    "paragraph" : ""
                },
                {
    				"title": "",
                    "image" : "https://i.imgur.com/iOU7CA4.png",
                    "paragraph" : "In this way trigger can be creates and executed in the databases."
                },
                {
    				"title": "Enabling a Trigger",
                    "image" : "",
                    "paragraph" : "The ENABLE TRIGGER statement allows you to enable a trigger so that the trigger can be fired whenever an event occurs."
                },
                {
    				"title": "",
                    "image" : "https://i.imgur.com/l1o2kro.png",
                    "paragraph" : "In this syntax: First, specify the name of the trigger that you want to enable. Optionally, you can specify the name of the schema to which the trigger belongs.Second, specify the table to which the trigger belongs if the trigger is a DML trigger. Use DATABASE if the trigger is a DDL database-scoped trigger or ALL SERVER if the trigger is DDL server-scoped trigger."
                },
                {
    				"title": "",
                    "image" : "https://i.imgur.com/QKPpeaZ.png",
                    "paragraph" : ""
                },
                {
    				"title": "Dropping a Trigger",
                    "image" : "",
                    "paragraph" : "The SQL Server DROP TRIGGER statement drops one or more triggers from the database."
                },
                {
    				"title": "",
                    "image" : "https://i.imgur.com/BF6vK4q.png",
                    "paragraph" : "In this syntax: IF EXISTS conditionally removes the trigger only when it already exists. schema_name is the name of the schema to which the DML trigger belongs. trigger_name is the name of the trigger that you wish to remove. If you want to remove multiple triggers at once, you need to separate triggers by commas."
                },
                {
    				"title": "",
                    "image" : "https://i.imgur.com/lSwFvyf.png",
                    "paragraph" : ""
                }
    	]
}');

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
'{"question": "What does SQL stand for?", "a" : "Sequel Query Language", "b" : "Structured Query Language","c" : "Standard Query Language","d" : "Structured Quality Language","correct" : "b"}',
3,1,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (2, 'multiple',
'{"question": "What SQL can do?", "a" : "Can execute queries against a database", "b" : "Can retrieve data from a database","c" : "Can insert records in a database","d" : "All the above ","correct" : "d"}',
3,1,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (3, 'multiple',
'{"question": "Which one is a SQL database?", "a" : "MySQL", "b" : "MongoDB","c" : "DynamoDB","d" : "Cassandra","correct" : "a"}',
3,1,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (4, 'multiple',
'{"question": "Which one is true about SQL?", "a" : "SQL is designed to query data\n contained in a relational database.", "b" : "SQL is an imperative programming language.","c" : "SQL is not a set-based and declarative programming language.","d" : "SQL doesn''t have extensions to support other development environments. ","correct" : "b"}',
3,1,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (5, 'multiple',
'{"question": "What is true about portability and SQL?", "a" : "SQL can communicate easily with other systems.", "b" : "SQL code can rarely be ported\n between database systems without modifications.","c" : "SQL can send and retrieve data from other databases without issues.","d" : "Portability on SQL is hard because SQL is not a programming language. ","correct" : "b"}',
3,1,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (6, 'multiple',
'{"question": "Which isn''t a Data Type?", "a" : "Blob", "b" : "JSON","c" : "Varbinary","d" : "Struct","correct" : "d"}',
4,1,0);


insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (7, 'code',
'{
"question" : "Write a query to create a database with name \"school\".",
"sql" : "",
"correctQuery" : "CREATE DATABASE school"
}', 4,1,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (8, 'code',
'{
"question" : "Write a query to create table \"students\" with columns id auto increment, name varchar (255), surname varchar (255), primary key id.",
"sql" : "",
"correctQuery" : "CREATE TABLE students (id int auto_increment, name varchar(255), surname varchar(255), PRIMARY KEY(id))"
}',
4,1,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (9, 'code',
'{
"question" : "Write a query to retrieve all information from the table \"students\".",
"sql" : "",
"correctQuery" : "SELECT * FROM students"
}',
4,1,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (10, 'code',
'{
"question" : "Write a query to insert a student to table \"students\" with name Jack Jackson.",
"sql" : "https://i.imgur.com/NkyiZIu.png",
"correctQuery" : "INSERT INTO students(name, surname) values (''Jack'', ''Jackson'')"
}',
4,1,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (11, 'multiple',
                                                                                 '{"question": "How SQL presents empty data?", "a" : "Deletes the row because we can''t have empty data.", "b" : "Adds an empty string.","c" : "Presents NULL.","d" : "Sets the empty data with zeroes.","correct" : "c"}',
                                                                                 5,1,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (12, 'code',
                                                                                 '{
                                                                                 "question" : "Write a query to find how many books have been written by the author \"Robert C. Martin\".",
                                                                                 "sql" : "https://i.imgur.com/8kIW87U.png",
                                                                                 "correctQuery" : "SELECT COUNT(*) FROM books WHERE author_id = 1"
                                                                                 }',
                                                                                 5,1,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (13, 'code',
'{
"question" : "Write a query to find the total price of all books.",
"sql" : "https://i.imgur.com/8kIW87U.png",
"correctQuery" : "SELECT SUM(price) FROM books"
}',
5,1,0);



insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (14, 'multiple',
'{"question": "Which is the keyword to SELECT unique data?", "a" : "DISTINCT", "b" : "ORDER BY","c" : "ASC","d" : "UNIQUE","correct" : "a"}',
5,1,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (15, 'code',
'{
"question" : "Write a query to retrieve books published from date 01-05-2011 up until 10-12-2018",
"sql" : "https://i.imgur.com/8kIW87U.png",
"correctQuery" : "SELECT * FROM books WHERE date_published BETWEEN ''2011-05-01'' and ''2018-12-10''"
}',
5,1,0);




insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (16, 'multiple',
                                                                                 '{"question": "Why SQL JOIN is used?", "a" : "SQL is using JOIN to connect to different types of databases.", "b" : "To combine one or more databases.","c" : "To access more than one table through a select statement.","d" : "With JOIN servers can use more hardware power.","correct" : "c"}',
                                                                                 6,1,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (17, 'multiple',
                                                                                 '{"question": "Which isn''t a type of join?", "a" : "Right Join ", "b" : "Full Join","c" : "Inner Join","d" : "Above Join","correct" : "d"}',
                                                                                 6,1,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (18, 'code',
                                                                                 '{
                                                                                 "question" : "Write a join query to present the author information for each book.",
                                                                                 "sql" : "https://i.imgur.com/8kIW87U.png",
                                                                                 "correctQuery" : "SELECT b.*, a.* FROM books b INNER JOIN author a ON a.id = b.author_id"
                                                                                 }',
                                                                                 6,1,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (19, 'code',
                                                                                 '{
                                                                                 "question" : "Write a join query to retrieve the name, surname and order_id from tables students and orders. You should order your results by student surname.",
                                                                                 "sql" : "https://i.imgur.com/xYFKqU5.png",
                                                                                 "correctQuery" : "SELECT students.name, students.surname, orders.order_id FROM students LEFT JOIN orders ON students.id = orders.student_id ORDER BY students.surname"
                                                                                 }',
                                                                                 6,1,0);


insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (20, 'multiple',
                                                                                 '{"question": "Which of the following is true for Full Join?", "a" : "It puts NULL on the place of matches not found. ", "b" : "It ignores the matches not found.","c" : "It puts EMPTY on the place of matches not found.","d" : " Full Join doesn''t exist on SQL databases.","correct" : "a"}',
                                                                                 6,1,0);






insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (21, 'multiple',
'{"question": "Which of the following is true about Trigger?", "a" : "Triggers work only on databases with two or more tables.", "b" : "Trigger invokes whenever a special event in the database occurs.","c" : "Triggers are able to change the data but not delete them.","d" : "Triggers cannot be disabled.","correct" : "b"}',
7,1,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (22, 'multiple',
'{"question": "Which of the following is not true about DML triggers?", "a" : "(DML) triggers are invoked automatically in response to INSERT, UPDATE, and DELETE events against tables. ", "b" : "(DML) triggers which fire in response to CREATE, ALTER, and DROP statements.","c" : "(DML) triggers are invoked automatically in response to JOIN, FULL JOIN, and RIGHT JOIN events against tables.","d" : "None of the above.","correct" : "a"}',
7,1,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (23, 'code',
'{
"question" : "Write a BEFORE INSERT Trigger with the name emp_details_BINS, which before insert a new record in emp_details table, a trigger check the column value of FIRST_NAME, LAST_NAME, JOB_ID and If there are any space(s) before or after the FIRST_NAME, LAST_NAME, TRIM() function will remove those. The value of the JOB_ID will be converted to upper cases by UPPER() function.",
"sql" : "https://i.imgur.com/03sunrR.png",
"correctQuery" : "CREATE TRIGGER `emp_details_BINS` BEFORE INSERT ON emp_details FOR EACH ROW BEGIN SET NEW.FIRST_NAME = TRIM(NEW.FIRST_NAME); SET NEW.LAST_NAME = TRIM(NEW.LAST_NAME); SET NEW.JOB_ID = UPPER(NEW.JOB_ID); END;"
}',
7,1,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (24, 'code',
'{
"question" : "Write a BEFORE UPDATE Trigger with the name update_cus which will insert (old) values into a mini_statement record (including account number and available balance as parameters) before updating any record in customer record/table.",
"sql" : "https://i.imgur.com/xm7PbZd.png",
"correctQuery" : "CREATE TRIGGER update_cus BEFORE UPDATE on customer FOR EACH ROW BEGIN INSERT INTO mini_statement VALUES (old.acc_no, old.avail_balance); END;"
}',
7,1,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (25, 'multiple',
'{"question": "Which keyword/phrases is/are being used to make a trigger unavailable?", "a" : "DISABLE", "b" : "DEACTIVATE","c" : "SET TRIGGER NULL","d" : "VISIBLE NULL ","correct" : "a"}',
7,1,0);

















insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (26, 'multiple',
                                                                                 '{"question": "What does SQL stand for?",
"a" : "Sequel Query Language",
"b" : "Structured Query Language",
"c" : "Standard Query Language",
"d" : "Structured Quality Language","correct" : "b"}',
                                                                                 3,0,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (27, 'multiple',
                                                                                 '{"question": "What SQL can do?", "a" : "Can execute queries against a database", "b" : "Can retrieve data from a database","c" : "Can insert records in a database","d" : "All the above ","correct" : "d"}',
                                                                                 3,0,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (28, 'multiple',
                                                                                 '{"question": "Which one is a SQL database?", "a" : "MySQL", "b" : "MongoDB","c" : "DynamoDB","d" : "Cassandra","correct" : "a"}',
                                                                                 3,0,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (29, 'multiple',
                                                                                 '{"question": "Which one is true about SQL?", "a" : "SQL is designed to query data\n contained in a relational database.", "b" : "SQL is an imperative programming language.","c" : "SQL is not a set-based and declarative programming language.","d" : "SQL doesn''t have extensions to support other development environments. ","correct" : "b"}',
                                                                                 3,0,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (30, 'multiple',
                                                                                 '{"question": "What is true about portability and SQL?", "a" : "SQL can communicate easily with other systems.", "b" : "SQL code can rarely be ported\n between database systems without modifications.","c" : "SQL can send and retrieve data from other databases without issues.","d" : "Portability on SQL is hard because SQL is not a programming language. ","correct" : "b"}',
                                                                                 3,0,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (31, 'multiple',
                                                                                 '{"question": "What has to be done in order to perform SQL queries?",
"a" : "Nothing, SQL is installed on every computer.",
"b" : "SQL needs JVM to perform queries.",
"c" : "phpMyAdmin needs to be installed.",
"d" : "A database needs to be installed (Oracle, MySQL etc.).","correct" : "d"}',
                                                                                 3,0,1);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (32, 'multiple',
                                                                                 '{"question": "How the databases that are not relational are called?",
"a" : "NonSQL",
"b" : "NoSQL",
"c" : "MongoDB",
"d" : "DBMS","correct" : "b"}',
                                                                                 3,0,1);








insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (33, 'multiple',
                                                                                 '{"question": "Which isn''t a Data Type?", "a" : "INT", "b" : "VARCHAR","c" : "DATE","d" : "CONST","correct" : "d"}',
                                                                                 4,0,0);


insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (34, 'code',
                                                                                 '{
                                                                                 "question" : "Write a query to create a database with name \"library\".",
                                                                                 "sql" : "",
                                                                                 "correctQuery" : "CREATE DATABASE library"
                                                                                 }', 4,0,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (35, 'code',
                                                                                 '{
                                                                                 "question" : "Write a query to create table \"cars\" with columns car_id auto increment, brand varchar (255), model varchar (255), primary key car_id.",
                                                                                 "sql" : "",
                                                                                 "correctQuery" : "CREATE TABLE cars (car_id int auto_increment, brand varchar(255), model varchar(255), PRIMARY KEY(car_id))"
                                                                                 }',
                                                                                 4,0,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (36, 'code',
                                                                                 '{
                                                                                 "question" : "Write a query to retrieve all information from the table \"cars\".",
                                                                                 "sql" : "",
                                                                                 "correctQuery" : "SELECT * FROM cars"
                                                                                 }',
                                                                                 4,0,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (37, 'code',
                                                                                 '{
                                                                                 "question" : "Write a query to insert a car to table \"cars\" with brand and model Mitsubishi Lancer.",
                                                                                 "sql" : "https://i.imgur.com/jko6uxH.png",
                                                                                 "correctQuery" : "INSERT INTO cars(brand, model) values (''Mitsubishi'', ''Lancer'')"
                                                                                 }',
                                                                                 4,0,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (38, 'code',
                                                                                 '{
                                                                                 "question" : "Write a query to retrieve only the brand of the cars from the table \"cars\".",
                                                                                 "sql" : "https://i.imgur.com/jko6uxH.png",
                                                                                 "correctQuery" : "SELECT brand FROM cars"
                                                                                 }',
                                                                                 4,0,1);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (39, 'code',
                                                                                 '{
                                                                                 "question" : "Write a query to retrieve only the brand of the cars from the table \"cars\" that the brand starts with the letter \"S\".",
                                                                                 "sql" : "https://i.imgur.com/jko6uxH.png",
                                                                                 "correctQuery" : "SELECT brand FROM cars WHERE brand LIKE ''S%''"
                                                                                 }',
                                                                                 4,0,1);













insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (40, 'code',
                                                                                 '{
                                                                                 "question" : "Write a query to find how many books have been written by the author \"Joshua Bloch\" and \"Richard Helm\".",
                                                                                 "sql" : "https://i.imgur.com/8kIW87U.png",
                                                                                 "correctQuery" : "SELECT COUNT(*) FROM books WHERE author_id = 3 OR author_id = 4"
                                                                                 }',
                                                                                 5,0,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (41, 'code',
                                                                                 '{
                                                                                 "question" : "Write a query to find the total price of all books with year published before 2010-01-01",
                                                                                 "sql" : "https://i.imgur.com/8kIW87U.png",
                                                                                 "correctQuery" : "SELECT SUM(price) FROM books WHERE date_published <= ''2010-01-01''"
                                                                                 }',
                                                                                 5,0,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (42, 'multiple',
                                                                                 '{"question": "How SQL presents empty data?", "a" : "There are no empty data in SQL.", "b" : "Requests from front-end the data.","c" : "Presents NULL.","d" : "None of the above.","correct" : "c"}',
                                                                                 5,0,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (43, 'multiple',
                                                                                 '{"question": "Which is the keyword to SELECT unique data?", "a" : "DISTINCT", "b" : "JOIN","c" : "WHERE","d" : "TRIGGER","correct" : "a"}',
                                                                                 5,0,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (44, 'code',
                                                                                 '{
                                                                                 "question" : "Write a query to retrieve books published from date 01-01-1990 up until 10-12-2020 with price less than 30.0 and descending order based on title.",
                                                                                 "sql" : "https://i.imgur.com/8kIW87U.png",
                                                                                 "correctQuery" : "SELECT * FROM books WHERE date_published BETWEEN ''1990-01-01'' and ''2010-12-10'' AND price < 30.0 ORDER BY title DESC"
                                                                                 }',
                                                                                 5,0,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (45, 'code',
                                                                                 '{
                                                                                 "question" : "Write a query to retrieve books published from date 01-01-2010 up until 10-12-2020 with price greater than 30.0 and ascending order based on title.",
                                                                                 "sql" : "https://i.imgur.com/8kIW87U.png",
                                                                                 "correctQuery" : "SELECT * FROM books WHERE date_published BETWEEN ''2010-01-01'' and ''2020-12-10'' AND price <  30.0 ORDER BY title ASC"
                                                                                 }',
                                                                                 5,0,1);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (46, 'code',
                                                                                 '{
                                                                                 "question" : "Write a query to update to remove 5.0 from the price of books published from date 01-05-2011 up until 10-12-2018",
                                                                                 "sql" : "https://i.imgur.com/8kIW87U.png",
                                                                                 "correctQuery" : "UPDATE books SET price = price + 5 WHERE date_published BETWEEN ''2011-05-01'' and ''2018-12-10''"
                                                                                 }',
                                                                                 5,0,1);


















insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (47, 'multiple',
                                                                                 '{"question": "Why SQL JOIN is used?", "a" : "SQL is using JOIN to connect to different types of databases.", "b" : "To combine one or more databases.","c" : "To access more than one table through a select statement.","d" : "With JOIN servers can use more hardware power.","correct" : "c"}',
                                                                                 6,0,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (48, 'multiple',
                                                                                 '{"question": "Which is the purpose of Left Join?", "a" : "Returns records that have matching values in both tables", "b" : "Returns all records from the left table, and the matched records from the right table","c" : "Returns all records from the right table, and the matched records from the left table","d" : "Returns all records when there is a match in either left or right table","correct" : "b"}',
                                                                                 6,0,0);


insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (49, 'code',
                                                                                 '{
                                                                                 "question" : "Write a join query to present the title of the book, name and surname of the author",
                                                                                 "sql" : "https://i.imgur.com/8kIW87U.png",
                                                                                 "correctQuery" : "SELECT b.title, a.name, a.surname FROM books b INNER JOIN author a ON a.id = b.author_id"
                                                                                 }',
                                                                                 6,0,0);



insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (50, 'code',
                                                                                 '{
                                                                                 "question" : "Write a join query to retrieve the name, surname and order_id from tables students and orders. You should order your results by student surname.",
                                                                                 "sql" : "https://i.imgur.com/xYFKqU5.png",
                                                                                 "correctQuery" : "SELECT students.name, students.surname, orders.order_id FROM students LEFT JOIN orders ON students.id = orders.student_id ORDER BY students.surname"
                                                                                 }',
                                                                                 6,0,0);


insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (51, 'multiple',
                                                                                 '{"question": "Which of the following is true for Right Join?", "a" : "Returns records that have matching values in both tables", "b" : "Returns all records from the left table, and the matched records from the right table",
"c" : "Returns all records from the right table, and the matched records from the left table",
"d" : "Returns all records when there is a match in either left or right table","correct" : "c"}',
                                                                                 6,0,0);


insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (52, 'code',
'{
"question" : "Write a join query to retrieve all non empty orders, with the name and surname of students and the order id. Also, we need the name and surname of the author of this book.",
"sql" : "https://i.imgur.com/xYFKqU5.png",
"correctQuery" : "SELECT students.name, students.surname, orders.order_id, books.id, author.name, author.surname FROM students RIGHT JOIN orders ON students.id = orders.student_id INNER JOIN books on orders.book_id = books.id INNER JOIN author on books.author_id = author.id ORDER BY students.surname"
}',
6,0,1);


insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (53, 'multiple',
'{"question": "Which of the following is true for Joins Operations?",
"a" : "Joins help retrieving data from maximum two database tables.",
"b" : "Joins can replace WHERE clause.",
"c" : "Joins help retrieving data from two or more database tables. ",
"d" : "Joins cannot work with empty data.","correct" : "c"}',
6,0,1);










insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (54, 'multiple',
                                                                                 '{"question": "Which of the following is true about Trigger?", "a" : "Triggers work only on databases with two or more tables.", "b" : "Trigger invokes whenever a special event in the database occurs.","c" : "Triggers are able to change the data but not delete them.","d" : "Triggers cannot be disabled.","correct" : "b"}',
                                                                                 7,0,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (55, 'multiple',
                                                                                 '{"question": "Which of the following is not true about DML triggers?", "a" : "(DML) triggers are invoked automatically in response to INSERT, UPDATE, and DELETE events against tables. ", "b" : "(DML) triggers which fire in response to CREATE, ALTER, and DROP statements.","c" : "(DML) triggers are invoked automatically in response to JOIN, FULL JOIN, and RIGHT JOIN events against tables.","d" : "None of the above.","correct" : "a"}',
                                                                                 7,0,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (56, 'code',
                                                                                 '{
                                                                                 "question" : "Write a AFTER INSERT Trigger with the name emp_details_BINS, which before insert a new record in emp_details table, a trigger check the column value of FIRST_NAME, LAST_NAME, JOB_ID and If there are any space(s) before or after the FIRST_NAME, LAST_NAME, TRIM() function will remove those. The value of the JOB_ID will be converted to upper cases by UPPER() function.",
                                                                                 "sql" : "https://i.imgur.com/03sunrR.png",
                                                                                 "correctQuery" : "CREATE TRIGGER `emp_details_BINS` AFTER INSERT ON emp_details FOR EACH ROW BEGIN SET NEW.FIRST_NAME = TRIM(NEW.FIRST_NAME); SET NEW.LAST_NAME = TRIM(NEW.LAST_NAME); SET NEW.JOB_ID = UPPER(NEW.JOB_ID); END;"
                                                                                 }',
                                                                                 7,0,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (57, 'code',
                                                                                 '{
                                                                                 "question" : "Write a AFTER UPDATE Trigger with the name update_cus which will insert (old) values into a mini_statement record (including account number and available balance as parameters) before updating any record in customer record/table.",
                                                                                 "sql" : "https://i.imgur.com/xm7PbZd.png",
                                                                                 "correctQuery" : "CREATE TRIGGER update_cus AFTER UPDATE on customer FOR EACH ROW BEGIN INSERT INTO mini_statement VALUES (old.acc_no, old.avail_balance); END;"
                                                                                 }',
                                                                                 7,0,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (58, 'multiple',
                                                                                 '{"question": "Which of the following operation isn''t supported by Triggers", "a" : "INSERT", "b" : "DISTINCT","c" : "UPDATE","d" : "DELETE","correct" : "b"}',
                                                                                 7,0,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (59, 'multiple',
                                                                                 '{"question": "Which of the following actions is supported by Triggers", "a" : "SET", "b" : "INLINE", "c" : "BEFORE","d" : "NEXT","correct" : "c"}',
                                                                                 7,0,1);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (60, 'multiple',
                                                                                 '{"question": "Which of the following keywords are being used to initiate the start and finish of a trigger snippet?", "a" : "BEGIN - FINISH", "b" : "START - END","c" : "START - FINISH","d" : "BEGIN - END","correct" : "d"}',
                                                                                 7,0,1);