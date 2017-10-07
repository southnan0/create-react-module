///<reference types="@types/node" />
const fs = require('fs');
const path = require('path');
import Toast from './toast';
const T = new Toast({ isShow: true });

const removeDir = (fullPath) => {
    fs.readdirSync(fullPath).map((item) => {
        remove(path.resolve(fullPath, `./${item}`))
    })
    fs.rmdirSync(fullPath)
}

const remove = (fullPath, next?:any) => {
    const stats = fs.statSync(fullPath)
    if (stats.isDirectory()) {
        removeDir(fullPath);
    } else {
        fs.unlinkSync(fullPath);
    }
    next && next()
}

export default remove;