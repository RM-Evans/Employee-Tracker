
const seedFiles = ['schema.sql', 'seeds.sql']

// low level db interface (use dao for app needs)
const db = require('./db/db')
// what will drive the CLI
const cli = require('./src/cli')

async function run(){
    await db.query("SET foreign_key_checks = 0")
    await db.query("drop table if exists department,role,employee")
    await db.query("SET foreign_key_checks = 1")

    await db.verifySeeds(seedFiles)

    await cli.loop()
    await db.close()
}

run()