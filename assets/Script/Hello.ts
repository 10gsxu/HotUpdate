import GameController from "./GameController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Hello extends cc.Component {

    @property(cc.Label)
    public descLabel:cc.Label = null;

    onLoad() {
        cc.log("Hello");
    }

    start() {
        GameController.Instance.init();
        GameController.test();
    }

    init() {
        cc.log("init Hello");
    }
}