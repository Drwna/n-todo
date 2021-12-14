const db = require("./db")

module.exports.create = async (title) => {
    // 读取之前的任务
    const list = await db.read()
    // 往里面添加一个任务
    list.push({title, done: false})
    // 存储任务到文件
    await db.write(list)

    // 原代码
    // fs.readFile(dbPath, {flag: 'a+'}, (error, data) => {
    //     let list
    //     if (error) {
    //         console.log(error)
    //     } else {
    //         try {
    //             list = JSON.parse(data.toString())
    //         } catch (error2) {
    //             list = []
    //         }
    //         const task = {
    //             title: title,
    //             done: false
    //         }
    //         list.push(task)
    //         console.log(list)
    //         const string = JSON.stringify(list)
    //         fs.writeFile(dbPath, string, (error3) => {
    //             if (error3) {
    //                 console.log(error3)
    //             }
    //         })
    //     }
    // })
}

module.exports.clear = async () => {
    await db.write([])
}

module.exports.showAll = async () => {
    console.log('show all')
    // 读取之前的任务
    const list = await db.read()
    // 打印之前的任务
    list.forEach((task, index) => {
        console.log(`${task.done ? '[⨉]' : '[_]'} ${index} - ${task.title}`)
    })
}
