///<reference types="@types/node" />
///<reference path="./d/interface.d.ts" />
const fs = require('fs');
const path = require('path');
import Toast from './toast';

const T = new Toast({ isShow: true });

import readSetting from './read-setting';
import readTemplate from './read-template';

const templatePath = path.resolve(__dirname, '../template');
const outputPath = path.resolve(__dirname, '../output');


// const replaceTemplate = () => {
//
// };
//
readTemplate(templatePath, outputPath, (fullPath, fullOutputPath) => {
    const file = fs.readFileSync(fullPath);
    fs.writeFileSync(fullOutputPath, file);
});
// readSetting(path.resolve(templatePath, './setting.json')).then((setting: Setting) => {
//     const moduleOutputPath = setting.outputPath.modules;
//     const objImportPath = setting.importPath;
//     const arrFileConfig = setting.fileConfig;
//     const templateList = setting.templateList;

//     if (templateList instanceof Array) {

//     } else if (templateList instanceof Object) {
//         Object.keys(templateList).map(key => {
//             const arr = templateList[key];
//             arr && arr.map(fileName => {
                
//             })
//         })
//     }
// });