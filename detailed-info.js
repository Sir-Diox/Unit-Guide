//$('#detailed-unit-info-1').on('hidden.bs.modal', function () {
//    //$(".detailed-info-wrapper").html("");
//    $('#detailed-unit-info-2').modal('show');
//});

//$('#detailed-unit-info-2').on('hidden.bs.modal', function () {
//    //$(".detailed-info-wrapper").html("");
//    $('#detailed-unit-info-1').modal('show');
//});

$('body').on('click', '.unit-box', function () {
    //if ($('#detailed-unit-info-1').hasClass('show')) {
    //    $('#detailed-unit-info-1').modal('toggle');
    //    setTimeout(function () {
    //        $('#detailed-unit-info-2').modal('toggle');
    //    }, 500);
    //}
    //if ($('#detailed-unit-info-2').hasClass('show')) {
    //    $('#detailed-unit-info-2').modal('toggle');
    //    setTimeout(function () {
    //        $('#detailed-unit-info-1').modal('toggle');
    //    }, 500);
    //}
    $('#detailed-unit-info-1').modal('show');

    //$(".detailed-info-wrapper").html("");
    var obj = $(this);
    var attributes = $(this).prop("attributes");
    var ctr = 0;

    var unitName = $(this).attr("uname");
    
    var unitSide = $(obj).attr("side");
    unitData.imgSrc = $(this).attr("style");
    unitImg = $(this).attr("img");
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

            if (unitData.canBuild != "") { // what can build
                generateCanBuildList();
            }

            if (unitData.builtBy != "") { // built by
                generateBuiltByList();
            }

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
        }
    }
    }
});


function generateCanBuildList() {
    buildingsCodes = [];
    buildingsList = [];
    var str = unitData.canBuild;
    var buildings = str.split(" ");

    for (i = 0; i < buildings.length; i++) {
        $(".unit-box").each(function () {
            var unitCode = $(this).attr("style");

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
    $(".detailed-info-wrapper").append('<div class="can-build"><p>Able to build:</p></div>');
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

    $(".detailed-info-wrapper").append('<div class="built-by"><p>Built by:</p></div>');
    for (i = 0; i < buildingsList.length; i++) {
        var html = $('<div />').append(buildingsList[i]).addClass("name-image-box");

        $(".built-by").append(html);
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