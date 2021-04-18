
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
    await dao.close()
}

run()