function setWeaponsAA() {
    if (unitData.isAntiAir1 && unitData.reloadTime_w2 == undefined) {
        unitData.explosionDamage = unitData.explosionDamage + " (AA)";
        unitData.dps = unitData.dps + " (AA)";
    }
}

function countDpsAndRange(obj) {
    var weapons = {
        w1: {
            damage: $(obj).attr("w1"),
            reload: $(obj).attr("w1-rt"),
            range: $(obj).attr("w1-r")
        },
        w2: {
            damage: $(obj).attr("w2"),
            reload: $(obj).attr("w2-rt"),
            range: $(obj).attr("w2-r")
        },
        w3: {
            damage: $(obj).attr("w3"),
            reload: $(obj).attr("w3-rt"),
            range: $(obj).attr("w3-r")
        }
    };
    var W1_dps = Math.round(weapons.w1.damage / weapons.w1.reload);
    var W2_dps = Math.round(weapons.w2.damage / weapons.w2.reload);
    var W3_dps = Math.round(weapons.w3.damage / weapons.w3.reload);
    var dps;
    var dpsArray;
    var explosionDamage;
    var explosionDamageArray;
    var range;
    var rangeArray;
    if (typeof $(obj).attr("w2") !== "undefined" && typeof $(obj).attr("w3") !== "undefined") {
        dpsArray = [W1_dps, W2_dps, W3_dps];
        explosionDamageArray = [weapons.w1.damage, weapons.w2.damage, weapons.w3.damage];
        rangeArray = [weapons.w1.range, weapons.w2.range, weapons.w3.range];

        var dpsSum = dpsArray[0] + dpsArray[1] + dpsArray[2];
        if (unitData.isAntiAir1) {
            dps = "[" + dpsArray[0] + " (AA) | " + dpsArray[1] + " | " + dpsArray[2] + "]" + "  =" + dpsSum + "";
            explosionDamage = "[" + explosionDamageArray[0] + " (AA) | " + explosionDamageArray[1] + " | " + explosionDamageArray[2] + "]";
        }
        else if (unitData.isAntiAir2) {
            dps = "[" + dpsArray[0] + " | " + dpsArray[1] + " (AA) | " + dpsArray[2] + "]" + "  =" + dpsSum + "";
            explosionDamage = "[" + explosionDamageArray[0] + " | " + explosionDamageArray[1] + " (AA) | " + explosionDamageArray[2] + "]";
        }
        else if (unitData.isAntiAir3) {
            dps = "[" + dpsArray[0] + " | " + dpsArray[1] + " | " + dpsArray[2] + " (AA)]" + "  =" + dpsSum + "";
            explosionDamage = "[" + explosionDamageArray[0] + " | " + explosionDamageArray[1] + " | " + explosionDamageArray[2] + " (AA)]";
        }
        else {
            dps = "[" + dpsArray[0] + " | " + dpsArray[1] + " | " + dpsArray[2] + "]" + "  =" + dpsSum + "";
            explosionDamage = "[" + explosionDamageArray[0] + " | " + explosionDamageArray[1] + " | " + explosionDamageArray[2] + "]";
        }
        explosionDamageArray.sort(function (a, b) { return b - a });;
        range = "[" + rangeArray[0] + " | " + rangeArray[1] + " | " + rangeArray[2] + "]";
        rangeArray.sort(function (a, b) { return b - a });
        unitData.maxDamagePerShot = explosionDamageArray[0];
        unitData.biggestRange = rangeArray[0];
        unitData.overallDps = dpsSum;
    }
    else if (typeof $(obj).attr("w2") !== "undefined") {
        dpsArray = [W1_dps, W2_dps];
        explosionDamageArray = [weapons.w1.damage, weapons.w2.damage];
        rangeArray = [weapons.w1.range, weapons.w2.range];
        var dpsSum = dpsArray[0] + dpsArray[1];
        if (unitData.isAntiAir1) {
            dps = "[" + dpsArray[0] + " (AA) | " + dpsArray[1] + "]  " + "=" + dpsSum + "";
            explosionDamage = "[" + explosionDamageArray[0] + " (AA) | " + explosionDamageArray[1] + "]";
        }
        else if (unitData.isAntiAir2) {
            var dpsSum = dpsArray[0];
            dps = "[" + dpsArray[0] + " | " + dpsArray[1] + " (AA)]  " + "=" + dpsSum + "";
            explosionDamage = "[" + explosionDamageArray[0] + " | " + explosionDamageArray[1] + " (AA)]";
        }
        else {
            dps = "[" + dpsArray[0] + " | " + dpsArray[1] + "]  " + "=" + dpsSum + "";
            explosionDamage = "[" + explosionDamageArray[0] + " | " + explosionDamageArray[1] + "]";
        }
        explosionDamageArray.sort(function (a, b) { return b - a });
        range = "[" + rangeArray[0] + " | " + rangeArray[1] + "]";
        rangeArray.sort(function (a, b) { return b - a });;
        unitData.maxDamagePerShot = explosionDamageArray[0];
        unitData.biggestRange = rangeArray[0];
        unitData.overallDps = dpsSum;
    }
    else if (typeof $(obj).attr("w3") !== "undefined") {
        dpsArray = [W1_dps, W3_dps];
        explosionDamageArray = [weapons.w1.damage, weapons.w3.damage];
        rangeArray = [weapons.w1.range, weapons.w3.range];
        var dpsSum = dpsArray[0] + dpsArray[1];
        dps = "[" + dpsArray[0] + " | " + dpsArray[1] + "]  " + "=" + dpsSum + "";
        explosionDamage = "[" + explosionDamageArray[0] + " | " + explosionDamageArray[1] + "]";
        explosionDamageArray.sort(function (a, b) { return b - a });;
        range = "[" + rangeArray[0] + " | " + rangeArray[1] + "]";
        rangeArray.sort(function (a, b) { return b - a });
        unitData.maxDamagePerShot = explosionDamageArray[0];
        unitData.biggestRange = rangeArray[0];
        unitData.overallDps = dpsSum;
    }
    else {
        dps = W1_dps;
        range = weapons.w1.range;
        explosionDamage = weapons.w1.damage;
        unitData.maxDamagePerShot = explosionDamage;
        unitData.biggestRange = range;
        unitData.overallDps = dps;
    }
    unitData.range = range;
    unitData.dps = dps;
    unitData.explosionDamage = explosionDamage;
}

var isMobile;
var popoverSettings = {
    placement: 'right',
    html: true,
    container: 'body',
    trigger: 'hover',
    selector: '[data-toggle="popover"]',
    delay: { "show": 300, "hide": 0 },
    boundary: 'viewport',
    fallbackPlacement: 'flip',
    content: function () {
        return htmlOfPreview;
    }
}

var unitGuideCSV;
var csvObj;
var weaponsCSV;
var weaponsObj;
var htmlOfPreview;
var duplicateCounter = 0;
var inputNumber = 0;
var unitImg = "";
var status = 0;
var changingColorCounter = 0;
var numberOfRowResults = 0;
var currentInputNumber = "";
var selectedRowNumber = 0;
var typingTimer;
var doneTypingInterval = 200;

$(".unit-type-list li").click(function () {
    closeNav();
});

function openNav() {
    document.getElementById("nav-mobile-overlay").style.width = "100%";
    $("#nav-mobile-overlay").removeClass("overlay-opened");

}

function closeNav() {
    document.getElementById("nav-mobile-overlay").style.width = "0%";
    $("#nav-mobile-overlay").addClass("overlay-opened");
}

function openDtInfo() {
    document.getElementById("unit-dt-info-overlay").style.opacity = "1";
    //$("#unit-dt-info-overlay").removeClass("overlay-opened");
}

function closeDtInfo() {
    document.getElementById("unit-dt-info-overlay").style.opacity = "0";
    //$("#unit-dt-info-overlay").addClass("overlay-opened");
}

$(".card-header").click(function () {
    if ($(this).parent().parent().children().eq(1).hasClass("show")) {
        $(this).children().eq(0).children().eq(0).css({ "transform": "rotate(0deg)", "transition": "transform .25s" });
    } else {
        $(this).children().eq(0).children().eq(0).css({ "transform": "rotate(-180deg)", "transition": "transform .25s" });
    }

});

function takeCoords(evt) {
    x = evt.clientX;
    y = evt.clientY;
}

function removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}

function setSpacesInBigNumbers(numberVal) {
    if (numberVal == undefined) {
    }
    else {
        if (typeof numberVal == 'string') {
            var numberLength = numberVal.length;
        } else {
            var numberLength = numberVal.toString().length;
        }
        var number = numberVal.toString();
        if (numberLength == 4) {
            number = number.slice(0, 1) + "&thinsp;" + number.slice(1);
        }
        else if (numberLength == 5) {
            number = number.slice(0, 2) + "&thinsp;" + number.slice(2);
        }
        else if (numberLength == 6) {
            number = number.slice(0, 3) + "&thinsp;" + number.slice(3);
        }
        else if (numberLength == 7) {
            number = number.slice(0, 1) + "&thinsp;" + number.slice(1, 4) + "&thinsp;" + number.slice(4);
        }
        return number;
    }
}

$(".tier-buttons a[href^='#'], .unit-type-list a[href^='#']").click(function (e) {
    e.preventDefault();

    var position = $($(this).attr("href")).offset().top;

    $("body, html").animate({
        scrollTop: position
    } /* speed */);
});

function isMobileDevice() {
    return ((window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1)) && ($(window).width() < 1191);
};

$(document).ready(function () {
    $(".modal-body").tooltip({
        selector: '[data-toggle="tooltip"]'
    });
    $('body').tooltip({
        selector: '[rel="tooltip"]'
    });
    isMobile = isMobileDevice();
    if (isMobile) {
        doneTypingInterval = 700;
    }
    $("#compare-container").hide();
    setSeparationLineHeight();

    $(".unit-name").each(function () {
        var checkboxTemplate = `
<label class="container">
<input type="checkbox">
<span class="checkmark"></span>
</label>
    `;
        $(checkboxTemplate).insertAfter(this);
    });
    //$('body').popover(popoverAsTooltipSettings);
    $('body').popover(popoverSettings);

    $('.dropdown-content').hover(function () {
        $(this).parent().children().eq(0).addClass("border-button");
    }, function () { $(this).parent().children().eq(0).removeClass("border-button") });



    $(".unit-box").each(function () {
        $(this).attr("data-toggle", "popover");
        //$(this).attr("data-trigger", "hover");
        //$(this).attr("data-toggle", "popover");
    });
    //$('[data-toggle="popover"]').popover({ constraints: [{ to: 'scrollParent', pin: true }] });
    screenHeight = window.screen.availHeight;
    screenWidth = window.screen.availWidth;

    unitGuideCSV = $("#csv-unit-guide").text();

    csvObj = $.csv.toObjects(unitGuideCSV);

    //weaponsCSV = $("#weapons-csv").text();
    //weaponsObj = $.csv.toObjects(weaponsCSV);

    $(document).on({
        mouseenter: function () {
            var displayDelay = 300;
            if ($(this).hasClass("unit-name")) {
                var obj = $(this).parent().children().eq(0)
            }
            else if ($(this).hasClass("search-input-row")) {
                var obj = $(this);
            } else {
                var obj = $(this);
            }
            var unitName = $(obj).attr("uname");
            var unitSide = $(obj).attr("side");

            unitData.imgSrc = $(obj).attr("style");
            unitImg = $(obj).attr("img");
            if (unitImg != undefined) {
                unitData.imgSrc = unitImg;
            }
            for (i = 0; i < csvObj.length; i++) {
                if (csvObj[i].Name === unitName && csvObj[i].SIDE.toLowerCase() === unitSide) {
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
                    unitData.reloadTime_w1 = $(obj).attr("w1-rt");
                    unitData.reloadTime_w2 = $(obj).attr("w2-rt");
                    unitData.reloadTime_w3 = $(obj).attr("w3-rt");
                    unitData.onlyDps = $(obj).attr("only-dps");
                    unitData.p1 = $(obj).attr("p1");
                    unitData.p2 = $(obj).attr("p2");
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
                        unitData.p1 = $(obj).attr("p1");
                        unitData.p2 = $(obj).attr("p2");
                        unitData.p3 = $(obj).attr("p3");
                        unitData.p4 = $(obj).attr("p4");
                        unitData.sup1 = $(obj).attr("sup1");
                        unitData.sup2 = $(obj).attr("sup2");
                    }

                    unitTypeObj = checkUnitType();

                    if (unitTypeObj.isBuildingType) {
                    }
                    else if (!isNaN(csvObj[i].DamageModifier)) {
                        unitData.HP = csvObj[i].MaxDamage / csvObj[i].DamageModifier;
                    }

                    countDpsAndRange(obj);

                    setLabelParametersAndValues(checkUnitType());

                    setParameterBars();

                    setWeaponsAA();
                    fillHTML();
                    // NOWA STRONA DO MOBILKI!! TO DZIA£A!
                    //        var opened = window.open("","_self");
                    //        opened.document.write(`<html><head>     <link rel="stylesheet" href="styles.css"     <link href="https://fonts.googleapis.com/css?family=Teko:400,500,600,700" rel="stylesheet"> <link href="https://fonts.googleapis.com/css?family=Exo+2:300,400,600,700" rel="stylesheet">     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">>><title>MyTitle</title></head><body><a class="home-page-link" href="" title="Back to the top of the page">
                    //    <div class="unit-guide-logo teko-47">TA: ESC <span style="color: #DEA73C;">Unit Guide</span></div>
                    //    <!--<div class="by-dioxide">by <span style="font-weight:600">Dioxide</span></div>-->
                    //</a>${htmlOfPreview}</body></html>`);

                    delay = setTimeout(function () {
                        if ($("#search-input-results-" + inputNumber).is(":hover") && duplicateCounter == 0) {
                            //$("#search-input-results-" + inputNumber).prepend(htmlOfPreview);
                            //setPreviewPosition(obj);
                            duplicateCounter++;
                        }
                        else if (duplicateCounter == 0) {
                            //$(obj).append(htmlOfPreview);
                            //setPreviewPosition(obj);
                        }

                        findKeywordsAndChangeColor();
                    }, displayDelay);

                    break;
                }
            }
        },
        mouseleave: function () {
            unitData.isEco = false;
            unitData.minEnergyIncome = undefined;
            unitData.maxEnergyIncome = undefined;
            duplicateCounter = 0;
            clearTimeout(delay);
            firstParameter = "";
            secondParameter = "";
            thirdParameter = "";
            fourthParameter = "";
            fifthParameter = "";
            sixthParameter = "";
            boxShadowsStyleDps = ""; //only for bars with 10/10
            boxShadowsStyleRange = "";
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
            boxShadowsStyleDamagePerShot = "";
            boxShadowsStyleExplosionDamage = "";
            boxShadowsStyleExplosionRange = "";
            ShineEffect = {
                ForDamagePerShot: "",
                ForDPS: "",
                ForHP: "",
                ForMS: "",
                ForRange: "",
                ForSightD: "",
                ForBuildSpeed: "",
                ForMinMetalCostForE: "",
                ForMaxMetalCostForE: "",
                ForExplosionRange: ""
            }
            //$(".unit-preview").remove();
        }
    }, ".search-input-row, .unit-box, .unit-name");

    $(".search-input").click(function () {
        inputNumber = $(this).attr('number');
    });

    $(document).click(function (event) {
        if (!$(event.target).closest('.search-bar').length) {
            if ($('#search-input-results-' + inputNumber).is(":visible")) {
                $('#search-input-results-' + inputNumber).hide();
                $('#search-input-results-' + inputNumber).removeClass("border-white");
            }
        }
    });

    var html;

    $(".search-bar").on('click', function () {
        currentInputNumber = $(this).children().eq(0).attr("number");
        if ($(this).attr("number") == 0) {
            $("#compare-container").hide();
            status = 0;
        }
        if ($('#search-input-results-' + inputNumber).html() == "" || $('#search-input-results-' + inputNumber).html() == undefined) {
        }
        else {
            $('#search-input-results-' + inputNumber).show();
            $('#search-input-results-' + inputNumber).addClass("border-white");
            if (isMobile) {
                var inputWidth = $("#search-bar-mobile").width() + 4;
                $('#search-input-results-' + inputNumber).css("width", inputWidth);
                $('#search-input-results-' + inputNumber).css("margin", "0 13px");
            }
        }
    });

    $(".search-input").on('keyup', function (e) {
        inputNumber = $(this).attr("number");
        $('.popover').hide();
        //$('#search-input-results-' + inputNumber).show();


        if (e.key === "ArrowDown") {
            selectedRowNumber++;
            $(".row-result, .search-input-row").eq(selectedRowNumber - 1).addClass("selected-row");
            if (numberOfRowResults > 1) {
                $(".row-result, .search-input-row").eq(selectedRowNumber - 2).removeClass("selected-row");
            }
            if (selectedRowNumber > numberOfRowResults - 1) {
                selectedRowNumber = 0;
            }
        }
        else if (e.key === "ArrowUp") {
            selectedRowNumber--;
            if (selectedRowNumber == 0) {
                $(".row-result, .search-input-row").eq(selectedRowNumber).removeClass("selected-row");
                selectedRowNumber = numberOfRowResults;
            }
            $(".row-result, .search-input-row").eq(selectedRowNumber - 1).addClass("selected-row");
            $(".row-result, .search-input-row").eq(selectedRowNumber).removeClass("selected-row");

        }
        else if (inputNumber == 0 && e.key === "Enter") { }
        else {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
        }
    });

    $(".search-input").on('keydown', function (e) {
        $('.popover').hide();
        inputNumber = $(this).attr("number");
        if (e.key === "Escape") {
            $("#search-input-" + currentInputNumber).val("");
            $('#search-input-results-' + inputNumber).removeClass("border-white");
            $('#search-input-results-' + inputNumber).html("");
        }
        else if (e.key === "Enter") {
            if ($(this).val() == "" && inputNumber != 0 && !$("#comparison-button").is(':disabled')) {
                generateComparison();
                $('#comparison-modal').modal("show");
            }
            else {
                if (inputNumber == 0) {
                    // for search input
                    var obj = $(".search-input-row");
                    if (obj.length == 0) {
                    }
                    else if (obj.length == 1) {
                        obj = $(".search-input-row").first();
                        generateDetailedInfo(obj);
                    }
                    else {
                        if ($(".search-input-row").hasClass("selected-row")) {
                            obj = $(".search-input-row.selected-row").first();
                            generateDetailedInfo(obj);
                        } else {
                            showSearchResults();
                        }
                    }
                }

                else {
                    // for comparison inputs
                    var obj = $(".row-result").first();
                    if (obj.length == 0) {
                    } else {
                        if ($(".row-result").hasClass("selected-row")) {
                            obj = $(".row-result.selected-row").first();
                        } else {
                            obj = $(".row-result").first();
                        }

                        var attributes = $(obj).prop("attributes");
                        $("#search-input-" + inputNumber).parent().append("<li class='chosen-unit exo2-16' id='chosen-unit-id-" + inputNumber + "' side='" + $(obj).attr("side") + "'><span style='position:relative; left:-10px;'>" + $(obj).attr("uname") + "</span><div class='close-btn'>&#10006;</div></li>");
                        $("#search-input-" + inputNumber).val("");
                        checkCheckboxIfWrite($(obj).attr("uname"));
                        for (i = 0; i < attributes.length; i++) {
                            $("#chosen-unit-id-" + inputNumber).attr(attributes[i].name, attributes[i].value);
                        }
                        $("#chosen-unit-id-" + inputNumber).removeClass("row-result");
                        $("#chosen-unit-id-" + inputNumber).addClass("chosen-unit exo2-16");
                        $("#search-input-results-" + inputNumber).html("").css("display", "none");
                        $('#search-input-results-' + inputNumber).hide();
                        checkIfButtonDisabled();
                        inputNumber++
                        $('#search-input-' + inputNumber).focus();
                    }
                    selectedRowNumber = 0;
                }

            }

        }
        else if (e.key === "Backspace") {
            if ($(this).val() == "") {

            }
            else if ($(this).val().length == 1) {
                if (!($(this).attr("number") > 0)) {
                    $(".search-icon").hide();
                }
                $('#search-input-results-' + inputNumber).removeClass("border-white");
                $('#search-input-results-' + inputNumber).html("");
            }
            else {
                $("#loading-icon-" + $(this).attr("number")).show();
                if (!($(this).attr("number") > 0)) {
                    $(".search-icon").hide();
                }
                $('#search-input-results-' + inputNumber).removeClass("border-white");
                $('#search-input-results-' + inputNumber).html("");
            }
        }
        else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        }
        else if (e.key === "Control" || e.key === "Alt" || e.key === "Shift" || e.key === "Tab") {
            $('#search-input-results-' + inputNumber).removeClass("border-white");
            $('#search-input-results-' + inputNumber).html("");
            if (e.key === "Tab" && inputNumber == 4) {
                $('#search-input-1').focus();
            }
        }
        else {
            $("#loading-icon-" + $(this).attr("number")).show();
            if (!($(this).attr("number") > 0)) {
                $(".search-icon").hide();
            }
            $('#search-input-results-' + inputNumber).removeClass("border-white");
            $('#search-input-results-' + inputNumber).html("");
        }
        if (e.key === "Enter" || e.key === "Control" || e.key === "Alt" || e.key === "Shift" || e.key === "Tab") {
        } else {
            $('#search-input-results-' + inputNumber).show();
            if (isMobile) {
                var inputWidth = $("#search-bar-mobile").width() + 4;
                $('#search-input-results-' + inputNumber).css("width", inputWidth);
                $('#search-input-results-' + inputNumber).css("margin", "0 13px");
            }
        }
        clearTimeout(typingTimer);
    });


    function doneTyping() {
        if ($("#chosen-unit-id-" + inputNumber).length == 0) {
        $(".loading-icon").hide();
        $(".search-icon").show();
        var allNamesContainingStringFromSearch = [];
        var unitsThatAlreadyAreInList = [];

        var textFromSearchInput = $("#search-input-" + inputNumber).val().toLowerCase();
        if (textFromSearchInput.length >= 1) {


            for (i = 0; i < csvObj.length; i++) {
                if (csvObj[i].Name != undefined && csvObj[i].Name != 'n/a') {
                    var unitName = (csvObj[i].Name).toLowerCase().indexOf(textFromSearchInput);
                    if (unitName >= 0) {
                        var unitNameAndSide = {
                            name: csvObj[i].Name,
                            side: csvObj[i].SIDE.toLowerCase()
                        };
                        allNamesContainingStringFromSearch.push(unitNameAndSide);
                    }
                }
            }
            for (i = 0; i < allNamesContainingStringFromSearch.length; i++) {
                $(".unit-box").each(function () {
                    if ($(this).attr("uname") == allNamesContainingStringFromSearch[i].name && $(this).attr("side") == allNamesContainingStringFromSearch[i].side) {
                        var attributes = $(this).prop("attributes");
                        var obj = $(this).clone().addClass("unit-box-in-search-result");
                        html = $('<div />').append($(obj).removeClass("unit-box").removeAttr("data-toggle").clone()).html();
                        var unitNameLower = $(this).attr("uname").toLowerCase();
                        var indexStart = unitNameLower.indexOf(textFromSearchInput.toLowerCase());
                        var indexEnd = unitNameLower.indexOf(textFromSearchInput) + textFromSearchInput.toLowerCase().length;
                        var name = highlightThePhrase($(this).attr("uname"), indexStart, indexEnd);
                        var unitNameAndSide = {
                            nameSide: $(this).attr("uname") + $(this).attr("side"),
                            name: $(this).attr("uname"),
                            side: $(this).attr("side"),
                            attributes: attributes,
                            unitImg: $(this).attr("style"),
                            html: html,
                            unitNameHTML: '<div class="unit-name-html"><span class="unit-name-containter">' + name + ' [' + $(this).attr("side").toUpperCase() + ']</span></div>'
                        };
                        unitsThatAlreadyAreInList.push(unitNameAndSide);
                    }

                });
            }
            if (unitsThatAlreadyAreInList.length == 0) {
                $('#search-input-results-' + inputNumber).append('<div class="no-results-info exo2-16"> Unit was not found.</div>').addClass("border-white");
            }
            else {
                var uniqueUnitNamesList = removeDuplicates(unitsThatAlreadyAreInList, "nameSide");
                if (inputNumber > 0) {
                    for (i = 0; i < uniqueUnitNamesList.length; i++) {
                        $("#search-input-results-" + inputNumber).append('<div class="row-result" img="' + uniqueUnitNamesList[i].unitImg + '">' + uniqueUnitNamesList[i].html + uniqueUnitNamesList[i].unitNameHTML + ' </div>').addClass("border-white");
                        for (j = 1; j < uniqueUnitNamesList[i].attributes.length; j++) {
                            $(".row-result:last-child").attr(uniqueUnitNamesList[i].attributes[j].name, uniqueUnitNamesList[i].attributes[j].value).removeAttr("data-toggle");
                        }
                        $(".row-result:last-child").removeAttr("style");
                    }
                    $("#search-input-results-" + inputNumber).prepend('<div class="white exo2-16" style="padding-left:6px;padding-top:7px;font-size:14px;">Choose a unit:</div> ');
                }
                else {
                    for (i = 0; i < uniqueUnitNamesList.length; i++) {
                        $("#search-input-results-" + inputNumber).append('<div class="search-input-row" img="' + uniqueUnitNamesList[i].unitImg + '">' + uniqueUnitNamesList[i].html + uniqueUnitNamesList[i].unitNameHTML + ' </div>').addClass("border-white");
                        for (j = 1; j < uniqueUnitNamesList[i].attributes.length; j++) {
                            $(".search-input-row:last-child").attr(uniqueUnitNamesList[i].attributes[j].name, uniqueUnitNamesList[i].attributes[j].value);
                        }
                        $(".search-input-row:last-child").removeAttr("style");
                    }
                }
                
            }
            if (!$("#search-input-results-" + inputNumber).text() == "") {
                $("#search-input-results-" + inputNumber).show();
            }
            $(".input-results-container #search-input-results-" + inputNumber).parent().show();
            numberOfRowResults = $(".row-result, .search-input-row").length;

            const ps = new PerfectScrollbar("#search-input-results-" + inputNumber, {
                wheelSpeed: 0.6,
                wheelPropagation: true,
                minScrollbarLength: 20
            });

            if ($(".row-result").length == 1) {
                inputNumber = $(".row-result").parent().parent().parent().children().eq(0).attr("number");
                var attributes = $(".row-result").prop("attributes");
                $("#search-input-" + inputNumber).parent().append("<li class='chosen-unit exo2-16' id='chosen-unit-id-" + inputNumber + "' side='" + $(".row-result").attr("side") + "'><span style='position:relative; left:-10px;'>" + $(".row-result").attr("uname") + "</span><div class='close-btn'>&#10006;</div></li>");
                $("#search-input-" + inputNumber).val("");
                for (i = 0; i < attributes.length; i++) {
                    $("#chosen-unit-id-" + inputNumber).attr(attributes[i].name, attributes[i].value);
                }
                checkCheckboxIfWrite($(".row-result").attr("uname"));
                $("#chosen-unit-id-" + inputNumber).removeClass("row-result");
                $("#chosen-unit-id-" + inputNumber).addClass("chosen-unit exo2-16");
                $("#search-input-results-" + inputNumber).html("");
                selectedRowNumber = 0;
                checkIfButtonDisabled();
                $(".input-results-container").hide();
            }
            }
        }
    }

    $('#compare-container').on('click', '.row-result', function () {
        inputNumber = $(this).parent().parent().parent().children().eq(0).attr("number");
        var attributes = $(this).prop("attributes");
        $("#search-input-" + inputNumber).parent().append("<li class='chosen-unit exo2-16' id='chosen-unit-id-" + inputNumber + "' side='" + $(this).attr("side") + "'><span style='position:relative; left:-10px;'>" + $(this).attr("uname") + "</span><div class='close-btn'>&#10006;</div></li>");
        $("#search-input-" + inputNumber).val("");
        checkCheckboxIfWrite($(this).attr("uname"));
        for (i = 0; i < attributes.length; i++) {
            $("#chosen-unit-id-" + inputNumber).attr(attributes[i].name, attributes[i].value);
        }
        $("#chosen-unit-id-" + inputNumber).removeClass("row-result");
        $("#chosen-unit-id-" + inputNumber).addClass("chosen-unit exo2-16");
        $("#search-input-results-" + inputNumber).html("");
        selectedRowNumber = 0;
        checkIfButtonDisabled();
        $(".input-results-container").hide();
    });

    function checkIfButtonDisabled() {
        if ($('.chosen-unit').length < 2) {
            document.getElementById("comparison-button").disabled = true;
        }
        else {
            document.getElementById("comparison-button").disabled = false;
        }
    }

    $('#compare-container').on('click', '.close-btn', function () {
        inputNumber = $(this).parent().parent().children().eq(0).attr("number");
        $("#search-input-results-" + inputNumber).hide();
        $(this).parent().parent().children().eq(0).val("");
        $(this).parent().remove();
        if ($('.chosen-unit').length < 2) {
            document.getElementById("comparison-button").disabled = true;
        }
        else {
            document.getElementById("comparison-button").disabled = false;
        }
        $(".loading-icon").hide();
    });

    $('#compare-container').on('click', '.chosen-unit', function () {
        inputNumber = $(this).parent().children().eq(0).attr("number");
        var uname = $(this).attr("uname");
        $("#search-input-results-" + inputNumber).hide();
        $(this).parent().children().eq(0).val("");
        $(this).remove();
        
        uncheckCheckboxWhenDelete(uname);
        if ($('.chosen-unit').length < 2) {
            document.getElementById("comparison-button").disabled = true;
        }
        else {
            document.getElementById("comparison-button").disabled = false;
        }
        $(".loading-icon").hide();
    });

    $('#compare-container').on('click', '#comparison-button', function () {
        generateComparison();
    });
    function generateComparison() {
        $(".navbar").css("right", "17px");
        switch ($(".chosen-unit").length) {
            case 2:
                $(".comparison-content").css("min-width", "837px");
                break;
            case 3:
                $(".comparison-content").css("min-width", "1255px");
                break;
            case 4:
                $(".comparison-content").css("min-width", "1676px");
                break;
        }
        generateUnitComparison();
        $('#compare-container').slideUp(150);
        status = 0;
        $(".navbar").css("filter", "0.15");
        hideAndClearCheckboxes();
    }

    $('#comparison-modal').on('hidden.bs.modal', function () {
        $(".navbar").css("right", "0px");
        $(".navbar").css("opacity", "1");
        $('#comparison-modal .modal-body .comparison-content').html("");
    });

    $('#detailed-unit-info-1').on('hidden.bs.modal', function () {
        $(".navbar").css("right", "0px");
    });

    $(document).click(function (event) {
        if (!$(event.target).closest('.unit-preview-comparison').length) {
            $('#comparison-modal').modal('hide');
        }
    });

    $('#comparison-modal').on('show.bs.modal', function () {
        $(this).find('.modal-body').css({
            width: 'auto',
            height: 'auto',
            'max-height': '100%'
        });
    });



    function generateUnitComparison() {
        changingColorCounter = 0;
        $(".chosen-unit").each(function () {
            var obj = $(this);
            var unitName = $(this).attr("uname");
            var unitSide = $(this).attr("side");
            unitData.imgSrc = $(this).attr("img");

            for (i = 0; i < csvObj.length; i++) {
                if (csvObj[i].Name === unitName && csvObj[i].SIDE.toLowerCase() === unitSide) {
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
                    unitData.reloadTime_w1 = $(obj).attr("w1-rt");
                    unitData.reloadTime_w2 = $(obj).attr("w2-rt");
                    unitData.reloadTime_w3 = $(obj).attr("w3-rt");
                    unitData.onlyDps = $(obj).attr("only-dps");
                    unitData.p1 = $(obj).attr("p1");
                    unitData.p2 = $(obj).attr("p2");
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
                        unitData.sup1 = $(obj).attr("sup1");
                        unitData.sup2 = $(obj).attr("sup2");
                    }

                    unitTypeObj = checkUnitType();

                    if (unitTypeObj.isBuildingType) {
                    }
                    else if (!isNaN(csvObj[i].DamageModifier)) {
                        unitData.HP = csvObj[i].MaxDamage / csvObj[i].DamageModifier;
                    }

                    countDpsAndRange(obj);

                    setLabelParametersAndValues(checkUnitType());

                    setParameterBars();
                    setWeaponsAA();
                    fillHTML();
                }
            }
            $(".comparison-content").append(htmlOfPreview);
            findKeywordsAndChangeColor();
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
            boxShadowsStyleDps = ""; //only for bars with 10/10
            boxShadowsStyleRange = "";
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
            boxShadowsStyleDamagePerShot = "";
            boxShadowsStyleExplosionDamage = "";
            boxShadowsStyleExplosionRange = "";
            ShineEffect = {
                ForDamagePerShot: "",
                ForDPS: "",
                ForHP: "",
                ForMS: "",
                ForRange: "",
                ForSightD: "",
                ForBuildSpeed: "",
                ForMinMetalCostForE: "",
                ForMaxMetalCostForE: "",
                ForExplosionRange: ""
            }
            $(".unit-preview").addClass("unit-preview-comparison");
            $(".unit-preview-comparison").removeClass("unit-preview");
            $(".preview-info").remove();
        });
    }

    $("#comparison-option-button").click(function () {
        if (status == 0) {
            $("#compare-container").slideDown(150);
            $("label").show();
            status = 1;
        }
        else {
            $("#compare-container").slideUp(150);
            hideAndClearCheckboxes();
            status = 0;
        }
        $("#comparison-modal").hide();
    });
    $("#close-comparison-window").click(function () {
        if (status == 0) {
            $("#compare-container").slideDown(150);
            status = 1;
        }
        else {
            $("#compare-container").slideUp(150);
            hideAndClearCheckboxes();
            status = 0;
        }
    });

    function highlightThePhrase(str, start, end) {
        str = str.substr(0, start) +
            '<span class="highlight-the-written-phrase">' +
            str.substr(start, end - start) +
            '</span>' +
            str.substr(end);
        return str;
    }


    $(".tooltip-wrapper").mouseover(function () {
        if ($(this).children().eq(0).is(':disabled')) {
            $(this).attr("rel", "tooltip");
        }
        else {
            $(this).removeAttr("rel");
        }
    });

 

    jQuery.fn.changeKeywordsColor = function (str, className) {
        var regex = new RegExp(str, "gi");

        return this.each(function () {
            this.innerHTML = this.innerHTML.replace(regex, function (matched) { return "<span class=\"" + className + "\">" + matched + "</span>"; });

        });
    }

    function findKeywordsAndChangeColor() {
        for (i = 0; i < keywords.length; i++) {
            $(".unit-description-text").changeKeywordsColor(keywords[i], "yellow-bold");
            $(".unit-desc").changeKeywordsColor(keywords[i], "yellow-bold");
        }
        var overallDpsInBrackets = "=" + unitData.overallDps;
        $(".preview-frame .parameter-bar-and-value:first-child .parameter-value").changeKeywordsColor(overallDpsInBrackets, "yellow-bold");
    }

    function setSeparationLineHeight() {
        $(".arm-side").each(function () {
            var numberOfUnits = $(this).children().eq(1).children().eq(0).children().length;
            var separationLine = $(this).children().eq(0).children().eq(0).children().eq(1);
            if (numberOfUnits <= 3) {
                $(separationLine).css("height", "96px");
            }
            else if (numberOfUnits <= 6) { $(separationLine).css("height", "256px"); }
            else if (numberOfUnits <= 9) { $(separationLine).css("height", "414px"); }
            else if (numberOfUnits <= 12) { $(separationLine).css("height", "573px"); }
            else if (numberOfUnits <= 15) { $(separationLine).css("height", "732px"); }
        });
        $(".core-side").each(function () {
            var numberOfUnits = $(this).children().eq(1).children().eq(0).children().length;
            var separationLine = $(this).children().eq(0).children().eq(0).children().eq(1);
            if (numberOfUnits <= 3) {
                $(separationLine).css("height", "96px");
            }
            else if (numberOfUnits <= 6) { $(separationLine).css("height", "256px"); }
            else if (numberOfUnits <= 9) { $(separationLine).css("height", "414px"); }
            else if (numberOfUnits <= 12) { $(separationLine).css("height", "573px"); }
            else if (numberOfUnits <= 15) { $(separationLine).css("height", "732px"); }
        });
    }

    $(".search-icon").click(function () {
        showSearchResults();
    });

    function showSearchResults() {
        $(".input-results-container").hide();
        $("#loading-icon-0").show();
        $("#loading-icon-6").show();
        $("#search-bar .search-icon").hide();
        $("#search-bar-mobile .search-icon").hide();
        setTimeout(function () {
            $(".input-results-container").show();
            $(".search-icon").show();
            $("#loading-icon-0").hide();
            $("#search-bar-mobile .search-icon").show();
            $("#loading-icon-6").hide();
        }, 300);
    }

    $(".container").on('click', ".checkmark", function () {
        inputNumber = checkWhichFirstInputIsFree();
        var checkboxObj = $(this).parent().children().eq(0);
        if (inputNumber == 10) {
            replaceLastChoiceIfFull();
            inputNumber = 4;
        } else {
        }
        if (!checkboxObj.prop('checked')) {
            var obj = $(this).parent().parent().children().eq(0);
            var attributes = $(obj).prop("attributes");
            $("#search-input-" + inputNumber).parent().append("<li class='chosen-unit exo2-16' id='chosen-unit-id-" + inputNumber + "' side='" + $(obj).attr("side") + "'><span style='position:relative; left:-10px;'>" + $(obj).attr("uname") + "</span><div class='close-btn'>&#10006;</div></li>");
            $("#search-input-" + inputNumber).val("");
            for (i = 0; i < attributes.length; i++) {
                if (!(attributes[i].name == "class") && !(attributes[i].name == "data-toggle") && !(attributes[i].name == "data-original-title")) {
                    if (attributes[i].name == "style") {
                        $("#chosen-unit-id-" + inputNumber).attr("img", attributes[i].value);
                    } else {
                        $("#chosen-unit-id-" + inputNumber).attr(attributes[i].name, attributes[i].value);
                    }

                }
            }
            checkIfButtonDisabled();
        }
        else {           
            var uname = $(this).parent().parent().children().eq(0).attr("uname");
            $(".chosen-unit[uname = '" + uname + "']").remove();
            $(this).prop('checked', false);
            checkIfButtonDisabled();
        }

    });
    function checkWhichFirstInputIsFree() {
        if ($("#chosen-unit-id-1").length != 1) {
            return 1;
        }
        else if ($("#chosen-unit-id-2").length != 1) {
            return 2;
        }
        else if ($("#chosen-unit-id-3").length != 1) {
            return 3;
        }
        else if ($("#chosen-unit-id-4").length != 1) {
            return 4;
        }
        else {
            return 10;
        }
    }

    function hideAndClearCheckboxes() {
        $("label.container").hide();
        //$("label.container>input").prop('checked', false);
    }

    function checkCheckboxIfWrite(uname) {
        $(".unit-box[uname='" + uname + "']").each(function () { $(this).parent().children().eq(2).children().eq(0).prop('checked', true); })
    }
    function uncheckCheckboxWhenDelete(uname) {
        $(".unit-box[uname='" + uname + "']").each(function () { $(this).parent().children().eq(2).children().eq(0).prop('checked', false); })
    }

    function replaceLastChoiceIfFull() {
        var uname = $("#chosen-unit-id-4").attr("uname");
        $("#chosen-unit-id-4").remove();
        uncheckCheckboxWhenDelete(uname);
    }

    function fillHTML() {
        htmlOfPreview = `
                        <div class="unit-preview">
                                <div class="preview-frame exo2-16" id="preview-frame">
                                    <div class="top-label-unit-name">
                                        <p class="unit-name-text exo2-16">${unitData.name} <span style="font-weight:normal;">[preview]</span></p>
                                        <p class="unit-description-text exo2-12">${unitData.description}</p>
                                    </div>
<hr class="separator-between-info-stats-1">
                                    <div class="unit-basic-info row">
                                        <div class="col col-lg-4 unit-image-box">
                                                <div class="unit-box-in-preview" style="${unitData.imgSrc}"></div>
                                        </div>

                                        <div class="col col-lg-8" style="padding-left:0;">
                                            <div class="res-cost-row"><div class="energy-cost-bar exo2-16">Energy cost</div><span class="energy-cost-digit exo2-16">${setSpacesInBigNumbers(unitData.energyCost)}</span></div>
                                            <div class="res-cost-row" style="margin-bottom:3px;"><div class="metal-cost-bar exo2-16">Metal cost</div><span class="metal-cost-digit exo2-16">${setSpacesInBigNumbers(unitData.metalCost)} </span></div>
                                            <div class="summoning-code exo2-16">Summoning code</div><span class="summoning-code-text exo2-16">+${unitData.summoningCode}</span>
                                        </div>


                                    </div>
<div style="margin-top:6px; height:0;">${unitData.side == "core" ? `<img class="side-logo-preview" src="logo-core.svg" />` : `<img class="side-logo-preview" src="logo-arm.svg" />`}</div>
                                    <hr style="margin: 0 auto 0 0; width: 172px; background: #757575; position: relative; top:1px;">
                                    <hr style="margin: 0 0 0 auto; width: 172px; background: #757575;">
                                    <div class="unit-basic-stats">

                                        <div class="exo2-26 basic-stats" >Basic stats</div>
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
                                                    ${unitTypeObj.isEco && unitData.maxEnergyIncome != undefined && unitData.minEnergyIncome != undefined ? `
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
                                                    ${unitTypeObj.isRadarAndJammerUnit || unitTypeObj.isUndefinedUnit ? `
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
                                                     ${unitTypeObj.isAirCons || unitTypeObj.isUndefinedAircraft || unitTypeObj.isAirFigther ? `
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
                                                    ${unitTypeObj.isFighter || unitTypeObj.isDefenseShootingBuilding || unitTypeObj.isFighterDpsOnly || unitTypeObj.isAirCons || unitTypeObj.isCons || unitTypeObj.isSemiCon || unitTypeObj.isAirFigther ? `
                                                        <div class="parameter-bar-and-value ${ShineEffect.ForSightD}">
                                                        <div class="box-shadow-for-bar" style="${boxShadowsStylesightRange}"></div>
                                                            <img src="${sightRange_SrcImg}" class="parameter-bar" alt="">
                                                            <div class="parameter-value">${setSpacesInBigNumbers(unitData.sightRange)}</div>
                                                        </div>
                                                    ` : ""}
                                            </div>

                                        </div>
                                                    ${(unitTypeObj.isRadarAndJammerAircraft || unitTypeObj.isRadarAndJammerBuilding || unitTypeObj.isRadarAndJammerUnit || unitTypeObj.isJammerAircraft || unitTypeObj.isJammerBuilding || unitTypeObj.isJammerUnit || unitTypeObj.isBuilding || unitTypeObj.isEco) && unitData.p1 != undefined && unitData.minEnergyIncome == undefined ? `

                                                            <hr class="separator-between-info-stats-1">
                                                            <div class="exo2-26 additional-info">Note</div>
                                                            <p style="color:white; text-align:center; padding:7px 30px">${unitData.p1} ${unitData.p2 != undefined ? unitData.p2 : ""}</p>

                                                    ` : ""}
                                                       ${unitTypeObj.isEco && unitData.sup1 != undefined && unitData.sup2 != undefined ? `
                                                            <hr class="separator-between-info-stats">
                                                            <i class="exo2-16 white useful-info-padding">
                                                                <sup class="sup">1</sup><span class="sup-info">${unitData.sup1}</span>
                                                            </i>
                                                            <i class="exo2-16 white useful-info-padding">
                                                                <sup class="sup">2</sup><span class="sup-info">${unitData.sup2}</span>
                                                            </i>
                                                        ` : ""
            }
                                                       ${unitTypeObj.isEco && unitData.sup1 != undefined && unitData.sup2 == undefined ? `
                                                            <hr class="separator-between-info-stats">
                                                            <i class="exo2-16 white useful-info-padding">
                                                                <sup class="sup">1</sup><span class="sup-info">${unitData.sup1}</span>
                                                            </i>
                                                        ` : ""
            }

                                        <p class="preview-info">This is a short preview. Click on unit to see more details.</p>

                                        </div>
                                    </div>
                                </div>
                        `;
    }

});
