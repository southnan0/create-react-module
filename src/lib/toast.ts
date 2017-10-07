class Toast {
    isShow:boolean;
    constructor({isShow}){
        this.isShow = isShow;
    }

    show(msg:string){
        if(this.isShow){
            console.info(msg)
        }
    }
}

export default Toast;