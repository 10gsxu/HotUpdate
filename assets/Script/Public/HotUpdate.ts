import Hello from "../Hello";
import GameController from "../GameController";
import HttpUtil from "./HttpUtil";
import TestItem from "../TestItem";

export default class HotUpdate {

    private static instance: HotUpdate = null;
    public static get Instance(): HotUpdate {
        if (this.instance == null)
            this.instance = new HotUpdate();
        return this.instance;
    }

    private loadcb: Function = null;
    private runTime: qs.Runtime = null;

    init(loadCompleteCB: Function) {
        this.loadcb = loadCompleteCB;
    }

    constructor() {
        //将类绑定到window对象上，否则qs找不到对象
        this.bindClass();
        //加载热更代码，并注册代码到qs中
        this.loadScript();
    }

    private bindClass() {
        window.LeoHui = window.LeoHui || {};
        window.LeoHui.TestItem = TestItem;
        window.LeoHui.Hello = Hello;
        window.LeoHui.GameController = GameController;
    }

    private loadScript() {
        if(cc.sys.platform != cc.sys.WECHAT_GAME) {
            this.loadLocalScript();
        } else {
            this.loadRemoteScript();
        }
    }

    private loadSuccess(result:string) {
        cc.log(result);
        this.runScript(result);
        if (this.loadcb != null)
            this.loadcb();
    }

    private loadFail(error:string) {
        cc.log("loadFail : " + error);
        if (this.loadcb != null)
            this.loadcb();
    }

    private runScript(result:string) {
        this.runTime = new qs.Runtime(window);
        //注册代码
        this.runTime.regedit(result);
        //执行热更新中的UpdateFunction脚本的构造，构造里面会重新对本地代码中的方法进行替换
        new this.runTime.g.LeoHui.UpdateFunction();
    }

    private loadLocalScript() {
        cc.log("loadLocalScript");
        cc.loader.loadRes("hotscript/UpdateFunction", cc.TextAsset, function (error:Error, textAsset:cc.TextAsset) {
            if (error) {
                this.loadFail(error.message);
            } else {
                this.loadSuccess(textAsset.text);
            }
        }.bind(this));
    }

    private loadRemoteScript() {
        cc.log("loadRemoteScript");
        let url = "https://xiaochu.gyatechnology.com:3993/share/UpdateFunction.txt";
        /*
        cc.loader.load({url:url, type:'txt'}, function (error:Error, text:any) {
            if (error) {
                this.loadFail(error.message);
            } else {
                this.loadSuccess(text);
            }
        }.bind(this));
        */
        HttpUtil.Instance.request({
            method: "GET",
            url: url,
            success: this.loadSuccess.bind(this),
            fail: this.loadFail.bind(this)
        });
    }
}