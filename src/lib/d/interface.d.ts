interface OutputPath {
    modules:string;
}

interface ImportPath{
    createResource:string;
}

interface FileConfig{
    [propName:string]:any;
}

interface TemplateList{
    modules:string[];
}

interface Setting {
    outputPath:OutputPath;
    importPath:ImportPath;
    fileConfig:FileConfig;
    templateList:TemplateList
}