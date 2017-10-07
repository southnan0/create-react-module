///<reference types="@types/node" />
///<reference path="./d/interface.d.ts" />
const fs = require('fs');
const path = require('path');
import Toast from './toast';

const T = new Toast({isShow: true});

import readTemplate from './read-template';
import replaceTemplate from './replace-template';
import readSetting from './read-setting';

const templatePath = path.resolve(__dirname, '../template');
const moduleTemplatePath = path.resolve(templatePath, './modules');
const outputPath = path.resolve(__dirname, '../output/modules');

const setting = readSetting(path.resolve(templatePath, './setting.json'));

readTemplate(moduleTemplatePath, outputPath, (fullPath, fullOutputPath) => {
    const file = replaceTemplate(fs.readFileSync(fullPath), templatePath, JSON.parse(setting));
    fs.writeFileSync(fullOutputPath, file);
});