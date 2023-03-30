create database bms;

CREATE TABLE books (
  book_id SERIAL PRIMARY KEY,
  book_title varchar(50) not null,
  book_description varchar(1000) not null,
  book_author varchar(50) not null,
  book_isbn varchar(50) not null,
  book_publisher varchar(50) not null,
  book_pages int not null,
  store_code varchar(5) not null,
  created_on timestamp not null,
  created_by varchar(50) not null
);

CREATE TABLE store (
  store_id SERIAL PRIMARY KEY,
  store_name varchar(50) not null,
  store_code varchar(5) not null,
  store_address varchar(50) not null,
  created_on timestamp not null,
  created_by varchar(50) not null
);