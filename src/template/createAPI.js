// 只有URL可以为数组
export const $$API_NAME = createResource({
    url: BASE_PATH + $$URL,
    options:{
        mode:"ajax"
    },
    requestTransform(params){
        return {

        }
    }
});