///<reference types="@types/node" />
const fs = require('fs');
import Toast from './toast';
const T = new Toast({isShow:true});

const readSetting = async (filePath) => {
    return await new Promise((resolve,reject)=>{
        fs.readFile(filePath, 'utf8', (err,file) => {
            if(err){
                return reject(err);
            }
            const obj = JSON.parse(file);
            resolve(obj)
        })
    });
};

export default readSetting;