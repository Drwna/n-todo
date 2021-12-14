const homedir = require('os').homedir()
const home = process.env.HOMEPATH || homedir
const p = require('path')
const fs = require("fs")
const dbPath = p.join(home, '.todo')

const db = {
    read(path = dbPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, {flag: 'a+'}, (error, data) => {
                let list
                if (error) {
                    console.log(error)
                    return reject(error)
                }
                try {
                    list = JSON.parse(data.toString())
                } catch (error2) {
                    list = []
                }
                resolve(list)
            })
        })
    },

    write(list, path = dbPath) {
        return new Promise((resolve, reject) => {
            const string = JSON.stringify(list)
            fs.writeFile(path, string, (error) => {
                if (error) {
                    console.log(error)
                    return reject(error)
                }
                resolve()
            })
        })
    }
}

module.exports = db
