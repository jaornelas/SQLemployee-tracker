INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, null),
    ('Sara', 'Ryan', 2, 1),
    ('Ashley', 'Hayes', 3, null),
    ('Cherie', 'Davis', 4, 3),
    ('Sonu', 'Sing', 5, null),
    ('Sarah', 'Stewart', 6, 5),
    ('Jason', 'Cable', 7, null),
    ('Martin', 'Rojo', 8, 7);