import TestItem from "./TestItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameController extends cc.Component {

    public static Instance: GameController = null;
    
    @property(cc.Node)
    public itemContainer:cc.Node = null;
    @property(cc.Prefab)
    public itemPrefab:cc.Prefab = null;

    onLoad() {
        GameController.Instance = this;
    }

    init() {
        cc.log("init");
    }

    public static test() {
        cc.log("test static func");
    }

}