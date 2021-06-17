const { copyFile, zipFile, deleteFile } = require('./utils')

const filePath = './lorem.txt'

copyFile(filePath)
zipFile(filePath)
deleteFile(filePath)