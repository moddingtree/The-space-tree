addLayer("航天", {
    name:"航天",
    Symbol:"航天",
    position: 0,
    startData() { return {                  // startData 是一个返回玩家初始数据的函数
        unlocked: false,                     // 你可以添加更多的变量，这会成为你的 layer 的变量
        points: new ExpantaNum(0),             // "points" 是这一个 layer 资源的内部名
        total: new ExpantaNum(0),
        pointss: new ExpantaNum(0)            
    }},

    color: "#660099",                       // 这一 layer 的颜色，会影响很多东西
    resource: "航天器",            // 这一 layer 主要声望点的名字
    row: 2,                                 // 这一 layer 所处的行 (0 是第一行)

    baseResource: "可用燃料",                 // 获取这一 layer 主要声望点所需要的资源名
    baseAmount() { return player.燃料.points },  // 一个返回当前 layer 基本资源量的函数

    requires: new ExpantaNum(10000000000),              // 获取第一个这一 layer 声望点所需资源数量
                                            // 同样是解锁这一 layer 所需的资源数量
    branches:["燃料"],
    type: "normal",                         // 定义这一 layer 声望点获取公式
    exponent() {
        var a = 0
        if(hasChallenge('航天',11)&& a==0) a = a + 1
        return new ExpantaNum(0.5)
},                        // "normal" 获取到的是 (currency^exponent)

    gainMult() {
        mult = new ExpantaNum(1)                            // 返回对于这一 layer 声望点获取增益（乘数）
        if (hasChallenge('航天',12)) mult = mult.add(1).pow(buyableEffect('勘探',12))
        return mult               // 升级或其他地方获取到的乘数因子，在这里生效
    },
    gainExp() {                             // 返回对于这一 layer 声望点获取增益（指数）
        return new ExpantaNum(1)
    },

    layerShown(){ return hasUpgrade('燃料',15)||player.航天.unlocked},          // 返回一个 Boolean，表示这个 layer 的节点是否出现在树上
    challenges: {
        11: {
            name: "后启示录第一传",
            challengeDescription: "残酷的核战后，一切都毁了。燃料点获取除以5,可用燃料获取除以2.5，燃料升级11，12和15无效！",
            goalDescription:"获得20可用燃料",
            rewardDescription:"我们尽力让它运转了。使重置不清除燃料升级11，12,13和15。同时开启最大购买+解锁接下来4个升级",
            rewardEffect(){
                var baseEff=player.points.add(1).pow(0.7)
                if(hasUpgrade("航天",14)) baseEff = baseEff.mul(challengeEffect('燃料',11))
                return baseEff
            },
            canComplete: function() {return player.燃料.points.gte(20)},
            unlocked(){return hasUpgrade("航天",11)},
        },
        12:{
           name: "垃圾环轨",
           challengeDescription: "外头全是垃圾！航天器的宇外采集项目就此终止！航天升级12，13无效！",
           goalDescription:"获得327670可用燃料",
           rewardDescription:"很幸运地，垃圾被及时清除，航天升级12的效果开始被燃料升级15增幅。同时解锁勘探并让矿石生效",
           canComplete: function() {return player.燃料.points.gte(327670)},
           unlocked(){return hasUpgrade("航天",21)} 
        },
        13:{
            name: "贫瘠之地",
            challengeDescription: "倒大霉…………地球被我们挖空了…………燃料点获取除以一千，但不知为何燃料升级11，12，14，15根据当前燃料点获得超额加成",
            goalDescription:"获得1e10可用燃料",
            rewardDescription:"看起来我们可以保留这些加成的超超超超超弱化版。",
            canComplete: function() {return player.燃料.points.gte(10000000000)},
            unlocked(){return hasUpgrade("航天",24)} 
         },
    },

    upgrades: {
        11: {
            description: "欢迎来到航天器的领域！你的基础燃料点获取变为5点，同时解锁S挑战1！",
            cost(){return new ExpantaNum(1)},
            unlocked(){return true},
        },
        12: {
            description: "这一幕是不是似曾相识？航天器数量大幅增加可用燃料获取。",
            cost(){return new ExpantaNum(5)},
            effect() {
                var baseEff = player[this.layer].points.add(1).pow(0.495)
                if(hasUpgrade("航天",15)) baseEff = baseEff.mul(challengeEffect("燃料",11))
                if(hasChallenge("航天",12))baseEff = baseEff.mul(upgradeEffect("燃料",15))
                if(hasChallenge('航天',12)) baseEff = baseEff.add(1).pow(buyableEffect('勘探',32))
                if(inChallenge("航天",12)) baseEff = baseEff.div(baseEff)
                return baseEff
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked(){return hasChallenge('航天',11)},
        },
        13: {
            description: "不用维护了。使航天器内部的微型工厂开始发射加成燃料点获取量的卫星",
            cost(){return new ExpantaNum(25)},
            effect() {
                var baseEff = player[this.layer].pointss.add(1).pow(0.3)
                if(inChallenge("航天",12)) baseEff = baseEff.div(baseEff)
                if(hasChallenge('航天',12)) baseEff = baseEff.add(1).pow(buyableEffect('勘探',31))
                return baseEff
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
            unlocked(){return hasChallenge('航天',11)},
            
        },
        14: {
            description: "我寻思着你到底还想怎样？让S挑战1的奖励增加挑战1的奖励",
            cost(){return new ExpantaNum(125)},
            unlocked(){return hasUpgrade('航天',13)},
            
        },
        15: {
            description: "好了好了，再给点就是，让挑战1增幅航天升级12，燃料升级11，12，14，15。",
            cost(){return new ExpantaNum(625)},
            unlocked(){return hasUpgrade('航天',14)},
            
        },
        21: {
            description: "你这…………算了，现在燃料层级的一切都不会被重置了(除了已有燃料和那个挑战）…………",
            cost(){return new ExpantaNum(100000)},
            unlocked(){return hasChallenge('航天',12)},
            
        },
        22: {
            description: "航天器挂载了更多的小行星捕获器。小行星现在基础获取数量变为3颗。",
            cost(){return new ExpantaNum(999999)},
            unlocked(){return hasUpgrade('航天',21)},
            
        },
        23: {
            description: "卫星也开始捕获小行星了，卫星数量加成小行星获取。",
            cost(){return new ExpantaNum(1888888)},
            unlocked(){return hasUpgrade('航天',22)},
            
        },
        24: {
            description: "准备好了吗？地球被挖空了！",
            cost(){return new ExpantaNum(64000000000)},
            unlocked(){return hasUpgrade('航天',23)},
            
        },
        25: {
            description: "最后一步，殖民飞船准备就绪，解锁天体层级。",
            cost(){return new ExpantaNum(8200000000000)},
            unlocked(){return hasChallenge('航天',13)},
            
        },
    },
    update(diff){
        if(hasUpgrade('航天',13)) player.航天.pointss = player.航天.pointss.add(ExpantaNum(1).mul(diff))
        }
})