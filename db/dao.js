
const db = require('./db')

/**
 * Export our simple Data Access Object (DAO)
 * so we can use promises, like sane people
 */
module.exports = {
    employees(id = null, where){
        return db.getData('employee_vw', id, where)
    },
    roles(id = null){
        return db.getData('role', id)
    },
    departments(id = null){
        return db.getData('department', id)
    },
    budget(id){
        return db.query(`
            select 
                d.id,
                d.name,
                count(1) as employee_count,
                concat('$', format(sum(r.salary) / 100, 2)) salary
            from department d
            inner join role r on r.department_id = d.id
            inner join employee e on e.role_id = r.id
            where d.id = ?
            group by 1, 2
        `, id)
    }
}