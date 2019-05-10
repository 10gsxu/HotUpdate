import HotUpdate from "./HotUpdate";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    //初始化方法的数组
    private functionList = [];
    private loadFinishCount = 0;

    // onLoad () {}

    start() {
        this.loadRes();
    }

    // update (dt) {}

    /**
    * 加载游戏资源
    */
    loadRes() {
        cc.log('开始加载游戏 loadRes');
        this.loadFinishCount = 0;
        this.functionList = [
            HotUpdate.Instance.init.bind(HotUpdate.Instance)
        ]

        for (let i = 0; i < this.functionList.length; i++) {
            this.functionList[i](this.loadCallBack.bind(this));
        }
    }

    /**
     * 加载数据的回调
     */
    loadCallBack() {
        this.loadFinishCount++;
        if (this.loadFinishCount >= this.functionList.length) {
            this.resLoadFinish();
        }
        cc.log("加载完：", this.loadFinishCount);
    }

    /**
    * 完成资源加载
    */
    resLoadFinish() {
        cc.log("完成所有资源加载");
        let self = this;
        cc.director.preloadScene('GameScene', function () {
            cc.log("进入GameScene场景");
            cc.director.loadScene("GameScene");
        });
    }
}
