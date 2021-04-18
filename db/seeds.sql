
INSERT INTO department (name)
VALUES 
    ("Human Resources"), 
    ("R&D"), 
    ("Engineering"), 
    ("Accounting"), 
    ("Sales");

INSERT INTO role (title, salary, department_id)
VALUE 
    ("manager", 75000.00, 2), 
    ("engineer", 52000, 3), 
    ("accountant", 62500, 4), 
    ("recruiter", 57500, 1), 
    ("sales person", 85650, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("John", "Smith", 1, null), 
    ("Jill", "Green", 1, 1), 
    ("Jack", "Brown", 3, 2), 
    ("Steve", "Quinn", 5, 2);