const fs = require('fs');
const path = require('path');

const rDoubleBrace = /{{(.*?)}}/g;
const rDoubleDollar = /^\${2}[^(\s|,|;|$)]+|[(\s|,|;)]+\${2}[^(\s|,|;|$)]+/g;
const rThreeDollar = /^\${3}[^(\s|,|;|$)]+|[(\s|,|;)]+\${3}[^(\s|,|;|$)]+/g;

/**
 * 递归替换
 * @param strFile
 * @param templateBasePath
 * @param objSetting
 * @returns {string | any | void}
 */
const replaceFile = (strFile, templateBasePath, objSetting) => {
    const regex = /({{(.*?)}})|(^\${2}[^(\s|,|;|$)]+|[(\s|,|;)]+\${2}[^(\s|,|;|$)]+)|(^\${3}[^(\s|,|;|$)]+|[(\s|,|;)]+\${3}[^(\s|,|;|$)]+)/g;

    const newStrFile = strFile.replace(regex, (match, p1) => {
        if (check(rDoubleBrace, match)) {
            return replaceDoubleBraces(match, templateBasePath, objSetting);
        } else if (check(rThreeDollar, match)) {
            return replaceThreeDollar(match, objSetting);
        } else if (check(rDoubleDollar, match)) {
            return replaceDoubleDollar(match, objSetting);
        } else {
            return match;
        }
    });
    return newStrFile;
};

const check = (regex, str) => {
    return regex.test(str);
};

/**
 * {{ }}
 * @param strFile
 * @param templateBasePath
 * @returns {string | any | void}
 */
const replaceDoubleBraces = (strFile, templateBasePath, objSetting) => {
    const regex = rDoubleBrace;
    return strFile.replace(rDoubleBrace, (match, p1) => {
        const f = fs.readFileSync(path.resolve(templateBasePath, `./${p1.trim()}.js`));
        if (!f.toString) {
            return match;
        }
        return replaceFile(f.toString(), templateBasePath, objSetting);
    });
};

/**
 * $$  TODO: 暂时不支持URL为数组
 * @param strFile
 * @param obj
 * @returns {string | any | void}
 */
const replaceDoubleDollar = (strFile, objSetting) => {
    const regex = rDoubleDollar;

    const newStrFile = strFile.replace(regex, (match) => {
        const p = match.replace(/\${2}/, '').trim();
        if (!p) {
            return match;
        }
        const text = objSetting.fileConfig[`${p}`];
        if (!text) return match;
        return `'${text}'`;
    });
    return newStrFile;
};

/**
 * $$$
 * @param strFile
 * @param objSetting
 * @returns {string | any | void}
 */
const replaceThreeDollar = (strFile, objSetting) => {
    const regex = rThreeDollar;
    const newStrFile = strFile.replace(regex, (match) => {
        const p = match.replace(/\${3}/, '').trim();
        if (!p) {
            return match;
        }
        const text = objSetting.variableConfig[`${p}`];
        if (!text) return match;
        return `${text}`;
    });
    return newStrFile;
};

const replaceTemplace = (fileBuffer, templateBasePath, objSetting) => {
    const strFile = fileBuffer.toString();
    return replaceFile(strFile, templateBasePath, objSetting)
};

export default replaceTemplace;