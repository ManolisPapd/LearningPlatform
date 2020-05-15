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
			"context" : "With our online SQL editor, you can edit the SQL statements, and click on a button to view the result."
		}

	]}');

insert into SECTION(id,name,course_id,information)
values (2,'Statistics',1,'{ "id" : "statistics"}');

insert into SECTION(id,name,course_id,information)
values (3,'Section 1: Introduction to SQL world',1,'{ "id" : "text_material", "paragraph": "TEXT MATERIAL"}');

insert into SECTION(id,name,course_id,information)
values (4,'Section 2: Hands on databases',1,'{"id" : "video_material", "paragraph": "TEXT MATERIAL + VIDEO MATERIAL", "video": "youtube.com/WwasdasK"}');

insert into SECTION(id,name,course_id,information)
values (5,'Section 3: Advanced queries',1,'{"id" : "text_material", "paragraph": "TEXT MATERIAL"}');

insert into SECTION(id,name,course_id,information)
values (6,'Final Quiz',1,'{"id" : "final_quiz"}');

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
                                                                                 '{"question": "1What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 3,0,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (6, 'multiple',
                                                                                 '{"question": "2What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 3,0,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (7, 'multiple',
                                                                                 '{"question": "3What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 3,0,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (8, 'multiple',
                                                                                 '{"question": "4What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 3,0,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (9, 'multiple',
                                                                                 '{"question": "5What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 3,0,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (10, 'multiple',
                                                                                 '{"question": "XFAILEDEDDD What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 3,0,1);


insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (11, 'multiple',
                                                                                 '{"question": "6What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 4,0,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (12, 'multiple',
                                                                                 '{"question": "7What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 4,0,0);

insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (13, 'multiple',
                                                                                 '{"question": "8What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 4,0,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (14, 'multiple',
                                                                                 '{"question": "9What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 4,0,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (15, 'multiple',
                                                                                 '{"question": "10What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 4,0,0);
insert into QUIZ(id, type, details, section_id, for_section,when_failed) values (16, 'multiple',
                                                                                 '{"question": "YFAILEDEDDD What is this boogy doogy sceletal * from user?", "a" : "Don''t know", "b" : "Something terrible","c" : "Not so babyboy","d" : "I think I am cute, I Know I am sexy","correct" : "d"}',
                                                                                 4,0,1);




