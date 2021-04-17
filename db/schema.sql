DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

-- DEPARTMENT table
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- ROLE table
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
    -- FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE 
);


-- EMPLOYEE table
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
    -- FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
    -- FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE
);
