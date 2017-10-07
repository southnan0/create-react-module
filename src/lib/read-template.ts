///<reference types="@types/node" />
const fs = require('fs');
const path = require('path');
import Toast from './toast';
const T = new Toast({ isShow: true });

import remove from './remove-dir'

/**
 * 递归读取模板目录的文件
 * @param templatePath   if file then outPath is file too
 * @param outPat
 * @param next
 */
const readTemplate = (templatePath, outPath, next) => {
    fs.stat(templatePath, (err, stats) => {
        if (err) {
            return T.show(err)
        }

        if (stats.isDirectory()) {
            if (fs.existsSync(outPath)) {
                remove(outPath, () => {
                    fs.mkdir(outPath, (err) => {
                        if (err) {
                            return T.show(err)
                        }
                        readDirTemplate(templatePath, outPath, next);
                    });
                })
            } else {
                fs.mkdir(outPath, (err) => {
                    if (err) {
                        return T.show(err)
                    }
                    readDirTemplate(templatePath, outPath, next);
                });
            }
        } else {
            next(templatePath, outPath);
        }
    })
};

/**
 *
 * @param dirPath
 * @param outPath
 * @param next   如果当前是文件，那么执行next的方法
 */
const readDirTemplate = (dirPath, outPath, next) => {
    fs.readdirSync(dirPath).map(item => {
        const fullPath = path.resolve(dirPath, `./${item}`);
        const fullOutputPath = path.resolve(outPath, `./${item}`);
        readTemplate(fullPath, fullOutputPath, next);
    });
};

export default readTemplate;