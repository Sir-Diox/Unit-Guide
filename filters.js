var unitsListConstruction = [];
var allArrays = [];
var result = [];
$(".ctn").click(function () {
    $(".filter-results").html("");
    allArrays = [];
    result = [];

    $(".mobile-hide").eq(1).hide();
    $(".units-content").hide();
    $(".main-banner").hide();


    $(".ctn").each(function () {
        if ($(this).children().eq(0).is(':checked')) {
            var valueName = $(this).attr("value");

            if (valueName == "Anti air") {
                var unitsListAA = [];
                $(".units-content .unit-box").each(function () {
                    if (!($(this).attr("w1-aa") == undefined && $(this).attr("w2-aa") == undefined && $(this).attr("w3-aa") == undefined)) {

                        unitsListAA.push($(this).parent().wrap('<p/>').parent().html());

                        //$(this).parent().hide();
                        //$(this).parent().parent().parent().parent().children().eq(0).hide();

                        //$(".lab-units-separation-line").hide();
                        //$(".tier-unit-type-divider").hide();
                    }
                });
                setTimeout(function () {
                    allArrays.push(unitsListAA);
                }, 0.01);
            }

            if (valueName == "Movement speed") {
                var unitsListNameMs = [];
                var unitsListMs = [];
                if ($(this).is("[from]") || $(this).is("[to]")) {
                    var movementFrom = parseFloat($(this).attr("from"));
                    var movementTo = parseFloat($(this).attr("to"));
                    $("#movement-from").val($(this).attr("from"));
                    $("#movement-to").val($(this).attr("to"));
                }
                else {
                    var movementFrom = $("#movement-from").val();
                    var movementTo = $("#movement-to").val();
                }

                for (i = 0; i < csvObj.length; i++) {
                    if (parseFloat(csvObj[i].maxvelocity) >= movementFrom && parseFloat(csvObj[i].maxvelocity) <= movementTo) {
                        unitsListNameMs.push(csvObj[i].name);
                    }
                }

                $(".units-content .unit-box").each(function () {
                    if (unitsListNameMs.includes($(this).attr("uname"))) {
                        unitsListMs.push($(this).parent().wrap('<p/>').parent().html());
                        //$(this).parent().hide();
                        //$(".lab-units-separation-line").hide();
                        //$(".buildings-section").hide();
                        //$(".tier-unit-type-divider").hide();
                    }
                });
                setTimeout(function () {
                    allArrays.push(unitsListMs);
                }, 0.01);
            }

            if (valueName == "Buildings") {
                var buildingsList = [];
                $(".buildings-section .unit-box").each(function () {
                    buildingsList.push($(this).parent().wrap('<p/>').parent().html());
                });
                setTimeout(function () {
                    allArrays.push(buildingsList);
                }, 0.01);
            }

            if (valueName == "Units") {
                var unitsList = [];
                $(".units-content .unit-box").each(function () {
                    if (!($(this).parent().parent().parent().parent().parent().hasClass("buildings-section") || $(this).hasClass("lab-space"))) {
                        unitsList.push($(this).parent().wrap('<p/>').parent().html());
                    }
                });
                setTimeout(function () {
                    allArrays.push(unitsList);
                }, 0.01);
            }

            if (valueName == "ARM") {
                var ARMList = [];
                $(".units-content .unit-box").each(function () {
                    if ($(this).attr("side") == "arm") {
                        ARMList.push($(this).parent().wrap('<p/>').parent().html());
                    }
                });
                setTimeout(function () {
                    allArrays.push(ARMList);
                }, 0.01);
            }

            if (valueName == "CORE") {
                var COREList = [];
                $(".units-content .unit-box").each(function () {
                    if ($(this).attr("side") == "core") {
                        COREList.push($(this).parent().wrap('<p/>').parent().html());
                    }
                });
                setTimeout(function () {
                    allArrays.push(COREList);
                }, 0.01);
            }

            if (valueName == "Construction units") {
                var consList = [];
                var consListNames = [];
                for (i = 0; i < csvObj.length; i++) {
                    if (csvObj[i].builder == 1 && csvObj[i].canmove == 1 && csvObj[i].maxvelocity > 0.5) {
                        consListNames.push(csvObj[i].name);
                    }
                }
                $(".units-content .unit-box").each(function () {
                    if (consListNames.includes($(this).attr("uname"))) {
                        consList.push($(this).parent().wrap('<p/>').parent().html());
                    }
                });
                setTimeout(function () {
                    allArrays.push(consList);
                }, 0.01);
            }

            if (valueName == "Fighting units") {
                var figthingUnitsList = [];
                $(".units-content .unit-box").each(function () {
                    if ($(this).attr("w1") != undefined && !($(this).parent().parent().parent().parent().parent().hasClass("buildings-section"))) {
                        figthingUnitsList.push($(this).parent().wrap('<p/>').parent().html());
                    }
                });
                setTimeout(function () {
                    allArrays.push(figthingUnitsList);
                }, 0.01);
            }

        }
    });










    //if (val == "Anti air") {
    //    if ($(this).children().eq(0).is(':checked')) {
    //        $(".units-content .unit-box").each(function () {
    //            if (!($(this).attr("w1-aa") == undefined && $(this).attr("w2-aa") == undefined && $(this).attr("w3-aa") == undefined)) {

    //                unitsListAA.push($(this).parent().wrap('<p/>').parent().html());

    //                //$(this).parent().hide();
    //                //$(this).parent().parent().parent().parent().children().eq(0).hide();

    //                //$(".lab-units-separation-line").hide();
    //                //$(".tier-unit-type-divider").hide();
    //            }
    //        });
    //        setTimeout(function () {
    //            allArrays.push(unitsListAA);
    //        }, 0.01);
    //        //for (i = 0; i < unitsListAA.length; i++) {
    //        //    $(".filter-results").append(unitsListAA[i]);
    //        //}
    //    }
    //    else {

    //    }

    //}


    //if (val == "Movement speed") {
    //    if ($(this).children().eq(0).is(':checked')) {
    //        if ($(this).is("[from]") || $(this).is("[to]")) {
    //            var movementFrom = $(this).attr("from");
    //            var movementTo = $(this).attr("to");
    //            $("#movement-from").val($(this).attr("from"));
    //            $("#movement-to").val($(this).attr("to"));
    //        }
    //        else {
    //            var movementFrom = $("#movement-from").val();
    //            var movementTo = $("#movement-to").val();
    //        }

    //        for (i = 0; i < csvObj.length; i++) {
    //            if (csvObj[i].maxvelocity >= movementFrom && csvObj[i].maxvelocity <= movementTo) {
    //                unitsListNameMs.push(csvObj[i].name);
    //            }
    //        }

    //        $(".units-content .unit-box").each(function () {
    //            if (unitsListNameMs.includes($(this).attr("uname"))) {
    //                unitsListMs.push($(this).parent().wrap('<p/>').parent().html());
    //                //$(this).parent().hide();
    //                //$(".lab-units-separation-line").hide();
    //                //$(".buildings-section").hide();
    //                //$(".tier-unit-type-divider").hide();
    //            }
    //        });
    //        setTimeout(function () {
    //            allArrays.push(unitsListMs);
    //        }, 0.01);

    //        //for (i = 0; i < unitsListMs.length; i++) {
    //        //    $(".filter-results").append(unitsListMs[i]);
    //        //}
    //    }
    //    else {

    //    }

    //}










    //    let result = unitsListMs.filter(x => unitsListAA.includes(x));
    //    for (i = 0; i < result.length; i++) {
    //        $(".filter-results").append(result[i]);
    //    }

    setTimeout(function () {
        if (allArrays.length >= 2) {
            result = allArrays.shift().filter(function (v) {
                return allArrays.every(function (a) {
                    return a.indexOf(v) !== -1;
                });
            });
            $(".filter-results").html("");
            for (i = 0; i < result.length; i++) {
                $(".filter-results").append(result[i]);
            }
        }
        else {
            $(".filter-results").html("");
            for (i = 0; i < allArrays.length; i++) {
                $(".filter-results").append(allArrays[i]);
            }
        }
        allArrays = [];
        result = [];
    }, 0.5);



    //result = allArrays.shift().filter(function (v) {
    //    return allArrays.every(function (a) {
    //        return a.indexOf(v) !== -1;
    //    });
    //});



});
