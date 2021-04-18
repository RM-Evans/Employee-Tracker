
const seedFiles = ['schema.sql', 'seeds.sql']

// how we interact with our database
const dao = require('./db/db')
// what will drive the CLI
const cli = require('./src/cli')

async function run(){
    await dao.query("SET foreign_key_checks = 0")
    await dao.query("drop table if exists department,role,employee")
    await dao.query("SET foreign_key_checks = 1")

    await dao.verifySeeds(seedFiles)

    await cli.loop()
}

run()



// const inquirer = require('inquirer');
// const mysql = require('mysql2');


// // const Connection = require('mysql2/typings/mysql/lib/Connection');

// const dbConnect = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "!J4Ws15i13",
//     database: "employeeDB"
// });


// dbConnect.connect(function (err) {
//     if (err) throw err;
//     console.log('dbConnect');
//     menuPrompt();
// });


// //create a main menu with all my choices
// function menuPrompt() {
//     //menu prompts
//     inquirer
//         .prompt([
//             {
//                 name: 'menu',
//                 type: 'list',
//                 message: 'WHAT WOULD YOU LIKE TO DO?',
//                 choices: [
//                     'View employees',
//                     'View employees by role',
//                     'View employees by department',
//                     'Update Employee',
//                     'Add Employee',
//                     'Add Role',
//                     'Add Department'

//                 ]
//             }])
//         .then(function (val) {
//             switch (val.menu) {

//                 case 'View employees':
//                     viewEmployees();
//                     break;


//                 case 'View employees by role':
//                     viewEmployeesByRole();
//                     break;


//                 case 'View employees by department':
//                     viewEmployeesByDepartment();
//                     break;


//                 case 'Update Employee':
//                     updateEmployee();
//                     break;


//                 case 'Add Employee':
//                     addEmployee();
//                     break;


//                 case 'Add Role':
//                     //call addRole function here
//                     break;


//                 case 'Add Department':
//                     addDepartment();
//                     break;


//             }
//         });
// }

// //view employees table
// function viewEmployees() {
//     let query = "SELECT * FROM employee";
//     dbConnect.query(query, function (err, res) {
//         if (err) throw err;

//         console.table(res);
//         //at end of function, go back to main menu
//         menuPrompt();
//     });
// }
// //view role table
// function viewEmployeesByRole() {
//     let query = "SELECT * FROM role";
//     dbConnect.query(query, function (err, res) {
//         if (err) throw err;

//         console.table(res);
//         //at end of function, go back to main menu
//         menuPrompt();
//     });
// }
// //view department table
// function viewEmployeesByDepartment() {
//     let query = "SELECT * FROM department";
//     dbConnect.query(query, function (err, res) {
//         if (err) throw err;

//         console.table(res);
//         //at end of function, go back to main menu
//         menuPrompt();
//     });
// }


// function addEmployee() {
//     inquirer
//         .prompt([
//             {
//                 name: 'firstName',
//                 type: 'input',
//                 message: 'Enter employees first name: '
//             },
//             {
//                 name: 'lastName',
//                 type: 'input',
//                 message: 'Enter employees last name: '
//             },
//             {
//                 name: 'salary',
//                 type: 'input',
//                 message: 'Enter employees salary: '
//             },
//             {
//                 name: 'roleID',
//                 type: 'list',
//                 message: 'Enter employees role id: ',
//             },
//             {
//                 name: 'ManagerID',
//                 type: 'input',
//                 message: 'Enter employees Manager: ',
//             }

//         ]);
// }

// function addDepartment() {
//     inquirer.prompt({
//         name: 'deptName',
//         type: 'input',
//         message: 'what department?',
//     }).then(function (userInput) {

//         db.query("INSERT INTO department (name) VALUES (?)", [userInput.deptName], function (err, res) {
//             if (err) throw err;
//             console.table(res);
//             menuPrompt();
//         });
//     });

// }

// function updateEmployee() {
//     inquirer
//         .prompt([
//             {
//                 name: 'updateWhoRole',
//                 type: 'list',
//                 message: 'update which employee?',
//                 choices: getIdAndEmployeeName()

//             },
//             {
//                 name: 'updateRole',
//                 type: 'input',
//                 message: 'update to what role?'
//             },
//         ])
//         .then(function (userInput) {

//             db.query('UPDATE employee SET role_id=? WHERE first_name= ?', [userInput.updateRole, userInput.eeUpdate], function (err, res) {
//                 if (err) throw err;
//                 console.table(res);
//                 startScreen();
//             });

//         });
// }



// function getIdAndEmployeeName() {
//     let choicesArr = [];
//     let query = "SELECT * FROM employee";
//     dbConnect.query(query, function (err, res) {
//         if (err) throw err;

//         choicesArr = res.map(employee => {
//             return { name: employee.first_name, id: employee.id };
//         });
//         console.log(choicesArr);

//     });
//     return choicesArr;
// //async await --- timing is my issue
//     // .then(results => {

//     // }).catch(function (err) {
//     //     console.log(err);
//     // });
// }


// // function chooseManager() {
// //     inquirer.prompt([
// //         {

// //         }
// //     ]);
// // }


