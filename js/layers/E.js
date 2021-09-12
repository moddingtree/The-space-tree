addLayer("勘探", {
    name:"勘探",
    Symbol:"勘探",
    position: 1,
    startData() { return {                  // startData 是一个返回玩家初始数据的函数
        unlocked: false,                     // 你可以添加更多的变量，这会成为你的 layer 的变量
        points: new ExpantaNum(0),
        total: new ExpantaNum(0)             // "points" 是这一个 layer 资源的内部名
    }},

    color: "#FFD700",                       // 这一 layer 的颜色，会影响很多东西
    resource: "小行星",            // 这一 layer 主要声望点的名字
    row: 2,                                 // 这一 layer 所处的行 (0 是第一行)

    baseResource: "可用燃料",                 // 获取这一 layer 主要声望点所需要的资源名
    baseAmount() { return player.燃料.points },  // 一个返回当前 layer 基本资源量的函数

    requires: new ExpantaNum(10000000000000),              // 获取第一个这一 layer 声望点所需资源数量
                                            // 同样是解锁这一 layer 所需的资源数量

    type: "normal",                         // 定义这一 layer 声望点获取公式
    exponent: 0.5,                          // "normal" 获取到的是 (currency^exponent)

    gainMult() {
        if(hasUpgrade('航天',22)) mult = mult.times(3)
        if(hasChallenge('航天',12)) mult = mult.add(1).pow(buyableEffect('勘探',21))
        if(hasUpgrade('航天',23)) mult = mult.times(upgradeEffect('航天',13))                        // 返回对于这一 layer 声望点获取增益（乘数）
        return new ExpantaNum(1)
                     // 升级或其他地方获取到的乘数因子，在这里生效
    },
    gainExp() {                             // 返回对于这一 layer 声望点获取增益（指数）
        return new ExpantaNum(1)
    },

    layerShown(){ return hasChallenge('航天',12)||player.勘探.unlocked},         // 返回一个 Boolean，表示这个 layer 的节点是否出现在树上
    buyables: {
        11: {
            title:"金",
            cost(x) { return new ExpantaNum(1).mul(1) },
            effect(){
               var baseEff = getBuyableAmount(this.layer,this.id) .add(1).pow(0.1)
               if(hasChallenge('航天',12)) baseEff = baseEff.mul(buyableEffect('勘探',41))
               return baseEff
            },
            display() { return "你有",getBuyableAmount(this.layer,this.id) ,"块金，每块金能激励燃料工人多造10%可用燃料"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        12: {
            title:"铂",
            cost(x) { return new ExpantaNum(1).mul(1) },
            effect(){
               var baseEff = getBuyableAmount(this.layer,this.id) .add(1).pow(0.1)
               if(hasChallenge('航天',12)) baseEff = baseEff.mul(buyableEffect('勘探',42))
               return baseEff
            },
            display() { return "你有",getBuyableAmount(this.layer,this.id) ,"块铂，每块铂能激励航天器工人多造10%航天器"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        21: {
            title:"钼",
            cost(x) { return new ExpantaNum(4).mul(1) },
            effect(){
               var baseEff = getBuyableAmount(this.layer,this.id) .add(1).pow(0.05)
               if(hasChallenge('航天',12)) baseEff = baseEff.add(1).pow(buyableEffect('勘探',41))
               return baseEff
            },
            display() { return "你有",getBuyableAmount(this.layer,this.id) ,"块钼，每块钼能让小行星捕获装置更高效5%"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        22: {
            title:"氙",
            cost(x) { return new ExpantaNum(4).mul(1) },
            effect(){
               var baseEff = getBuyableAmount(this.layer,this.id) .add(1).pow(0.05)
               if(hasChallenge('航天',12)) baseEff = baseEff.add(1).pow(buyableEffect('勘探',42))
               return baseEff
            },
            display() { return "你有",getBuyableAmount(this.layer,this.id) ,"瓶氙，每瓶氙能让燃料点工厂更高效5%"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        31: {
            title:"铱",
            cost(x) { return new ExpantaNum(16).mul(1) },
            effect(){
               var baseEff = getBuyableAmount(this.layer,this.id) .add(1).pow(0.2)
               if(hasChallenge('航天',12)) baseEff = baseEff.add(1).pow(buyableEffect('勘探',41))
               return baseEff
            },
            display() { return "你有",getBuyableAmount(this.layer,this.id) ,"块铱，每块铱能让卫星更强20%"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        32: {
            title:"锇",
            cost(x) { return new ExpantaNum(16).mul(1) },
            effect(){
               var baseEff = getBuyableAmount(this.layer,this.id) .add(1).pow(0.2)
               if(hasChallenge('航天',12)) baseEff = baseEff.add(1).pow(buyableEffect('勘探',42))
               return baseEff
            },
            display() { return "你有",getBuyableAmount(this.layer,this.id) ,"块锇，每块锇能让航天升级12更强20%"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        41: {
            title:"镭",
            cost(x) { return new ExpantaNum(64).mul(1) },
            effect(){
               var baseEff = getBuyableAmount(this.layer,this.id) .add(1).pow(0.4)
               return baseEff
            },
            display() { return "你有",getBuyableAmount(this.layer,this.id) ,"块镭，每块镭能增强铱，金，钼40%"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        42: {
            title:"钋",
            cost(x) { return new ExpantaNum(64).mul(1) },
            effect(){
               var baseEff = getBuyableAmount(this.layer,this.id) .add(1).pow(0.4)
               return baseEff
            },
            display() { return "你有",getBuyableAmount(this.layer,this.id) ,"块钋，每块钋能增强氙，铂，锇40%"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    },
    update(diff){
        }
})