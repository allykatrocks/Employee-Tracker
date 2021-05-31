DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;
USE employee_DB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,4),
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Human Resources"); 

INSERT INTO department (name)
VALUES ("Accounting");

INSERT INTO department (name)
VALUES ("Marketing");

INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO department (name)
VALUES ("IT");

INSERT INTO role (title, salary)
VALUES ("Manager", 50000.00);

INSERT INTO role (title, salary)
VALUES ("Epmloyee", 30000.00);

INSERT INTO role (title, salary)
VALUES ("Intern", 20000.00);

INSERT INTO employee (first_name, last_name)
VALUES ("Bob", "Smith");

INSERT INTO employee (first_name, last_name)
VALUES ("Deborah", "Williams");

INSERT INTO employee (first_name, last_name)
VALUES ("Jose", "Perez");

INSERT INTO employee (first_name, last_name)
VALUES ("Lin" "Shang");

INSERT INTO employee (first_name, last_name)
VALUES ("Sanjay", "Rudeep");