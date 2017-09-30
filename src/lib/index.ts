///<reference types="@types/node" />
const fs = require('fs');
const path = require('path');
import Toast from './toast';

const T = new Toast({isShow: true});

import readSetting from './read-setting';
import readTemplate from './read-template';

const templatePath = path.resolve(__dirname, '../template');
const outputPath = path.resolve(__dirname, '../output');


// const replaceTemplate = () => {
//
// };
//
// readTemplate(templatePath, outputPath, (fullPath, fullOutputPath) => {
//     const file = fs.readFileSync(fullPath);
//     fs.writeFileSync(fullOutputPath, file);
// });
readSetting(path.resolve(templatePath, './setting.json')).then((setting) => {
    const moduleOutputPath = setting.outputPath.modules;
    const objImportPath = setting.importPath;

});