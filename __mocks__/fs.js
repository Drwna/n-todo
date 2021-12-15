const fs = jest.genMockFromModule('fs')
const _fs = jest.requireActual('fs')

Object.assign(fs, _fs)

let readMocks = {}

fs.setReadFileMock = (path, error, data) => {
    readMocks[path] = [error, data]
}

// fs.readFile('xx',fn)
fs.readFile = (path, option, callback) => {
    if (option === undefined) {
        callback = option
    }
    if (path in readMocks) {
        callback(...readMocks[path])
        // callback(readMocks[path][0], readMocks[path][1])
    } else {
        _fs.readFile(path, option, callback)
    }
}

let writeMocks = {}

fs.setWriteFileMock = (path, fn) => {
    writeMocks[path] = fn
}

fs.writeFile = (path, data, option, callback) => {
    if (path in writeMocks) {
        writeMocks[path](path, data, option, callback)
    } else {
        _fs.writeFile(path, data, option, callback)
    }
}

fs.clearMocks = () => {
    readMocks = {}
    writeMocks = {}
}


module.exports = fs
