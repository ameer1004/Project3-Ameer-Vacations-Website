create database vacationDB;
use vacationdb;

CREATE TABLE users
(
userID int auto_increment,
firstName varchar(255),
lastName varchar(255),
username varchar(255),
password varchar(1000),
isAdmin boolean,
primary key (userID),
UNIQUE KEY uniqe_username (username)
);

INSERT INTO users
(firstName, lastName, username, password, isAdmin)
VALUES
("Ameer","Emran","Ameere","123123",false),
("eyal","david","eyal02","123123",false),
("smadar","david","smadi","123123",false),
("kobi","peretz","kobi5","123123",false),
("Admin","administrator","admin","12341234",true);

CREATE TABLE vacations
(
vacationID int auto_increment,
description text,
location varchar(255),
picture varchar(500),
dateGo date not null,
dateBack date not null,
price int not null,
followersNum int not null,
primary key (vacationID)
);


INSERT INTO vacations
(description, location, picture, dateGO, dateBack, price, followersNum)
VALUES
("Rome - magic city","Rome, Italy","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgLsKMsPUx4R7c-PvjtuRGaeWQzBWjpQpWL-owgb1xK42uLEDgDA&s","2023-04-10","2023-04-17",1000,2),
("Love Amsterdam","Amsterdam, The netherlands","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi8swt5fR_n1nNgL-2rnNTng-b5HAlmzVWhw&usqp=CAU","2023-04-20","2023-04-26",1200,3),
("London","United Kingdom, London","https://cdn.londonandpartners.com/assets/73295-640x360-london-skyline-ns.jpg","2023-05-10","2023-05-20",1500,5),
("Thailand - the perfect freedom","Thailand","https://www.masa.co.il/wp-content/uploads/2017/11/thailand_open.jpg","2023-02-10","2023-02-24",2000,4),
("Vietnam - relax","Vietnam","https://www.ncl.com/sites/default/files/881-Vietnam-Thailand-Cambodia-Singapore-JADE11SINLCHSH1SGNNHADADHANHKG_R.jpg","2023-06-03","2023-06-20",2200,6),
("Paris - city of lights","Paris, France","https://www.gotnewswire.com/wp-content/uploads/2017/11/paris.jpg","2023-04-15","2023-04-21",800,3),
("Welcome to Berlin","Berlin, Germany","https://media.cntraveler.com/photos/5b914e80d5806340ca438db1/16:9/w_2580,c_limit/BrandenburgGate_2018_GettyImages-549093677.jpg","2023-06-02","2023-06-10",900,1),
("Budapest- The beautiful city","Budapest,Hungary","https://tourscanner.com/blog/wp-content/uploads/2021/06/fun-things-to-do-in-Budapest.jpg","2023-05-20","2023-05-27",700,4),
("India - best place to relax","India","https://www.collinsdictionary.com/images/full/india_120633745_1000.jpg","2023-08-01","2023-08-20",1800,0);

CREATE TABLE vacations_of_users
(
	rowID int auto_increment,
    user_id int,
    vacation_id int,
    primary key (rowID),
    foreign key (user_id) references users(userID),
    foreign key (vacation_id) references vacations(vacationID)
);
