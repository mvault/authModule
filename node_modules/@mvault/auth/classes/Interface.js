function throwerrormessage(message) {
    throw new Error(message);
}
export default class Interface {
    constructor(app) {
        this.app = app;
    }
    mount(div) {
        this.div = div;
        if (this.div && this.app) {
            document.getElementById(this.div).innerHTML= `<iframe src="https://auth.mvault.one?${this.app}" frameborder="0" style="width:100%;height:800px"></iframe>`
        } else {
            throwerrormessage("div and app are required");
        }
    }
    open() {
        window.open(`https://auth.mvault.one?${this.app}`,
            "MsgWindow",
            "width=500,height=600")
    }
}