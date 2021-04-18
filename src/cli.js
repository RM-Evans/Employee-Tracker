const seedFiles = ['schema.sql', 'seeds.sql']


// how we interact with our database
const dao = require('../db/dao')

// low level access for insert
const db = require('../db/db')

// how we get details
const prompt = require('./prompt')

module.exports = {
    async loop(){
        let selection 
        do {
            selection = await prompt.menu()

            const fn = this[selection.menu]
            if( fn ){
                try {
                    await fn()
                }catch(err){
                    console.warn(`Failed running command "${selection.menu}"`, err)
                }
            }else{
                console.warn("No idea what to do with command: " + selection.menu)
            }
            console.log('\n\n') // new lines for clear space
        }while(selection.menu != 'exit')
        await dao.close()
    },

    async employees(){
        const employees = await dao.employees()
        if( employees.length ){
            console.table(employees)
        }else{
            console.log('No results found')
        }
    },

    async employeesByDept(){
        const employees = await dao.employees(null, where)
        if( employees.length ){
            console.table(employees)
        }else{
            console.log('No results found')
        }
    },

    async employeesByManager(){
        const where = await prompt.promptEmployee('manager_id', 'Which manager?')
        const employees = await dao.employees(null, where)
        if( employees.length ){
            console.table(employees)
        }else{
            console.log('No results found')
        }
    },

    async addEmployee(){
        const details = await prompt.addEmployee()
        const id = await db.insertData('employee', details)
        const employee = await dao.employees(id)
        if( employee ){
            console.table([employee])
        }else{
            console.log('No results found')
        }
    },


    async removeEmployee(){
        const { userId } = await prompt.promptEmployee('userId', 'Who is being removed?')
        await db.removeRow('employee', userId)
        console.log('Removed user ' + userId)
    },
    
    async updateRole(){
        const { userId, role_id } = await prompt.updateEmployee(['role'])
        await db.updateData('employee', userId, { role_id })
        const employee = await dao.employees(userId)
        console.table([employee])
    },

    async updateManager(){
        const { userId, managerId } = await prompt.updateEmployee(['manager'])
        const result = await db.updateData('employee', userId, { manager_id: managerId })
        const employee = await dao.employees(userId)
        console.table([employee])
    },


    
    async viewRoles(){
        const roles = await dao.roles()
        if( roles.length ){
            console.table(roles)
        }else{
            console.log('No results found')
        }
    },
    async addRole(){
        const details = await prompt.addRole()
        const id = await db.insertData('role', details)
        const role = await dao.roles(id)
        if( role ){
            console.table([role])
        }else{
            console.log('No results found')
        }
    },
    

    async viewDepartments(){
        const depts = await dao.departments()
        if( depts.length ){
            console.table(depts)
        }else{
            console.log('No results found')
        }
    },
    async addDepartment(){
        const details = await prompt.addDepartment()
        const id = await db.insertData('department', details)
        const dept = await dao.departments(id)
        if( dept ){
            console.table([dept])
        }else{
            console.log('No results found')
        }
    },

    async budget() {
        const { department_id } = await prompt.promptDepartment()
        const report = await dao.budget(department_id)
        console.table(report)
    },

    async exit(){
        //noop
    }
}