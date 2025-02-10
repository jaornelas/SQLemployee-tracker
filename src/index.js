import inquirer from "inquirer";
import Database from "./db/queries.js";
import { connectToDb } from "./db/db.js";
import logo from 'asciiart-logo';

await connectToDb();

const loadPrompts = () => {
    const logoText = logo({ name: 'Employee Manager' }).render();

  console.log(logoText);
    inquirer
     .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit'
            ]
        }
    ])
    .then((answers) => {
        if (answers.action === 'View All Employees') {
            viewAllEmployees();
        } else if (answers.action === 'Add Employee') {
            addNewEmployee();
        } else if (answers.action === 'Update Employee Role') {
            updateEmployeeRole();
        } else if (answers.action === 'View All Roles') {
            viewAllRoles();
        } else if (answers.action === 'Add Role') {
            addNewRole();
        } else if (answers.action === 'View All Departments') {
            viewAllDepartments();
        } else if (answers.action === 'Add Department') {
            addNewDepartment();
        } else {
            process.exit(1);
        }
    })
}

async function viewAllDepartments() {
    await Db.viewDepartments().then((departments) => console.table(departments));
    loadPrompts();
}

async function viewAllRoles() {
    await Database.viewRoles().then((roles) => console.table(roles));
    loadPrompts();
}

async function viewAllEmployees() {
    await Database.viewEmployees().then((employees) => console.table(employees));
    loadPrompts();
}

async function addNewDepartment() {
    await inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'department',
                    message: 'What is the name of the department?'
                }
            ])
            .then((answers) => {
                Database.addDepartment(answers.department);
                console.log(`Added ${answers.department} to the database`);
            })
    
    loadPrompts();
}

async function addNewRole() {
    await inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'What is the name of the role?'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary of the role?'
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'Which department does the role belong to?',
                    choices: Database.findDepartments()
                }
            ])
            .then((answers) => {
                Database.addRole(answers);
                console.log(`Added ${answers.title} to the database`);
            })

    loadPrompts();
}

async function addNewEmployee() {
    await inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: `What is the employee's first name?`
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: `What is the employee's last name?`
                },
                {
                    type: 'list',
                    name: 'role',
                    message: `What is the employee's role?`,
                    choices: Database.findRoles()
                }
            ])
            .then((answers) => {
                Database.findEmployees().then((employees) => {
                    employees.unshift({name: 'None', value: null})
                    inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'manager',
                            message: `Who is the employee's manager?`,
                            choices: employees
                        }
                    ])
                    .then((answer) => {
                        const employee = {
                            firstName: answers.firstName,
                            lastName: answers.lastName,
                            role: answers.role,
                            manager: answer.manager
                        };

                        Database.addEmployee(employee)
                        .then(
                        console.log(`Added ${answers.firstName} ${answers.lastName} to the database`)
                        )
                        .then(loadPrompts())
                    })
                })
            })
}

async function updateEmployeeRole() {
    await inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: `Which employee's role do you want to update?`,
                    choices: Database.findEmployees()
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Which role do you want to assign to the selected employee?',
                    choices: Database.findRoles()
                }
            ])
            .then((answers) => {
                Database.updateEmployeeRole(answers);
                console.log(`Updated employee's role`);
            })

    loadPrompts();
}

loadPrompts();