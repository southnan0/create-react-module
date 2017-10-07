///<reference types="@types/node" />
const fs = require('fs');
import Toast from './toast';

const T = new Toast({isShow: true});

const readSetting = (filePath) => {
    const fileBuffer = fs.readFileSync(filePath, 'utf8');
    return fileBuffer.toString();
};

export default readSetting;