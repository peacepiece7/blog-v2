const fs = require('fs')
const path = require('path')

const dir = 'C:/Users/peace/source/peacepiece/blog_v2/src'

const appDir = path.join(dir, 'app')
console.log('appDir: ', appDir)
console.log('fs.existsSync(appDir) : ', fs.existsSync(appDir))
