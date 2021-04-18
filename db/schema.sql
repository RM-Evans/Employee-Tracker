-- DEPARTMENT table
CREATE TABLE IF NOT EXISTS department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- -- ROLE table
CREATE TABLE IF NOT EXISTS role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL 
);


-- -- EMPLOYEE table
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

CREATE OR REPLACE VIEW employee_vw as 
SELECT e.id, 
    concat_ws(' ', e.first_name, e.last_name) as name,
    e.first_name, 
    e.last_name, 
    e.role_id,
    r.title as role,
    r.department_id,
    d.name as department,
    -- https://www.sisense.com/blog/how-to-format-numbers-as-currency-in-postgres-mysql-and-redshift/
    concat('$', format(salary / 100, 2)) salary,
    e.manager_id,
    concat_ws(' ', m.first_name, m.last_name) as manager

FROM employee e 
LEFT JOIN employee m on m.id = e.manager_id 
LEFT JOIN role r on r.id = e.role_id
LEFT JOIN department d on d.id = r.department_id; 