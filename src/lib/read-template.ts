///<reference types="@types/node" />
const fs = require('fs');
const path = require('path');
import Toast from './toast';
const T = new Toast({isShow:true});

/**
 * 递归读取模板目录的文件
 * @param dirPath
 * @param outPath
 * @param next
 */
const readTemplate = (dirPath, outPath, next) => {
    fs.readdirSync(dirPath).map(item => {
        const fullPath = path.resolve(dirPath, `./${item}`);
        const fullOutputPath = path.resolve(outPath, `./${item}`);

        fs.stat(fullPath, (err, stats) => {
            if (err) {
                return T.show(err)
            }
            if (stats.isDirectory()) {
                fs.mkdir(fullOutputPath, (err) => {
                    if (err) {
                        return T.show(err)
                    }
                    readTemplate(fullPath, fullOutputPath, next);
                });
            } else {
                next(fullPath, fullOutputPath);
            }
        })

    })
};

export default readTemplate;