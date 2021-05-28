const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Letitbe1",
  database: "employee_DB",
});

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Which department do you want to add?",
      },
    ])
    .then((response) => {
      var department = response.department;
      connection.query(
        "INSERT INTO department SET ?",
        { name: department },
        (err) => {
          if (err) throw err;
          start();
        }
      );
    })
    .catch((err) => {
      console.error(err);
    });
}

function viewDepartments() {
  connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    console.table(data);
    console.log("\n");
    start();
  });
}

function addRole() {
  connection.query("SELECT * FROM department", (err, departments) => {
    if (err) throw err;
    var departNames = departments.map(({ name }) => name);
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is this role's title?",
        },
        {
          type: "number",
          name: "salary",
          message: "What is the annual salary of this role?",
        },
        {
          type: "list",
          name: "departmentName",
          message: "Which department does this role belong to?",
          choices: departNames,
        },
      ])
      .then((response) => {
        const departmentName = response.departmentName;
        const department_id = departments.find(
          (department) => department.name === departmentName
        ).id;
        connection.query(
          "INSERT INTO role SET ?",
          { title: response.title, salary: response.salary, department_id },
          (err) => {
            if (err) throw err;
            start();
          }
        );
      });
  });
}

function addEmployee() {
  connection.query("SELECT * FROM role", (err, data) => {
    if (err) throw err;
    const roleArray = data.map((roles) => ({
      name: roles.title,
      value: roles.id,
    }));
    connection.query("SELECT * FROM employee", (err, result) => {
      if (err) throw err;
      const managerId = result.map((res) => ({
        name: `${res.first_name} ${res.last_name}`,
        value: res.id,
      }));
      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "role_id",
            message: "What is the employee's role?",
            choices: roleArray,
          },
          {
            type: "list",
            name: "manager_id",
            message: "Who is the employee's manager?",
            choices: managerId,
          },
        ])
        .then((response) => {
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: response.first_name,
              last_name: response.last_name,
              role_id: response.role_id,
              manager_id: response.manager_id,
            },
            (err) => {
              if (err) throw err;
              start();
            }
          );
        });
    });
  });
}

function viewRoles() {
  connection.query("SELECT * FROM role", (err, data) => {
    if (err) throw err;
    console.table(data);
    console.log("\n");
    start();
  });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", (err, data) => {
    if (err) throw err;
    console.table(data);
    console.log("\n");
    start();
  });
}

function updateEmployee() {
    connection.query("SELECT * FROM role", (err, data) => {
        if (err) throw err;
        const roleArray = data.map((roles) => ({
          name: roles.title,
          value: roles.id,
        }));
        connection.query("SELECT * FROM employee", (err, result) => {
          if (err) throw err;
          const employees = result.map((res) => ({
            name: `${res.first_name} ${res.last_name}`,
            value: res.id,
          }));
          inquirer
            .prompt([
              {
                type: "list",
                name: "employee",
                message: "Who is the employee?",
                choices: employees
              },
              {
                type: "list",
                name: "role_id",
                message: "What is the employee's role?",
                choices: roleArray,
              },
            ])
            .then((response) => {
              connection.query(
                "UPDATE employee SET ? WHERE ?",
               [
                   {
                       role_id: response.role_id
                   },
                   {
                        id: response.employee
                   }
               ],
                (err) => {
                  if (err) throw err;
                  start();
                }
              );
            });
        });
      });
}

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "Add department",
          "Add role",
          "Add employee",
          "View departments",
          "View roles",
          "View employees",
          "Update employee role",
          "Quit"
        ],
      },
    ])
    .then((response) => {
      switch (response.action) {
        case "Add department":
          addDepartment();
          break;
        case "View departments":
          viewDepartments();
          break;
        case "Add role":
          addRole();
          break;
        case "View roles":
          viewRoles();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "View employees":
          viewEmployees();
          break;
        case "Update employee role":
            updateEmployee();
            break;
        case "Quit":
            connection.end();
            break;      
        default:
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

connection.connect((err) => {
  if (err) throw err;

  start();
});
