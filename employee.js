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
        })
    }).catch(err => {console.error(err)})
}

function start() {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['Add department', 'Add role', 'Add employee', 'View departments', 'View roles', 'View employees', 'Update employee role']
    }]).then(response => {
        if(response.action === 'Add department') {
            addDepartment();
        }
    }).catch(err => {console.error(err)})
    
}

connection.connect(err => {
    if(err) throw err;


    start();
})

