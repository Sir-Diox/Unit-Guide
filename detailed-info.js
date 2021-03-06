var previousUnitsListHTML = [];
var previousUnitsListNames = [];
var template = "";
var mobileTemplate = "";
var upgradeTemplate = "";
var generalInfoTemplate = "";
var comparisonTemplate = "";
var chosenUnitsArray = [];
var weaponsArray = [];
var canBuildHTML = "";
var builtByHTML = "";
var unitsInComparison = "";
var wordsInCp = [];
var u1;
var u2;
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

$('body').on('click', '#nav-tips-tab', function () {
    if ($('.dt-tips').has("li").length == 0) {
        $('#nav-tips div.exo2-26').text("No tips available for this unit.");
    }
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

document.addEventListener('scroll', function (event) {
    if (event.target.id === 'unit-dt-info-overlay') {   
        myFunction();
    }
}, true);
$('body').on('click', '.back-to-main-page', function () {
    $('#unit-dt-info-overlay').fadeOut(50);
    $('#unit-dt-info-overlay').html("");
    $('#unit-dt-info-overlay').css("z-index", "-1");
    $('body').css("overflow", "auto");

});


function myFunction() {
    if ($("#unit-dt-info-overlay").scrollTop() > 0) {
        if ($("#mobile-unit-nav").height() > 55) {
            document.getElementById("mobile-unit-nav").className = "unit-name-scroll-sticky teko-29";
            $(".unit-description-text").css("padding", "82px 25px 3px 25px");
        } else {
            document.getElementById("mobile-unit-nav").className = "unit-name-scroll-sticky teko-29";
            $(".unit-description-text").css("padding", "55px 25px 10px 25px");
        }

    } else {

        if ($("#mobile-unit-nav").height() > 55) {
            document.getElementById("mobile-unit-nav").className = "unit-name-text unit-name-mobile-dt teko-29 white";
            $(".unit-description-text").css("padding", "82px 25px 3px 25px");
        }
        else {
            document.getElementById("mobile-unit-nav").className = "unit-name-text unit-name-mobile-dt teko-29 white";
            $(".unit-description-text").css("padding", "55px 25px 10px 25px");
        }
    }
}

$('body').on('click', '.unit-box, .u-name, .search-input-row, #search-input-results-6 .row-result', function () {
    generateDetailedInfo(this);
});

function generateDetailedInfo(val) {
    if (!isMobileDevice()) {
        $(".navbar").css("right", "17px");
    }
    else {
        window.location.hash = "#unit-details";
    }
    if ($(val).hasClass("u-name")) {
        var obj = $(val).parent().parent().children().eq(0);
    }
    else {
        var obj = $(val);
    }
    if (previousUnitsListHTML.length == 0) {
        $("#prev-unit").parent().hide();
    }
    else {
        $("#prev-unit").parent().show();
    }
    $('[data-toggle="popover"]').popover('hide');
    template = "";
    if (!isMobileDevice()) {
        $('#detailed-unit-info-1').modal('show');
    }
    var ctr = 0;

    var unitName = $(obj).attr("uname");
    unitData.name = unitName;
    var unitSide = $(obj).attr("side");
    unitData.imgSrc = $(obj).attr("style");
    unitImg = $(obj).attr("img");
    if (unitImg != undefined) {
        unitData.imgSrc = unitImg;
    }
    for (i = 0; i < csvObj.length; i++) {
        if (ctr < 1) {
            if (csvObj[i].name === unitName && csvObj[i].side.toLowerCase() === unitSide) {
                ctr++;

                unitData.energyCost = csvObj[i].buildcostenergy;
                unitData.metalCost = csvObj[i].buildcostmetal;
                unitData.name = csvObj[i].name;
                unitData.HP = csvObj[i].maxdamage;
                unitData.movementSpeed = csvObj[i].maxvelocity;
                unitData.flyingSpeed = unitData.movementSpeed;
                unitData.description = csvObj[i].description;
                unitData.canMove = csvObj[i].canmove;
                unitData.canAttack = csvObj[i].canattack;
                unitData.energyStorage = csvObj[i].energystorage;
                unitData.side = $(obj).attr("side");
                unitData.acceleration = csvObj[i].acceleration;
                unitData.summoningCode = csvObj[i].objectname.toLowerCase();
                unitData.sightRange = csvObj[i].sightdistance;
                unitData.buildSpeed = csvObj[i].workertime;
                unitData.canBuild = csvObj[i].canbuild;
                unitData.builtBy = csvObj[i].builtby;

                if ((csvObj[i].weapon1.indexOf("RANGE") >= 0 || csvObj[i].weapon1.indexOf("NULL") >= 0) && csvObj[i].weapon2 != "") {
                    unitData.weapon1ObjectName = csvObj[i].weapon2;
                } else if ((csvObj[i].weapon1.indexOf("RANGE") >= 0 || csvObj[i].weapon1.indexOf("NULL") >= 0) && csvObj[i].weapon2 == "" && csvObj[i].weapon3 != "") {
                    unitData.weapon1ObjectName = csvObj[i].weapon3;
                } else {
                    unitData.weapon1ObjectName = csvObj[i].Weapon1;
                }
                unitData.weapon2ObjectName = csvObj[i].weapon2;
                if (csvObj[i].weapon2 == "" || (csvObj[i].weapon2.indexOf("RANGE") >= 0 || csvObj[i].weapon2.indexOf("NULL") >= 0) && csvObj[i].weapon3 != "") {
                    unitData.weapon2ObjectName = csvObj[i].weapon3;
                } else {
                    if (csvObj[i].weapon3.indexOf("RANGE") >= 0 || csvObj[i].weapon3.indexOf("NULL") >= 0) {
                        unitData.weapon2ObjectName = "";
                    }else {
                        unitData.weapon3ObjectName = csvObj[i].weapon3;
                    }
                }


                $(".modal-title").text(unitName);
                $(".unit-desc").text(unitData.description);
                $(".detailed-info-wrapper").html("");

                weapons.w2 = $(obj).attr("w2"); // for checking if unit has more than 1 weapon (in template)
                unitData.radarRange = csvObj[i].radardistance;
                unitData.jammerRange = csvObj[i].radardistancejam;
                unitData.builder = csvObj[i].builder;
                unitData.buildRange = csvObj[i].builddistance;
                unitData.minMetalCostForE = "";
                unitData.maxMetalCostForE = "";
                unitData.isAntiAir1 = $(obj).attr("w1-AA");
                unitData.isAntiAir2 = $(obj).attr("w2-AA");
                unitData.isAntiAir3 = $(obj).attr("w3-AA");
                unitData.isMineOrClawlingBomb = csvObj[i].kamikaze;
                weapons.w1_rt = $(obj).attr("w1-rt");
                unitData.onlyDps = $(obj).attr("only-dps");
                unitData.p1 = $(obj).attr("p1");

                // additional info
                unitData.buildTime = csvObj[i].buildtime;
                unitData.maxSlope = csvObj[i].maxslope;
                unitData.energyMake = csvObj[i].energymake;
                unitData.energyUse = csvObj[i].energyuse;
                unitData.turnRate = csvObj[i].turnrate;
                unitData.cloakCost = csvObj[i].cloakcost;
                unitData.energyStorage = csvObj[i].energystorage;
                unitData.metalStorage = csvObj[i].metalstorage;
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
                            thirdParameter = "E income / M cost ratio<sup>2</sup>:"
                        }
                    }

                    unitData.sup1 = $(obj).attr("sup1");
                    unitData.sup2 = $(obj).attr("sup2");
                }
                if (isMobile && ($(obj).attr("w2") != undefined)) {
                    resetParameterBars();
                    setLabelParametersAndValues(checkUnitType());
                    countDpsAndRange(obj);
                    setParameterBars();
                    setWeaponsAA(obj);
                }
                else if ($(obj).attr("w2") != undefined) { // for 2 or more weapons
                    resetParameterBars();
                    setLabelParametersAndValues(checkUnitType());
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
                    getDataFromWeaponsCSV(2);  // 2 - number of weapons (or more)

                }
                else if ($(obj).attr("w1") != undefined) { // for 1 weapon only
                    resetParameterBars();
                    setLabelParametersAndValues(checkUnitType());
                    unitData.explosionDamage = $(obj).attr("w1");
                    weapons.w1_rt = $(obj).attr("w1-rt");
                    unitData.dps = Math.round(unitData.explosionDamage / weapons.w1_rt);
                    unitData.overallDps = unitData.dps;
                    unitData.range = $(obj).attr("w1-r");
                    unitData.biggestRange = unitData.range;
                    setParameterBars();
                    getDataFromWeaponsCSV(1);  // 1 - number of weapons
                }


                unitTypeObj = checkUnitType();

                if (unitTypeObj.isBuildingType) {
                }
                else if (csvObj[i].damagemodifier != "") {
                    unitData.HP = csvObj[i].maxdamage / csvObj[i].damagemodifier;
                }

                if (unitTypeObj.isFighter) {
                    if ((unitData.name == "Croc" || unitData.name == "Gimp" || unitData.name == "Triton" || unitData.name == "Defiler")) {
                        unitData.HP = unitData.HP / 4;
                    }
                }

                if (obj.attr("upgrade") != undefined) {
                    upgradeData.name = "r";
                }

                unitData.p1 = $(obj).attr("p1");
                unitData.p2 = $(obj).attr("p2");
                unitData.p3 = $(obj).attr("p3");
                unitData.p4 = $(obj).attr("p4");


                fillGeneralInfoTemplate();
                ChangeColorOfKeywords();
                if (!isMobileDevice()) {
                    if (weapons.w3 != "") {
                        fillHtmlTemplateFor3();
                    }
                    else {
                        fillHtmlTemplate();
                    }
                }
                else {
                    fillGeneralInfoTemplate();
                    $(".detailed-info-wrapper").append('<div class="built-by"></div><div class="can-build"></div>'); // to let built by and can build work on mobile.
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
                        if (csvObj[i].objectname === upgradeName) {
                            upgradeData.name = csvObj[i].name;
                            upgradeData.metalCost = csvObj[i].buildcostmetal;
                            upgradeData.energyCost = csvObj[i].buildcostenergy;
                            upgradeData.description = csvObj[i].description;
                            upgradeData.imgSrc = csvObj[i].objectname.replace("_", "-").toLowerCase();
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

    if (isMobileDevice()) {
        // for mobile
        setTimeout(function () {

            $("#unit-dt-info-overlay").scrollTop(0);
            $('#unit-dt-info-overlay').html("");
            canBuildHTML = $(".can-build").html();
            builtByHTML = $(".built-by").html();
            if (!(generalInfoTemplate.indexOf("li") >= 0)) {
                generalInfoTemplate = '<div class="white exo2-16" style="text-align:center">No tips available for this unit.<div>';
            }
            fillMobileTemplate();
            $('#unit-dt-info-overlay').append(mobileTemplate);



            $('#unit-dt-info-overlay').css("z-index", "3000");
            $('#unit-dt-info-overlay').addClass("fix-dt-desc");
            if ($("#mobile-unit-nav").height() > 55) {
                $(".unit-description-text").css("padding", "82px 25px 3px 25px");
            }
            $('#unit-dt-info-overlay').removeClass("fix-dt-desc");
            $('body').css("overflow", "hidden");
            $('#unit-dt-info-overlay').fadeIn(300, function () {

            });

        }, 30);

        //openDtInfo();
        //$('#unit-dt-info-overlay').addClass("show-dt");
        //$('#unit-dt-info-overlay').css("display", "block");
        //$('#unit-dt-info-overlay').css("z-index", "3000");
        //openDtInfo();
        //$('body').css("overflow", "hidden");
//        var opened = window.open("", "_blank"); 
//        opened.document.write(`

//<!DOCTYPE html>
//<html lang="en">
//<head>
//    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
//    <link rel="shortcut icon" href="favicon.ico" />
//    <meta name="viewport" content="width=device-width, initial-scale=1.0">
//    <link href="https://fonts.googleapis.com/css?family=Teko:400,500,600,700" rel="stylesheet">
//    <link href="https://fonts.googleapis.com/css?family=Exo+2:300,400,600,700" rel="stylesheet">
//    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
//    <link rel="stylesheet" href="styles.css">
//    <link rel="stylesheet" href="perfect-scrollbar.css">
//    <link rel="stylesheet" href="./fontawesome/css/all.css">
//    <script src="jquery-3.3.1.min.js"></script>
//    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
//    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
//    <script src="jquery.csv.min.js"></script>
//</head>

//<body>${mobileTemplate}
//<script>

//        $("body").on("click", ".back-to-main-page", function () {
//            window.close();
//        });

//window.onscroll = function() {myFunction()};

//function myFunction() {
//  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
//    if($("#mobile-unit-nav").height() > 55){
//        document.getElementById("mobile-unit-nav").className = "unit-name-scroll-sticky teko-29";
//        $(".unit-description-text").css("padding", "82px 25px 3px 25px");
//    }else{
//    document.getElementById("mobile-unit-nav").className = "unit-name-scroll-sticky teko-29";
//    $(".unit-description-text").css("padding", "55px 25px 10px 25px");
//    }

//  } else {
//        if($("#mobile-unit-nav").height() > 55){
//            document.getElementById("mobile-unit-nav").className = "unit-name-text unit-name-mobile-dt teko-29 white";
//            $(".unit-description-text").css("padding", "82px 25px 3px 25px");
//        }
//        else{
//        document.getElementById("mobile-unit-nav").className = "unit-name-text unit-name-mobile-dt teko-29 white";
//        $(".unit-description-text").css("padding", "55px 25px 10px 25px");
//        }
//  }
//}
//</script>
//</body>
//</html>`
//        );
        closeNav();
        $("#search-input-6").val("");
        $("#search-input-results-6").html("");
    }

}

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
            <div class="summoning-code exo2-16" data-toggle="popover" data-placement="right" data-content="<div class='tooltip-content'><span class='tooltip-title'>Summoning code</span>You can type this code in game to summon a <span style='font-weight:600'>${unitData.name}</span>. Just press Enter and type: <span style='color: #DEA73C; font-weight:500'>+${unitData.summoningCode}</span>. Then you can press Insert key to summon more.</br> It always works in single player. If you want to summon a unit in multiplayer, you have to switch <b>Cheat codes</b> (in game's lobby) to <b>Allowed</b> before starting a game. This is very handy when you want to test units. </br></br><p style='font-weight:600'>Useful codes:</p><ul><li><span style='color: #DEA73C; font-weight:500'>+los</span> - infinite view.</li><li><span style='color: #DEA73C; font-weight:500'>+corcheat</span> - almost infinite resources.</li> <li><span style='color: #DEA73C; font-weight:500'>+corkrog 1</span> - summons a Krogoth for another player (numbers from 1 to 9 are other players).</li><li><span style='color: #DEA73C; font-weight:500'>+showranges</span> - type it, then select a unit and hold Shift key to see many types of ranges.</li></ul> </div>"><span class="tooltip-dotted">Summoning</span> <span class="tooltip-dotted">code</span></div><span class="summoning-code-text exo2-16">+${unitData.summoningCode}</span>
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
                <a class="nav-item nav-link" id="manufacture-info-tab" data-toggle="tab" href="#nav-manufacture-info" role="tab" aria-controls="nav-manufacture-info" aria-selected="false">Production</a>
          </li>
        </ul>

        <div class="tab-content" id="tab-content">
            <div class="tab-pane fade show active" id="nav-statistics" role="tabpanel" aria-labelledby="nav-statistics-tab"><div class="unit-statistics">


       ${fillStatisticsInfo()}

</div></div>
<div class="tab-pane fade" id="nav-manufacture-info" role="tabpanel" aria-labelledby="manufacture-info-tab"><div class="exo2-26 detailed-info-header built-by"></div><div class="can-build"></div></div>
            <div class="tab-pane fade" id="nav-tips" role="tabpanel" aria-labelledby="nav-tips-tab">
                                                <div class="detailed-info-header exo2-26">
                                                Tips & trivia
                                                </div>
                                                ${generalInfoTemplate}

</div>
        </div>
`
}

function fillUpgradeTemplate() {
    upgradeTemplate =
        `<span class="plus-upgrade">+</span>
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

function fillStatisticsInfo() {
    var template = `                            
                                <div class="unit-basic-stats">

                                <div class="exo2-26 detailed-info-header">${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber ? `
                                                Combat stats
`: `Basic stats`}</div>
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
                                    </div>
                                   <div class="col col-lg-6 no-padding">  

                                            ${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther ? `                     
                                                <div class="parameter-bar-and-value ${ShineEffect.ForDPS}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleDps}"> </div>
                                                    <img src="${dps_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.dps)}</div>
                                                </div>

                                            ` : ""}
                                            ${unitTypeObj.isCons || unitTypeObj.isCom || unitTypeObj.isAirCons || unitTypeObj.isLab || unitTypeObj.isSemiCon ? `
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
                                            ${unitTypeObj.isEco || unitTypeObj.isBuilding ? `
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
                                                    ${unitTypeObj.isEco && unitData.minEnergyIncome != undefined ? `
                                                        <div class="parameter-bar-and-value ${ShineEffect.ForMinMetalCostForE}">
                                                        <div class="box-shadow-for-bar" style="${boxShadowsMinMetalCostForE}"></div>
                                                            <img src="${minMetalCostForE_SrcImg}" class="parameter-bar" alt="">
                                                            <div class="parameter-value">${unitData.ratioMin}</div>
                                                    </div>
                                                    ` : ""}
                                             ${unitTypeObj.isCons || unitTypeObj.isCom || unitTypeObj.isAirCons || unitTypeObj.isSemiCon ? `
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
                                                    ${unitTypeObj.isEco && unitData.maxEnergyIncome != undefined && unitData.minEnergyIncome != undefined ? `
                                                        <div class="parameter-bar-and-value ${ShineEffect.ForMaxMetalCostForE}">
                                                        <div class="box-shadow-for-bar" style="${boxShadowsMaxMetalCostForE}"></div>
                                                            <img src="${maxMetalCostForE_SrcImg}" class="parameter-bar" alt="">
                                                            <div class="parameter-value">${unitData.ratioMax}</div>
                                                        </div>
                                                    ` : ""}
                                            ${unitTypeObj.isCons || unitTypeObj.isCom || unitTypeObj.isAirCons || unitTypeObj.isSemiCon || unitTypeObj.isNuke ? `
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
                                            ${unitTypeObj.isUndefinedBuilding || unitTypeObj.isUndefinedAircraft || unitTypeObj.isUndefinedUnit ? `
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
                                            ${unitTypeObj.isCons || unitTypeObj.isCom || unitTypeObj.isSemiCon || unitTypeObj.isUndefinedUnit ? `
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
                                            ${unitTypeObj.isUndefinedBuilding || unitTypeObj.isUndefinedAircraft || unitTypeObj.isUndefinedUnit ? `
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
                                            ${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isFighterDpsOnly || unitTypeObj.isAirCons || unitTypeObj.isCons || unitTypeObj.isCom || unitTypeObj.isSemiCon ? `
                                                <div class="parameter-bar-and-value ${ShineEffect.ForSightD}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStylesightRange}"></div>
                                                    <img src="${sightRange_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(unitData.sightRange)}</div>
                                                </div>
                                            ` : ""}
                                            </div>
                                </div>
                                <div class="exo2-26 detailed-info-header">${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber ? `
                                                Weapon's details
                                `: ""}</div>
                                <div class="row" style="margin:0;">
                                    <div class="col col-lg-6 no-padding">
                                        ${weapons.w2 == undefined && weaponsData.w1.name != "" && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                        <div class="parameter-name">Weapon name: </div>
                                        ` : ""}
                                        ${unitData.onlyDps == undefined && weapons.w2 == undefined && (unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly) ? `                
                                        <div class="parameter-name">Reload time: </div>
                                        ` : ""}
                                        ${weapons.w2 == undefined && weaponsData.w1.velocity != "" && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                        <div class="parameter-name">Weapon velocity: </div>
                                        ` : ""}
                                        ${weapons.w2 == undefined && weaponsData.w1.aoe != "" && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                        <div class="parameter-name">Area Of Effect: </div>
                                        ` : ""}
                                        ${weapons.w2 == undefined && weaponsData.w1.tolerance != "" && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                        <div class="parameter-name">Tolerance: </div>
                                        ` : ""}
                                        ${weapons.w2 == undefined && weaponsData.w1.turnRate != "" && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                        <div class="parameter-name">Weapon's turn rate: </div>
                                        ` : ""}
                                        ${weapons.w2 == undefined && weaponsData.w1.energyPerShot != "" && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                        <div class="parameter-name">Energy per shot: </div>
                                        ` : ""}
                                        </div>


                                        <div class="col col-lg-6 no-padding">
                                        ${weapons.w2 == undefined && weaponsData.w1.name != "" && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                               
                                            <div class="parameter-value-nobar">${weaponsData.w1.name}</div>
                                        ` : ""}
                                        ${unitData.onlyDps == undefined && weapons.w2 == undefined && (unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther) ? `                     
                                            <div class="parameter-value-nobar">${weapons.w1_rt} s</div>
                                        ` : ""}
                                        ${weapons.w2 == undefined && weaponsData.w1.velocity != "" && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly ||  unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                            <div class="parameter-value-nobar">${weaponsData.w1.velocity}</div>
                                        ` : ""}
                                        ${weapons.w2 == undefined && weaponsData.w1.aoe != "" && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                            <div class="parameter-value-nobar">${weaponsData.w1.aoe}</div>
                                        ` : ""}
                                        ${weapons.w2 == undefined && weaponsData.w1.tolerance != "" && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                            <div class="parameter-value-nobar">${weaponsData.w1.tolerance}</div>
                                        ` : ""}
                                        ${weapons.w2 == undefined && weaponsData.w1.turnRate != "" && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                            <div class="parameter-value-nobar">${weaponsData.w1.turnRate}</div>
                                        ` : ""}
                                        ${weapons.w2 == undefined && weaponsData.w1.energyPerShot != "" && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                            <div class="parameter-value-nobar">${weaponsData.w1.energyPerShot}</div>
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
                                                <div class="parameter-name"><span class="${(!isMobile) ? `tooltip-dotted`:""}" data-toggle="popover" data-placement="right" data-content="<div class='tooltip-content'><span class='tooltip-title'>Build time</span>This parameter shows how much time is needed to build a unit or structure. </br><span style='color: #DEA73C;'>Build time / Build speed = time in seconds </span> </br> <b>Example:</b></br> Commander with a build speed of 360 builds a <b>${unitData.name}</b> with a build time of ${setSpacesInBigNumbers(unitData.buildTime)} needs: </br><span style='color: #DEA73C;'> ${setSpacesInBigNumbers(unitData.buildTime)} / 360 = <b>${(unitData.buildTime / 360).toFixed(2)} seconds </b></span> </br> Remember to add lab's build speed to it, to be exact. </div>">Build time:</span></div>
                                                    `: `
                                                <div class="parameter-name"><span class="${(!isMobile) ? `tooltip-dotted` : ""}" data-toggle="popover" data-placement="right" data-content="<div class='tooltip-content'><span class='tooltip-title'>Build time</span>This parameter shows how much time is needed to build a unit or structure. </br><span style='color: #DEA73C;'>Build time / Build speed = time in seconds </span> </br> <b>Example:</b></br> Commander with a build speed of 360 builds a <b>${unitData.name}</b> with a build time of ${setSpacesInBigNumbers(unitData.buildTime)} needs: </br><span style='color: #DEA73C;'> ${setSpacesInBigNumbers(unitData.buildTime)} / 360 = <b>${(unitData.buildTime / 360).toFixed(2)} seconds </b></span> </div>">Build time:</span></div>
                                                    ` }
                                                    ${unitData.turnRate != "" && unitData.turnRate != undefined ? `
                                                <div class="parameter-name"><span class="${(!isMobile) ? `tooltip-dotted` : ""}" data-toggle="popover" data-placement="right" data-content="<div class='tooltip-content'><span class='tooltip-title'>Turn speed</span>This parameter shows how fast a unit turns to change its direction. The lower a value, the slower a unit turns around. Turn speed may be important when you want to change direction to espace from an incoming threat or when you want to avoid an obstacle.</br> </br><span style='color: #DEA73C;'><b>Turn speed ranges:</b> </span> </br> <ul><li>Above 900: very fast</li><li>700 - 900: fast</li> <li>600 - 699: decent</li><li>400 - 599: average</li><li>200 - 399: slow</li> <li>Below 200: sluggish</li> </ul>   </div>">Turn speed:</span></div>

                                                    `: ""}
                                                    ${unitData.energyMake != undefined && unitData.energyMake != "" && unitData.energyMake != 0 ? `
                                                <div class="parameter-name">Energy make:</div>

                                                    `: ""}
                                                    ${unitData.energyUse != undefined && unitData.energyUse != 0  && unitData.energyMake != 0 ? `
                                                <div class="parameter-name"><span class="${(!isMobile) ? `tooltip-dotted` : ""}" data-toggle="popover" data-placement="right" data-content="<div class='tooltip-content'><span class='tooltip-title'>Energy use</span>This parameter shows how much energy a unit use. This includes only: <ul><li>Cloaking</li><li>Turned on units/buildings (jammers, radars, metal makers, galactic gates and more)</li><li>Moving (most units drain up to 1E/s while moving)</li></ul> </br> <b style='color: #DEA73C;'> Warning! </b> This parameter doesn't show energy use while shooting (e.g. green lasers from Gaat).</div">Energy use:</span></div>

                                                    `: ""}
                                                    ${unitData.energyStorage != undefined && unitData.energyStorage != 0 ? `
                                                <div class="parameter-name">Energy storage:</div>

                                                    `: ""}
                                                    ${unitData.metalStorage != 0 && unitData.metalStorage != undefined ? `
                                                <div class="parameter-name">Metal storage:</div>

                                                    `: ""}
                                                    ${unitData.cloakCost != "" ? `
                                                <div class="parameter-name">Cloak cost:</div>

                                                    `: ""}

                                            </div>

                                            <div class="col col-lg-6 no-padding">
                                                    ${unitData.buildTime != undefined ? `
                                                    <div class="parameter-val">${setSpacesInBigNumbers(unitData.buildTime)}</div>
                                                    `: ""}
                                                    ${unitData.turnRate != "" && unitData.turnRate != undefined ? `
                                                    <div class="parameter-val">${unitData.turnRate}</div>
                                                    `: ""}
                                                    ${unitData.energyMake != undefined && unitData.energyMake != "" && unitData.energyMake != 0 ? `
                                                    <div class="parameter-val">${unitData.energyMake}</div>
                                                    `: ""}
                                                    ${unitData.energyUse != undefined && unitData.energyUse != 0 && unitData.energyMake != 0 ? `
                                                    <div class="parameter-val">${unitData.energyUse}</div>
                                                    `: ""}
                                                    ${unitData.energyStorage != undefined && unitData.energyStorage != 0 ? `
                                                    <div class="parameter-val">${setSpacesInBigNumbers(unitData.energyStorage)}</div>
                                                    `: ""}
                                                    ${unitData.metalStorage != 0 && unitData.metalStorage != undefined ? `
                                                    <div class="parameter-val">${setSpacesInBigNumbers(unitData.metalStorage)}</div>
                                                    `: ""}
                                                    ${unitData.cloakCost != "" ? `
                                                    <div class="parameter-val">${setSpacesInBigNumbers(unitData.cloakCost)}</div>
                                                    `: ""}
                                            </div>
                                        </div>
                                      </div>`;
    return template;
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
    var template =
        `
    <div class="exo2-26 detailed-info-header">
        <p>${unitData.name} <span style="font-weight:normal;">is built by:</span></p>
        </div>`;
    $('.built-by').append(template);
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

    for (i = 0; i < buildingsList.length; i++) {
        var html = $('<div />').append(buildingsList[i]).addClass("name-image-box");

        $(".built-by").append(html);
    }
}

function generateOtherStats(obj) {
    //reload time
    if (!isMobile) {
        if ($(obj).attr("w2") != undefined) {

        }
        if (unitData.unitName == "Pyro" || unitData.unitName == "Peewee" || unitData.unitName == "Reaper" || unitData.unitName == "Warrior" || unitData.unitName == "flash" || unitData.unitName == "Salamander" || unitData.unitName == "Brawler" || unitData.unitName == "Immolator") {

        } else {
            $(".other-stats").append(unitData.reloadTime_w1);
        }
    }
}

function getDataFromWeaponsCSV(numberOfWeapons) {

    if (numberOfWeapons == 1) {
        for (j = 0; j < weaponsObj.length; j++) {
            if (weaponsObj[j].WEAPONOBJECT === unitData.weapon1ObjectName) {
                weaponsData.w1.velocity = weaponsObj[j].weaponvelocity;
                weaponsData.w1.aoe = weaponsObj[j].areaofeffect;
                weaponsData.w1.name = weaponsObj[j].name;
                weaponsData.w1.tolerance = weaponsObj[j].tolerance;
                weaponsData.w1.energyPerShot = weaponsObj[j].energypershot;
            }
        }
    }
    else {
        for (j = 0; j < weaponsObj.length; j++) {
            if (weaponsObj[j].WEAPONOBJECT === unitData.weapon1ObjectName) {
                weaponsData.w1.velocity = weaponsObj[j].weaponvelocity;
                weaponsData.w1.aoe = weaponsObj[j].areaofeffect;
                weaponsData.w1.name = weaponsObj[j].name;
                weaponsData.w1.tolerance = weaponsObj[j].tolerance;
                weaponsData.w1.energyPerShot = weaponsObj[j].energypershot;
            }
            if (weaponsObj[j].WEAPONOBJECT === unitData.weapon2ObjectName) {
                weaponsData.w2.velocity = weaponsObj[j].weaponvelocity;
                weaponsData.w2.aoe = weaponsObj[j].areaofeffect;
                weaponsData.w2.name = weaponsObj[j].name;
                weaponsData.w2.tolerance = weaponsObj[j].tolerance;
                weaponsData.w2.energyPerShot = weaponsObj[j].energypershot;
            }
            if (weaponsObj[j].WEAPONOBJECT === unitData.weapon3ObjectName) {
                weaponsData.w3.velocity = weaponsObj[j].weaponvelocity;
                weaponsData.w3.aoe = weaponsObj[j].areaofeffect;
                weaponsData.w3.name = weaponsObj[j].name;
                weaponsData.w3.tolerance = weaponsObj[j].tolerance;
                weaponsData.w3.energyPerShot = weaponsObj[j].energypershot;
            }
        }
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
                <a class="nav-item nav-link" id="manufacture-info-tab" data-toggle="tab" href="#nav-manufacture-info" role="tab" aria-controls="nav-manufacture-info" aria-selected="false">Production</a>
          </li>
        </ul>

        <div class="tab-content" id="tab-content">
            <div class="tab-pane fade show active" id="nav-statistics" role="tabpanel" aria-labelledby="nav-statistics-tab"><div class="unit-statistics">


                            <div class="unit-basic-stats">

                                <div class="exo2-26 detailed-info-header">Combat stats</div>
                                <div class="row" style="margin:0; margin-top: 30px; padding-bottom: 25px; border-bottom: 1px solid #525252; padding-left: 22px;">
                                    <div class="col col-lg-3 no-padding" style="top: 24px;">
                                        <div class="parameter-name">${firstParameter}</div>
                                        <div class="parameter-name">${secondParameter}</div>
                                        ${unitData.onlyDps == undefined && !unitTypeObj.isAirFigther ? `
                                        <div class="parameter-name">${thirdParameter}</div>                                       
                                        ` : ""}
                                        ${!isMobile && unitData.onlyDps == undefined ? `<div class="parameter-name">Reload time: </div>` : ""}
                                        ${(weaponsData.w1.velocity != "" || weaponsData.w2.velocity != "" || weaponsData.w3.velocity != "") && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                        <div class="parameter-name">Weapon velocity: </div>
                                        ` : ""}
                                        ${(weaponsData.w1.aoe != "" || weaponsData.w2.aoe != "" || weaponsData.w3.aoe != "") && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                        <div class="parameter-name">Area Of Effect: </div>
                                        ` : ""}
                                        ${(weaponsData.w1.tolerance != "" || weaponsData.w2.tolerance != "" || weaponsData.w3.tolerance != "") && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                        <div class="parameter-name">Tolerance: </div>
                                        ` : ""}
                                        ${ (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                        <div class="parameter-name">Energy per shot: </div>
                                        ` : ""}
                                    </div>
                            

                                    <div class="col col-lg-3 brd" style="max-width: 22%; border-right: 1px solid #525252; border-left: 1px solid #525252; margin-left: 8px;">
                                            <div class="unit-weapon">Weapon 1 ${unitData.isAntiAir1 ? `(AA)` : ""}</div>
                                            ${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther ? `                     
                                                <div class="parameter-bar-and-value ${ShineEffect.ForDPS}">
                                                <div class="box-shadow-for-bar" style="${boxShadowsStyleDps}"> </div>
                                                    <img src="${dps_SrcImg}" class="parameter-bar" alt="">
                                                    <div class="parameter-value">${setSpacesInBigNumbers(weapons.w1_dps)}</div>
                                                </div>

                                            ` : ""}

                                        ${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isBomber ? `
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
                                            <div class="parameter-value-nobar-3">${weapons.w1_rt} s</div>
                                            ` : ""}
                                        ${weaponsData.w1.velocity != "" && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                            <div class="parameter-value-nobar-3">${weaponsData.w1.velocity}</div>
                                            ` : `<div class="parameter-value-nobar-3">-</div>`}
                                        ${weaponsData.w1.aoe != "" && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                            <div class="parameter-value-nobar-3">${weaponsData.w1.aoe}</div>
                                            ` : `<div class="parameter-value-nobar-3">-</div>`}
                                        ${weaponsData.w1.tolerance != "" && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                            <div class="parameter-value-nobar-3">${weaponsData.w1.tolerance}</div>
                                            ` : `<div class="parameter-value-nobar-3">-</div>`}
                                        ${weaponsData.w1.energyPerShot != "" && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                            <div class="parameter-value-nobar-3">${weaponsData.w1.energyPerShot}</div>
                                            ` : `<div class="parameter-value-nobar-3">-</div>`}

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

                                        ${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isBomber  ? `
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
                                            <div class="parameter-value-nobar-3">${weapons.w2_rt} s</div>
                                            ` : ""}
                                        ${weaponsData.w2.velocity != "" && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                            <div class="parameter-value-nobar-3">${weaponsData.w2.velocity}</div>
                                            ` : `<div class="parameter-value-nobar-3">-</div>`}
                                        ${weaponsData.w2.aoe != "" && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                            <div class="parameter-value-nobar-3">${weaponsData.w2.aoe}</div>
                                            ` : `<div class="parameter-value-nobar-3">-</div>`}
                                        ${weaponsData.w2.tolerance != "" && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                            <div class="parameter-value-nobar-3">${weaponsData.w2.tolerance}</div>
                                            ` : `<div class="parameter-value-nobar-3">-</div>`}
                                        ${weaponsData.w2.energyPerShot != "" && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                            <div class="parameter-value-nobar-3">${weaponsData.w2.energyPerShot}</div>
                                            ` : `<div class="parameter-value-nobar-3">-</div>`}
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

                                        ${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isBomber ? `
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
                                            <div class="parameter-value-nobar-3">${weapons.w3_rt} s</div>
                                            ` : ""}
                                        ${weaponsData.w3.velocity != "" && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                            <div class="parameter-value-nobar-3">${weaponsData.w3.velocity}</div>
                                            ` : `<div class="parameter-value-nobar-3">-</div>`}
                                        ${weaponsData.w3.aoe != "" && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                            <div class="parameter-value-nobar-3">${weaponsData.w3.aoe}</div>
                                            ` : `<div class="parameter-value-nobar-3">-</div>`}
                                        ${weaponsData.w3.tolerance != "" && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                            <div class="parameter-value-nobar-3">${weaponsData.w3.tolerance}</div>
                                            ` : `<div class="parameter-value-nobar-3">-</div>`}
                                        ${weaponsData.w3.energyPerShot != "" && (unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isDefenseShootingBuildingDpsOnly || unitTypeObj.isAirFigther || unitTypeObj.isBomber) ? `                
                                            <div class="parameter-value-nobar-3">${weaponsData.w3.energyPerShot}</div>
                                            ` : `<div class="parameter-value-nobar-3">-</div>`}
 
                                    </div>
`: ""}


                                </div>
<div class="row" style="margin:0; margin-top: 15px; width: 100%; position: relative;">
                                    <div class="col col-lg-6 no-padding">
                                        ${unitData.onlyDps != undefined ? `
                                        <div class="parameter-name">${thirdParameter}</div>
                                        ` : ""}
                                        ${unitTypeObj.isAirFigther ? `
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
                                                    ${unitData.turnRate != "" && unitData.turnRate != undefined ? `
                                                <div class="parameter-name"><span class="tooltip-dotted" data-toggle="popover" data-placement="right" data-content="<div class='tooltip-content'><span class='tooltip-title'>Turn speed</span>This parameter shows how fast a unit turns to change its direction. The lower a value, the slower a unit turns around. Turn speed may be important when you want to change direction to espace from an incoming threat or when you want to avoid an obstacle.</br> </br><span style='color: #DEA73C;'><b>Turn speed ranges:</b> </span> </br> <ul><li>Above 900: very fast</li><li>700 - 900: fast</li> <li>600 - 699: decent</li><li>400 - 599: average</li><li>200 - 399: slow</li> <li>Below 200: sluggish</li> </ul>   </div>">Turn speed:</span></div>

                                                    `: ""}
                                                    ${unitData.energyMake != undefined && unitData.energyMake != "" && unitData.energyMake != 0 ? `
                                                <div class="parameter-name">Energy make:</div>

                                                    `: ""}
                                                    ${unitData.energyUse != undefined && unitData.energyUse != 0 && unitData.energyMake != 0 ? `
                                                <div class="parameter-name"><span class="tooltip-dotted" data-toggle="popover" data-placement="right" data-content="<div class='tooltip-content'><span class='tooltip-title'>Energy use</span>This parameter shows how much energy a unit use. This includes only: <ul><li>Cloaking</li><li>Turned on units/buildings (jammers, radars, metal makers, galactic gates and more)</li><li>Moving (most units drain up to 1E/s while moving)</li></ul> </br> <b style='color: #DEA73C;'> Warning! </b> This parameter doesn't show energy use while shooting (e.g. green lasers from Gaat).</div">Energy use:</span></div>

                                                    `: ""}
                                                    ${unitData.energyStorage != undefined && unitData.energyStorage != 0 ? `
                                                <div class="parameter-name">Energy storage:</div>

                                                    `: ""}
                                                    ${unitData.metalStorage != 0 && unitData.metalStorage != undefined ? `
                                                <div class="parameter-name">Metal storage:</div>

                                                    `: ""}
                                                    ${unitData.cloakCost != "" ? `
                                                <div class="parameter-name">Cloak cost:</div>

                                                    `: ""}

                                            </div>

                                            <div class="col col-lg-6 no-padding">
                                                    ${unitData.buildTime != undefined ? `
                                                    <div class="parameter-val">${setSpacesInBigNumbers(unitData.buildTime)}</div>
                                                    `: ""}
                                                    ${unitData.turnRate != "" && unitData.turnRate != undefined ? `
                                                    <div class="parameter-val">${unitData.turnRate}</div>
                                                    `: ""}
                                                    ${unitData.energyMake != undefined && unitData.energyMake != "" && unitData.energyMake != 0 ? `
                                                    <div class="parameter-val">${unitData.energyMake}</div>
                                                    `: ""}
                                                    ${unitData.energyUse != undefined && unitData.energyUse != 0 ? `
                                                    <div class="parameter-val">${unitData.energyUse}</div>
                                                    `: ""}
                                                    ${unitData.energyStorage != undefined && unitData.energyStorage != 0 ? `
                                                    <div class="parameter-val">${setSpacesInBigNumbers(unitData.energyStorage)}</div>
                                                    `: ""}
                                                    ${unitData.metalStorage != 0 && unitData.metalStorage != undefined ? `
                                                    <div class="parameter-val">${setSpacesInBigNumbers(unitData.metalStorage)}</div>
                                                    `: ""}
                                                    ${unitData.cloakCost != "" ? `
                                                    <div class="parameter-val">${setSpacesInBigNumbers(unitData.cloakCost)}</div>
                                                    `: ""}
                                            </div>
                                        </div>
                                      </div>




</div></div>
<div class="tab-pane fade" id="nav-manufacture-info" role="tabpanel" aria-labelledby="manufacture-info-tab"><div class="exo2-26 detailed-info-header built-by"></div> <div class="can-build"></div></div>
            <div class="tab-pane fade" id="nav-tips" role="tabpanel" aria-labelledby="nav-tips-tab">
                                                <div class="detailed-info-header exo2-26">
                                                Tips & trivia
                                                </div>
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

function resetParameterBars() {
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
        ForHP: "",
        ForMS: "",
        ForRange: "",
        ForSightD: "",
        ForBuildSpeed: "",
        ForMinMetalCostForE: "",
        ForMaxMetalCostForE: "",
        ForExplosionRange: ""
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

    unitData.isEco = false;
    unitData.minEnergyIncome = undefined;
    unitData.maxEnergyIncome = undefined;
    duplicateCounter = 0;
    firstParameter = "";
    secondParameter = "";
    thirdParameter = "";
    fourthParameter = "";
    fifthParameter = "";
    sixthParameter = "";
    boxShadowsStyleMovementSpeed = "";
    boxShadowsStyleFlyingSpeed = "";
    boxShadowsStyleHP = "";
    boxShadowsStylesightRange = "";
    boxShadowsStyleBuildSpeed = "";
    boxShadowsStyleBuildRange = "";
    boxShadowsStyleRadarRange = "";
    boxShadowsStyleJammerRange = "";
    boxShadowsStyleJammerRange = "";
    boxShadowsMinMetalCostForE = "";
    boxShadowsMaxMetalCostForE = "";
    boxShadowsStyleExplosionDamage = "";
    boxShadowsStyleExplosionRange = "";
    unitData.p1 = "";
    unitData.p2 = "";
    unitData.p3 = "";
    unitData.p4 = "";
}

function fillGeneralInfoTemplate() {
    generalInfoTemplate = `


<ol class="dt-tips">

                                               ${unitData.p4 != undefined ? `

                                                    <li class="dt-info-text white">${unitData.p1}</li>
                                                    <li class="dt-info-text white">${unitData.p2}</li>
                                                    <li class="dt-info-text white">${unitData.p3}</li>
                                                    <li class="dt-info-text white">${unitData.p4}</li>
                                                ` : ""}
                                                ${unitData.p3 != undefined && unitData.p4 == undefined ? `
                                                    <li class="dt-info-text white">${unitData.p1}</li>
                                                    <li class="dt-info-text white">${unitData.p2}</li>
                                                    <li class="dt-info-text white">${unitData.p3}</li>
                                                    `: ""}
                                                ${unitData.p2 != undefined && unitData.p3 == undefined && unitData.p4 == undefined ? `
                                                    <li class="dt-info-text white">${unitData.p1}</li>
                                                    <li class="dt-info-text white">${unitData.p2}</li>
                                                    `: ""}
                                                ${unitData.p1 != undefined && unitData.p2 == undefined && unitData.p3 == undefined && unitData.p4 == undefined ? `
                                                    <li class="dt-info-text white">${unitData.p1}</li>
                                                    `: ""}


        ${(unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isFighterDpsOnly || unitTypeObj.isDefenseShootingBuildingDpsOnly) && (unitData.range > 300 || weapons.w1_r > 300) && (unitData.sightRange < parseInt(unitData.range) || unitData.sightRange < parseInt(weapons.w1_r)) ? `
                                                <li class="dt-info-text white">
                                                     ${unitData.name}'s sight range is lower than its weapon's range. Use a radar, scouts or other units <span class="${(!isMobile) ? `tooltip-dotted` : ""}" data-toggle="popover" data-placement="top" data-content="<div class='tooltip-content'><span class='tooltip-title'>Line of Sight (LoS)</span>LoS is the visibility (what your units actually see) on the playing field. Units automatically attack an enemy within their LoS and their weapon's range.<span class="${(!isMobile) ? `tooltip-dotted` : ""}">LoS</span></span> to see an enemy and shoot it from a full distance.
                                                </li>
                                                ` : ""}

        ${(unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly) && (unitData.movementSpeed >= 2 && unitData.metalCost > 200) && (unitData.name != "Spider") && (unitData.builtBy != "ARMSY " && unitData.builtBy != "ARMASY " && unitData.builtBy != "CORASY " && unitData.builtBy != "CORSY ") ? `
                                                <li class="dt-info-text white">
                                                     Speed of ${unitData.name}s is really good. If you manage to slip into the enemy's base, he may have a big problem because it's hard to chase such fast units. Look for important economy buildings and try to destroy them. 
                                                </li>
                                                ` : ""}
        ${(unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly) && (unitData.HP / unitData.metalCost < 4.5) && (unitData.range > 700 || weapons.w1_r > 700) && !unitData.isAntiAir1 ? `
                                                <li class="dt-info-text white">
                                                     ${unitData.name}'s range is pretty good, however its health is rather low. You should protect these units using other tanky units for cover.
                                                </li>
                                                ` : ""}

${(unitTypeObj.isCons || unitTypeObj.isAirCons) && !(unitData.name == "Podger" || unitData.name == "Spoiler") ? `
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

${(unitTypeObj.isFighter || unitTypeObj.isFighterDpsOnly) && (unitData.HP / unitData.metalCost > 8) && (unitData.name != "Pounder") ? `
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

                                                    To make one ${unitData.name} every <span class="bold yellow">5 seconds</span>, your <span style="text-decoration:underline">minimum</span> income should be about:</br><span class="energy-color">Energy</span> +${setSpacesInBigNumbers(Math.ceil(unitData.energyCost / 5))} E/s ${!isMobile ? `&nbsp&nbsp&nbsp&nbsp` : `<br>`} <span class="metal-color">Metal</span> +${setSpacesInBigNumbers(Math.ceil(unitData.metalCost / 5))} M/s ${!isMobile ? `&nbsp&nbsp` : `<br>`}(focusing all resources on ${unitData.name} only!).</br> Required build speed: ${Math.floor(unitData.buildTime / 5)} (about 
${Math.floor((unitData.buildTime / 5) / 360) == 1 ? `
${Math.floor((unitData.buildTime / 5) / 360)}x Tier 2 construction vehicle or ${Math.floor((unitData.buildTime / 5) / 120)}x Tier 1 construction vehicle).
`: `${Math.floor((unitData.buildTime / 5) / 360) == 0 ? `
        ${Math.floor((unitData.buildTime / 5) / 120)}x Tier 1 construction vehicle).` :
                        `${Math.floor((unitData.buildTime / 5) / 360)}x Tier 2 construction vehicle or ${Math.floor((unitData.buildTime / 5) / 120)}x Tier 1 construction vehicle).`}`}
                                                </li >
                                                    `: ""}
                                                ${unitData.metalCost >= 200 ? `                                               
                                                <li class="dt-info-text white">
                                                    To make one ${unitData.name} every <span class="bold yellow">30 seconds</span>, your <span style="text-decoration:underline">minimum</span> income should be about:</br><span class="energy-color">Energy</span> +${setSpacesInBigNumbers(Math.ceil(unitData.energyCost / 30))} E/s ${!isMobile ? `&nbsp&nbsp&nbsp&nbsp` : `<br>`} <span class="metal-color">Metal</span> +${setSpacesInBigNumbers(Math.ceil(unitData.metalCost / 30))} M/s ${!isMobile ? `&nbsp&nbsp` : `<br>`}(focusing all resources on ${unitData.name} only!).</br> Required build speed: ${Math.floor(unitData.buildTime / 30)} (about
${Math.floor((unitData.buildTime / 30) / 360) >= 1 ? `
${Math.floor((unitData.buildTime / 30) / 360)}x Tier 2 construction vehicle or ${Math.floor((unitData.buildTime / 30) / 270)}x Tier 2 construction kbot).
`: `${Math.floor((unitData.buildTime / 30) / 360) == 0 ? `
        ${Math.floor((unitData.buildTime / 30) / 120)}x Tier 1 construction vehicle).` :
                        `${Math.floor((unitData.buildTime / 30) / 360)}x Tier 2 construction vehicle or ${Math.floor((unitData.buildTime / 30) / 120)}x Tier 1 construction vehicle).`}`}
                                                </li>
                                                
                                                ${unitData.metalCost > 6500 ? ` 
                                                <li class="dt-info-text white">
                                                    To make one ${unitData.name} every <span class="bold yellow">2 minutes</span>, your <span style="text-decoration:underline">minimum</span> income should be about:</br><span class="energy-color">Energy</span> +${setSpacesInBigNumbers(Math.ceil(unitData.energyCost / 120))} E/s ${!isMobile ? `&nbsp&nbsp&nbsp&nbsp` : `<br>`} <span class="metal-color">Metal</span> +${setSpacesInBigNumbers(Math.ceil(unitData.metalCost / 120))} M/s ${!isMobile ? `&nbsp&nbsp` : `<br>`}(focusing all resources on ${unitData.name} only!).</br> Required build speed: ${Math.floor(unitData.buildTime / 120)} (about ${Math.floor((unitData.buildTime / 120) / 360)}x Tier 2 construction vehicle or ${Math.floor((unitData.buildTime / 120) / 270)}x Tier 2 construction kbot).
                                                </li>
                                                `: ""}
                                                `: ""}
                                                
` : ""}

</ol>
`
}

function generateDetailedComparison() {
    var listOfLabels = ["Damage per shot", "Damage per second", "Build speed"];

    chosenUnitsArray = [];
    weaponsArray = [];
   $(".chosen-unit").each(function (k,val) {
        var obj = $(this);
       var unitName = $(obj).attr("uname");
       var unitSide = $(obj).attr("side");
       var unitObj = {
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
           explosionDamage: "",
           maxDamagePerShot: "", // biggest of few weapons
           builder: "",
           isAntiAir1: "",
           isAntiAir2: "",
           isAntiAir3: "",
           isEco: false,
           minEnergyIncome: "",
           maxEnergyIncome: "",
           maxMetalCostForE: "",
           minMetalCostForE: "",
           ratioMin: "",
           ratioMax: "",
           reloadTime_w1: "",
           reloadTime_w2: "",
           reloadTime_w3: "",
           sup1: "",
           sup2: "",
           p1: "",
           p2: "",
           p3: "",
           p4: "",
           weapon1ObjectName: "",
           weapon2ObjectName: "",
           weapon3ObjectName: "",
           onlyDps: "",
           buildTime: "",
           energyMake: "",
           energyUse: "",
           turnRate: "",
           cloakCost: "",
           energyStorage: "",
           metalStorage: ""
       };



       var weaponObjBasic = {
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
       }

       var weaponObjDt = {
               w1: {
                   objName: "",
                   name: "",
                   tolerance: "",
                   aoe: "",
                   velocity: "",
                   energyPerShot: ""
               },
               w2: {
                   objName: "",
                   name: "",
                   tolerance: "",
                   aoe: "",
                   velocity: "",
                   energyPerShot: ""
               },
               w3: {
                   objName: "",
                   name: "",
                   tolerance: "",
                   aoe: "",
                   velocity: "",
                   energyPerShot: ""
               }
       }

        for (i = 0; i < csvObj.length; i++) {
            if (csvObj[i].name === unitName && csvObj[i].side.toLowerCase() === unitSide) {
                unitObj.imgSrc = $(obj).attr("img");
                unitObj.name = unitName;
                unitObj.energyCost = csvObj[i].buildcostenergy;
                unitObj.metalCost = csvObj[i].buildcostmetal;
                unitObj.name = csvObj[i].name;
                unitObj.HP = csvObj[i].maxdamage;
                unitObj.movementSpeed = csvObj[i].maxvelocity;
                unitObj.flyingSpeed = unitObj.movementSpeed;
                unitObj.description = csvObj[i].description;
                unitObj.canMove = csvObj[i].canmove;
                unitObj.canAttack = csvObj[i].canattack;
                unitObj.energyStorage = csvObj[i].energystorage;
                unitObj.side = $(obj).attr("side");
                unitObj.acceleration = csvObj[i].acceleration;
                unitObj.summoningCode = csvObj[i].objectname.toLowerCase();
                unitObj.sightRange = csvObj[i].sightdistance;
                unitObj.buildSpeed = csvObj[i].workertime;
                unitObj.canBuild = csvObj[i].canbuild;
                unitObj.radarRange = csvObj[i].radardistance;
                unitObj.jammerRange = csvObj[i].radardistancejam;
                unitObj.builder = csvObj[i].builder;
                unitObj.buildRange = csvObj[i].builddistance;
                unitObj.minMetalCostForE = "";
                unitObj.maxMetalCostForE = "";
                unitObj.isAntiAir1 = $(obj).attr("w1-AA");
                unitObj.isAntiAir2 = $(obj).attr("w2-AA");
                unitObj.isAntiAir3 = $(obj).attr("w3-AA");
                unitObj.isMineOrClawlingBomb = csvObj[i].kamikaze;
                unitObj.explosionDamage = $(obj).attr("w1");
                unitObj.reloadTime_w1 = $(obj).attr("w1-rt");
                unitObj.reloadTime_w2 = $(obj).attr("w2-rt");
                unitObj.reloadTime_w3 = $(obj).attr("w3-rt");
                unitObj.onlyDps = $(obj).attr("only-dps");
                unitObj.p1 = $(obj).attr("p1");
                unitObj.p2 = $(obj).attr("p2");
                unitObj.buildTime = csvObj[i].buildtime;
                unitObj.maxSlope = csvObj[i].maxslope;
                unitObj.energyMake = csvObj[i].energymake;
                unitObj.energyUse = csvObj[i].energyuse;
                unitObj.turnRate = csvObj[i].turnrate;
                unitObj.cloakCost = csvObj[i].cloakcost;
                unitObj.energyStorage = csvObj[i].energystorage;
                unitObj.metalStorage = csvObj[i].metalstorage;




                if (unitObj.movementSpeed < 0.5 || unitObj.movementSpeed == "" && unitObj.isMineOrClawlingBomb != 1) {// is building?
                }
                else if (unitObj.name == "Commander" || unitObj.name == "Podger" || unitObj.name == "Spoiler" || unitObj.name == "Croc" || unitObj.name == "Gimp" || unitObj.name == "Triton" || unitObj.name == "Defiler") {
                    // original HP without diving by damage modifier
                }
                else if (csvObj[i].damagemodifier != "") {
                    unitObj.HP = csvObj[i].maxdamage / csvObj[i].damagemodifier;
                }


                if ((csvObj[i].weapon1.indexOf("RANGE") >= 0 || csvObj[i].weapon1.indexOf("NULL") >= 0) && csvObj[i].weapon2 != "") {
                    unitObj.weapon1ObjectName = csvObj[i].weapon2;
                } else if ((csvObj[i].weapon1.indexOf("RANGE") >= 0 || csvObj[i].weapon1.indexOf("NULL") >= 0) && csvObj[i].weapon2 == "" && csvObj[i].weapon3 != "") {
                    unitObj.weapon1ObjectName = csvObj[i].weapon3;
                } else {
                    unitObj.weapon1ObjectName = csvObj[i].weapon1;
                }
                unitObj.weapon2ObjectName = csvObj[i].weapon2;
                if (csvObj[i].weapon2 == "" || (csvObj[i].weapon2.indexOf("RANGE") >= 0 || csvObj[i].weapon2.indexOf("NULL") >= 0) && csvObj[i].weapon3 != "") {
                    unitObj.weapon2ObjectName = csvObj[i].weapon3;
                } else {
                    if (csvObj[i].weapon3.indexOf("RANGE") >= 0 || csvObj[i].weapon3.indexOf("NULL") >= 0) {
                        unitObj.weapon2ObjectName = "";
                    } else {
                        unitObj.weapon3ObjectName = csvObj[i].weapon3;
                    }
                }

                if (unitObj.onlyDps != 1) {
                    weaponObjBasic = {
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
                        w3_dps: "",
                        w1_name: "",
                        w2_name: "",
                        w3_name: "",
                        w1_velocity: "",
                        w2_velocity: "",
                        w3_velocity: "",
                        w1_tolerance: "",
                        w2_tolerance: "",
                        w3_tolerance: "",
                        w1_aoe: "",
                        w2_aoe: "",
                        w3_aoe: "",
                        w1_velocity: "",
                        w2_velocity: "",
                        w3_velocity: "",
                        w1_energyPerShot: "",
                        w2_energyPerShot: "",
                        w3_energyPerShot: ""
                    };

                    weaponObjBasic.w1_dps = Math.round(weaponObjBasic.w1 / weaponObjBasic.w1_rt);
                    weaponObjBasic.w2_dps = Math.round(weaponObjBasic.w2 / weaponObjBasic.w2_rt);
                    weaponObjBasic.w3_dps = Math.round(weaponObjBasic.w3 / weaponObjBasic.w3_rt);
                }
                else {
                    weaponObjBasic = {
                        w1: "",
                        w2: "",
                        w3: "",
                        w1_r: $(obj).attr("w1-r"),
                        w2_r: $(obj).attr("w2-r"),
                        w3_r: $(obj).attr("w3-r"),
                        w1_rt: "-",
                        w2_rt: "-",
                        w3_rt: "-",
                        w1_dps: $(obj).attr("w1"),
                        w2_dps: "",
                        w3_dps: "",
                        w1_name: "",
                        w2_name: "",
                        w3_name: "",
                        w1_velocity: "",
                        w2_velocity: "",
                        w3_velocity: "",
                        w1_tolerance: "",
                        w2_tolerance: "",
                        w3_tolerance: "",
                        w1_aoe: "",
                        w2_aoe: "",
                        w3_aoe: "",
                        w1_velocity: "",
                        w2_velocity: "",
                        w3_velocity: "",
                        w1_energyPerShot: "",
                        w2_energyPerShot: "",
                        w3_energyPerShot: ""
                    }
                }
                


                // weapon obj
                for (j = 0; j < weaponsObj.length; j++) {
                    if (weaponsObj[j].WEAPONOBJECT === unitObj.weapon1ObjectName) {
                        weaponObjBasic.w1_velocity = weaponsObj[j].weaponvelocity;
                        weaponObjBasic.w1_aoe = weaponsObj[j].areaofeffect;
                        weaponObjBasic.w1_name = weaponsObj[j].name;
                        weaponObjBasic.w1_tolerance = weaponsObj[j].tolerance;
                        weaponObjBasic.w1_energyPerShot = weaponsObj[j].energypershot;
                    }
                    if (weaponsObj[j].WEAPONOBJECT === unitObj.weapon2ObjectName) {
                        weaponObjBasic.w2_velocity = weaponsObj[j].weaponvelocity;
                        weaponObjBasic.w2_aoe = weaponsObj[j].areaofeffect;
                        weaponObjBasic.w2_name = weaponsObj[j].name;
                        weaponObjBasic.w2_tolerance = weaponsObj[j].tolerance;
                        weaponObjBasic.w2_energyPerShot = weaponsObj[j].energypershot;
                    }
                    if (weaponsObj[j].WEAPONOBJECT === unitObj.weapon3ObjectName) {
                        weaponObjBasic.w3_velocity = weaponsObj[j].weaponvelocity;
                        weaponObjBasic.w3_aoe = weaponsObj[j].areaofeffect;
                        weaponObjBasic.w3_name = weaponsObj[j].name;
                        weaponObjBasic.w3_tolerance = weaponsObj[j].tolerance;
                        weaponObjBasic.w3_energyPerShot = weaponsObj[j].energypershot;
                    }
                }

                setWeaponsAA();
            }
       }
       weaponsArray.push(weaponObjBasic);
       chosenUnitsArray.push(unitObj);
      
    });
    $(".comparison-content").append(fillDetailedComparisonTmpl());
    $(".combat-stats .col-3, .build-stats .col-3, .other-stats .col-3, .basic-stats-cp .col-3").each(function () {
        if ($(this).text() == "NaN" || $(this).text() == "undefined" || $(this).text() == "" || $(this).text() == "" || $(this).text() == "0") {
            $(this).text("-");
        }

    });
    $(".combat-stats .col-10 .row, .build-stats .col-10 .row, .other-stats .col-10 .row, .basic-stats-cp .col-10 .row").each(function () {
        if ($(this).children().eq(0).text() == "-" && $(this).children().eq(1).text() == "-" && ($(this).children().eq(2).text() == "-" || $(this).children().eq(2).text() == "") && ($(this).children().eq(3).text() == "-" || $(this).children().eq(3).text() == "")) {
            $(this).parent().parent().remove();
        }
    });
    $(".combat-stats, .build-stats, .other-stats").each(function () {
        if ($(this).children().length == 0) {
            $(this).parent().parent().parent().remove();
        }
    });
    //$(".collapse.show").parent().children().eq(0).children().children().children().eq(0).css({ "transform": "rotate(-180deg)", "transition": "transform .25s" });
    if (chosenUnitsArray.length == 2) {
        $(".detailed-cp .col-10 .row .col-3").each(function () {
            $(this).removeClass("col-lg-3").addClass("col-6");
        });
        $(".detailed-cp .col-2").each(function () {
            $(this).removeClass("col-2").addClass("col-3 cp-parameter");
        });
        $(".detailed-cp .col-10").each(function () {
            $(this).removeClass("col-10").addClass("col-9");
        });
    } else if (chosenUnitsArray.length == 3) {
        $(".detailed-cp .col-10 .row .col-3").each(function () {
            $(this).removeClass("col-3").addClass("col-4");
        });
        $(".detailed-cp .col-2").each(function () {
            $(this).removeClass("col-2").addClass("col-3 cp-parameter");
        });
        $(".detailed-cp .col-10").each(function () {
            $(this).removeClass("col-10").addClass("col-9");
        });
    }
    unitsInComparison = "";
    for (k = 0; k < chosenUnitsArray.length; k++) {
        
        if ((chosenUnitsArray.length - 1) == k) {
            unitsInComparison += chosenUnitsArray[k].name + ".png";
        } else {
            unitsInComparison += chosenUnitsArray[k].name + " vs. ";
        }
    }




}


$("body").on({
    mouseenter: function () {
        numberOfColumn = $(this).index();
        $(".detailed-cp .vls .row").each(function () {
            selectedColumn = $(this);
            selectedColumn.children().eq(numberOfColumn).addClass("hovered-column");
        });
    }, mouseleave: function () {
        $(".detailed-cp .vls .row .cpv").each(function () {
            $(this).removeClass("hovered-column");
        });
    }
}, ".cpv");

$("body").on("click", ".detailed-cp .cpv", function () {
    numberOfColumn = $(this).index();
    if ($(this).hasClass("additional-values-brackets")) {
        close = 0;
    }
    if ($(this).hasClass("selected-column")) {
        $(".detailed-cp .vls .row").each(function () {
            selectedColumn = $(this);
            selectedColumn.children().eq(numberOfColumn).removeClass("selected-column");
        });
        $(".detailed-cp .cpv .additional-values-brackets").remove();
    }
    else {
        var redColor = "red-color";
        var greenColor = "green-color";
        $(".detailed-cp .row .cpv").each(function () {
            $(this).removeClass("selected-column");
        });
        $(".detailed-cp .cpv .additional-values-brackets").remove();
        $(".detailed-cp .vls .row").each(function () {
            selectedColumn = $(this);
            var parameterText = selectedColumn.parent().parent().children().eq(0).text();

            if (parameterText == "Metal cost" || parameterText == "Energy cost") {
                wordsInCp[0] = "pricier";
                wordsInCp[1] = "cheaper";
                redColor = "green-color";
                greenColor = "red-color";
            }
            else if (parameterText == "Build range" || parameterText == "Movement speed" || parameterText == "Weapon velocity" || parameterText == "Turn speed") {
                wordsInCp[0] = "faster";
                wordsInCp[1] = "slower";
                redColor = "red-color";
                greenColor = "green-color";
            }
            else if (parameterText == "Area Of Effect") {
                wordsInCp[0] = "bigger";
                wordsInCp[1] = "smaller";
                redColor = "red-color";
                greenColor = "green-color";
            }
            else if (parameterText == "Reload time (seconds)" || parameterText == "Build time") {
                wordsInCp[0] = "longer";
                wordsInCp[1] = "shorter";
                redColor = "green-color";
                greenColor = "red-color";
            }
            else {
                wordsInCp[0] = "more";
                wordsInCp[1] = "less";
                redColor = "red-color";
                greenColor = "green-color";
            }

            selectedColumn.children().eq(numberOfColumn).addClass("selected-column");
            var valueFromSelected = selectedColumn.children().eq(numberOfColumn).text().replace(/\s/g, '');
            for (i = 0; i < chosenUnitsArray.length; i++) {
                
                var textInCell = selectedColumn.children().eq(i).text().replace(/\s/g, '');
                textInCell = parseFloat(textInCell);
                if (numberOfColumn != i && !isNaN(textInCell)) {

                    var countedNumber = parseFloat((((textInCell - valueFromSelected) / valueFromSelected) * 100));

                    var modifiedText = "";
                    if (countedNumber < 0) {
                        if (countedNumber <= -50 && countedNumber >= -95) {
                            countedNumber = parseFloat((100 / (100 + countedNumber)).toFixed(2));
                            countedNumber.toString();
                            modifiedText = " (" + countedNumber + "x " + wordsInCp[1] +")";
                            selectedColumn.children().eq(i).append("<div class='additional-values-brackets " + redColor + "'><br>" + modifiedText + "</div>");
                        } else if (countedNumber < -95) {
                            countedNumber = Math.round((100 / (100 + countedNumber)).toFixed(2));
                            countedNumber.toString();
                            modifiedText = " (" + countedNumber + "x " + wordsInCp[1] +")";
                            selectedColumn.children().eq(i).append("<div class='additional-values-brackets " + redColor + "'><br>" + modifiedText + "</div>");
                        } else {
                            countedNumber = (parseFloat(countedNumber.toFixed(2))).toString();
                            modifiedText = " (" + (countedNumber * -1) + "% " + wordsInCp[1] +")";
                            selectedColumn.children().eq(i).append("<div class='additional-values-brackets " + redColor + "'><br>" + modifiedText + "</div>");
                        }
                    }
                    else if (countedNumber > 0) {
                        if (countedNumber >= 100 && countedNumber <= 19000) {
                            countedNumber = parseFloat((countedNumber / 100 + 1).toFixed(2));
                            countedNumber.toString();
                            modifiedText = " (" + countedNumber + "x " + wordsInCp[0] +")"
                            selectedColumn.children().eq(i).append("<div class='additional-values-brackets " + greenColor + "'><br>" + modifiedText + "</div>");
                        } else if (countedNumber > 19000) {
                            countedNumber = Math.round((countedNumber / 100 + 1).toFixed(2));
                            countedNumber.toString();
                            modifiedText = " (" + countedNumber + "x " + wordsInCp[0] +")"
                            selectedColumn.children().eq(i).append("<div class='additional-values-brackets " + greenColor + "'><br>" + modifiedText + "</div>");
                        } else {
                            countedNumber = (parseFloat(countedNumber.toFixed(2))).toString();
                            modifiedText = " (+" + countedNumber + "% " + wordsInCp[0] +")";
                            selectedColumn.children().eq(i).append("<div class='additional-values-brackets " + greenColor + "'><br>" + modifiedText + "</div>");
                        }

                    }
                    else if (countedNumber == 0) {
                        selectedColumn.children().eq(i).append("<div class='additional-values-brackets gray-color'><br>(equal)</div>");
                    }
                    else {

                    }
                }
            }

        });
    }
});

function fillDetailedComparisonTmpl() {
    comparisonTemplate = `

 <img class="arrow-save" src="arrow-save-img.svg" />
<div class="detailed-cp" id="detailed-cp">
<div class="exo2-16 ug-button" id="save-img">Save as image</div>

<span class="img-loading-msg">Creating the image<img class="loading-icon-cp" id="loading-icon-10" src="loading_icon.gif"> </span>
        <br>
        <br>

        <div class="row">
            <div class="col-2 par" style="border-bottom:none">&nbsp</div>
            <div class="col-10 vls">
                <div class="row">
                    <div class="col-3 cpv unit-image-box"><div class="unit-box-in-preview img-center" style="${chosenUnitsArray[0].imgSrc}"></div></div>     
                    <div class="col-3 cpv unit-image-box"><div class="unit-box-in-preview img-center" style="${chosenUnitsArray[1].imgSrc}"></div></div>      
                   ${chosenUnitsArray[2] ? `<div class="col-3 cpv unit-image-box"><div class="unit-box-in-preview img-center" style="${chosenUnitsArray[2].imgSrc}"></div></div>  ` : ""}   
                   ${chosenUnitsArray[3] ? `<div class="col-3 cpv unit-image-box"><div class="unit-box-in-preview img-center" style="${chosenUnitsArray[3].imgSrc}"></div></div>  ` : ""}  
                </div>
            </div>
        </div>
        <div class="row" style="background:#2b2b2b;">
            <div class="col-2 par">&nbsp</div>
            <div class="col-10 vls">
                <div class="row">
                    <div class="col-3 cpv name">${chosenUnitsArray[0].name}</div>     
                    <div class="col-3 cpv name">${chosenUnitsArray[1].name}</div>       
                   ${chosenUnitsArray[2] ? `<div class="col-3 cpv name">${chosenUnitsArray[2].name}</div> ` : ""}   
                   ${chosenUnitsArray[3] ? `<div class="col-3 cpv name">${chosenUnitsArray[3].name}</div> ` : ""}     
                </div>
            </div>
        </div>
            <div class="row" style="background:#313131;">
                <div class="col-2 par" style="line-height: 32px;">Side</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${chosenUnitsArray[0].side == "core" ? `<img src="logo-core.svg" style="position: relative;top: 2px;">` : `<img src="logo-arm.svg">`}</div>
                       <div class="col-3 cpv">${chosenUnitsArray[1].side == "core" ? `<img src="logo-core.svg" style="position: relative;top: 2px;">` : `<img src="logo-arm.svg">`}</div>     
                       ${chosenUnitsArray[2] ? `<div class="col-3 cpv">${chosenUnitsArray[2].side == "core" ? `<img src="logo-core.svg" style="position: relative;top: 2px;">` : `<img src="logo-arm.svg">`}</div>` : ""}   
                       ${chosenUnitsArray[3] ? `<div class="col-3 cpv">${chosenUnitsArray[3].side == "core" ? `<img src="logo-core.svg" style="position: relative;top: 2px;">` : `<img src="logo-arm.svg">`}</div>` : ""}     
                   </div>
                </div>
            </div>
        <div class="basic-stats-cp">
            <div class="row">
                <div class="col-2 par">Energy cost</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${setSpacesInBigNumbers(chosenUnitsArray[0].energyCost)}</div>
                       <div class="col-3 cpv">${setSpacesInBigNumbers(chosenUnitsArray[1].energyCost)}</div>     
                       ${chosenUnitsArray[2] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(chosenUnitsArray[2].energyCost)}</div>` : ""}   
                       ${chosenUnitsArray[3] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(chosenUnitsArray[3].energyCost)}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Metal cost</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${setSpacesInBigNumbers(chosenUnitsArray[0].metalCost)}</div>
                       <div class="col-3 cpv">${setSpacesInBigNumbers(chosenUnitsArray[1].metalCost)}</div>     
                       ${chosenUnitsArray[2] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(chosenUnitsArray[2].metalCost)}</div>` : ""}   
                       ${chosenUnitsArray[3] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(chosenUnitsArray[3].metalCost)}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Build speed</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${chosenUnitsArray[0].buildSpeed}</div>
                       <div class="col-3 cpv">${chosenUnitsArray[1].buildSpeed}</div>     
                       ${chosenUnitsArray[2] ? `<div class="col-3 cpv">${chosenUnitsArray[2].buildSpeed}</div>` : ""}   
                       ${chosenUnitsArray[3] ? `<div class="col-3 cpv">${chosenUnitsArray[3].buildSpeed}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Build range</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${chosenUnitsArray[0].buildRange}</div>
                       <div class="col-3 cpv">${chosenUnitsArray[1].buildRange}</div>     
                       ${chosenUnitsArray[2] ? `<div class="col-3 cpv">${chosenUnitsArray[2].buildRange}</div>` : ""}   
                       ${chosenUnitsArray[3] ? `<div class="col-3 cpv">${chosenUnitsArray[3].buildRange}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Health</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${setSpacesInBigNumbers(chosenUnitsArray[0].HP)}</div>
                       <div class="col-3 cpv">${setSpacesInBigNumbers(chosenUnitsArray[1].HP)}</div>     
                       ${chosenUnitsArray[2] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(chosenUnitsArray[2].HP)}</div>` : ""}   
                       ${chosenUnitsArray[3] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(chosenUnitsArray[3].HP)}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Sight range</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${setSpacesInBigNumbers(chosenUnitsArray[0].sightRange)}</div>
                       <div class="col-3 cpv">${setSpacesInBigNumbers(chosenUnitsArray[1].sightRange)}</div>     
                       ${chosenUnitsArray[2] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(chosenUnitsArray[2].sightRange)}</div>` : ""}   
                       ${chosenUnitsArray[3] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(chosenUnitsArray[3].sightRange)}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row no-border">
                <div class="col-2 par">Movement speed</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${chosenUnitsArray[0].movementSpeed}</div>
                       <div class="col-3 cpv">${chosenUnitsArray[1].movementSpeed}</div>     
                       ${chosenUnitsArray[2] ? `<div class="col-3 cpv">${chosenUnitsArray[2].movementSpeed}</div>` : ""}   
                       ${chosenUnitsArray[3] ? `<div class="col-3 cpv">${chosenUnitsArray[3].movementSpeed}</div>` : ""}     
                   </div>
                </div>
            </div>
        </div>
        
            <div class="accordion" id="accordion-cp">
              <div class="card">
                <div id="headingOneCP">
                  <h5 class="mb-0 cp-header-section card-header" data-toggle="collapse" data-target="#collapseOneCP" aria-expanded="true" aria-controls="collapseOneCP">Weapon stats
                                  <span class="arrow-down">
                                    <img src="arrow-down-cp.svg">
                                </span>
                  </h5>
                </div>
    <div id="collapseOneCP" class="collapse" aria-labelledby="headingOneCP">
      <div class="card-body">
            <div class="combat-stats">
                   <div class="row weapon-separator">
                <div class="col-2 par">Weapon name</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${weaponsArray[0].w1_name}</div>
                       <div class="col-3 cpv">${weaponsArray[1].w1_name}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${weaponsArray[2].w1_name}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${weaponsArray[3].w1_name}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Damage per second</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[0].w1_dps)}</div>
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[1].w1_dps)}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[2].w1_dps)}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[3].w1_dps)}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Damage per shot</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[0].w1)}</div>
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[1].w1)}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[2].w1)}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[3].w1)}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Range</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[0].w1_r)}</div>
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[1].w1_r)}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[2].w1_r)}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[3].w1_r)}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Reload time (seconds)</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${weaponsArray[0].w1_rt}</div>
                       <div class="col-3 cpv">${weaponsArray[1].w1_rt}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${weaponsArray[2].w1_rt}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${weaponsArray[3].w1_rt}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Weapon velocity</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[0].w1_velocity)}</div>
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[1].w1_velocity)}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[2].w1_velocity)}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[3].w1_velocity)}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Area Of Effect</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[0].w1_aoe)}</div>
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[1].w1_aoe)}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[2].w1_aoe)}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[3].w1_aoe)}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Tolerance</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[0].w1_tolerance)}</div>
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[1].w1_tolerance)}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[2].w1_tolerance)}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[3].w1_tolerance)}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Energy per shot</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[0].w1_energyPerShot)}</div>
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[1].w1_energyPerShot)}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[2].w1_energyPerShot)}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[3].w1_energyPerShot)}</div>` : ""}     
                   </div>
                </div>
            </div>

            <div class="row weapon-separator">
                <div class="col-2 par">Weapon name</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${weaponsArray[0].w2_name}</div>
                       <div class="col-3 cpv">${weaponsArray[1].w2_name}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${weaponsArray[2].w2_name}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${weaponsArray[3].w2_name}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Damage per second</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[0].w2_dps)}</div>
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[1].w2_dps)}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[2].w2_dps)}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[3].w2_dps)}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Damage per shot</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[0].w2)}</div>
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[1].w2)}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[2].w2)}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[3].w2)}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Range</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[0].w2_r)}</div>
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[1].w2_r)}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[2].w2_r)}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[3].w2_r)}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Reload time (seconds)</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${weaponsArray[0].w2_rt}</div>
                       <div class="col-3 cpv">${weaponsArray[1].w2_rt}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${weaponsArray[2].w2_rt}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${weaponsArray[3].w2_rt}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Weapon velocity</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[0].w2_velocity)}</div>
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[1].w2_velocity)}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[2].w2_velocity)}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[3].w2_velocity)}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Area Of Effect</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[0].w2_aoe)}</div>
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[1].w2_aoe)}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[2].w2_aoe)}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[3].w2_aoe)}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Tolerance</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[0].w2_tolerance)}</div>
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[1].w2_tolerance)}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[2].w2_tolerance)}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[3].w2_tolerance)}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Energy per shot</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[0].w2_energyPerShot)}</div>
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[1].w2_energyPerShot)}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[2].w2_energyPerShot)}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[3].w2_energyPerShot)}</div>` : ""}     
                   </div>
                </div>
            </div>

            <div class="row weapon-separator">
                <div class="col-2 par">Weapon name</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${weaponsArray[0].w3_name}</div>
                       <div class="col-3 cpv">${weaponsArray[1].w3_name}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${weaponsArray[2].w3_name}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${weaponsArray[3].w3_name}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Damage per second</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[0].w3_dps)}</div>
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[1].w3_dps)}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[2].w3_dps)}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[3].w3_dps)}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Damage per shot</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[0].w3)}</div>
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[1].w3)}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[2].w3)}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[3].w3)}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Range</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[0].w3_r)}</div>
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[1].w3_r)}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[2].w3_r)}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[3].w3_r)}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Reload time (seconds)</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${weaponsArray[0].w3_rt}</div>
                       <div class="col-3 cpv">${weaponsArray[1].w3_rt}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${weaponsArray[2].w3_rt}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${weaponsArray[3].w3_rt}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Weapon velocity</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[0].w3_velocity)}</div>
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[1].w3_velocity)}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[2].w3_velocity)}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[3].w3_velocity)}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Area Of Effect</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[0].w3_aoe)}</div>
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[1].w3_aoe)}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[2].w3_aoe)}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[3].w3_aoe)}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Tolerance</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[0].w3_tolerance)}</div>
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[1].w3_tolerance)}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[2].w3_tolerance)}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[3].w3_tolerance)}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Energy per shot</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[0].w3_energyPerShot)}</div>
                       <div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[1].w3_energyPerShot)}</div>     
                       ${weaponsArray[2] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[2].w3_energyPerShot)}</div>` : ""}   
                       ${weaponsArray[3] ? `<div class="col-3 cpv">${setSpacesInBigNumbers(weaponsArray[3].w3_energyPerShot)}</div>` : ""}     
                   </div>
                </div>
            </div>
         </div>


      </div>
    </div>
  </div>

  <div class="card">
    <div id="headingThreeCP">
      <h5 class="mb-0 cp-header-section card-header" data-toggle="collapse" data-target="#collapseThreeCP" aria-expanded="true" aria-controls="collapseThreeCP">Other stats
                                  <span class="arrow-down">
                                    <img src="arrow-down-cp.svg">
                                </span>
      </h5>
    </div>

    <div id="collapseThreeCP" class="collapse" aria-labelledby="headingThreeCP">
      <div class="card-body">
        <div class="other-stats">
            <div class="row" style="border-top: 1px solid #676767;">
                <div class="col-2 par">Build time</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${chosenUnitsArray[0].buildTime}</div>
                       <div class="col-3 cpv">${chosenUnitsArray[1].buildTime}</div>     
                       ${chosenUnitsArray[2] ? `<div class="col-3 cpv">${chosenUnitsArray[2].buildTime}</div>` : ""}   
                       ${chosenUnitsArray[3] ? `<div class="col-3 cpv">${chosenUnitsArray[3].buildTime}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Radar range</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${chosenUnitsArray[0].radarRange < 100 ? `` : `${chosenUnitsArray[0].radarRange}`}</div>
                       <div class="col-3 cpv">${chosenUnitsArray[1].radarRange < 100 ? `` : `${chosenUnitsArray[1].radarRange}`}</div>
                       ${chosenUnitsArray[2] ? `<div class="col-3 cpv">${chosenUnitsArray[2].radarRange < 100 ? `` : `${chosenUnitsArray[2].radarRange}`}</div>` : ""}   
                       ${chosenUnitsArray[3] ? `<div class="col-3 cpv">${chosenUnitsArray[3].radarRange < 100 ? `` : `${chosenUnitsArray[3].radarRange}`}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Jammer range</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${chosenUnitsArray[0].jammerRange}</div>
                       <div class="col-3 cpv">${chosenUnitsArray[1].jammerRange}</div>     
                       ${chosenUnitsArray[2] ? `<div class="col-3 cpv">${chosenUnitsArray[2].jammerRange}</div>` : ""}   
                       ${chosenUnitsArray[3] ? `<div class="col-3 cpv">${chosenUnitsArray[3].jammerRange}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Turn speed</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${chosenUnitsArray[0].turnRate}</div>
                       <div class="col-3 cpv">${chosenUnitsArray[1].turnRate}</div>     
                       ${chosenUnitsArray[2] ? `<div class="col-3 cpv">${chosenUnitsArray[2].turnRate}</div>` : ""}   
                       ${chosenUnitsArray[3] ? `<div class="col-3 cpv">${chosenUnitsArray[3].turnRate}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Energy make</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${chosenUnitsArray[0].energyMake}</div>
                       <div class="col-3 cpv">${chosenUnitsArray[1].energyMake}</div>     
                       ${chosenUnitsArray[2] ? `<div class="col-3 cpv">${chosenUnitsArray[2].energyMake}</div>` : ""}   
                       ${chosenUnitsArray[3] ? `<div class="col-3 cpv">${chosenUnitsArray[3].energyMake}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Energy use</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${chosenUnitsArray[0].energyUse}</div>
                       <div class="col-3 cpv">${chosenUnitsArray[1].energyUse}</div>     
                       ${chosenUnitsArray[2] ? `<div class="col-3 cpv">${chosenUnitsArray[2].energyUse}</div>` : ""}   
                       ${chosenUnitsArray[3] ? `<div class="col-3 cpv">${chosenUnitsArray[3].energyUse}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Cloak cost (E/s)</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${chosenUnitsArray[0].cloakCost}</div>
                       <div class="col-3 cpv">${chosenUnitsArray[1].cloakCost}</div>     
                       ${chosenUnitsArray[2] ? `<div class="col-3 cpv">${chosenUnitsArray[2].cloakCost}</div>` : ""}   
                       ${chosenUnitsArray[3] ? `<div class="col-3 cpv">${chosenUnitsArray[3].cloakCost}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Energy storage</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${chosenUnitsArray[0].energyStorage}</div>
                       <div class="col-3 cpv">${chosenUnitsArray[1].energyStorage}</div>     
                       ${chosenUnitsArray[2] ? `<div class="col-3 cpv">${chosenUnitsArray[2].energyStorage}</div>` : ""}   
                       ${chosenUnitsArray[3] ? `<div class="col-3 cpv">${chosenUnitsArray[3].energyStorage}</div>` : ""}     
                   </div>
                </div>
            </div>
            <div class="row">
                <div class="col-2 par">Metal storage</div>
                <div class="col-10 vls">
                   <div class="row">
                       <div class="col-3 cpv">${chosenUnitsArray[0].metalStorage}</div>
                       <div class="col-3 cpv">${chosenUnitsArray[1].metalStorage}</div>     
                       ${chosenUnitsArray[2] ? `<div class="col-3 cpv">${chosenUnitsArray[2].metalStorage}</div>` : ""}   
                       ${chosenUnitsArray[3] ? `<div class="col-3 cpv">${chosenUnitsArray[3].metalStorage}</div>` : ""}     
                   </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  </div>
</div>









</div>
    `;
    return comparisonTemplate;
}