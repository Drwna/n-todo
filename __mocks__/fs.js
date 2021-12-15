const fs = jest.genMockFromModule('fs')
const _fs = jest.requireActual('fs')

Object.assign(fs, _fs)

const mocks = {}

fs.setMock= (path, error, data) => {
    mocks[path] = [error, data]
}

// fs.readFile('xx',fn)
fs.readFile = (path, option, callback) => {
    if (option === undefined) {
        callback = option
    }
    if (path in mocks) {
        callback(...mocks[path])
        // callback(mocks[path][0], mocks[path][1])
    } else {
        _fs.readFile(path, option, callback)
    }
}

module.exports = fs
