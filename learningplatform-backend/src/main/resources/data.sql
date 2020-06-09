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
                  name VARCHAR(5000),
                  course_id INT,
                  information VARCHAR(5000));
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
    				"title": "AAAAAAWhy SQL",
                    "video": "HXV3zeQKqGY",
    				"paragraph" : "AAAAASQL is Structured Query Language, which is a computer language for storing, manipulating and retrieving data stored in a relational database.SQL is the standard language for Relational Database System. All the Relational Database Management Systems (RDMS) like MySQL, MS Access, Oracle, Sybase, Informix, Postgres and SQL Server use SQL as their standard database language.Also, they are using different dialects, such as"

                },
    			{
    				"title": "AAAAAAudience",
                    "image": "https://s33046.pcdn.co/wp-content/uploads/2018/03/word-image-27.png",
    				"paragraph" : "AAAAThis SQL tutorial is prepared for beginners to help them understand the basic as well as the advanced concepts related to SQL languages. This tutorial will give you enough understanding on the various components of SQL along with suitable examples."
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
details VARCHAR(5000),
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


