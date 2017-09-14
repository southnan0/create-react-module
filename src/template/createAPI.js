const BASE_PATH = $$API;

export const $$API_NAME = $$$createResource({
    url: BASE_PATH + $$URL,
    options:{
        mode:"ajax"
    },
    requestTransform(params){
        return {

        }
    }
})