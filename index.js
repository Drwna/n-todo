const homedir = require('os').homedir()
const home = process.env.HOMEPATH || homedir
const p = require('path')
const fs = require("fs")
const dbPath = p.join(home, '.todo')

module.exports.create = (title) => {
    // 读取之前的任务
    fs.readFile(dbPath, {flag: 'a+'}, (error, data) => {
        let list
        if (error) {
            console.log(error)
        } else {
            try {
                list = JSON.parse(data.toString())
            } catch (error2) {
                list = []
            }
            const task = {
                title: title,
                done: false
            }
            list.push(task)
            console.log(list)
            const string = JSON.stringify(list)
            fs.writeFile(dbPath, string, (error3) => {
                if (error3) {
                    console.log(error3)
                }
            })
        }
    })
    // 往里面添加一个任务

    // 存储任务到文件
}
