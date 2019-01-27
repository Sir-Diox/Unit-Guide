var previousUnitsListHTML = [];
var previousUnitsListNames = [];
var template = "";
var popoverAsTooltipSettings = {
    placement: 'top',
    html: true,
    container: 'body',
    trigger: 'hover',
    selector: '[data-toggle="popover"]',
    delay: { "show": 0, "hide": 0 },
    boundary: 'viewport',
    fallbackPlacement: 'flip'
}
$('body').on('mouseover', '.parameter-name', function () {
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
};

$('body').on('click', '.unit-box, .u-name, .unit-box-in-search-result', function () {

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
                unitData.explosionDamage = $(obj).attr("w1");
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
                        secondParameter = "E income / M cost ratio*:"

                        if (unitData.maxEnergyIncome != undefined) {
                            unitData.maxMetalCostForE = parseFloat((unitData.metalCost / unitData.maxEnergyIncome).toFixed(2));
                            unitData.ratioMax = "1 &thinsp; : &thinsp; " + unitData.maxMetalCostForE;
                            thirdParameter = "E income / M cost ratio*:"
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
                    weapons.w1 = $(obj).attr("w1");
                    weapons.w2 = $(obj).attr("w2");
                    weapons.w3 = $(obj).attr("w3");
                    weapons.w1_rt = $(obj).attr("w1-rt");
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


                //countDpsAndRange(obj);

                setLabelParametersAndValues(checkUnitType());

                setParameterBars();


                //fillHTML();

                ChangeColorOfKeywords();

                fillHtmlTemplate();
                $(".detailed-info-wrapper").append(template);
                if (unitData.canBuild != "") { // what can build
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
});





function fillHtmlTemplate() {
    template =
        `
    <div class="unit-basic-info row">
        <div class="col col-lg-4 unit-image-box">
            <div class="unit-box-in-preview" style="${unitData.imgSrc}"></div>
        </div>

        <div class="col col-lg-8" style="padding-left: 12px;">
            <div class="res-cost-row"><div class="energy-cost-bar exo2-16">Energy cost</div><span class="energy-cost-digit exo2-16">${setSpacesInBigNumbers(unitData.energyCost)}</span></div>
            <div class="res-cost-row" style="margin-bottom:3px;"><div class="metal-cost-bar exo2-16">Metal cost</div><span class="metal-cost-digit exo2-16">${setSpacesInBigNumbers(unitData.metalCost)} </span></div>
            <div class="summoning-code exo2-16">Summoning code</div><span class="summoning-code-text exo2-16">+${unitData.summoningCode}</span>
        </div>

    </div>





        <ul class="nav nav-tabs justify-content-center" id="unit-tabs" role="tablist">
<li>
            <a class="nav-item nav-link active" id="nav-statistics-tab" data-toggle="tab" href="#nav-statistics" role="tab" aria-controls="nav-statistics" aria-selected="true">Statistics</a>
          </li>
          <li class="nav-item">
                <a class="nav-item nav-link" id="nav-strategy-tab" data-toggle="tab" href="#nav-strategy" role="tab" aria-controls="nav-strategy" aria-selected="false">Strategy</a>
          </li>
          <li class="nav-item">
                <a class="nav-item nav-link" id="nav-pros-cons-tab" data-toggle="tab" href="#nav-pros-cons" role="tab" aria-controls="nav-pros-cons" aria-selected="false">Pros & cons</a>
          </li>
          <li class="nav-item">
                <a class="nav-item nav-link" id="nav-what-can-build-tab" data-toggle="tab" href="#nav-what-can-build" role="tab" aria-controls="nav-what-can-build" aria-selected="false">What can build</a>
          </li>
          <li class="nav-item">
                <a class="nav-item nav-link" id="nav-built-by-tab" data-toggle="tab" href="#nav-built-by" role="tab" aria-controls="nav-built-by" aria-selected="false">Built by</a>
          </li>
        </ul>

        <div class="tab-content" id="tab-content">
            <div class="tab-pane fade show active" id="nav-statistics" role="tabpanel" aria-labelledby="nav-statistics-tab"><div class="unit-statistics">




                            <div class="unit-basic-stats">

                                <div class="exo2-26 detailed-info-header" >Basic stats</div>
                                <div class="row">
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
                                    </div>


                                    <div class="col col-lg-6 no-padding">
                                            <div class="unit-weapon"></div>
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
                                            ${unitTypeObj.isUndefined || unitTypeObj.isEco ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForHP}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleHP}"></div>
                                                    <img src="${barHP_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.HP)}</div>
                                                </div>
                                            ` : ""}


                                        ${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isBomber ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForDamagePerShot}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleDamagePerShot}"></div>
                                                    <img src="${damagePerShot_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.explosionDamage)}</div>
                                            </div>
                                            ` : ""}
                                        ${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isMine || unitTypeObj.isClawlingBomb || unitTypeObj.isNuke ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForRange}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleRange}"></div>
                                                    <img src="${range_SrcImg}" class="parameter-bar" alt="">
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
                                            ${unitTypeObj.isJammerAircraft || unitTypeObj.isJammerBuilding || unitTypeObj.isJammerUnit || unitTypeObj.isAirFigther || unitTypeObj.isLab || unitTypeObj.isUndefined ? `
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
                                            ${unitTypeObj.isEco && unitData.maxMetalCostForE != undefined ? `
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
                                            ${unitTypeObj.isRadarBuilding || unitTypeObj.isJammerBuilding ? `
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
                                            ${unitTypeObj.isJammerAircraft || unitTypeObj.isBomber ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForFS}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleFlyingSpeed}"></div>
                                                    <img src="${flyingSpeed_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.flyingSpeed)}</div>
                                                </div>
                                            ` : ""}
                                             ${unitTypeObj.isLab ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForSightD}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStylesightRange}"></div>
                                                    <img src="${sightRange_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.sightRange)}</div>
                                                </div>
                                            ` : ""}
                                            ${unitTypeObj.isUndefined ? `
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
                                            ${unitTypeObj.isCons || unitTypeObj.isSemiCon ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForMS}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleMovementSpeed}"></div>
                                                    <img src="${movementSpeed_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.movementSpeed)}</div>
                                                </div>
                                            ` : ""}
                                             ${unitTypeObj.isAirCons ? `
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
                                            ${unitTypeObj.isUndefined ? `
                                                ""
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
                                            ${unitTypeObj.isUndefined ? `
                                                ""
                                            ` : ""}
                                    </div>

                                </div>
                                            ${unitTypeObj.isRadarAndJammerAircraft || unitTypeObj.isRadarAndJammerBuilding || unitTypeObj.isRadarAndJammerUnit || unitTypeObj.isJammerAircraft || unitTypeObj.isJammerBuilding || unitTypeObj.isJammerUnit ? `

                                                    <p style="text-align:center; color:#DEA73C; padding:7px 30px" >${unitData.p1}</p>

                                            ` : ""}
                                               ${unitTypeObj.isEco && unitData.p4 != "" ? `
                                                    <hr class="separator-between-info-stats">
                                                <ul class="exo2-16 white useful-info-padding">
                                                    <li>You get 1 E for each ${unitData.minMetalCostForE} metal spent on ${unitData.name}s. This means, you get 1000 E income if you spend ${unitData.minMetalCostForE * 1000} metal.</li>
                                                    <li>${unitData.p1}</li>
                                                    <li>${unitData.p2}</li>
                                                    <li>${unitData.p3}</li>
                                                    <li>${unitData.p4}</li>
                                                    </ul>
                                                ` : ""}
                                                ${unitTypeObj.isEco && unitData.p3 != "" && unitData.p4 == "" ? `
                                                    <hr class="separator-between-info-stats">
                                                <ul class="exo2-16 white useful-info-padding">
                                                    <li>You get 1 E for each ${unitData.minMetalCostForE} metal spent on ${unitData.name}s. This means, you get 1000 E income if you spend ${unitData.minMetalCostForE * 1000} metal.</li>
                                                    <li>${unitData.p1}</li>
                                                    <li>${unitData.p2}</li>
                                                    <li>${unitData.p3}</li>
                                                    </ul>`: ""}
                                                ${unitTypeObj.isEco && unitData.p2 != "" && unitData.p3 == "" && unitData.p4 == "" ? `
                                                    <hr class="separator-between-info-stats">
                                                <ul class="exo2-16 white useful-info-padding">
                                                <li>You get 1 E for each ${unitData.minMetalCostForE} metal spent on ${unitData.name}s. This means, you get 1000 E income if you spend ${unitData.minMetalCostForE * 1000} metal.</li>
                                                    <li>${unitData.p1}</li>
                                                    <li>${unitData.p2}</li>
                                                    </ul>`: ""}

                                </div>

                                      <div class="exo2-26 basic-stats">Other</div>
                                      <div class="exo2-26 other-stats">
                                        <div class="row">
                                            <div class="col col-lg-6 no-padding">
                                                    ${unitData.buildTime != undefined ? `
                                                <div class="parameter-name"><span class="tooltip-dotted" data-toggle="popover" data-placement="right" data-content="<div class='tooltip-content'><span class='tooltip-title'>Build time</span>This parameter shows how much time you need to build a unit or a building. </br><span style='color: #DEA73C;'>Build time / Build speed = time in seconds </span> </br> <b>Example:</b></br> Commander with build speed at 360, who wants to build one <b>${unitData.name}</b> with build time ${setSpacesInBigNumbers(unitData.buildTime)} needs: </br><span style='color: #DEA73C;'> ${setSpacesInBigNumbers(unitData.buildTime)} / 360 = <b>${(unitData.buildTime / 360).toFixed(2)} seconds </b></span> </div>">Build time:</span></div>
                                                    `: "" }
                                                    ${unitData.turnRate != "n/a" && unitData.turnRate != undefined ? `
                                                <div class="parameter-name"><span class="tooltip-dotted" data-toggle="popover" data-placement="right" data-content="<div class='tooltip-content'><span class='tooltip-title'>Turning speed</span>This parameter shows how fast a unit turns to change its direction. The lower a value, the slower a unit turns around. Turning speed may be important when you want to change direction to espace from an incoming threat or when you want to avoid an obstacle.</br> </br><span style='color: #DEA73C;'><b>Turning speed ranges:</b> </span> </br> <ul><li>Above 900: very fast</li><li>700 - 900: fast</li> <li>600 - 699: decent</li><li>400 - 599: average</li><li>200 - 399: slow</li> <li>Below 200: sluggish</li> </ul>   </div>">Turning speed:</span></div>

                                                    `: "" }
                                                    ${unitData.energyMake != undefined && unitData.energyMake != "n/a" && unitData.energyMake != 0 ? `
                                                <div class="parameter-name">Energy make:</div>

                                                    `: "" }
                                                    ${unitData.energyUse != undefined && unitData.energyUse != 0 ? `
                                                <div class="parameter-name"><span class="tooltip-dotted" data-toggle="popover" data-placement="right" data-content="<div class='tooltip-content'><span class='tooltip-title'>Energy drain</span>This parameter shows how much energy a unit drains. This includes only: <ul><li>Cloaking</li><li>Turned on units/buildings (jammers, radars, metal makers, galactic gates and more)</li><li>Moving (e.g. Spy kbot drains 450 E/s while moving with cloaking)</li></ul> </br> <b style='color: #DEA73C;'> Warning! </b> This parameter doesn't show energy drain while shooting (e.g. green lasers from Gaat).</div">Energy drain:</span></div>

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
            <div class="tab-pane fade" id="nav-strategy" role="tabpanel" aria-labelledby="nav-strategy-tab"></div>
            <div class="tab-pane fade" id="nav-pros-cons" role="tabpanel" aria-labelledby="nav-pros-cons-tab"></div>
            <div class="tab-pane fade" id="nav-what-can-build" role="tabpanel" aria-labelledby="nav-what-can-build-tab"><div class="can-build"></div></div>
            <div class="tab-pane fade" id="nav-built-by" role="tabpanel" aria-labelledby="nav-built-by"><div class="built-by"><p>Built by:</p></div></div>
        </div>
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

function GoBack() {

}