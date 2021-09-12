let modInfo = {
	name: "The space tree",
	id: "太空树的存档",
	author: "比特棋子",
	pointsName: "燃料点",
	discordName: "我没有discord",
	discordLink: "我没有discord",
	initialStartPoints: new ExpantaNum (0), // Used for hard resets and new players
	
	offlineLimit: 10,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.2",
	name: "阿尔法测试",
}

let changelog = `<h1>更新日志:</h1><br>

	<h3>v0.1</h3><br>
		- 完成燃料层级.<br>
		- 开坑航天器层级.`

let winText = `哇哦！你赢了！但真的只有这么简单吗？`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new ExpantaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) return new ExpantaNum(0)
	let gain = new ExpantaNum(1)
	if (hasUpgrade('航天', 13)) gain = gain.times(upgradeEffect('航天', 13))
	if (hasUpgrade('燃料', 12)) gain = gain.times(upgradeEffect('燃料', 12))
	if (hasUpgrade('燃料', 14)) gain = gain.times(upgradeEffect('燃料', 14))
	if (inChallenge('燃料', 11)) gain = gain.div(2)
	if (hasChallenge('燃料', 11)) gain = gain.times(challengeEffect('燃料', 11))
	if (hasUpgrade('航天', 11)) gain = gain.times(5)
	if (inChallenge('航天', 11)) gain = gain.div(5)
	if (hasChallenge('航天',12)) mult = mult.add(1).pow(buyableEffect('勘探',22))
	if (inChallenge('航天',13)) gain = gain.div(1000)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return false
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
//我知道你在看我的文件，如果我能帮到你，我很高兴。
//-------------------------
//|][[[[[[[[[[[[           ]]]]]]]]]]]]]]]]
//|                                       ]
//|[[[[[[[[[[[[[           ]]]]]]]]]]]]]]]]
//|                        ]
//|                        ]
//|]]]]]]]]]]]]]           ]]]]]]]]]]]]]]]]           --------------比特棋子留
//The language of this tree is only Chinese,because I not quite English,french or anything.if you want to do a translation of this game,then act!I don't mind!--------------bitchess