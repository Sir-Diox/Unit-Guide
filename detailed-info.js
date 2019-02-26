var previousUnitsListHTML = [];
var previousUnitsListNames = [];
var template = "";
var upgradeTemplate = "";
var generalInfoTemplate = "";

var popoverAsTooltipSettings = {
    placement: 'right',
    html: true,
    container: 'body',
    trigger: 'hover',
    selector: '[data-toggle="popover"]',
    delay: { "show": 0, "hide": 0 },
    boundary: 'viewport',
    fallbackPlacement: 'flip'
}
$('body').on('mouseover', '.parameter-name, .summoning-code', function () {
    $('.tooltip-dotted').popover(popoverAsTooltipSettings);
});
var weapons = {
    w1: "",
    w2: "",
    w3: "",
    w1_r: "",
    w2_r: "",
    w3_r: "",
    w1_rt: "",
    w2_rt: "",
    w3_rt: "",
    w1_dps: "",
    w2_dps: "",
    w3_dps: ""
};

var upgradeName;
var upgradeData = {
    name: "",
    metalCost: "",
    energyCost: "",
    description: ""
}

$('body').on('click', '.unit-box, .u-name, .search-input-row, .row-result', function () {
    $(".navbar").css("right", "17px");
    if ($(this).hasClass("u-name")) {
        var obj = $(this).parent().parent().children().eq(0)
    }
    else {
        var obj = $(this);
    }
    if (previousUnitsListHTML.length == 0) {
        $("#prev-unit").parent().hide();
    }
    else {
        $("#prev-unit").parent().show();
    }
    $('[data-toggle="popover"]').popover('hide');
    template = "";
    $('#detailed-unit-info-1').modal('show');
    var attributes = $(obj).prop("attributes");
    var ctr = 0;

    var unitName = $(obj).attr("uname");
    unitData.name = unitName;
    var unitSide = $(obj).attr("side");
    unitData.imgSrc = $(obj).attr("style");
    unitImg = $(obj).attr("img");
    if (unitImg != undefined) {
        unitData.imgSrc = unitImg;
    }
    var buildingsList = [];
    for (i = 0; i < csvObj.length; i++) {
        if (ctr < 1) {
            if (csvObj[i].Name === unitName && csvObj[i].SIDE.toLowerCase() === unitSide) {
                ctr++;

                unitData.energyCost = csvObj[i].BuildCostEnergy;
                unitData.metalCost = csvObj[i].BuildCostMetal;
                unitData.name = csvObj[i].Name;
                unitData.HP = csvObj[i].MaxDamage;
                unitData.movementSpeed = csvObj[i].MaxVelocity;
                unitData.flyingSpeed = unitData.movementSpeed;
                unitData.description = csvObj[i].Description;
                unitData.canMove = csvObj[i].canmove;
                unitData.canAttack = csvObj[i].canattack;
                unitData.energyStorage = csvObj[i].energystorage;
                unitData.side = $(obj).attr("side");
                unitData.acceleration = csvObj[i].Acceleration;
                unitData.summoningCode = csvObj[i].Objectname.toLowerCase();
                unitData.sightRange = csvObj[i].sightRange;
                unitData.buildSpeed = csvObj[i].WorkerTime;
                unitData.canBuild = csvObj[i].CanBuild;
                unitData.builtBy = csvObj[i].BuiltBy;

                $(".modal-title").text(unitName);
                $(".unit-desc").text(unitData.description);
                $(".detailed-info-wrapper").html("");

                unitData.radarRange = csvObj[i].radarRange;
                unitData.jammerRange = csvObj[i].radarRangeJam;
                unitData.builder = csvObj[i].Builder;
                unitData.buildRange = csvObj[i].Builddistance;
                unitData.minMetalCostForE = "";
                unitData.maxMetalCostForE = "";
                unitData.isAntiAir1 = $(obj).attr("w1-AA");
                unitData.isAntiAir2 = $(obj).attr("w2-AA");
                unitData.isAntiAir3 = $(obj).attr("w3-AA");
                unitData.isMineOrClawlingBomb = csvObj[i].kamikaze;
                weapons.w1_rt = $(obj).attr("w1-rt");
                //unitData.explosionDamage = $(obj).attr("w1");
                unitData.onlyDps = $(obj).attr("only-dps");
                unitData.p1 = $(obj).attr("p1");

                // additional info
                unitData.buildTime = csvObj[i].BuildTime;
                unitData.maxSlope = csvObj[i].MaxSlope;
                unitData.energyMake = csvObj[i].EnergyMake;
                unitData.energyUse = csvObj[i].EnergyUse;
                unitData.turnRate = csvObj[i].TurnRate;
                unitData.cloakCost = csvObj[i].CloakCost;
                unitData.energyStorage = csvObj[i].EnergyStorage;
                unitData.metalStorage = csvObj[i].MetalStorage;
                // additional info


                if ($(obj).attr("type") == "eco") {
                    unitData.isEco = true;

                    if ($(obj).attr("e-min") != undefined) {
                        unitData.minEnergyIncome = $(obj).attr("e-min");
                        unitData.maxEnergyIncome = $(obj).attr("e-max");
                        unitData.minMetalCostForE = parseFloat((unitData.metalCost / unitData.minEnergyIncome).toFixed(2));
                        unitData.ratioMin = "1 &thinsp; : &thinsp; " + unitData.minMetalCostForE;
                        secondParameter = "E income / M cost ratio<sup>1</sup>:"

                        if (unitData.maxEnergyIncome != undefined) {
                            unitData.maxMetalCostForE = parseFloat((unitData.metalCost / unitData.maxEnergyIncome).toFixed(2));
                            unitData.ratioMax = "1 &thinsp; : &thinsp; " + unitData.maxMetalCostForE;
                            thirdParameter = "E income / M cost ratio<sup>1</sup>:"
                        }
                    }
                    unitData.p1 = $(obj).attr("p1");
                    unitData.p2 = $(obj).attr("p2");
                    unitData.p3 = $(obj).attr("p3");
                    unitData.p4 = $(obj).attr("p4");
                    unitData.p1 = (unitData.p1 != undefined) ? unitData.p1 : "";
                    unitData.p2 = (unitData.p2 != undefined) ? unitData.p2 : "";
                    unitData.p3 = (unitData.p3 != undefined) ? unitData.p3 : "";
                    unitData.p4 = (unitData.p4 != undefined) ? unitData.p4 : "";
                }
                if ($(obj).attr("w2") != undefined) {
                    resetParameterBars();
                    countDpsAndRangeAndShotDmg(obj); // this overrides countDpsAndRange() from preview.
                    setParameterBarsForManyWeapons();
                    weapons.w1 = $(obj).attr("w1");
                    weapons.w2 = $(obj).attr("w2");
                    weapons.w3 = $(obj).attr("w3");
                    weapons.w2_rt = $(obj).attr("w2-rt");
                    weapons.w3_rt = $(obj).attr("w3-rt");
                    weapons.w1_r = $(obj).attr("w1-r");
                    weapons.w2_r = $(obj).attr("w2-r");
                    weapons.w3_r = $(obj).attr("w3-r");

                }
                unitTypeObj = checkUnitType();

                if (unitTypeObj.isBuilding) {
                }
                else if (!isNaN(csvObj[i].DamageModifier)) {
                    unitData.HP = csvObj[i].MaxDamage / csvObj[i].DamageModifier;
                }



                if (obj.attr("upgrade") != undefined) {
                    upgradeData.name = "r";
                }
                setLabelParametersAndValues(checkUnitType());

                //setParameterBars();
                fillGeneralInfoTemplate();
                ChangeColorOfKeywords();

                if (weapons.w3 != "") {
                    fillHtmlTemplateFor3();
                    // sprawdz czy usuwa weapons data po wyjsciu i czy nie powtarza sie w innych unitach
                }
                else if (weapons.w2 != "") {
                    fillHtmlTemplateFor2();
                }
                else {
                    fillHtmlTemplate();
                }

                //zerowanie
                if ($(obj).attr("w2") != undefined) {
                    weapons.w1 = "";
                    weapons.w2 = "";
                    weapons.w3 = "";
                    weapons.w1_rt = "";
                    weapons.w2_rt = "";
                    weapons.w3_rt = "";
                    weapons.w1_r = "";
                    weapons.w2_r = "";
                    weapons.w3_r = "";
                }

                $(".detailed-info-wrapper").append(template);

                //has upgrade?
                if (obj.attr("upgrade") != undefined) {
                    upgradeName = obj.attr("upgrade");

                    for (i = 0; i < csvObj.length; i++) {
                        if (csvObj[i].Objectname === upgradeName) {
                            upgradeData.name = csvObj[i].Name;
                            upgradeData.metalCost = csvObj[i].BuildCostMetal;
                            upgradeData.energyCost = csvObj[i].BuildCostEnergy;
                            upgradeData.description = csvObj[i].Description;
                            upgradeData.imgSrc = csvObj[i].Objectname.replace("_", "-");
                        }
                    }
                    fillUpgradeTemplate();               
                    $("#detailed-unit-info-1 .unit-basic-info-upgr").append(upgradeTemplate);
                    upgradeData.name = "";
                }

                if (unitData.canBuild != "" && obj.attr("upgrade") == undefined) { // what can build
                    generateCanBuildList();
                }
                else {
                    $("#nav-what-can-build-tab").parent().remove();
                }

                if (unitData.builtBy != "") { // built by
                    generateBuiltByList();
                }



                if (previousUnitsListHTML.length >= 10) {
                }
                else {
                    previousUnitsListNames.push($(obj).attr("uname"));
                    previousUnitsListHTML.push($("#detailed-unit-info-1").html());
                }

            }
        }
    }
    //var filledTemplate = $("#detailed-unit-info-1 .modal-content").html();
    //                            var opened = window.open("","_self"); // lepiej u¿yæ chyba nowego okna i potem je zamkn¹æ u¿ywaj¹c strza³ki wstecz lub X
    //                        opened.document.write(`<html><head>     <link rel="stylesheet" href="styles.css"     <link href="https://fonts.googleapis.com/css?family=Teko:400,500,600,700" rel="stylesheet"> <link href="https://fonts.googleapis.com/css?family=Exo+2:300,400,600,700" rel="stylesheet">     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">>><title>MyTitle</title></head><body><a class="home-page-link" href="" title="Back to the top of the page">
    //                    <div class="unit-guide-logo teko-47">TA: ESC <span style="color: #DEA73C;">Unit Guide</span></div>
    //                    <!--<div class="by-dioxide">by <span style="font-weight:600">Dioxide</span></div>-->
    //                </a>${filledTemplate}</body></html>`);
});





function fillHtmlTemplate() {
    template =
        `
${upgradeData.name != "" ? `
        <div class="row unit-basic-info-upgr" style="padding: 13px 13px 9px 13px; margin:0 0 0 0;">
        <div class="col col-lg-2 unit-image-box" style="">
`: `
    <div class="unit-basic-info row">
    <div class="col col-lg-4 unit-image-box">`
        }
            <div class="unit-box-in-preview" style="${unitData.imgSrc}"></div>
        </div>


${upgradeData.name != "" ? `
<div class="col col-lg-4" style="padding-left: 12px;">
`: `
<div class="col col-lg-8" style="padding-left: 12px;">
        `}

            <div class="res-cost-row"><div class="energy-cost-bar exo2-16">Energy cost</div><span class="energy-cost-digit exo2-16">${setSpacesInBigNumbers(unitData.energyCost)}</span></div>
            <div class="res-cost-row" style="margin-bottom:3px;"><div class="metal-cost-bar exo2-16">Metal cost</div><span class="metal-cost-digit exo2-16">${setSpacesInBigNumbers(unitData.metalCost)} </span></div>
            <div class="summoning-code exo2-16" data-toggle="popover" data-placement="right" data-content="<div class='tooltip-content'><span class='tooltip-title'>Summoning code</span>You can type this code in game to summon <span style='font-weight:600'>${unitData.name}</span>. Just press Enter and type: <span style='color: #DEA73C; font-weight:500'>+${unitData.summoningCode}</span>. Then you can press Insert key to summon more.</br> It always works in single player. If you want to summon a unit in multiplayer, you have to switch <b>Cheat codes</b> (in game's lobby) to <b>Allowed</b> before starting a game. This is very handy when you want to test units. </br></br><p style='font-weight:600'>Useful codes:</p><ul><li><span style='color: #DEA73C; font-weight:500'>+los</span> - infinite view.</li><li><span style='color: #DEA73C; font-weight:500'>+corcheat</span> - almost infinite resources.</li> <li><span style='color: #DEA73C; font-weight:500'>+corkrog 1</span> - summons a Krogoth for another player (numbers from 1 to 9 are other players).</li><li><span style='color: #DEA73C; font-weight:500'>+showranges</span> - type it, then select a unit and hold Shift key to see many types of ranges.</li></ul> </div>"><span class="tooltip-dotted">Summoning</span> <span class="tooltip-dotted">code</span></div><span class="summoning-code-text exo2-16">+${unitData.summoningCode}</span>
        </div>

    </div>


        <ul class="nav nav-tabs justify-content-center" id="unit-tabs" role="tablist">
<li>
            <a class="nav-item nav-link active" id="nav-statistics-tab" data-toggle="tab" href="#nav-statistics" role="tab" aria-controls="nav-statistics" aria-selected="true">Statistics</a>
          </li>
          <li class="nav-item">
                <a class="nav-item nav-link" id="nav-tips-tab" data-toggle="tab" href="#nav-tips" role="tab" aria-controls="nav-tips" aria-selected="false">Tips & trivia</a>
          </li>
          <li class="nav-item">
                <a class="nav-item nav-link" id="manufacture-info-tab" data-toggle="tab" href="#nav-manufacture-info" role="tab" aria-controls="nav-manufacture-info" aria-selected="false">Manufacture</a>
          </li>
        </ul>

        <div class="tab-content" id="tab-content">
            <div class="tab-pane fade show active" id="nav-statistics" role="tabpanel" aria-labelledby="nav-statistics-tab"><div class="unit-statistics">


                            <div class="unit-basic-stats">

                                <div class="exo2-26 detailed-info-header" >Basic stats</div>
                                <div class="row" style="margin:0;">
                                    <div class="col col-lg-6 no-padding">

                                        <div class="parameter-name">${firstParameter}</div>
                                        <div class="parameter-name">${secondParameter}</div>
                                        <div class="parameter-name">${thirdParameter}</div>
                                        ${fourthParameter ? `
                                        <div class="parameter-name">${fourthParameter}</div>
                                           ` : ""}
                                           ${fifthParameter ? `
                                        <div class="parameter-name">${fifthParameter}</div>
                                           ` : ""}
                                           ${sixthParameter ? `
                                        <div class="parameter-name">${sixthParameter}</div>
                                           ` : ""}
                                        ${unitData.onlyDps == undefined && (unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther) ? `                
                                        <div class="parameter-name">Reload time: </div>
                                        ` : ""}
                                    </div>

                                    <div class="col col-lg-6 no-padding">                                          
                                            ${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther ? `                     
                                                <div class="parameter-bar-and-value ${ShineEffect.ForDPS}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleDps}"> </div>
                                                    <img src="${dps_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.dps)}</div>
                                                </div>

                                            ` : ""}
                                            ${unitTypeObj.isCons || unitTypeObj.isAirCons || unitTypeObj.isLab || unitTypeObj.isSemiCon ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForBuildSpeed}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleBuildSpeed}"> </div>
                                                    <img src="${buildSpeed_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${unitData.buildSpeed}</div>
                                                </div>
                                            ` : ""}
                                            ${unitTypeObj.isRadarUnit || unitTypeObj.isRadarBuilding || unitTypeObj.isRadarAndJammerAircraft || unitTypeObj.isRadarAndJammerBuilding || unitTypeObj.isRadarAndJammerUnit ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForRadarRange}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleRadarRange}"> </div>
                                                    <img src="${radarRange_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.radarRange)}</div>
                                                </div>
                                            ` : ""}
                                            ${unitTypeObj.isJammerAircraft || unitTypeObj.isJammerBuilding || unitTypeObj.isJammerUnit ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForJammerRange}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleJammerRange}"> </div>
                                                    <img src="${jammerRange_SrcImg}"  class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.jammerRange)}</div>
                                                </div>
                                            ` : ""}
                                            ${unitTypeObj.isMine || unitTypeObj.isClawlingBomb || unitTypeObj.isNuke ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForExplosionDamage}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleExplosionDamage}"></div>
                                                    <img src="${explosionDamage_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.explosionDamage)}</div>
                                                </div>
                                            ` : ""}
                                            ${unitTypeObj.isEco || unitTypeObj.isBuilding? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForHP}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleHP}"></div>
                                                    <img src="${barHP_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.HP)}</div>
                                                </div>
                                            ` : ""}


                                        ${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isBomber || unitTypeObj.isAirFigther ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForDamagePerShot}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleDamagePerShot}"></div>
                                                    <img src="${damagePerShot_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.explosionDamage)}</div>
                                            </div>
                                            ` : ""}
                                        ${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForRange}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleRange}"></div>
                                                    <img src="${range_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.range)}</div>
                                            </div>
                                            ` : ""}
                                        ${unitTypeObj.isMine || unitTypeObj.isClawlingBomb || unitTypeObj.isNuke ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForExplosionRange}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleExplosionRange}"></div>
                                                    <img src="${explosionRange_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.range)}</div>
                                            </div>
                                            ` : ""}
                                            ${unitTypeObj.isEco ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForMinMetalCostForE}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsMinMetalCostForE}"></div>
                                                    <img src="${minMetalCostForE_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${unitData.ratioMin}</div>
                                            </div>
                                            ` : ""}
                                             ${unitTypeObj.isCons || unitTypeObj.isAirCons || unitTypeObj.isSemiCon ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForBuildRange}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleBuildRange}"></div>
                                                    <img src="${buildRange_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.buildRange)}</div>
                                                </div>
                                            ` : ""}
                                            ${unitTypeObj.isRadarUnit || unitTypeObj.isBomber || unitTypeObj.isRadarBuilding ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForHP}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleHP}"> </div>
                                                    <img src="${barHP_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.HP)}</div>
                                                </div>
                                            ` : ""}
                                            ${unitTypeObj.isRadarAndJammerAircraft || unitTypeObj.isRadarAndJammerBuilding || unitTypeObj.isRadarAndJammerUnit ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForJammerRange}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleJammerRange}"> </div>
                                                    <img src="${jammerRange_SrcImg}"  class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.jammerRange)}</div>
                                                </div>
                                            ` : ""}
                                            ${unitTypeObj.isJammerAircraft || unitTypeObj.isJammerBuilding || unitTypeObj.isJammerUnit || unitTypeObj.isAirFigther || unitTypeObj.isLab ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForHP}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleHP}"></div>
                                                    <img src="${barHP_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.HP)}</div>
                                                </div>
                                            ` : ""}


                                             ${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isMine || unitTypeObj.isClawlingBomb ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForHP}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleHP}"></div>
                                                    <img src="${barHP_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.HP)}</div>
                                                </div>
                                            ` : ""}
                                            ${unitTypeObj.isEco && unitData.maxEnergyIncome != undefined ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForMaxMetalCostForE}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsMaxMetalCostForE}"></div>
                                                    <img src="${maxMetalCostForE_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${unitData.ratioMax}</div>
                                            </div>
                                            ` : ""}
                                            ${unitTypeObj.isCons || unitTypeObj.isAirCons || unitTypeObj.isSemiCon || unitTypeObj.isNuke ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForHP}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleHP}"></div>
                                                    <img src="${barHP_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.HP)}</div>
                                                </div>
                                            ` : ""}
                                            ${unitTypeObj.isRadarBuilding || unitTypeObj.isJammerBuilding || unitTypeObj.isBuilding ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForSightD}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStylesightRange}"></div>
                                                    <img src="${sightRange_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.sightRange)}</div>
                                                </div>
                                            ` : ""}
                                            ${unitTypeObj.isRadarUnit || unitTypeObj.isJammerUnit ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForMS}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleMovementSpeed}"></div>
                                                    <img src="${movementSpeed_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${unitData.movementSpeed}</div>
                                                </div>
                                            ` : ""}
                                            ${unitTypeObj.isRadarAndJammerAircraft || unitTypeObj.isRadarAndJammerBuilding || unitTypeObj.isRadarAndJammerUnit ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForHP}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleHP}"></div>
                                                    <img src="${barHP_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.HP)}</div>
                                                </div>
                                            ` : ""}
                                            ${unitTypeObj.isJammerAircraft || unitTypeObj.isBomber || unitTypeObj.isAirFigther ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForFS}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleFlyingSpeed}"></div>
                                                    <img src="${flyingSpeed_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.flyingSpeed)}</div>
                                                </div>
                                            ` : ""}
                                             ${unitTypeObj.isLab || unitTypeObj.isAirFigther ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForSightD}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStylesightRange}"></div>
                                                    <img src="${sightRange_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.sightRange)}</div>
                                                </div>
                                            ` : ""}
                                            ${unitTypeObj.isUndefined || unitTypeObj.isUndefinedAircraft || unitTypeObj.isUndefinedUnit ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForHP}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleHP}"></div>
                                                    <img src="${barHP_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.HP)}</div>
                                                </div>
                                            ` : ""}



                                            ${unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isClawlingBomb ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForMS}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleMovementSpeed}"></div>
                                                    <img src="${movementSpeed_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${unitData.movementSpeed}</div>
                                                </div>
                                            ` : ""}
                                            ${unitTypeObj.isRadarUnit || unitTypeObj.isJammerUnit || unitTypeObj.isJammerAircraft || unitTypeObj.isRadarAndJammerBuilding || unitTypeObj.isBomber ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForSightD}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStylesightRange}"></div>
                                                    <img src="${sightRange_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.sightRange)}</div>
                                                </div>
                                            ` : ""}
                                            ${unitTypeObj.isRadarAndJammerAircraft ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForFS}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleFlyingSpeed}"></div>
                                                    <img src="${flyingSpeed_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.flyingSpeed)}</div>
                                                </div>
                                            ` : ""}
                                            ${unitTypeObj.isRadarAndJammerUnit ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForMS}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleMovementSpeed}"></div>
                                                    <img src="${movementSpeed_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${unitData.movementSpeed}</div>
                                                </div>
                                            ` : ""}
                                            ${unitTypeObj.isCons || unitTypeObj.isSemiCon || unitTypeObj.isUndefinedUnit ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForMS}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleMovementSpeed}"></div>
                                                    <img src="${movementSpeed_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.movementSpeed)}</div>
                                                </div>
                                            ` : ""}
                                             ${unitTypeObj.isAirCons || unitTypeObj.isUndefinedAircraft ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForFS}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleFlyingSpeed}"></div>
                                                    <img src="${flyingSpeed_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.flyingSpeed)}</div>
                                                </div>
                                            ` : ""}
                                            ${unitTypeObj.isDefenseShootingBuildingDpsOnly ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForSightD}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStylesightRange}"></div>
                                                    <img src="${sightRange_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.sightRange)}</div>
                                                </div>
                                            ` : ""}
                                            ${unitTypeObj.isUndefined || unitTypeObj.isUndefinedAircraft || unitTypeObj.isUndefinedUnit ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForSightD}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStylesightRange}"></div>
                                                    <img src="${sightRange_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.sightRange)}</div>
                                                </div>
                                            ` : ""}


                                            ${unitTypeObj.isRadarAndJammerAircraft || unitTypeObj.isRadarAndJammerUnit || unitTypeObj.isClawlingBomb ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForSightD}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStylesightRange}"></div>
                                                    <img src="${sightRange_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.sightRange)}</div>
                                                </div>
                                            ` : ""}
                                            ${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isFighterDpsOnly || unitTypeObj.isAirCons || unitTypeObj.isCons || unitTypeObj.isSemiCon ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForSightD}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStylesightRange}"></div>
                                                    <img src="${sightRange_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.sightRange)}</div>
                                                </div>
                                            ` : ""}
                                        ${unitData.onlyDps == undefined && (unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther) ? `                     
                                            <div class="parameter-value-nobar" style="margin-top: 14px; margin-bottom: 6px;">${weapons.w1_rt} s</div>
                                        ` : ""}
                                    </div>

                                </div>


                                                    ${unitTypeObj.isEco && unitData.sup1 != undefined && unitData.sup2 != undefined ? `
                                                    <hr class="separator-between-info-stats">
                                                    <i class="exo2-16 white useful-info-padding-dt">
                                                        <sup class="sup">1</sup><span class="sup-info">${unitData.sup1}</span>
                                                    </i>
                                                    <i class="exo2-16 white useful-info-padding-dt">
                                                        <sup class="sup">2</sup><span class="sup-info">${unitData.sup2}</span>
                                                    </i>
                                                ` : ""
                                               }
                                               ${unitTypeObj.isEco && unitData.sup1 != undefined && unitData.sup2 == undefined ? `
                                                    <hr class="separator-between-info-stats">
                                                    <i class="exo2-16 white useful-info-padding-dt">
                                                        <sup class="sup">1</sup><span class="sup-info">${unitData.sup1}</span>
                                                    </i>
                                                ` : ""
                                                }

                                </div>

                                      <div class="exo2-26 basic-stats" style="margin-top:30px;">Other</div>
                                      <div class="exo2-26 other-stats">
                                        <div class="row">
                                            <div class="col col-lg-6 no-padding">
                                                    ${unitData.buildTime != undefined && (unitData.movementSpeed != 'n/a' || unitData.flyingSpeed != 'n/a') ? `
                                                <div class="parameter-name"><span class="tooltip-dotted" data-toggle="popover" data-placement="right" data-content="<div class='tooltip-content'><span class='tooltip-title'>Build time</span>This parameter shows how much time is needed to build a unit or structure. </br><span style='color: #DEA73C;'>Build time / Build speed = time in seconds </span> </br> <b>Example:</b></br> Commander with a build speed of 360 builds a <b>${unitData.name}</b> with a build time of ${setSpacesInBigNumbers(unitData.buildTime)} needs: </br><span style='color: #DEA73C;'> ${setSpacesInBigNumbers(unitData.buildTime)} / 360 = <b>${(unitData.buildTime / 360).toFixed(2)} seconds </b></span> </br> Remember to add lab's building speed to it, to be exact. </div>">Build time:</span></div>
                                                    `: `
                                                <div class="parameter-name"><span class="tooltip-dotted" data-toggle="popover" data-placement="right" data-content="<div class='tooltip-content'><span class='tooltip-title'>Build time</span>This parameter shows how much time is needed to build a unit or structure. </br><span style='color: #DEA73C;'>Build time / Build speed = time in seconds </span> </br> <b>Example:</b></br> Commander with a build speed of 360 builds a <b>${unitData.name}</b> with a build time of ${setSpacesInBigNumbers(unitData.buildTime)} needs: </br><span style='color: #DEA73C;'> ${setSpacesInBigNumbers(unitData.buildTime)} / 360 = <b>${(unitData.buildTime / 360).toFixed(2)} seconds </b></span> </div>">Build time:</span></div>
                                                    ` }
                                                    ${unitData.turnRate != "n/a" && unitData.turnRate != undefined ? `
                                                <div class="parameter-name"><span class="tooltip-dotted" data-toggle="popover" data-placement="right" data-content="<div class='tooltip-content'><span class='tooltip-title'>Turn speed</span>This parameter shows how fast a unit turns to change its direction. The lower a value, the slower a unit turns around. Turn speed may be important when you want to change direction to espace from an incoming threat or when you want to avoid an obstacle.</br> </br><span style='color: #DEA73C;'><b>Turn speed ranges:</b> </span> </br> <ul><li>Above 900: very fast</li><li>700 - 900: fast</li> <li>600 - 699: decent</li><li>400 - 599: average</li><li>200 - 399: slow</li> <li>Below 200: sluggish</li> </ul>   </div>">Turn speed:</span></div>

                                                    `: "" }
                                                    ${unitData.energyMake != undefined && unitData.energyMake != "n/a" && unitData.energyMake != 0 ? `
                                                <div class="parameter-name">Energy make:</div>

                                                    `: "" }
                                                    ${unitData.energyUse != undefined && unitData.energyUse != 0 ? `
                                                <div class="parameter-name"><span class="tooltip-dotted" data-toggle="popover" data-placement="right" data-content="<div class='tooltip-content'><span class='tooltip-title'>Energy drain</span>This parameter shows how much energy a unit drains. This includes only: <ul><li>Cloaking</li><li>Turned on units/buildings (jammers, radars, metal makers, galactic gates and more)</li><li>Moving (most units drain up to 1E/s while moving)</li></ul> </br> <b style='color: #DEA73C;'> Warning! </b> This parameter doesn't show energy drain while shooting (e.g. green lasers from Gaat).</div">Energy drain:</span></div>

                                                    `: "" }
                                                    ${unitData.energyStorage != undefined && unitData.energyStorage != 0 ? `
                                                <div class="parameter-name">Energy storage:</div>

                                                    `: "" }
                                                    ${unitData.metalStorage != 0 && unitData.metalStorage != undefined ? `
                                                <div class="parameter-name">Metal storage:</div>

                                                    `: "" }
                                                    ${unitData.cloakCost != "n/a" ? `
                                                <div class="parameter-name">Cloak cost:</div>

                                                    `: "" }

                                            </div>

                                            <div class="col col-lg-6 no-padding">
                                                    ${unitData.buildTime != undefined ? `
                                                    <div class="parameter-val">${setSpacesInBigNumbers(unitData.buildTime)}</div>
                                                    `: "" }
                                                    ${unitData.turnRate != "n/a" && unitData.turnRate != undefined ? `
                                                    <div class="parameter-val">${unitData.turnRate}</div>
                                                    `: "" }
                                                    ${unitData.energyMake != undefined && unitData.energyMake != "n/a" && unitData.energyMake != 0  ? `
                                                    <div class="parameter-val">${setSpacesInBigNumbers(unitData.energyMake)}</div>
                                                    `: "" }
                                                    ${unitData.energyUse != undefined && unitData.energyUse != 0 ? `
                                                    <div class="parameter-val">${setSpacesInBigNumbers(unitData.energyUse)}</div>
                                                    `: "" }
                                                    ${unitData.energyStorage != undefined && unitData.energyStorage != 0 ? `
                                                    <div class="parameter-val">${setSpacesInBigNumbers(unitData.energyStorage)}</div>
                                                    `: "" }
                                                    ${unitData.metalStorage != 0 && unitData.metalStorage != undefined ? `
                                                    <div class="parameter-val">${setSpacesInBigNumbers(unitData.metalStorage)}</div>
                                                    `: "" }
                                                    ${unitData.cloakCost != "n/a" ? `
                                                    <div class="parameter-val">${setSpacesInBigNumbers(unitData.cloakCost)}</div>
                                                    `: "" }
                                            </div>
                                        </div>
                                      </div>




</div></div>
<div class="tab-pane fade" id="nav-manufacture-info" role="tabpanel" aria-labelledby="manufacture-info-tab"><div class="exo2-26 detailed-info-header built-by"><p>${unitData.name} <span style="font-weight:normal;">is built by:</span></p></div><div class="can-build"></div></div>
            <div class="tab-pane fade" id="nav-tips" role="tabpanel" aria-labelledby="nav-tips-tab">

                                                ${generalInfoTemplate}

</div>
        </div>
`
}

function fillUpgradeTemplate() {
    upgradeTemplate =
        `<img src="upgrade-icon.svg" class="plus-upgrade"/>
        <div class="upgrade-info-container">
        <p class="optional-upgrade-info">${upgradeData.name} (optional) </p>
        <div class="row" style="max-width: 270px; margin:0;">
        <div class="col col-lg-2 unit-image-box">
            <img src="units-images/${upgradeData.imgSrc}.jpg" class="upgrade-img"/>
        </div>
        <div class="col col-lg-8" style="padding-left: 12px;">
            <div class="res-cost-row"><div class="energy-cost-bar exo2-16">Energy cost</div><span class="energy-cost-digit exo2-16">${setSpacesInBigNumbers(upgradeData.energyCost)}</span></div>
            <div class="res-cost-row" style="margin-bottom:3px;"><div class="metal-cost-bar exo2-16">Metal cost</div><span class="metal-cost-digit exo2-16">${setSpacesInBigNumbers(upgradeData.metalCost)} </span></div>
        </div>
        <div style="color:white; font-size:14px; color: rgba(255, 255, 255, 0.8);">- ${upgradeData.description}<div>
    </div></div>

`
}


$('body').on('click', '#prev-unit', function () {
    if (previousUnitsListHTML.length == 0) {
        $("#prev-unit").parent().hide();
    }
    else {
        $("#prev-unit").parent().show();
        previousUnitsListHTML.pop();
        $("#detailed-unit-info-1").html(previousUnitsListHTML[previousUnitsListHTML.length - 1]);
        previousUnitsListNames.pop();
    }

});

$('#detailed-unit-info-1').on('hidden.bs.modal', function () {
    previousUnitsListHTML = [];
})

function generateCanBuildList() {
    buildingsCodes = [];
    buildingsList = [];
    var template =
        `
    <div class="exo2-26 detailed-info-header">
        ${unitData.name} <span style="font-weight:normal;">can build:</span>
        </div>`;
    $('.can-build').append(template);
    var str = unitData.canBuild;
    var buildings = str.split(" ");

    for (i = 0; i < buildings.length; i++) {
        $(".unit-box").each(function () {
            var unitCode = $(this).attr("style").toLowerCase();

            unitCode = unitCode.substring(
                unitCode.lastIndexOf("/") + 1,
                unitCode.lastIndexOf(".")
            );

            if (buildings[i].toLowerCase() == unitCode) {
                var building = { code: unitCode, obj: $(this) };
                buildingsCodes.push(building);

            }
        });
    }
    var noDuplicatesTab = removeDuplicates(buildingsCodes, "code");
    for (i = 0; i < noDuplicatesTab.length; i++) {
        buildingsList.push(noDuplicatesTab[i].obj.parent().html());
    }

    for (i = 0; i < buildingsList.length; i++) {
        var html = $('<div />').append(buildingsList[i]).addClass("name-image-box");

        $(".can-build").append(html);
    }
}

function generateBuiltByList() {
    buildingsCodes = [];
    buildingsList = [];
    var str = unitData.builtBy;
    var buildings = str.split(" ");

    for (i = 0; i < buildings.length; i++) {
        $(".unit-box").each(function () {
            var unitCode = $(this).attr("style");

            unitCode = unitCode.substring(
                unitCode.lastIndexOf("/") + 1,
                unitCode.lastIndexOf(".")
            ).toLowerCase();

            if (buildings[i].toLowerCase() == unitCode) {
                var building = { code: unitCode, obj: $(this) };
                buildingsCodes.push(building);

            }
        });
    }
    var noDuplicatesTab = removeDuplicates(buildingsCodes, "code");
    for (i = 0; i < noDuplicatesTab.length; i++) {
        buildingsList.push(noDuplicatesTab[i].obj.parent().html());
    }

    //$(".detailed-info-wrapper").append('<div class="built-by"><p>Built by:</p></div>');
    for (i = 0; i < buildingsList.length; i++) {
        var html = $('<div />').append(buildingsList[i]).addClass("name-image-box");

        $(".built-by").append(html);
    }
}

function generateOtherStats(obj) {
    //reload time
    if ($(obj).attr("w2") != undefined) {

    }
    if (unitData.unitName == "Pyro" || unitData.unitName == "Peewee" || unitData.unitName == "Reaper" || unitData.unitName == "Warrior" || unitData.unitName == "flash" || unitData.unitName == "Salamander" || unitData.unitName == "Brawler" || unitData.unitName == "Immolator") {

    } else {
        $(".other-stats").append(unitData.reloadTime_w1);
    }
}


jQuery.fn.changeKeywordsColor = function (str, className) {
    var regex = new RegExp(str, "gi");

    return this.each(function () {
        this.innerHTML = this.innerHTML.replace(regex, function (matched) { return "<span class=\"" + className + "\">" + matched + "</span>"; });
    });
}

function ChangeColorOfKeywords() {
    for (i = 0; i < keywords.length; i++) {
        $(".unit-desc").changeKeywordsColor(keywords[i], "yellow-bold");
    }
    var overallDpsInBrackets = "=" + unitData.overallDps;
    $(".preview-frame .parameter-bar-and-value:first-child .parameter-value").changeKeywordsColor(overallDpsInBrackets, "yellow-bold");
}


function fillHtmlTemplateFor3() {
        template =
        `
${upgradeData.name != "" ? `
        <div class="row unit-basic-info-upgr" style="padding: 13px 13px 9px 13px; margin:0 0 0 0;">
        <div class="col col-lg-2 unit-image-box" style="">
`: `
    <div class="unit-basic-info row">
    <div class="col col-lg-4 unit-image-box">`
        }
            <div class="unit-box-in-preview" style="${unitData.imgSrc}"></div>
        </div>


${upgradeData.name != "" ? `
<div class="col col-lg-4" style="padding-left: 12px;">
`: `
<div class="col col-lg-8" style="padding-left: 12px;">
        `}

            <div class="res-cost-row"><div class="energy-cost-bar exo2-16">Energy cost</div><span class="energy-cost-digit exo2-16">${setSpacesInBigNumbers(unitData.energyCost)}</span></div>
            <div class="res-cost-row" style="margin-bottom:3px;"><div class="metal-cost-bar exo2-16">Metal cost</div><span class="metal-cost-digit exo2-16">${setSpacesInBigNumbers(unitData.metalCost)} </span></div>
            <div class="summoning-code exo2-16" data-toggle="popover" data-placement="right" data-content="<div class='tooltip-content'><span class='tooltip-title'>Summoning code</span>You can type this code in game to summon <span style='font-weight:600'>${unitData.name}</span>. Just press Enter and type: <span style='color: #DEA73C; font-weight:500'>+${unitData.summoningCode}</span>. Then you can press Insert key to summon more.</br> It always works in single player. If you want to summon a unit in multiplayer, you have to switch <b>Cheat codes</b> (in game's lobby) to <b>Allowed</b> before starting a game. This is very handy when you want to test units. </br></br><p style='font-weight:600'>Useful codes:</p><ul><li><span style='color: #DEA73C; font-weight:500'>+los</span> - infinite view.</li><li><span style='color: #DEA73C; font-weight:500'>+corcheat</span> - almost infinite resources.</li> <li><span style='color: #DEA73C; font-weight:500'>+corkrog 1</span> - summons a Krogoth for another player (numbers from 1 to 9 are other players).</li><li><span style='color: #DEA73C; font-weight:500'>+showranges</span> - type it, then select a unit and hold Shift key to see many types of ranges.</li></ul> </div>"><span class="tooltip-dotted">Summoning</span> <span class="tooltip-dotted">code</span></div><span class="summoning-code-text exo2-16">+${unitData.summoningCode}</span>
        </div>

    </div>


        <ul class="nav nav-tabs justify-content-center" id="unit-tabs" role="tablist">
<li>
            <a class="nav-item nav-link active" id="nav-statistics-tab" data-toggle="tab" href="#nav-statistics" role="tab" aria-controls="nav-statistics" aria-selected="true">Statistics</a>
          </li>
          <li class="nav-item">
                <a class="nav-item nav-link" id="nav-tips-tab" data-toggle="tab" href="#nav-tips" role="tab" aria-controls="nav-tips" aria-selected="false">Tips & trivia</a>
          </li>
          <li class="nav-item">
                <a class="nav-item nav-link" id="manufacture-info-tab" data-toggle="tab" href="#nav-manufacture-info" role="tab" aria-controls="nav-manufacture-info" aria-selected="false">Manufacture</a>
          </li>
        </ul>

        <div class="tab-content" id="tab-content">
            <div class="tab-pane fade show active" id="nav-statistics" role="tabpanel" aria-labelledby="nav-statistics-tab"><div class="unit-statistics">


                            <div class="unit-basic-stats">

                                <div class="exo2-26 detailed-info-header" >Basic stats</div>
                                <div class="row" style="margin:0; margin-top: 30px; padding-bottom: 25px; border-bottom: 1px solid #525252; padding-left: 22px;">
                                    <div class="col col-lg-3 no-padding" style="top: 22px;">
                                        <div class="parameter-name">${firstParameter}</div>
                                        <div class="parameter-name">${secondParameter}</div>
                                        ${unitData.onlyDps == undefined ? `
                                        <div class="parameter-name">${thirdParameter}</div>
                                        <div class="parameter-name">Reload time: </div>
                                        ` : ""}

                                    </div>
                            

                                    <div class="col col-lg-3 brd" style="max-width: 22%; border-right: 1px solid #525252; border-left: 1px solid #525252; margin-left: 8px;">
                                            <div class="unit-weapon">Weapon 1 ${unitData.isAntiAir1 ? `(AA)`:""}</div>
                                            ${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther ? `                     
                                                <div class="parameter-bar-and-value ${ShineEffect.ForDPS}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleDps}"> </div>
                                                    <img src="${dps_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(weapons.w1_dps)}</div>
                                                </div>

                                            ` : ""}

                                        ${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isBomber || unitTypeObj.isAirFigther ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForDamagePerShot}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleDamagePerShot}"></div>
                                                    <img src="${damagePerShot_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(weapons.w1)}</div>
                                            </div>
                                            ` : ""}
                                        ${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForRange}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleRange}"></div>
                                                    <img src="${range_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(weapons.w1_r)}</div>
                                            </div>
                                            ` : ""}

                                            ${unitData.onlyDps == undefined ? `
                                            <div class="parameter-value-nobar">${weapons.w1_rt} s</div>
                                            ` : ""}

                                    </div>

                                    <div class="col col-lg-3 brd" style="max-width: 22%; border-right: 1px solid #525252;">
                                            <div class="unit-weapon">Weapon 2 ${unitData.isAntiAir2 ? `(AA)` : ""}</div>
                                            ${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther ? `                     
                                                <div class="parameter-bar-and-value ${ShineEffect.ForDPS2}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleDps2}"> </div>
                                                    <img src="${dps2_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(weapons.w2_dps)}</div>
                                                </div>

                                            ` : ""}

                                        ${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isBomber || unitTypeObj.isAirFigther ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForDamagePerShot2}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleDamagePerShot2}"></div>
                                                    <img src="${damagePerShot2_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(weapons.w2)}</div>
                                            </div>
                                            ` : ""}
                                        ${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForRange2}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleRange2}"></div>
                                                    <img src="${range2_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(weapons.w2_r)}</div>
                                            </div>
                                            ` : ""}

                                            ${unitData.onlyDps == undefined ? `
                                            <div class="parameter-value-nobar">${weapons.w2_rt} s</div>
                                            ` : ""}

                                    </div>

${weapons.w3 != undefined ?
            `
                                    <div class="col col-lg-3 brd" style="max-width: 22%; border-right: 1px solid #525252;">
                                            <div class="unit-weapon">Weapon 3 ${unitData.isAntiAir3 ? `(AA)` : ""}</div>
                                            ${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther ? `                     
                                                <div class="parameter-bar-and-value ${ShineEffect.ForDPS3}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleDps3}"> </div>
                                                    <img src="${dps3_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(weapons.w3_dps)}</div>
                                                </div>

                                            ` : ""}

                                        ${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isBomber || unitTypeObj.isAirFigther ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForDamagePerShot3}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleDamagePerShot3}"></div>
                                                    <img src="${damagePerShot3_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(weapons.w3)}</div>
                                            </div>
                                            ` : ""}
                                        ${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForRange3}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleRange3}"></div>
                                                    <img src="${range3_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(weapons.w3_r)}</div>
                                            </div>
                                            ` : ""}

                                            ${unitData.onlyDps == undefined ? `
                                            <div class="parameter-value-nobar">${weapons.w3_rt} s</div>
                                            ` : ""}

 
                                    </div>
`: ""}


                                </div>
<div class="row" style="margin:0; margin-top: 15px; width: 100%; position: relative;">
                                    <div class="col col-lg-6 no-padding">
                                        ${unitData.onlyDps != undefined ? `
                                        <div class="parameter-name">${thirdParameter}</div>
                                        ` : ""}
                                        ${fourthParameter ? `
                                        <div class="parameter-name">${fourthParameter}</div>
                                           ` : ""}
                                           ${fifthParameter ? `
                                        <div class="parameter-name">${fifthParameter}</div>
                                           ` : ""}
                                           ${sixthParameter ? `
                                        <div class="parameter-name">${sixthParameter}</div>
                                           ` : ""}
                                    </div>

                                    <div class="col col-lg-6 no-padding">
                                           ${unitTypeObj.isBomber || unitTypeObj.isAirFigther ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForHP}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleHP}"> </div>
                                                    <img src="${barHP_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.HP)}</div>
                                                </div>
                                            ` : ""}

                                             ${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuildingDpsOnly ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForHP}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleHP}"></div>
                                                    <img src="${barHP_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.HP)}</div>
                                                </div>
                                            ` : ""}
                                           
                                            ${unitTypeObj.isBomber || unitTypeObj.isAirFigther ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForFS}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleFlyingSpeed}"></div>
                                                    <img src="${flyingSpeed_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.flyingSpeed)}</div>
                                                </div>
                                            ` : ""}
                                             ${unitTypeObj.isAirFigther ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForSightD}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStylesightRange}"></div>
                                                    <img src="${sightRange_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.sightRange)}</div>
                                                </div>
                                            ` : ""}

                                            ${unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForMS}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleMovementSpeed}"></div>
                                                    <img src="${movementSpeed_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${unitData.movementSpeed}</div>
                                                </div>
                                            ` : ""}
                                            ${unitTypeObj.isBomber ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForSightD}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStylesightRange}"></div>
                                                    <img src="${sightRange_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.sightRange)}</div>
                                                </div>
                                            ` : ""}
                                                                                      
                                            ${unitTypeObj.isDefenseShootingBuildingDpsOnly ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForSightD}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStylesightRange}"></div>
                                                    <img src="${sightRange_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.sightRange)}</div>
                                                </div>
                                            ` : ""}

                                            ${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isFighterDpsOnly ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForSightD}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStylesightRange}"></div>
                                                    <img src="${sightRange_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.sightRange)}</div>
                                                </div>
                                            ` : ""}


                                </div>
                           </div>

                                </div>

                                      <div class="exo2-26 basic-stats" style="margin-top:30px;">Other</div>
                                      <div class="exo2-26 other-stats">
                                        <div class="row">
                                            <div class="col col-lg-6 no-padding">
                                                    ${unitData.buildTime != undefined && (unitData.movementSpeed != 'n/a' || unitData.flyingSpeed != 'n/a') ? `
                                                <div class="parameter-name"><span class="tooltip-dotted" data-toggle="popover" data-placement="right" data-content="<div class='tooltip-content'><span class='tooltip-title'>Build time</span>This parameter shows how much time is needed to build a unit or structure. </br><span style='color: #DEA73C;'>Build time / Build speed = time in seconds </span> </br> <b>Example:</b></br> Commander with a build speed of 360 builds a <b>${unitData.name}</b> with a build time of ${setSpacesInBigNumbers(unitData.buildTime)} needs: </br><span style='color: #DEA73C;'> ${setSpacesInBigNumbers(unitData.buildTime)} / 360 = <b>${(unitData.buildTime / 360).toFixed(2)} seconds </b></span> </br> Remember to add lab's building speed to it, to be exact. </div>">Build time:</span></div>
                                                    `: `
                                                <div class="parameter-name"><span class="tooltip-dotted" data-toggle="popover" data-placement="right" data-content="<div class='tooltip-content'><span class='tooltip-title'>Build time</span>This parameter shows how much time is needed to build a unit or structure. </br><span style='color: #DEA73C;'>Build time / Build speed = time in seconds </span> </br> <b>Example:</b></br> Commander with a build speed of 360 builds a <b>${unitData.name}</b> with a build time of ${setSpacesInBigNumbers(unitData.buildTime)} needs: </br><span style='color: #DEA73C;'> ${setSpacesInBigNumbers(unitData.buildTime)} / 360 = <b>${(unitData.buildTime / 360).toFixed(2)} seconds </b></span> </div>">Build time:</span></div>
                                                    ` }
                                                    ${unitData.turnRate != "n/a" && unitData.turnRate != undefined ? `
                                                <div class="parameter-name"><span class="tooltip-dotted" data-toggle="popover" data-placement="right" data-content="<div class='tooltip-content'><span class='tooltip-title'>Turn speed</span>This parameter shows how fast a unit turns to change its direction. The lower a value, the slower a unit turns around. Turn speed may be important when you want to change direction to espace from an incoming threat or when you want to avoid an obstacle.</br> </br><span style='color: #DEA73C;'><b>Turn speed ranges:</b> </span> </br> <ul><li>Above 900: very fast</li><li>700 - 900: fast</li> <li>600 - 699: decent</li><li>400 - 599: average</li><li>200 - 399: slow</li> <li>Below 200: sluggish</li> </ul>   </div>">Turn speed:</span></div>

                                                    `: "" }
                                                    ${unitData.energyMake != undefined && unitData.energyMake != "n/a" && unitData.energyMake != 0 ? `
                                                <div class="parameter-name">Energy make:</div>

                                                    `: "" }
                                                    ${unitData.energyUse != undefined && unitData.energyUse != 0 ? `
                                                <div class="parameter-name"><span class="tooltip-dotted" data-toggle="popover" data-placement="right" data-content="<div class='tooltip-content'><span class='tooltip-title'>Energy drain</span>This parameter shows how much energy a unit drains. This includes only: <ul><li>Cloaking</li><li>Turned on units/buildings (jammers, radars, metal makers, galactic gates and more)</li><li>Moving (most units drain up to 1E/s while moving)</li></ul> </br> <b style='color: #DEA73C;'> Warning! </b> This parameter doesn't show energy drain while shooting (e.g. green lasers from Gaat).</div">Energy drain:</span></div>

                                                    `: "" }
                                                    ${unitData.energyStorage != undefined && unitData.energyStorage != 0 ? `
                                                <div class="parameter-name">Energy storage:</div>

                                                    `: "" }
                                                    ${unitData.metalStorage != 0 && unitData.metalStorage != undefined ? `
                                                <div class="parameter-name">Metal storage:</div>

                                                    `: "" }
                                                    ${unitData.cloakCost != "n/a" ? `
                                                <div class="parameter-name">Cloak cost:</div>

                                                    `: "" }

                                            </div>

                                            <div class="col col-lg-6 no-padding">
                                                    ${unitData.buildTime != undefined ? `
                                                    <div class="parameter-val">${setSpacesInBigNumbers(unitData.buildTime)}</div>
                                                    `: "" }
                                                    ${unitData.turnRate != "n/a" && unitData.turnRate != undefined ? `
                                                    <div class="parameter-val">${unitData.turnRate}</div>
                                                    `: "" }
                                                    ${unitData.energyMake != undefined && unitData.energyMake != "n/a" && unitData.energyMake != 0  ? `
                                                    <div class="parameter-val">${unitData.energyMake}</div>
                                                    `: "" }
                                                    ${unitData.energyUse != undefined && unitData.energyUse != 0 ? `
                                                    <div class="parameter-val">${unitData.energyUse}</div>
                                                    `: "" }
                                                    ${unitData.energyStorage != undefined && unitData.energyStorage != 0 ? `
                                                    <div class="parameter-val">${setSpacesInBigNumbers(unitData.energyStorage)}</div>
                                                    `: "" }
                                                    ${unitData.metalStorage != 0 && unitData.metalStorage != undefined ? `
                                                    <div class="parameter-val">${setSpacesInBigNumbers(unitData.metalStorage)}</div>
                                                    `: "" }
                                                    ${unitData.cloakCost != "n/a" ? `
                                                    <div class="parameter-val">${setSpacesInBigNumbers(unitData.cloakCost)}</div>
                                                    `: "" }
                                            </div>
                                        </div>
                                      </div>




</div></div>
<div class="tab-pane fade" id="nav-manufacture-info" role="tabpanel" aria-labelledby="manufacture-info-tab"><div class="exo2-26 detailed-info-header built-by"><p>${unitData.name} <span style="font-weight:normal;">is built by:</span></p></div> <div class="can-build"></div></div>
            <div class="tab-pane fade" id="nav-tips" role="tabpanel" aria-labelledby="nav-tips-tab">

                                                ${generalInfoTemplate}

</div>
        </div>
`
}

function countDpsAndRangeAndShotDmg(obj) {

    weapons = {
        w1: $(obj).attr("w1"),
        w2: $(obj).attr("w2"),
        w3: $(obj).attr("w3"),
        w1_r: $(obj).attr("w1-r"),
        w2_r: $(obj).attr("w2-r"),
        w3_r: $(obj).attr("w3-r"),
        w1_rt: $(obj).attr("w1-rt"),
        w2_rt: $(obj).attr("w2-rt"),
        w3_rt: $(obj).attr("w3-rt"),
        w1_dps: "",
        w2_dps: "",
        w3_dps: ""
    };

    weapons.w1_dps = Math.round(weapons.w1 / weapons.w1_rt);
    weapons.w2_dps = Math.round(weapons.w2 / weapons.w2_rt);
    weapons.w3_dps = Math.round(weapons.w3 / weapons.w3_rt);
}

function resetParameterBars(){
    boxShadowsStyleDps = ""; //only for bars with 10/10
    boxShadowsStyleDps2 = "";
    boxShadowsStyleDps3 = "";
    boxShadowsStyleDamagePerShot = "";
    boxShadowsStyleDamagePerShot2 = "";
    boxShadowsStyleDamagePerShot3 = "";
    boxShadowsStyleRange = "";
    boxShadowsStyleRange2 = "";
    boxShadowsStyleRange3 = "";

    ShineEffect = { //only for bars with 10/10
        ForDPS: "",
        ForDPS2: "",
        ForDPS3: "",
        ForDamagePerShot: "",
        ForDamagePerShot1: "",
        ForDamagePerShot2: "",
        ForRange: "",
        ForRange2: "",
        ForRange3: "",
    }

    dps_SrcImg = "";
    dps2_SrcImg = "";
    dps3_SrcImg = "";
    damagePerShot_SrcImg = "";
    damagePerShot2_SrcImg = "";
    damagePerShot3_SrcImg = "";
    range_SrcImg = "";
    range2_SrcImg = "";
    range3_SrcImg = "";
}

function fillGeneralInfoTemplate() {
    generalInfoTemplate = `
                                                <div class="detailed-info-header exo2-26">
                                                Tips & trivia
                                                </div>

<ol class="dt-tips">

                                               ${unitTypeObj.isEco && unitData.p4 != "" ? `

                                                    <li class="dt-info-text white">You get 1 E for each ${unitData.minMetalCostForE} metal spent on ${unitData.name}s. This means, you get 1000 E income if you spend ${unitData.minMetalCostForE * 1000} metal.</li>
                                                    <li class="dt-info-text white">${unitData.p1}</li>
                                                    <li class="dt-info-text white">${unitData.p2}</li>
                                                    <li class="dt-info-text white">${unitData.p3}</li>
                                                    <li class="dt-info-text white">${unitData.p4}</li>
                                                ` : ""}
                                                ${unitTypeObj.isEco && unitData.p3 != "" && unitData.p4 == "" ? `
                                                    <li class="dt-info-text white">You get 1 E for each ${unitData.minMetalCostForE} metal spent on ${unitData.name}s. This means, you get 1000 E income if you spend ${unitData.minMetalCostForE * 1000} metal.</li>
                                                    <li class="dt-info-text white">${unitData.p1}</li>
                                                    <li class="dt-info-text white">${unitData.p2}</li>
                                                    <li class="dt-info-text white">${unitData.p3}</li>
                                                    `: ""}
                                                ${unitTypeObj.isEco && unitData.p2 != "" && unitData.p3 == "" && unitData.p4 == "" ? `
                                                <li class="dt-info-text white">You get 1 E for each ${unitData.minMetalCostForE} metal spent on ${unitData.name}s. This means, you get 1000 E income if you spend ${unitData.minMetalCostForE * 1000} metal.</li>
                                                    <li class="dt-info-text white">${unitData.p1}</li>
                                                    <li class="dt-info-text white">${unitData.p2}</li>
                                                    `: ""}


        ${(unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuildingDpsOnly) && (unitData.range > 300 || weapons.w1_r > 300) && (unitData.sightRange < unitData.range || unitData.sightRange < weapons.w1_r) ? `
                                                <li class="dt-info-text white">
                                                     ${unitData.name}'s sight range is lower than its weapon's range. Use a radar, scouts or other units <span class="tooltip-dotted" data-toggle="popover" data-placement="top" data-content="<div class='tooltip-content'><span class='tooltip-title'>Line of Sight (LoS)</span>LoS is the visibility (what your units actually see) on the playing field. Units automatically attack an enemy within their LoS and their weapon's range.<span class="tooltip-dotted">LoS</span></span> to see an enemy and shoot it from a full distance.
                                                </li>
                                                ` : ""}

        ${(unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly) && (unitData.movementSpeed >= 2 && unitData.metalCost > 200) && (unitData.name != "Spider") && (unitData.builtBy != "ARMSY " && unitData.builtBy != "ARMASY " && unitData.builtBy != "CORASY " && unitData.builtBy != "CORSY ") ? `
                                                <li class="dt-info-text white">
                                                     Speed of ${unitData.name}s is really good. If you manage to slip into the enemy's base, he may have a big problem, because it's hard to chase such fast units. Look for important economy buildings and try to destroy them. 
                                                </li>
                                                ` : ""}

${(unitTypeObj.isCons || unitTypeObj.isAirCons) && !(unitData.name == "Podger" || unitData.name == "Spoiler")? `
        ${unitData.buildSpeed / unitData.metalCost > 0.75 ? `
                                                <li class="dt-info-text white">
                                                     ${unitData.name} has a very good <span class="yellow"> build speed / metal cost ratio</span>. If metal is important on a certain map, you can make ${unitData.name}s to build faster for a comparably low metal price.
                                                </li>
                                                ` : ""}

        ${unitData.buildSpeed / unitData.metalCost <= 0.75 && unitData.buildSpeed / unitData.metalCost > 0.5 ? `
                                                <li class="dt-info-text white">
                                                     ${unitData.name} doesn't have the best <span class="yellow"> build speed / metal cost </span> ratio. It is quite good though. If you want to save metal and build faster, you should consider making Tier 2 or 3 vehicle constructions.
                                                </li>
                                                ` : ""}
        ${unitData.buildSpeed / unitData.metalCost <= 0.5 ? `
                                                <li class="dt-info-text white">
                                                     ${unitData.name}'s <span class="yellow"> build speed / metal cost ratio </span> is rather bad. If you want to save metal and build faster, you should consider making Tier 2/3 construction vehicles (the best ratio).
                                                </li>
                                                ` : ""
    }
    `: ""}

${(unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly) && (unitData.HP / unitData.metalCost > 8) && (unitData.name != "Pounder")?`
                                                <li class="dt-info-text white">
                                                     ${unitData.name} has relatively a lot of Health for its price. It can be used as a shield for units with greater range.
                                                </li>
` : ""}

${unitData.energyUse >= 50 ? `
                                                <li class="dt-info-text white">
                                                     ${unitData.name} drains ${unitData.energyUse} E/s when its special ability is turned on (or when it works). 
                                                </li>
` : ""}

${unitTypeObj.isMineOrClawlingBomb ? `
                                                <li class="dt-info-text white">
                                                    You can use Ctrl + D and ${unitData.name} will explode immediately, without countdown.
                                                </li>
` : ""}

${unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isClawlingBomb || unitTypeObj.isCons || unitTypeObj.isAirCons || unitTypeObj.isBomber || unitTypeObj.isAirFigther ? `
${unitData.metalCost < 3000 ? `
                                                <li class="dt-info-text white">

                                                    To make one ${unitData.name} every <span class="bold yellow">5 seconds</span>, your minimum income should be about:</br><span class="energy-color">Energy</span> +${setSpacesInBigNumbers(Math.ceil(unitData.energyCost / 5))} E/s &nbsp&nbsp&nbsp&nbsp <span class="metal-color">Metal</span> +${setSpacesInBigNumbers(Math.ceil(unitData.metalCost / 5))} M/s.</br> Required build speed: ${Math.floor(unitData.buildTime / 5)} (about 
${Math.floor((unitData.buildTime / 5) / 360) == 1 ? `
${Math.floor((unitData.buildTime / 5) / 360)}x Tier 2 construction vehicle or ${Math.floor((unitData.buildTime / 5) / 120)}x Tier 1 construction vehicle).
`: `${Math.floor((unitData.buildTime / 5) / 360) == 0 ? `
        ${Math.floor((unitData.buildTime / 5) / 120)}x Tier 1 construction vehicle).` :
                `${Math.floor((unitData.buildTime / 5) / 360)}x Tier 2 construction vehicle or ${Math.floor((unitData.buildTime / 5) / 120)}x Tier 1 construction vehicle).`}`}
                                                </li >
                                                    `: ""}
                                                ${unitData.metalCost >= 200 ?`                                               
                                                <li class="dt-info-text white">
                                                    To make one ${unitData.name} every <span class="bold yellow">30 seconds</span>, your minimum income should be about:</br><span class="energy-color">Energy</span> +${setSpacesInBigNumbers(Math.ceil(unitData.energyCost / 30))} E/s &nbsp&nbsp&nbsp&nbsp <span class="metal-color">Metal</span> +${setSpacesInBigNumbers(Math.ceil(unitData.metalCost / 30))} M/s.</br> Required build speed: ${Math.floor(unitData.buildTime / 30)} (about
${Math.floor((unitData.buildTime / 30) / 360) >= 1 ? `
${Math.floor((unitData.buildTime / 30) / 360)}x Tier 2 construction vehicle or ${Math.floor((unitData.buildTime / 30) / 270)}x Tier 2 construction kbot).
`: `${Math.floor((unitData.buildTime / 30) / 360) == 0 ? `
        ${Math.floor((unitData.buildTime / 30) / 120)}x Tier 1 construction vehicle).` :
                `${Math.floor((unitData.buildTime / 30) / 360)}x Tier 2 construction vehicle or ${Math.floor((unitData.buildTime / 30) / 120)}x Tier 1 construction vehicle).`}`}
                                                </li>
                                                
                                                ${unitData.metalCost > 6500 ?` 
                                                <li class="dt-info-text white">
                                                    To make one ${unitData.name} every <span class="bold yellow">2 minutes</span>, your minimum income should be about:</br><span class="energy-color">Energy</span> +${setSpacesInBigNumbers(Math.ceil(unitData.energyCost / 120))} E/s &nbsp&nbsp&nbsp&nbsp <span class="metal-color">Metal</span> +${setSpacesInBigNumbers(Math.ceil(unitData.metalCost / 120))} M/s.</br> Required build speed: ${Math.floor(unitData.buildTime / 120)} (about ${Math.floor((unitData.buildTime / 120) / 360)}x Tier 2 construction vehicle or ${Math.floor((unitData.buildTime / 120) / 270)}x Tier 2 construction kbot).
                                                </li>
                                                `: ""}
                                                `: ""}
                                                
` : ""}

</ol>
`
}