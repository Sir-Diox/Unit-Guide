var unitData = {
    name: '',
    energyCost: '',
    metalCost: '',
    HP: 10,
    movementSpeed: 3,
    flyingSpeed: 10,
    description: '',
    canMove: '',
    canAttack: '',
    energyStorage: '',
    energyMake: '',
    metalMake: '',
    imgSrc: '',
    side: '',
    acceleration: '',
    summoningCode: '',
    sightRange: 0,
    dps: "",
    range: "",
    biggestRange: "", //biggest of few weapons
    dps: "",
    buildRange: "",
    canBuild: "",
    radarRange: "",
    jammerRange: "",
    isMineOrClawlingBomb: 0,
    explosionDamage:"",
    builder:"",
    isAntiAir1:"",
    isAntiAir2:"",
    isAntiAir3:"",
    isEco:false,
    minEnergyIncome:"",
    maxEnergyIncome:"",
    maxMetalCostForE:"",
    minMetalCostForE:"",
    ratioMin:"",
    ratioMax: "",
    reloadTime_w1: "",
    reloadTime_w2: "",
    reloadTime_w3: "",
    p1:"",
    p2:"",
    p3:"",
    p4: "",
    onlyDps: "",
    buildTime: "",
    //maxSlope :"",
    energyMake: "",
    energyUse: "",
    turnRate: "",
    cloakCost: "",
    energyStorage: "",
    metalStorage: ""
}

var keywords = ["Cloakable", "Stealth", "Amphibious", "Stun Immunity", "Upgradable", "Adjacency Bonus", "Stun Resistance", "Guided", "Radar Jammed", "Targeting", "Upgrades to Chaingun", "AA missiles", "Adj. Bonus"]

var ShineEffect = { //only for bars with 10/10
    ForDPS: "",
    ForDamagePerShot: "",
    ForHP :"",
    ForMS :"",
    ForFS :"", // flying speed
    ForRange :"",
    ForSightD :"",
    ForBuildSpeed :"",
    ForExplosionDamage: "",
    ForExplosionRange: "",
    ForMaxMetalCostForE: "",
    ForMinMetalCostForE: "",
    ForRadarRange: "",
    ForJammerRange:""
}

var boxShadowsStyleDps = ""; //only for bars with 10/10
var boxShadowsStyleDamagePerShot = "";
var boxShadowsStyleRange = "";
var boxShadowsStyleMovementSpeed = "";
var boxShadowsStyleFlyingSpeed = "";
var boxShadowsStyleHP = "";
var boxShadowsStylesightRange = "";
var boxShadowsStyleBuildSpeed = "";
var boxShadowsStyleBuildRange = "";
var boxShadowsStyleRadarRange = "";
var boxShadowsStyleJammerRange = "";
var boxShadowsStyleExplosionDamage = "";
var boxShadowsMinMetalCostForE = "";
var boxShadowsMaxMetalCostForE = "";
var boxShadowsStyleExplosionRange = "";
var x;
var y;
var screenWidth; //available user's screen width
var screenHeight; //available user's screen height, excluding toolbars etc.
var framePreviewHeight;
var previewPosition = {
    top: 0,
    left: 0
};

var unitTypeObj;

var barHP_SrcImg;
var movementSpeed_SrcImg;
var flyingSpeed_SrcImg;
var dps_SrcImg;
var damagePerShot_SrcImg;
var range_SrcImg;
var buildSpeed_SrcImg;
var explosionDamage_SrcImg;
var buildRange_SrcImg;
var sightRange_SrcImg;
var jammerRange_SrcImg;
var radarRange_SrcImg;
var explosionRange_SrcImg;
var maxMetalCostForE_SrcImg;
var minMetalCostForE_SrcImg;
var firstParameter = "";
var SecondParameter = "";
var thirdParameter="";
var fourthParameter="";
var fifthParameter="";
var sixthParameter="";
var rangeOfParameters ={
    dps : {
        h0: 20,
        h05: 30,
        h1: 60,
        h15: 90,
        h2: 105,
        h25: 120,
        h3: 150,
        h35: 200,
        h4: 240,
        h45: 300,
        h5: 400,
        h55: 600,
        h6: 800,
        h65: 1200,
        h7: 1500,
        h75: 1800,
        h8: 2100,
        h85: 2500,
        h9: 5000,
        h95: 5700,
        h10: 20000
    },
        damagePerShot: {
        h0: 20,
        h05: 30,
        h1: 60,
        h15: 90,
        h2: 120,
        h25: 180,
        h3: 250,
        h35: 320,
        h4: 400,
        h45: 500,
        h5: 650,
        h55: 790,
        h6: 850,
        h65: 990,
        h7: 1100,
        h75: 1400,
        h8: 1900,
        h85: 2500,
        h9: 3500,
        h95: 4500,
        h10: 100000
    },
    range : {
        h0: 120,
        h05: 160,
        h1: 180,
        h15: 220,
        h2: 250,
        h25: 280,
        h3: 310,
        h35: 420,
        h4: 500,
        h45: 570,
        h5: 650,
        h55: 750,
        h6: 850,
        h65: 970,
        h7: 1050,
        h75: 1200,
        h8: 1320,
        h85: 1500,
        h9: 1800,
        h95: 6000,
        h10: 20000
    },
    explosionRange: {
        h0: 20,
        h2: 128,
        h4: 256,
        h6: 320,
        h8: 480,
        h10: 720
    },
    HP : {
        h0: 8,
        h05: 200,
        h1: 384,
        h15: 525,
        h2: 856,
        h25: 1355,
        h3: 1988,
        h35: 2840,
        h4: 4060,
        h45: 4900,
        h5: 5985,
        h55: 10000,
        h6: 15000,
        h65: 20000,
        h7: 34000,
        h75: 80000,
        h8: 120000,
        h85: 150000,
        h9: 181000,
        h95: 200000,
        h10: 2000000
    },
    movementSpeed : {
        h0: 0,
        h05: 0.65,
        h1: 0.675,
        h15: 0.75,
        h2: 0.825,
        h25: 0.9,
        h3: 0.975,
        h35: 1.05,
        h4: 1.1,
        h45: 1.2,
        h5: 1.275,
        h55: 1.35,
        h6: 1.5,
        h65: 1.7,
        h7: 1.8,
        h75: 2,
        h8: 2.15,
        h85: 2.4,
        h9: 2.7,
        h95: 3,
        h10: 3.3
    },
    flyingSpeed : {
        h0: 4,
        h05: 4.8,
        h1: 5,
        h15: 6.3,
        h2: 6.5,
        h25: 0.9,
        h3: 6.75,
        h35: 7,
        h4: 7.2,
        h45: 7.5,
        h5: 9,
        h55: 9.2,
        h6: 9.5,
        h65: 9.7,
        h7: 10,
        h75: 10.5,
        h8: 11,
        h85: 11.25,
        h9: 12,
        h95: 13,
        h10: 14
    },
    sightRange : {
        h0: 64,
        h05: 96,
        h1: 128,
        h15: 192,
        h2: 224,
        h25: 256,
        h3: 288,
        h35: 320,
        h4: 352,
        h45: 384,
        h5: 448,
        h55: 480,
        h6: 512,
        h65: 576,
        h7: 672,
        h75: 768,
        h8: 896,
        h85: 1024,
        h9: 1344,
        h95: 1536,
        h10: 1792
    },
    buildSpeed : {
        h0: 0,
        h05: 30,
        h1: 60,
        h15: 90,
        h2: 120,
        h25: 150,
        h3: 180,
        h35: 210,
        h4: 240,
        h45: 270,
        h5: 300,
        h55: 360,
        h6: 390,
        h65: 420,
        h7: 450,
        h75: 480,
        h8: 510,
        h85: 570,
        h9: 630,
        h95: 720,
        h10: 1000
    },
        buildRange : {
        h0: 0,
        h05: 40,
        h1: 60,
        h2: 80,
        h3: 100,
        h4: 120,
        h5: 140,
        h6: 180,
        h7: 200,
        h8: 240,
        h9: 300,
        h10: 400
    },
    damageExplosion : {
        h2: 1200,
        h4: 2400,
        h6: 4800,
        h8: 9600,
        h10: 19200
    },
    energyMetalCostRatio : {
    h1: 9,
    h2: 7.2,
    h3: 6,
    h4: 5,
    h5: 4,
    h6: 3.5,
    h7: 2.8,
    h8: 2.3,
    h9: 1.9,
    h10: 1.6
    },
    radarRange: {
        h0: 400,
        h05: 700,
        h1: 1000,
        h15: 1350,
        h2: 1600,
        h25: 1760,
        h3: 2000,
        h35: 2500,
        h4: 2800,
        h45: 3200,
        h5: 4000,
        h55: 4500,
        h6: 5000,
        h65: 5500,
        h7: 6000,
        h75: 6400,
        h8: 6600,
        h85: 6800,
        h9: 6990,
        h95: 7100,
        h10: 10000
    },
    jammerRange: {      
            h0: 200,
            h05: 250,
            h1: 300,
            h15: 400,
            h2: 450,
            h25: 500,
            h3: 600,
            h35: 650,
            h4: 700,
            h45: 750,
            h5: 800,
            h55: 850,
            h6: 900,
            h65: 1000,
            h7: 1100,
            h75: 1150,
            h8: 1200,
            h85: 1300,
            h9: 1400,
            h95: 1600,
            h10: 10000
        }
}

function setParameterBars(){
    // for HP
    if(unitData.HP <= rangeOfParameters.HP.h0){
        barHP_SrcImg="parameter-bars/0.svg";
    }
    else if(unitData.HP <= rangeOfParameters.HP.h05){
        barHP_SrcImg="parameter-bars/0.5.svg";
    }
    else if(unitData.HP <= rangeOfParameters.HP.h1){
        barHP_SrcImg="parameter-bars/1.svg";
    }
    else if(unitData.HP <= rangeOfParameters.HP.h15){
        barHP_SrcImg="parameter-bars/1.5.svg";
    }
    else if(unitData.HP <= rangeOfParameters.HP.h2){
        barHP_SrcImg="parameter-bars/2.svg";
    }
    else if(unitData.HP <= rangeOfParameters.HP.h25){
        barHP_SrcImg="parameter-bars/2.5.svg";
    }
    else if(unitData.HP <= rangeOfParameters.HP.h3){
        barHP_SrcImg="parameter-bars/3.svg";
    }
    else if(unitData.HP <= rangeOfParameters.HP.h35){
        barHP_SrcImg="parameter-bars/3.5.svg";
    }
    else if(unitData.HP <= rangeOfParameters.HP.h4){
        barHP_SrcImg="parameter-bars/4.svg";
    }
    else if(unitData.HP <= rangeOfParameters.HP.h45){
        barHP_SrcImg="parameter-bars/4.5.svg";
    }
    else if(unitData.HP <= rangeOfParameters.HP.h5){
        barHP_SrcImg="parameter-bars/5.svg";
    }
    else if(unitData.HP <= rangeOfParameters.HP.h55){
        barHP_SrcImg="parameter-bars/5.5.svg";
    }
    else if(unitData.HP <= rangeOfParameters.HP.h6){
        barHP_SrcImg="parameter-bars/6.svg";
    }
    else if(unitData.HP <= rangeOfParameters.HP.h65){
        barHP_SrcImg="parameter-bars/6.5.svg";
    }
    else if(unitData.HP <= rangeOfParameters.HP.h7){
        barHP_SrcImg="parameter-bars/7.svg";
    }
    else if(unitData.HP <= rangeOfParameters.HP.h75){
        barHP_SrcImg="parameter-bars/7.5.svg";
    }
    else if(unitData.HP <= rangeOfParameters.HP.h8){
        barHP_SrcImg="parameter-bars/8.svg";
    }
    else if(unitData.HP <= rangeOfParameters.HP.h85){
        barHP_SrcImg="parameter-bars/8.5.svg";
    }
    else if(unitData.HP <= rangeOfParameters.HP.h9){
        barHP_SrcImg="parameter-bars/9.svg";
    }
    else if(unitData.HP <= rangeOfParameters.HP.h95){
        barHP_SrcImg="parameter-bars/9.5.svg";
    }
    else if(unitData.HP <= rangeOfParameters.HP.h10){
        barHP_SrcImg="parameter-bars/10.svg";
        boxShadowsStyleHP = "box-shadow: 0px 0px 12px #5EE947;";
        ShineEffect.ForHP = "shine-effect";
    }
    
    // for DPS    
    if(unitData.dps =="Too random to show"){
        dps_SrcImg="parameter-bars/0.svg";
    }
    else if(unitData.overallDps <= rangeOfParameters.dps.h05){
        dps_SrcImg="parameter-bars/0.svg";
    }
    else if(unitData.overallDps <= rangeOfParameters.dps.h05){
        dps_SrcImg="parameter-bars/0.5.svg";
    }
    else if(unitData.overallDps <= rangeOfParameters.dps.h1){
        dps_SrcImg="parameter-bars/1.svg";
    }
    else if(unitData.overallDps <= rangeOfParameters.dps.h15){
        dps_SrcImg="parameter-bars/1.5.svg";
    }
    else if(unitData.overallDps <= rangeOfParameters.dps.h2){
        dps_SrcImg="parameter-bars/2.svg";
    }
    else if(unitData.overallDps <= rangeOfParameters.dps.h25){
        dps_SrcImg="parameter-bars/2.5.svg";
    }
    else if(unitData.overallDps <= rangeOfParameters.dps.h3){
        dps_SrcImg="parameter-bars/3.svg";
    }
    else if(unitData.overallDps <= rangeOfParameters.dps.h35){
        dps_SrcImg="parameter-bars/3.5.svg";
    }
    else if(unitData.overallDps <= rangeOfParameters.dps.h4){
        dps_SrcImg="parameter-bars/4.svg";
    }
    else if(unitData.overallDps <= rangeOfParameters.dps.h45){
        dps_SrcImg="parameter-bars/4.5.svg";
    }
    else if(unitData.overallDps <= rangeOfParameters.dps.h5){
        dps_SrcImg="parameter-bars/5.svg";
    }
    else if(unitData.overallDps <= rangeOfParameters.dps.h55){
        dps_SrcImg="parameter-bars/5.5.svg";
    }
    else if(unitData.overallDps <= rangeOfParameters.dps.h6){
        dps_SrcImg="parameter-bars/6.svg";
    }
    else if(unitData.overallDps <= rangeOfParameters.dps.h65){
        dps_SrcImg="parameter-bars/6.5.svg";
    }
    else if(unitData.overallDps <= rangeOfParameters.dps.h7){
        dps_SrcImg="parameter-bars/7.svg";
    }
    else if(unitData.overallDps <= rangeOfParameters.dps.h75){
        dps_SrcImg="parameter-bars/7.5.svg";
    }
    else if(unitData.overallDps <= rangeOfParameters.dps.h8){
        dps_SrcImg="parameter-bars/8.svg";
    }
    else if(unitData.overallDps <= rangeOfParameters.dps.h85){
        dps_SrcImg="parameter-bars/8.5.svg";
    }
    else if(unitData.overallDps <= rangeOfParameters.dps.h9){
        dps_SrcImg="parameter-bars/9.svg";
    }
    else if(unitData.overallDps <= rangeOfParameters.dps.h95){
        dps_SrcImg="parameter-bars/9.5.svg";
    }
    else if(unitData.overallDps <= rangeOfParameters.dps.h10){
        dps_SrcImg="parameter-bars/10.svg";
        boxShadowsStyleDps = "box-shadow: 0px 0px 12px #5EE947;";
        ShineEffect.ForDPS = "shine-effect";
    }

            // for range
    if(unitData.biggestRange <= rangeOfParameters.range.h0){
        range_SrcImg="parameter-bars/0.svg";
    }
    else if(unitData.biggestRange <= rangeOfParameters.range.h05){
        range_SrcImg="parameter-bars/0.5.svg";
    }
    else if(unitData.biggestRange <= rangeOfParameters.range.h1){
        range_SrcImg="parameter-bars/1.svg";
    }
    else if(unitData.biggestRange <= rangeOfParameters.range.h15){
        range_SrcImg="parameter-bars/1.5.svg";
    }
    else if(unitData.biggestRange <= rangeOfParameters.range.h2){
        range_SrcImg="parameter-bars/2.svg";
    }
    else if(unitData.biggestRange <= rangeOfParameters.range.h25){
        range_SrcImg="parameter-bars/2.5.svg";
    }
    else if(unitData.biggestRange <= rangeOfParameters.range.h3){
        range_SrcImg="parameter-bars/3.svg";
    }
    else if(unitData.biggestRange <= rangeOfParameters.range.h35){
        range_SrcImg="parameter-bars/3.5.svg";
    }
    else if(unitData.biggestRange <= rangeOfParameters.range.h4){
        range_SrcImg="parameter-bars/4.svg";
    }
    else if(unitData.biggestRange <= rangeOfParameters.range.h45){
        range_SrcImg="parameter-bars/4.5.svg";
    }
    else if(unitData.biggestRange <= rangeOfParameters.range.h5){
        range_SrcImg="parameter-bars/5.svg";
    }
    else if(unitData.biggestRange <= rangeOfParameters.range.h55){
        range_SrcImg="parameter-bars/5.5.svg";
    }
    else if(unitData.biggestRange <= rangeOfParameters.range.h6){
        range_SrcImg="parameter-bars/6.svg";
    }
    else if(unitData.biggestRange <= rangeOfParameters.range.h65){
        range_SrcImg="parameter-bars/6.5.svg";
    }
    else if(unitData.biggestRange <= rangeOfParameters.range.h7){
        range_SrcImg="parameter-bars/7.svg";
    }
    else if(unitData.biggestRange <= rangeOfParameters.range.h75){
        range_SrcImg="parameter-bars/7.5.svg";
    }
    else if(unitData.biggestRange <= rangeOfParameters.range.h8){
        range_SrcImg="parameter-bars/8.svg";
    }
    else if(unitData.biggestRange <= rangeOfParameters.range.h85){
        range_SrcImg="parameter-bars/8.5.svg";
    }
    else if(unitData.biggestRange <= rangeOfParameters.range.h9){
        range_SrcImg="parameter-bars/9.svg";
    }
    else if(unitData.biggestRange <= rangeOfParameters.range.h95){
        range_SrcImg="parameter-bars/9.5.svg";
    }
    else if(unitData.biggestRange <= rangeOfParameters.range.h10){
        range_SrcImg="parameter-bars/10.svg";
        boxShadowsStyleRange = "box-shadow: 0px 0px 12px #5EE947;";
        ShineEffect.ForRange = "shine-effect";
    }

    // for explosion range
    if (unitData.biggestRange <= rangeOfParameters.explosionRange.h0) {
        explosionRange_SrcImg = "parameter-bars/0.svg";
    }
    else if (unitData.biggestRange <= rangeOfParameters.explosionRange.h2) {
        explosionRange_SrcImg = "parameter-bars/2.svg";
    }
    else if (unitData.biggestRange <= rangeOfParameters.explosionRange.h4) {
        explosionRange_SrcImg = "parameter-bars/4.svg";
    }
    else if (unitData.biggestRange <= rangeOfParameters.explosionRange.h6) {
        explosionRange_SrcImg = "parameter-bars/6.svg";
    }
    else if (unitData.biggestRange <= rangeOfParameters.explosionRange.h8) {
        explosionRange_SrcImg = "parameter-bars/8.svg";
    }
    else if (unitData.biggestRange <= rangeOfParameters.explosionRange.h10) {
        explosionRange_SrcImg = "parameter-bars/10.svg";
        boxShadowsStyleExplosionRange = "box-shadow: 0px 0px 12px #5EE947;";
        ShineEffect.ForExplosionRange = "shine-effect";
    }



    // for movement speed        
    if(unitData.movementSpeed <= rangeOfParameters.movementSpeed.h0){
        movementSpeed_SrcImg="parameter-bars/0.svg";
    }
    else if(unitData.movementSpeed <= rangeOfParameters.movementSpeed.h05){
        movementSpeed_SrcImg="parameter-bars/0.5.svg";
    }
    else if(unitData.movementSpeed <= rangeOfParameters.movementSpeed.h1){
        movementSpeed_SrcImg="parameter-bars/1.svg";
    }
    else if(unitData.movementSpeed <= rangeOfParameters.movementSpeed.h15){
        movementSpeed_SrcImg="parameter-bars/1.5.svg";
    }
    else if(unitData.movementSpeed <= rangeOfParameters.movementSpeed.h2){
        movementSpeed_SrcImg="parameter-bars/2.svg";
    }
    else if(unitData.movementSpeed <= rangeOfParameters.movementSpeed.h25){
        movementSpeed_SrcImg="parameter-bars/2.5.svg";
    }
    else if(unitData.movementSpeed <= rangeOfParameters.movementSpeed.h3){
        movementSpeed_SrcImg="parameter-bars/3.svg";
    }
    else if(unitData.movementSpeed <= rangeOfParameters.movementSpeed.h35){
        movementSpeed_SrcImg="parameter-bars/3.5.svg";
    }
    else if(unitData.movementSpeed <= rangeOfParameters.movementSpeed.h4){
        movementSpeed_SrcImg="parameter-bars/4.svg";
    }
    else if(unitData.movementSpeed <= rangeOfParameters.movementSpeed.h45){
        movementSpeed_SrcImg="parameter-bars/4.5.svg";
    }
    else if(unitData.movementSpeed <= rangeOfParameters.movementSpeed.h5){
        movementSpeed_SrcImg="parameter-bars/5.svg";
    }
    else if(unitData.movementSpeed <= rangeOfParameters.movementSpeed.h55){
        movementSpeed_SrcImg="parameter-bars/5.5.svg";
    }
    else if(unitData.movementSpeed <= rangeOfParameters.movementSpeed.h6){
        movementSpeed_SrcImg="parameter-bars/6.svg";
    }
    else if(unitData.movementSpeed <= rangeOfParameters.movementSpeed.h65){
        movementSpeed_SrcImg="parameter-bars/6.5.svg";
    }
    else if(unitData.movementSpeed <= rangeOfParameters.movementSpeed.h7){
        movementSpeed_SrcImg="parameter-bars/7.svg";
    }
    else if(unitData.movementSpeed <= rangeOfParameters.movementSpeed.h75){
        movementSpeed_SrcImg="parameter-bars/7.5.svg";
    }
    else if(unitData.movementSpeed <= rangeOfParameters.movementSpeed.h8){
        movementSpeed_SrcImg="parameter-bars/8.svg";
    }
    else if(unitData.movementSpeed <= rangeOfParameters.movementSpeed.h85){
        movementSpeed_SrcImg="parameter-bars/8.5.svg";
    }
    else if(unitData.movementSpeed <= rangeOfParameters.movementSpeed.h9){
        movementSpeed_SrcImg="parameter-bars/9.svg";
    }
    else if(unitData.movementSpeed <= rangeOfParameters.movementSpeed.h95){
        movementSpeed_SrcImg="parameter-bars/9.5.svg";
    }
    else if(unitData.movementSpeed <= rangeOfParameters.movementSpeed.h10){
        movementSpeed_SrcImg="parameter-bars/10.svg";
        boxShadowsStyleMovementSpeed = "box-shadow: 0px 0px 12px #5EE947;";
        ShineEffect.ForMS = "shine-effect";
    }

    // for flying speed        
    if(unitData.flyingSpeed <= rangeOfParameters.flyingSpeed.h0){
        flyingSpeed_SrcImg="parameter-bars/0.svg";
    }
    else if(unitData.flyingSpeed <= rangeOfParameters.flyingSpeed.h05){
        flyingSpeed_SrcImg="parameter-bars/0.5.svg";
    }
    else if(unitData.flyingSpeed <= rangeOfParameters.flyingSpeed.h1){
        flyingSpeed_SrcImg="parameter-bars/1.svg";
    }
    else if(unitData.flyingSpeed <= rangeOfParameters.flyingSpeed.h15){
        flyingSpeed_SrcImg="parameter-bars/1.5.svg";
    }
    else if(unitData.flyingSpeed <= rangeOfParameters.flyingSpeed.h2){
        flyingSpeed_SrcImg="parameter-bars/2.svg";
    }
    else if(unitData.flyingSpeed <= rangeOfParameters.flyingSpeed.h25){
        flyingSpeed_SrcImg="parameter-bars/2.5.svg";
    }
    else if(unitData.flyingSpeed <= rangeOfParameters.flyingSpeed.h3){
        flyingSpeed_SrcImg="parameter-bars/3.svg";
    }
    else if(unitData.flyingSpeed <= rangeOfParameters.flyingSpeed.h35){
        flyingSpeed_SrcImg="parameter-bars/3.5.svg";
    }
    else if(unitData.flyingSpeed <= rangeOfParameters.flyingSpeed.h4){
        flyingSpeed_SrcImg="parameter-bars/4.svg";
    }
    else if(unitData.flyingSpeed <= rangeOfParameters.flyingSpeed.h45){
        flyingSpeed_SrcImg="parameter-bars/4.5.svg";
    }
    else if(unitData.flyingSpeed <= rangeOfParameters.flyingSpeed.h5){
        flyingSpeed_SrcImg="parameter-bars/5.svg";
    }
    else if(unitData.flyingSpeed <= rangeOfParameters.flyingSpeed.h55){
        flyingSpeed_SrcImg="parameter-bars/5.5.svg";
    }
    else if(unitData.flyingSpeed <= rangeOfParameters.flyingSpeed.h6){
        flyingSpeed_SrcImg="parameter-bars/6.svg";
    }
    else if(unitData.flyingSpeed <= rangeOfParameters.flyingSpeed.h65){
        flyingSpeed_SrcImg="parameter-bars/6.5.svg";
    }
    else if(unitData.flyingSpeed <= rangeOfParameters.flyingSpeed.h7){
        flyingSpeed_SrcImg="parameter-bars/7.svg";
    }
    else if(unitData.flyingSpeed <= rangeOfParameters.flyingSpeed.h75){
        flyingSpeed_SrcImg="parameter-bars/7.5.svg";
    }
    else if(unitData.flyingSpeed <= rangeOfParameters.flyingSpeed.h8){
        flyingSpeed_SrcImg="parameter-bars/8.svg";
    }
    else if(unitData.flyingSpeed <= rangeOfParameters.flyingSpeed.h85){
        flyingSpeed_SrcImg="parameter-bars/8.5.svg";
    }
    else if(unitData.flyingSpeed <= rangeOfParameters.flyingSpeed.h9){
        flyingSpeed_SrcImg="parameter-bars/9.svg";
    }
    else if(unitData.flyingSpeed <= rangeOfParameters.flyingSpeed.h95){
        flyingSpeed_SrcImg="parameter-bars/9.5.svg";
    }
    else if(unitData.flyingSpeed <= rangeOfParameters.flyingSpeed.h10){
        flyingSpeed_SrcImg="parameter-bars/10.svg";
        boxShadowsStyleFlyingSpeed = "box-shadow: 0px 0px 12px #5EE947;";
        ShineEffect.ForFS = "shine-effect";
    }

            // for sight distance
    if(unitData.sightRange <= rangeOfParameters.sightRange.h0){
        sightRange_SrcImg="parameter-bars/0.svg";
    }
    else if(unitData.sightRange <= rangeOfParameters.sightRange.h05){
        sightRange_SrcImg="parameter-bars/0.5.svg";
    }
    else if(unitData.sightRange <= rangeOfParameters.sightRange.h1){
        sightRange_SrcImg="parameter-bars/1.svg";
    }
    else if(unitData.sightRange <= rangeOfParameters.sightRange.h15){
        sightRange_SrcImg="parameter-bars/1.5.svg";
    }
    else if(unitData.sightRange <= rangeOfParameters.sightRange.h2){
        sightRange_SrcImg="parameter-bars/2.svg";
    }
    else if(unitData.sightRange <= rangeOfParameters.sightRange.h25){
        sightRange_SrcImg="parameter-bars/2.5.svg";
    }
    else if(unitData.sightRange <= rangeOfParameters.sightRange.h3){
        sightRange_SrcImg="parameter-bars/3.svg";
    }
    else if(unitData.sightRange <= rangeOfParameters.sightRange.h35){
        sightRange_SrcImg="parameter-bars/3.5.svg";
    }
    else if(unitData.sightRange <= rangeOfParameters.sightRange.h4){
        sightRange_SrcImg="parameter-bars/4.svg";
    }
    else if(unitData.sightRange <= rangeOfParameters.sightRange.h45){
        sightRange_SrcImg="parameter-bars/4.5.svg";
    }
    else if(unitData.sightRange <= rangeOfParameters.sightRange.h5){
        sightRange_SrcImg="parameter-bars/5.svg";
    }
    else if(unitData.sightRange <= rangeOfParameters.sightRange.h55){
        sightRange_SrcImg="parameter-bars/5.5.svg";
    }
    else if(unitData.sightRange <= rangeOfParameters.sightRange.h6){
        sightRange_SrcImg="parameter-bars/6.svg";
    }
    else if(unitData.sightRange <= rangeOfParameters.sightRange.h65){
        sightRange_SrcImg="parameter-bars/6.5.svg";
    }
    else if(unitData.sightRange <= rangeOfParameters.sightRange.h7){
        sightRange_SrcImg="parameter-bars/7.svg";
    }
    else if(unitData.sightRange <= rangeOfParameters.sightRange.h75){
        sightRange_SrcImg="parameter-bars/7.5.svg";
    }
    else if(unitData.sightRange <= rangeOfParameters.sightRange.h8){
        sightRange_SrcImg="parameter-bars/8.svg";
    }
    else if(unitData.sightRange <= rangeOfParameters.sightRange.h85){
        sightRange_SrcImg="parameter-bars/8.5.svg";
    }
    else if(unitData.sightRange <= rangeOfParameters.sightRange.h9){
        sightRange_SrcImg="parameter-bars/9.svg";
    }
    else if(unitData.sightRange <= rangeOfParameters.sightRange.h95){
        sightRange_SrcImg="parameter-bars/9.5.svg";
    }
    else if(unitData.sightRange <= rangeOfParameters.sightRange.h10){
        sightRange_SrcImg="parameter-bars/10.svg";
        boxShadowsStylesightRange = "box-shadow: 0px 0px 12px #5EE947;";
        ShineEffect.ForSightD = "shine-effect";
    }

    // for build speed
    if(unitData.buildSpeed <= rangeOfParameters.buildSpeed.h0){
        buildSpeed_SrcImg="parameter-bars/0.svg";
    }
    else if(unitData.buildSpeed <= rangeOfParameters.buildSpeed.h05){
        buildSpeed_SrcImg="parameter-bars/0.5.svg";
    }
    else if(unitData.buildSpeed <= rangeOfParameters.buildSpeed.h1){
        buildSpeed_SrcImg="parameter-bars/1.svg";
    }
    else if(unitData.buildSpeed <= rangeOfParameters.buildSpeed.h15){
        buildSpeed_SrcImg="parameter-bars/1.5.svg";
    }
    else if(unitData.buildSpeed <= rangeOfParameters.buildSpeed.h2){
        buildSpeed_SrcImg="parameter-bars/2.svg";
    }
    else if(unitData.buildSpeed <= rangeOfParameters.buildSpeed.h25){
        buildSpeed_SrcImg="parameter-bars/2.5.svg";
    }
    else if(unitData.buildSpeed <= rangeOfParameters.buildSpeed.h3){
        buildSpeed_SrcImg="parameter-bars/3.svg";
    }
    else if(unitData.buildSpeed <= rangeOfParameters.buildSpeed.h35){
        buildSpeed_SrcImg="parameter-bars/3.5.svg";
    }
    else if(unitData.buildSpeed <= rangeOfParameters.buildSpeed.h4){
        buildSpeed_SrcImg="parameter-bars/4.svg";
    }
    else if(unitData.buildSpeed <= rangeOfParameters.buildSpeed.h45){
        buildSpeed_SrcImg="parameter-bars/4.5.svg";
    }
    else if(unitData.buildSpeed <= rangeOfParameters.buildSpeed.h5){
        buildSpeed_SrcImg="parameter-bars/5.svg";
    }
    else if(unitData.buildSpeed <= rangeOfParameters.buildSpeed.h55){
        buildSpeed_SrcImg="parameter-bars/5.5.svg";
    }
    else if(unitData.buildSpeed <= rangeOfParameters.buildSpeed.h6){
        buildSpeed_SrcImg="parameter-bars/6.svg";
    }
    else if(unitData.buildSpeed <= rangeOfParameters.buildSpeed.h65){
        buildSpeed_SrcImg="parameter-bars/6.5.svg";
    }
    else if(unitData.buildSpeed <= rangeOfParameters.buildSpeed.h7){
        buildSpeed_SrcImg="parameter-bars/7.svg";
    }
    else if(unitData.buildSpeed <= rangeOfParameters.buildSpeed.h75){
        buildSpeed_SrcImg="parameter-bars/7.5.svg";
    }
    else if(unitData.buildSpeed <= rangeOfParameters.buildSpeed.h8){
        buildSpeed_SrcImg="parameter-bars/8.svg";
    }
    else if(unitData.buildSpeed <= rangeOfParameters.buildSpeed.h85){
        buildSpeed_SrcImg="parameter-bars/8.5.svg";
    }
    else if(unitData.buildSpeed <= rangeOfParameters.buildSpeed.h9){
        buildSpeed_SrcImg="parameter-bars/9.svg";
    }
    else if(unitData.buildSpeed <= rangeOfParameters.buildSpeed.h95){
        buildSpeed_SrcImg="parameter-bars/9.5.svg";
    }
    else if(unitData.buildSpeed <= rangeOfParameters.buildSpeed.h10){
        buildSpeed_SrcImg="parameter-bars/10.svg";
        boxShadowsStylesightRange = "box-shadow: 0px 0px 12px #5EE947;";
        ShineEffect.ForBuildSpeed = "shine-effect";
    }

    // for build range
    if(unitData.buildRange <= rangeOfParameters.buildRange.h0){
        buildRange_SrcImg="parameter-bars/0.svg";
    }
    else if(unitData.buildRange <= rangeOfParameters.buildRange.h05){
        buildRange_SrcImg="parameter-bars/0.5.svg";
    }
    else if(unitData.buildRange <= rangeOfParameters.buildRange.h1){
        buildRange_SrcImg="parameter-bars/1.svg";
    }
    else if(unitData.buildRange <= rangeOfParameters.buildRange.h2){
        buildRange_SrcImg="parameter-bars/2.svg";
    }
    else if(unitData.buildRange <= rangeOfParameters.buildRange.h3){
        buildRange_SrcImg="parameter-bars/3.svg";
    }
    else if(unitData.buildRange <= rangeOfParameters.buildRange.h4){
        buildRange_SrcImg="parameter-bars/4.svg";
    }
    else if(unitData.buildRange <= rangeOfParameters.buildRange.h5){
        buildRange_SrcImg="parameter-bars/5.svg";
    }
    else if(unitData.buildRange <= rangeOfParameters.buildRange.h6){
        buildRange_SrcImg="parameter-bars/6.svg";
    }
    else if(unitData.buildRange <= rangeOfParameters.buildRange.h7){
        buildRange_SrcImg="parameter-bars/7.svg";
    }
    else if(unitData.buildRange <= rangeOfParameters.buildRange.h8){
        buildRange_SrcImg="parameter-bars/8.svg";
    }
    else if(unitData.buildRange <= rangeOfParameters.buildRange.h9){
        buildRange_SrcImg="parameter-bars/9.svg";
    }
    else if(unitData.buildRange <= rangeOfParameters.buildRange.h10){
        buildRange_SrcImg="parameter-bars/10.svg";
        boxShadowsStyleBuildRange = "box-shadow: 0px 0px 12px #5EE947;";
        ShineEffect.ForBuildRange = "shine-effect";
    }

    // for Explosion Damage
    if(unitData.explosionDamage <= rangeOfParameters.damageExplosion.h2){
        explosionDamage_SrcImg="parameter-bars/2.svg";
    }
    else if(unitData.explosionDamage <= rangeOfParameters.damageExplosion.h4){
        explosionDamage_SrcImg="parameter-bars/4.svg";
    }
    else if(unitData.explosionDamage <= rangeOfParameters.damageExplosion.h6){
        explosionDamage_SrcImg="parameter-bars/6.svg";
    }
    else if(unitData.explosionDamage <= rangeOfParameters.damageExplosion.h8){
        explosionDamage_SrcImg="parameter-bars/8.svg";
    }
    else if(unitData.explosionDamage <= rangeOfParameters.damageExplosion.h10){
        explosionDamage_SrcImg="parameter-bars/10.svg";
        boxShadowsStyleExplosionDamage = "box-shadow: 0px 0px 12px #5EE947;";
        ShineEffect.ForExplosionDamage = "shine-effect";
    }

        // for MIN Energy income / metal cost RATIO
        if(unitData.minMetalCostForE >= rangeOfParameters.energyMetalCostRatio.h1){
            minMetalCostForE_SrcImg="parameter-bars/1.svg";
        }
        else if(unitData.minMetalCostForE >= rangeOfParameters.energyMetalCostRatio.h2){
            minMetalCostForE_SrcImg="parameter-bars/2.svg";
        }
        else if(unitData.minMetalCostForE >= rangeOfParameters.energyMetalCostRatio.h3){
            minMetalCostForE_SrcImg="parameter-bars/3.svg";
        }
        else if(unitData.minMetalCostForE >= rangeOfParameters.energyMetalCostRatio.h4){
            minMetalCostForE_SrcImg="parameter-bars/4.svg";
        }
        else if(unitData.minMetalCostForE >= rangeOfParameters.energyMetalCostRatio.h5){
            minMetalCostForE_SrcImg="parameter-bars/5.svg";
        }
        else if(unitData.minMetalCostForE >= rangeOfParameters.energyMetalCostRatio.h6){
            minMetalCostForE_SrcImg="parameter-bars/6.svg";
        }
        else if(unitData.minMetalCostForE >= rangeOfParameters.energyMetalCostRatio.h7){
            minMetalCostForE_SrcImg="parameter-bars/7.svg";
        }
        else if(unitData.minMetalCostForE >= rangeOfParameters.energyMetalCostRatio.h8){
            minMetalCostForE_SrcImg="parameter-bars/8.svg";
        }
        else if(unitData.minMetalCostForE >= rangeOfParameters.energyMetalCostRatio.h9){
            minMetalCostForE_SrcImg="parameter-bars/9.svg";
        }
        else if(unitData.minMetalCostForE >= rangeOfParameters.energyMetalCostRatio.h10){
            minMetalCostForE_SrcImg="parameter-bars/10.svg";
            boxShadowsMinMetalCostForE = "box-shadow: 0px 0px 12px #5EE947;";
            ShineEffect.ForMinMetalCostForE = "shine-effect";
        }


        // for MAX Energy income / metal cost RATIO
        if(unitData.maxMetalCostForE >= rangeOfParameters.energyMetalCostRatio.h1){
            maxMetalCostForE_SrcImg="parameter-bars/1.svg";
        }
        else if(unitData.maxMetalCostForE >= rangeOfParameters.energyMetalCostRatio.h2){
            maxMetalCostForE_SrcImg="parameter-bars/2.svg";
        }
        else if(unitData.maxMetalCostForE >= rangeOfParameters.energyMetalCostRatio.h3){
            maxMetalCostForE_SrcImg="parameter-bars/3.svg";
        }
        else if(unitData.maxMetalCostForE >= rangeOfParameters.energyMetalCostRatio.h4){
            maxMetalCostForE_SrcImg="parameter-bars/4.svg";
        }
        else if(unitData.maxMetalCostForE >= rangeOfParameters.energyMetalCostRatio.h5){
            maxMetalCostForE_SrcImg="parameter-bars/5.svg";
        }
        else if(unitData.maxMetalCostForE >= rangeOfParameters.energyMetalCostRatio.h6){
            maxMetalCostForE_SrcImg="parameter-bars/6.svg";
        }
        else if(unitData.maxMetalCostForE >= rangeOfParameters.energyMetalCostRatio.h7){
            maxMetalCostForE_SrcImg="parameter-bars/7.svg";
        }
        else if(unitData.maxMetalCostForE >= rangeOfParameters.energyMetalCostRatio.h8){
            maxMetalCostForE_SrcImg="parameter-bars/8.svg";
        }
        else if(unitData.maxMetalCostForE >= rangeOfParameters.energyMetalCostRatio.h9){
            maxMetalCostForE_SrcImg="parameter-bars/9.svg";
        }
        else if(unitData.maxMetalCostForE >= rangeOfParameters.energyMetalCostRatio.h10){
            maxMetalCostForE_SrcImg="parameter-bars/10.svg";
            boxShadowsMaxMetalCostForE = "box-shadow: 0px 0px 12px #5EE947;";
            ShineEffect.ForMaxMetalCostForE = "shine-effect";
    }

    //damage per shot
    if (unitData.explosionDamage <= rangeOfParameters.damagePerShot.h0) {
        damagePerShot_SrcImg = "parameter-bars/0.svg";
    }
    else if (unitData.explosionDamage <= rangeOfParameters.damagePerShot.h05) {
        damagePerShot_SrcImg = "parameter-bars/0.5.svg";
    }
    else if (unitData.explosionDamage <= rangeOfParameters.damagePerShot.h1) {
        damagePerShot_SrcImg = "parameter-bars/1.svg";
    }
    else if (unitData.explosionDamage <= rangeOfParameters.damagePerShot.h15) {
        damagePerShot_SrcImg = "parameter-bars/1.5.svg";
    }
    else if (unitData.explosionDamage <= rangeOfParameters.damagePerShot.h2) {
        damagePerShot_SrcImg = "parameter-bars/2.svg";
    }
    else if (unitData.explosionDamage <= rangeOfParameters.damagePerShot.h25) {
        damagePerShot_SrcImg = "parameter-bars/2.5.svg";
    }
    else if (unitData.explosionDamage <= rangeOfParameters.damagePerShot.h3) {
        damagePerShot_SrcImg = "parameter-bars/3.svg";
    }
    else if (unitData.explosionDamage <= rangeOfParameters.damagePerShot.h35) {
        damagePerShot_SrcImg = "parameter-bars/3.5.svg";
    }
    else if (unitData.explosionDamage <= rangeOfParameters.damagePerShot.h4) {
        damagePerShot_SrcImg = "parameter-bars/4.svg";
    }
    else if (unitData.explosionDamage <= rangeOfParameters.damagePerShot.h45) {
        damagePerShot_SrcImg = "parameter-bars/4.5.svg";
    }
    else if (unitData.explosionDamage <= rangeOfParameters.damagePerShot.h5) {
        damagePerShot_SrcImg = "parameter-bars/5.svg";
    }
    else if (unitData.explosionDamage <= rangeOfParameters.damagePerShot.h55) {
        damagePerShot_SrcImg = "parameter-bars/5.5.svg";
    }
    else if (unitData.explosionDamage <= rangeOfParameters.damagePerShot.h6) {
        damagePerShot_SrcImg = "parameter-bars/6.svg";
    }
    else if (unitData.explosionDamage <= rangeOfParameters.damagePerShot.h65) {
        damagePerShot_SrcImg = "parameter-bars/6.5.svg";
    }
    else if (unitData.explosionDamage <= rangeOfParameters.damagePerShot.h7) {
        damagePerShot_SrcImg = "parameter-bars/7.svg";
    }
    else if (unitData.explosionDamage <= rangeOfParameters.damagePerShot.h75) {
        damagePerShot_SrcImg = "parameter-bars/7.5.svg";
    }
    else if (unitData.explosionDamage <= rangeOfParameters.damagePerShot.h8) {
        damagePerShot_SrcImg = "parameter-bars/8.svg";
    }
    else if (unitData.explosionDamage <= rangeOfParameters.damagePerShot.h85) {
        damagePerShot_SrcImg = "parameter-bars/8.5.svg";
    }
    else if (unitData.explosionDamage <= rangeOfParameters.damagePerShot.h9) {
        damagePerShot_SrcImg = "parameter-bars/9.svg";
    }
    else if (unitData.explosionDamage <= rangeOfParameters.damagePerShot.h95) {
        damagePerShot_SrcImg = "parameter-bars/9.5.svg";
    }
    else if (unitData.explosionDamage <= rangeOfParameters.damagePerShot.h10) {
        damagePerShot_SrcImg = "parameter-bars/10.svg";
        boxShadowsStyleDamagePerShot = "box-shadow: 0px 0px 12px #5EE947;";
        ShineEffect.ForDamagePerShot = "shine-effect";
    }


    //radar range
    if (unitData.radarRange <= rangeOfParameters.radarRange.h0) {
        radarRange_SrcImg = "parameter-bars/0.svg";
    }
    else if (unitData.radarRange <= rangeOfParameters.radarRange.h05) {
        radarRange_SrcImg = "parameter-bars/0.5.svg";
    }
    else if (unitData.radarRange <= rangeOfParameters.radarRange.h1) {
        radarRange_SrcImg = "parameter-bars/1.svg";
    }
    else if (unitData.radarRange <= rangeOfParameters.radarRange.h15) {
        radarRange_SrcImg = "parameter-bars/1.5.svg";
    }
    else if (unitData.radarRange <= rangeOfParameters.radarRange.h2) {
        radarRange_SrcImg = "parameter-bars/2.svg";
    }
    else if (unitData.radarRange <= rangeOfParameters.radarRange.h25) {
        radarRange_SrcImg = "parameter-bars/2.5.svg";
    }
    else if (unitData.radarRange <= rangeOfParameters.radarRange.h3) {
        radarRange_SrcImg = "parameter-bars/3.svg";
    }
    else if (unitData.radarRange <= rangeOfParameters.radarRange.h35) {
        radarRange_SrcImg = "parameter-bars/3.5.svg";
    }
    else if (unitData.radarRange <= rangeOfParameters.radarRange.h4) {
        radarRange_SrcImg = "parameter-bars/4.svg";
    }
    else if (unitData.radarRange <= rangeOfParameters.radarRange.h45) {
        radarRange_SrcImg = "parameter-bars/4.5.svg";
    }
    else if (unitData.radarRange <= rangeOfParameters.radarRange.h5) {
        radarRange_SrcImg = "parameter-bars/5.svg";
    }
    else if (unitData.radarRange <= rangeOfParameters.radarRange.h55) {
        radarRange_SrcImg = "parameter-bars/5.5.svg";
    }
    else if (unitData.radarRange <= rangeOfParameters.radarRange.h6) {
        radarRange_SrcImg = "parameter-bars/6.svg";
    }
    else if (unitData.radarRange <= rangeOfParameters.radarRange.h65) {
        radarRange_SrcImg = "parameter-bars/6.5.svg";
    }
    else if (unitData.radarRange <= rangeOfParameters.radarRange.h7) {
        radarRange_SrcImg = "parameter-bars/7.svg";
    }
    else if (unitData.radarRange <= rangeOfParameters.radarRange.h75) {
        radarRange_SrcImg = "parameter-bars/7.5.svg";
    }
    else if (unitData.radarRange <= rangeOfParameters.radarRange.h8) {
        radarRange_SrcImg = "parameter-bars/8.svg";
    }
    else if (unitData.radarRange <= rangeOfParameters.radarRange.h85) {
        radarRange_SrcImg = "parameter-bars/8.5.svg";
    }
    else if (unitData.radarRange <= rangeOfParameters.radarRange.h9) {
        radarRange_SrcImg = "parameter-bars/9.svg";
    }
    else if (unitData.radarRange <= rangeOfParameters.radarRange.h95) {
        radarRange_SrcImg = "parameter-bars/9.5.svg";
    }
    else if (unitData.radarRange <= rangeOfParameters.radarRange.h10) {
        radarRange_SrcImg = "parameter-bars/10.svg";
        boxShadowsStyleRadarRange = "box-shadow: 0px 0px 12px #5EE947;";
        ShineEffect.ForRadarRange = "shine-effect";
    }

    //jammer range
    if (unitData.jammerRange <= rangeOfParameters.jammerRange.h0) {
        jammerRange_SrcImg = "parameter-bars/0.svg";
    }
    else if (unitData.jammerRange <= rangeOfParameters.jammerRange.h05) {
        jammerRange_SrcImg = "parameter-bars/0.5.svg";
    }
    else if (unitData.jammerRange <= rangeOfParameters.jammerRange.h1) {
        jammerRange_SrcImg = "parameter-bars/1.svg";
    }
    else if (unitData.jammerRange <= rangeOfParameters.jammerRange.h15) {
        jammerRange_SrcImg = "parameter-bars/1.5.svg";
    }
    else if (unitData.jammerRange <= rangeOfParameters.jammerRange.h2) {
        jammerRange_SrcImg = "parameter-bars/2.svg";
    }
    else if (unitData.jammerRange <= rangeOfParameters.jammerRange.h25) {
        jammerRange_SrcImg = "parameter-bars/2.5.svg";
    }
    else if (unitData.jammerRange <= rangeOfParameters.jammerRange.h3) {
        jammerRange_SrcImg = "parameter-bars/3.svg";
    }
    else if (unitData.jammerRange <= rangeOfParameters.jammerRange.h35) {
        jammerRange_SrcImg = "parameter-bars/3.5.svg";
    }
    else if (unitData.jammerRange <= rangeOfParameters.jammerRange.h4) {
        jammerRange_SrcImg = "parameter-bars/4.svg";
    }
    else if (unitData.jammerRange <= rangeOfParameters.jammerRange.h45) {
        jammerRange_SrcImg = "parameter-bars/4.5.svg";
    }
    else if (unitData.jammerRange <= rangeOfParameters.jammerRange.h5) {
        jammerRange_SrcImg = "parameter-bars/5.svg";
    }
    else if (unitData.jammerRange <= rangeOfParameters.jammerRange.h55) {
        jammerRange_SrcImg = "parameter-bars/5.5.svg";
    }
    else if (unitData.jammerRange <= rangeOfParameters.jammerRange.h6) {
        jammerRange_SrcImg = "parameter-bars/6.svg";
    }
    else if (unitData.jammerRange <= rangeOfParameters.jammerRange.h65) {
        jammerRange_SrcImg = "parameter-bars/6.5.svg";
    }
    else if (unitData.jammerRange <= rangeOfParameters.jammerRange.h7) {
        jammerRange_SrcImg = "parameter-bars/7.svg";
    }
    else if (unitData.jammerRange <= rangeOfParameters.jammerRange.h75) {
        jammerRange_SrcImg = "parameter-bars/7.5.svg";
    }
    else if (unitData.jammerRange <= rangeOfParameters.jammerRange.h8) {
        jammerRange_SrcImg = "parameter-bars/8.svg";
    }
    else if (unitData.jammerRange <= rangeOfParameters.jammerRange.h85) {
        jammerRange_SrcImg = "parameter-bars/8.5.svg";
    }
    else if (unitData.jammerRange <= rangeOfParameters.jammerRange.h9) {
        jammerRange_SrcImg = "parameter-bars/9.svg";
    }
    else if (unitData.jammerRange <= rangeOfParameters.jammerRange.h95) {
        jammerRange_SrcImg = "parameter-bars/9.5.svg";
    }
    else if (unitData.jammerRange <= rangeOfParameters.jammerRange.h10) {
        jammerRange_SrcImg = "parameter-bars/10.svg";
        boxShadowsStyleJammerRange = "box-shadow: 0px 0px 12px #5EE947;";
        ShineEffect.ForJammerRange = "shine-effect";
    }
}