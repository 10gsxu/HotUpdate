const { ccclass, property } = cc._decorator;

@ccclass
export default class TestItem extends cc.Component {

    @property(cc.Label)
    public descLabel:cc.Label = null;

    onLoad() {
        cc.log("Test");
    }

    init(index:number) {
        this.descLabel.string = "Desc " + index;
    }

    private itemOnClick() {
        
    }
}