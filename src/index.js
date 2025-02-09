import inquirer from 'inquirer';
import { viewDepartment, addDepartment } from 'department';
import { viewRoles, addRole } from 'roles';
import { viewEmployee, addEmployee } from 'employee';

function startUp() {
    console.log('Employee Tracker Main Menu')
    inquirer.prompt([
        {
            type: "list",
            name: "select",
            message: "Please select one of the options below", 
            choices: [
                "View All Employees",
                "Add Employee",
                "Update Employee Role",
                "View All Roles",
                "Add Role",
                "View All Departments",
                "Add Department",
                "Quit"
            ],
            default: "View All Employees", 
        },
    ])
}