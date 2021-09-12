addLayer("燃料", {
    name: "燃料", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "燃料", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        //part1
        unlocked: true,
		points: new ExpantaNum(0),
        total: new ExpantaNum(0)
    }},
    color: "#FF0000",
    requires: new ExpantaNum(2),
    resource: "可用燃料", // Name of prestige currency
    baseResource: "燃料点",
    baseAmount() {return player.points}, 
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new ExpantaNum(1)
        if (hasUpgrade('燃料', 11)) mult = mult.times(upgradeEffect('燃料', 11))
        if (hasUpgrade('航天', 12)) mult = mult.times(upgradeEffect('航天', 12))
        if (inChallenge('航天', 11)) mult = mult.div(2.5)
        if (hasChallenge('航天',12)) mult = mult.add(1).pow(buyableEffect('勘探',11))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new ExpantaNum(1)
    },
    row: 1, //Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    challenges: {
        11: {
            name: "油井问题",
            challengeDescription: "油井里的燃料快没了？怎么可能！这让我们的燃料点获取除以了2！",
            goalDescription:"获得600燃料点",
            rewardDescription:"借助备用油井，增加根据燃料点大幅增加燃料点获取。",
            rewardEffect(){
                var baseEff = player.points.add(1).mul(0.55).pow(0.477)
                return baseEff
            },
            canComplete: function() {return player.points.gte(600)},
            unlocked(){return hasUpgrade("燃料",13)},
        },
    },
    upgrades: {
        11: {
            description: "我们更换了燃料的工厂，让你的燃料点增加可用燃料获取数量。",
            cost(){return new ExpantaNum(5)},
            effect() {
                var baseEff = player.points.add(1).pow(0.225)
                if(hasUpgrade("燃料",15)) baseEff = baseEff.mul(upgradeEffect("燃料",15))
                if(hasUpgrade("航天",15)) baseEff = baseEff.mul(challengeEffect("燃料",11))
                if(inChallenge('航天',11)) baseEff = baseEff.div(baseEff)
                if(inChallenge('航天',13)) baseEff = baseEff.add(player.points.add(1).pow(250)).pow(1)
                if(hasChallenge('航天',13)) baseEff = baseEff.add(player.points.add(1).pow(0.25)).pow(1)
                baseEff = softcap(baseEff,new ExpantaNum(1e10),0.1)
                return baseEff
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked(){return true},
        },
        12: {
        description: "来个花活，该升级与上个升级效果相反。",
        cost(){return new ExpantaNum(25)},
        effect() {
            var baseEff = player[this.layer].points.add(1).pow(0.225)
            if(hasUpgrade("燃料",15)) baseEff = baseEff.mul(upgradeEffect("燃料",15))
            if(hasUpgrade("航天",15)) baseEff = baseEff.mul(challengeEffect("燃料",11))
            if(inChallenge('航天',11)) baseEff = baseEff.div(baseEff)
            if(inChallenge('航天',13)) baseEff = baseEff.add(player.points.add(1).pow(250)).pow(1)
            if(hasChallenge('航天',13)) baseEff = baseEff.add(player.points.add(1).pow(0.25)).pow(1)
            baseEff = softcap(baseEff,new ExpantaNum(1e10),0.1)
            return baseEff
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return hasUpgrade("燃料",11)},
        },
        13: {
            description: "我听说你在寻求挑战，来吧，解锁挑战1。",
            cost(){return new ExpantaNum(125)},
            unlocked(){return hasUpgrade("燃料",12)},
        },
        14: {
        description: "来吧，现在这个是昂贵的升级了！让你的燃料点增幅燃料点！",
        cost(){return new ExpantaNum(62500)},
        effect() {
            var baseEff = player.points.add(1).pow(0.135)
            if(hasUpgrade("航天",15)) baseEff = baseEff.mul(challengeEffect("燃料",11))
            if(inChallenge('航天',13)) baseEff = baseEff.add(player.points.add(1),pow(250)).pow(1)
            if(hasChallenge('航天',13)) baseEff = baseEff.add(player.points.add(1).pow(0.25)).pow(1)
            baseEff = softcap(baseEff,new ExpantaNum(1e10),0.1)
            return baseEff
            },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return hasChallenge("燃料",11)},
        },
        15: {
        description: "最后一个强大的升级，这会让你的燃料点增幅升级11和升级12。",
        cost(){return new ExpantaNum(1625000)},
        effect() {
            var baseEff = player.points.add(1).pow(0.015)
            if(hasUpgrade("航天",15)) baseEff = baseEff.mul(challengeEffect("燃料",11))
            if(inChallenge('航天',11)) baseEff = baseEff.div(baseEff)
            if(inChallenge('航天',13)) baseEff = baseEff.add(player.points.add(1),pow(250)).pow(1)
            if(hasChallenge('航天',13)) baseEff = baseEff.add(player.points.add(1).pow(0.25)).pow(1)
            baseEff = softcap(baseEff,new ExpantaNum(1e10),0.1)
            return baseEff
                },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return hasChallenge("燃料",11)},
            },
    },
    doReset(layer){
        if(layer == "燃料") return
        var kp = []
        layerDataReset("燃料", kp)
        if(hasChallenge("航天",11)) player.燃料.upgrades = [11,12,13,15]
        if(hasUpgrade("航天",21)) player.燃料.upgrades = [14]
    },
    //inportant!!!
    update(diff){
    }
})
