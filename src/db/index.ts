import { pool } from './connection.js';

export default class Database {
    constructor() { }

    async query(sql: string, args: any[] = []) {
        const client = await pool.connect();
        try {
            const result = await client.query(sql, args);
            return result;
        } catch (error) {
            console.error('Database query error', error)
            throw error;
        } finally {
            client.release();
        }
    }

    // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
    async findAllEmployees() {
        return this.query(
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, \' \', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;`
        )
    }
    // Find all employees except the given employee id
    findAllPossibleManagers(employeeId: number) {
        return this.query(
            'SELECT id, first_name, last_name FROM employee WHERE id != $1',
            [employeeId]
        );
    }

    // Create a new employee
    createEmployee(employee: any) {
        const { first_name, last_name, role_id, manager_id } = employee;
        return this.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
            [first_name, last_name, role_id, manager_id]
        );
    }

    // Remove an employee with the given id
    removeEmployee(employeeId: number) {
        return this.query('DELETE FROM employee WHERE id = $1', [employeeId]);
    }

    // Update the given employee's role
    updateEmployeeRole(employeeId: number, roleId: number) {
        return this.query('UPDATE employee SET role_id = $1 WHERE id = $2', [
            roleId,
            employeeId,
        ]);
    }

    // Update the given employee's manager
    updateEmployeeManager(employeeId: number, managerId: number) {
        return this.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [
            managerId,
            employeeId,
        ]);
    }

    // Find all roles, join with departments to display the department name
    findAllRoles() {
        return this.query(
            'SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;'
        );
    }

    // Create a new role
    createRole(role: any) {
        const { title, salary, department_id } = role;
        return this.query(
            'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
            [title, salary, department_id]
        );
    }

    // Remove a role from the db
    removeRole(roleId: number) {
        return this.query('DELETE FROM role WHERE id = $1', [roleId]);
    }

    // Find all departments
    findAllDepartments() {
        return this.query('SELECT department.id, department.name FROM department;');
    }

    // Find all departments, join with employees and roles and sum up utilized department budget
    viewDepartmentBudgets() {
        return this.query(
            'SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;'
        );
    }

    // Create a new department
    createDepartment(department: any) {
        return this.query('INSERT INTO department (name) VALUES ($1)', [
            department.name,
        ]);
    }

    // Remove a department
    removeDepartment(departmentId: number) {
        return this.query('DELETE FROM department WHERE id = $1', [departmentId]);
    }

    // Find all employees in a given department, join with roles to display role titles
    findAllEmployeesByDepartment(departmentId: number) {
        return this.query(
            'SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = $1;',
            [departmentId]
        );
    }

    // Find all employees by manager, join with departments and roles to display titles and department names
    findAllEmployeesByManager(managerId: number) {
        return this.query(
            'SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = $1;',
            [managerId]
        );
    }
}