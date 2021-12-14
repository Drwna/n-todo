const program = require("commander")
const api = require("./index.js")

program
    .option('-x, --xxx', 'output extra xxx')
program
    .command('add')
    .description('add a task')
    .action((...args) => {
        const words = args.slice(0, -1).join(' ')
        api.create(words)
    })
program
    .command('clear')
    .description('clear all tasks')
    .action(() => {
        console.log('this clear command')
    })

program.parse(process.argv);
