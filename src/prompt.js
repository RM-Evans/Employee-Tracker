const inquirer = require('inquirer');

const dao = require('../db/dao')

const main = [{
    name: 'menu',
    type: 'list',
    message: 'WHAT WOULD YOU LIKE TO DO?',
    choices: [
        
        { value: 'employees', name: 'View Employees'},
        { value: 'employeesByDept', name: 'View Employees by Department'},
        { value: 'employeesByManager', name: 'View Employees by Manager'},
        
        
        { value: 'addEmployee', name: 'Add Employee'},
        { value: 'removeEmployee', name: 'Remove Employee'},

        { value: 'updateRole', name: 'Update Employee Role'},
        { value: 'updateManager', name: 'Update Employee Manager'},

        { value: 'viewRoles', name: 'View Roles'},
        { value: 'addRole', name: 'Add Role'},
        
        { value: 'viewDepartments', name: 'View Departments'},
        { value: 'addDepartment', name: 'Add Department'},

        
        { value: 'budget', name: 'Calculate Department Budget'},

        { value: 'exit', name: 'Quit'},
    ]
}]

// helper function to parse labels from choices
function choiceMapper(labelProp){
    return el => ({
        value: el.id,
        name: el[labelProp] 
    })
}

// helper function to pull results 
function daoChoices(fn, labelProp){
    const mapper = choiceMapper(labelProp)
    return async () => {
        const results = await fn()
        const result = results.map(mapper)
        return result
    }
}

const askEmployeePrompt = (name, message) => ({
    name,
    message,
    type: 'list',
    choices: daoChoices(() => dao.employees(), 'name')
})

const askRolePrompt = {
    name: 'role_id',
    message: 'What role?',
    type: 'list',
    choices: daoChoices(() => dao.roles(), 'title')
}

const askDepartmentPrompt = {
    name: 'department_id',
    message: 'What Department?',
    type: 'list',
    choices: daoChoices(() => dao.departments(), 'name')
}


const addEmployeePrompts = [
    {
        name: 'first_name',
        type: 'input',
        message: 'Enter employees first name: '
    },
    {
        name: 'last_name',
        type: 'input',
        message: 'Enter employees last name: '
    },
    askRolePrompt,
    askEmployeePrompt('manager_id', 'Manager')
]



const addDepartmentPrompts = [
    {
        name: 'name',
        type: 'input',
        message: 'Enter department name: '
    }
]


const addRolePrompts = [
    {
        name: 'title',
        type: 'input',
        message: 'Enter role title: '
    },
    {
        name: 'salary',
        type: 'input',
        message: 'Enter role salary (numeric only please): '
    },
    askDepartmentPrompt
]



function updateEmployeePrompts(props = []){
    const questions = [
        askEmployeePrompt('userId', 'Which employee would you like to update?')
    ]

    if( props.find(e => e === 'role') ){
        questions.push(askRolePrompt)
    }

    if( props.find(e => e === 'manager') ){
        questions.push(askEmployeePrompt('managerId', 'Which employee would you like to update?'))
    }

    return questions
}

module.exports = {
    promptEmployee(...args){
        return inquirer.prompt(askEmployeePrompt(...args))
    },
    promptDepartment(){
        return inquirer.prompt(askDepartmentPrompt)
    },
    async menu(){
        const result = inquirer.prompt(main)
        return result
    },
    async addEmployee(){
        const result = inquirer.prompt(addEmployeePrompts)
        return result
    },
    async addRole(){
        const result = inquirer.prompt(addRolePrompts)
        return result
    },
    async addDepartment(){
        const result = inquirer.prompt(addDepartmentPrompts)
        return result
    },
    async updateEmployee(props){
        const result = inquirer.prompt(updateEmployeePrompts(props))
        return result
    }
}