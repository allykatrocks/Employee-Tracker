const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Letitbe1',
    database: 'employee_DB',
});

function addDepartment() {
    inquirer.prompt([{
        type: 'input',
        name: 'department',
        message: 'Which department do you want to add?'
    }]).then(response => {
        var department = response.department;
        connection.query('INSERT INTO department SET ?', {name: department}, err => {
            if(err) throw err
            start();
        })
    }).catch(err => {console.error(err)})
}

function viewDepartments() {
    connection.query('SELECT * FROM department', (err, data) => {
        if(err) throw err
        console.table(data)
        console.log('\n')
        start();
    })
}

function addRole() {
    connection.query('SELECT * FROM department', (err, departments) => {
        if(err) throw err
        var departNames = departments.map(({name}) => name)
        inquirer.prompt([{
            type: "input",
            name: "title",
            message: "What is this role's title?"
        },
    {
        type: 'number',
        name: "salary",
        message: "What is the annual salary of this role?"
    },
{
    type: 'list',
    name: 'departmentName',
    message: 'Which department does this role belong to?',
    choices: departNames
}]).then(response => {
    const departmentName = response.departmentName
    const department_id = departments.find(department => department.name === departmentName).id
    connection.query('INSERT INTO role SET ?', {title: response.title, salary: response.salary, department_id}, err => {
        if(err) throw err
        start();
    })
})
    })
    
}

function viewRoles() {
    connection.query('SELECT * FROM role', (err, data) => {
        if(err) throw err
        console.table(data)
        console.log('\n')
        start();
    })
}

function start() {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['Add department', 'Add role', 'Add employee', 'View departments', 'View roles', 'View employees', 'Update employee role']
    }]).then(response => {
        switch(response.action) {
            case 'Add department':
                addDepartment();
                break;
            case 'View departments':
                viewDepartments();
                break;
            case 'Add role':
                addRole();
                break;
            case 'View roles':
                viewRoles();
                break;
            default:    
        }
    }).catch(err => {console.error(err)})
    
}

connection.connect(err => {
    if(err) throw err;


    start();
})

