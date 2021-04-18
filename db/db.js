
const mysql = require('mysql2');

const fs = require('fs')

const DEBUG_SQL = false

const conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "dbuser",
    password: "dbpass",
    database: "employees"
});

function parseClause(obj){
    const columns = [] // name of columns in db
    const values = [] // list of values for query placeholders
    Object.keys(obj)
        .forEach( k => {
            columns.push(k)
            values.push(obj[k])
        })
    return { columns, values }
}


/**
 * Put all our beefy generic database functions here
 */
 module.exports = {

    async getData(table, id = null, where = {}){
        if( id ){
            const matches = await this.query(`select * from ${table} where id = ?`, id)
            if( matches.length === 1 ){
                return matches[0]
            }else if( matches.length > 1) {
                throw new Error(`Got ${matches.length} for ID = ${id}`)
            }else{
                return null
            }
        }
        // turn the object into 2 arrays
        const { columns, values } = parseClause(where)

        const sql = `select * from ${table}\n`
            + `where true \n`
            + columns.map(c => `and ${c} = ?`).join('\n')
        return await this.query(sql, ...values)
    },

    async insertData(table, data){
        const { columns, values } = parseClause(data)

        const sql = `insert into ${table} (${ columns.join(', ')}) \n`
            + `values ( ${values.map(e => '?').join(',') } )`
        await this.query(sql, ...values)

        const [row] = await this.query(`select max(id) as id from ${table}`)
        const { id } = row
        return id
    },

    async updateData(table, id, updates){
        const { columns, values } = parseClause(updates)

        // add the target's userId as a variable for the where clause
        values.push(id)

        const sql = `update ${table} set \n`
            + columns.map(c => `${c} = ?`).join(',\n') + '\n'
            + `where id = ?`
        await this.query(sql, ...values)
    },

    async removeRow(table, id){
        await this.query(`delete from ${table} where id = ?`, id)
    },

    query(sql, ...args){
        return new Promise( (resolve, reject) => {
            conn.query(sql, args, function(err, res){
                if( err ){
                    reject(err)
                }else{
                    DEBUG_SQL && console.log('query complete', sql, args, res)
                    resolve(res)
                }
            })
        })
    },

    async verifySeeds(seeds){
        try { 
            await this.query('SELECT count(1) FROM employee')
            // no errors? we have a database already!
        }catch(err){
            if( err.code !== 'ER_NO_SUCH_TABLE' ){
                throw err
            }
        }

        // if we made it here, we need to insert the data
        for(let file of seeds){
            let query
            try {
                const sql = fs.readFileSync(`./db/${file}`, 'utf-8')
                // mysql is really cool about not running multiple queries
                // so we have to split and hope for the best
                for(query of sql.split(';') ){
                    if( query.trim().length > 0 ){
                        await this.query(query)
                    }
                }
            }catch(err){
                console.log(`Could not run seed file ${file}`, query, err)
            }
        }
    },

    close(){
        return conn.close()
    }
}