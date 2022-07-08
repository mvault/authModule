'use strict'
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
    open(hostApp,appDiv) {
        if (appDiv) {
        document.getElementById(appDiv).innerHTML= '<iframe src="https://auth.mvault.one/" frameborder="0" style="width:100%;height:800px"></iframe>'
      }
    }
}