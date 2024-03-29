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
  created_on timestamp DEFAULT NOW() not null,
  created_by varchar(50) not null
);

CREATE TABLE store (
  store_id SERIAL PRIMARY KEY,
  store_name varchar(50) not null,
  store_code varchar(5) not null,
  store_address varchar(50) not null,
  created_on timestamp DEFAULT NOW() not null,
  created_by varchar(50) not null
);

CREATE TABLE app_audit (
  audit_id SERIAL PRIMARY KEY,
  audit_action varchar(50) not null,
  audit_date json,
  audit_by varchar(50) not null,
  audit_on timestamp DEFAULT NOW() not null,
  audit_status varchar(50),
  audit_error json
);

INSERT INTO
  BOOkS (
    book_title,
    book_description,
    book_author,
    book_isbn,
    book_publisher,
    book_pages,
    store_code,
    created_by
  )
VALUES
  ($ 1, $ 2, $ 3, $ 4, $ 5, $ 6, $ 7, $ 8);

INSERT INTO
  app_audit (
    audit_action,
    audit_data,
    audit_status,
    audit_error,
    audit_by
  )
VALUES
  ($ 1, $ 2, $ 3, $ 4, $ 5) RETURNING *;