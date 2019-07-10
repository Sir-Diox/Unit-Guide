var unitsListConstruction = [];
var allArrays = [];
var result = [];
var chosenFiltersArray = [];
var chosenFilterTitles = [];
var iterator = 0;

$("body").on("click", ".ctn input, div.ctn, .chosen-filter, .ctn-range input", function () {
    var obj = $(this);
    generateFiltersResult(obj);
});


function generateFiltersResult(obj) {

    setTimeout(function () {



        if ($(obj).hasClass("chosen-filter")) {

            var val = $(obj).attr("value");
            val = val.replace(/\s+/g, '');
            $(obj).remove();

            $(".ctn").each(function () {
                if ($(this).attr("value").replace(/\s+/g, '') == val) {
                    $(this).children().eq(0).prop("checked", false);
                    if ($(this).hasClass("ctn-range")) {
                        $(this).hide();
                    }
                }
            });

            if ($(".chosen-filter").length == 0) {
                $(".chosen-filters-container").hide();
                $(".filter-results-count").html($(".filter-results .unit-box").length);
            }
        }

        if ($(obj).parent().hasClass("ctn-range")) {
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            if ($(obj).parent().parent().hasClass("Mcost")) {
                $(".Mcost .ctn-range").hide();
            }
            if ($(obj).parent().parent().hasClass("Ecost")) {
                $(".Ecost .ctn-range").hide();
            }
        }
        $(".filter-results").html("");
        allArrays = [];
        result = [];

        $(".mobile-hide").eq(1).hide();
        $(".units-content").hide();
        $(".main-banner").hide();


        var ARMList = [];
        var COREList = [];
        $(".Side .ctn").each(function () {
            if ($(this).children().eq(0).is(':checked')) {
                var valueName = $(this).attr("value");

                if (valueName == "ARM") {
                    $(".units-content .unit-box").each(function () {
                        if ($(this).attr("side") == "arm" && !$(this).hasClass("lab-space")) {
                            ARMList.push($(this).parent().wrap('<p/>').parent().html());
                        }
                    });
                }

                if (valueName == "CORE") {
                    $(".units-content .unit-box").each(function () {
                        if ($(this).attr("side") == "core" && !$(this).hasClass("lab-space")) {
                            COREList.push($(this).parent().wrap('<p/>').parent().html());
                        }
                    });
                }
                setTimeout(function () {
                    var union = [...new Set([...ARMList, ...COREList])];
                    allArrays.push(union);
                }, 0.01);
            }
        });


        var tier1List = [];
        var tier2List = [];
        var tier3List = [];
        $(".Tier .ctn").each(function () {
            if ($(this).children().eq(0).is(':checked')) {
                var valueName = $(this).attr("value");

                if (valueName == "Tier 1") {
                    $(".tier-1-content .unit-box").each(function () {
                        if (!$(this).hasClass("lab-space")) {
                            tier1List.push($(this).parent().wrap('<p/>').parent().html());
                        }
                    });
                }

                if (valueName == "Tier 2") {
                    $(".tier-2-content .unit-box").each(function () {
                        if (!$(this).hasClass("lab-space")) {
                            tier2List.push($(this).parent().wrap('<p/>').parent().html());
                        }
                    });
                }

                if (valueName == "Tier 3") {
                    $(".tier-3-content .unit-box").each(function () {
                        if (!$(this).hasClass("lab-space")) {
                            tier3List.push($(this).parent().wrap('<p/>').parent().html());
                        }
                    });
                }
                setTimeout(function () {
                    var union = [...new Set([...tier1List, ...tier2List, ...tier3List])];
                    allArrays.push(union);
                }, 0.01);
            }
        });


        var kbotsList = [];
        var vehiclesList = [];
        var hovercraftsList = [];
        var shipsList = [];
        var aircraftsList = [];
        var seaplanesList = [];
        var commandersList = [];
        $(".UnitsKind .ctn").each(function () {
            if ($(this).children().eq(0).is(':checked')) {
                var valueName = $(this).attr("value");

                if (valueName == "Kbots") {

                    $(".kbots .unit-box").each(function () {
                        if (!$(this).hasClass("lab-space")) {
                            kbotsList.push($(this).parent().wrap('<p/>').parent().html());
                        }
                    });
                }

                if (valueName == "Vehicles") {

                    $(".vehicles .unit-box").each(function () {
                        if (!$(this).hasClass("lab-space")) {
                            vehiclesList.push($(this).parent().wrap('<p/>').parent().html());
                        }
                    });
                }

                if (valueName == "Hovercrafts") {
                    $(".hovercrafts .unit-box").each(function () {
                        if (!$(this).hasClass("lab-space")) {
                            hovercraftsList.push($(this).parent().wrap('<p/>').parent().html());
                        }
                    });
                }

                if (valueName == "Ships") {

                    $(".ships .unit-box").each(function () {
                        if (!$(this).hasClass("lab-space")) {
                            shipsList.push($(this).parent().wrap('<p/>').parent().html());
                        }
                    });
                }

                if (valueName == "Aircrafts") {

                    $(".aircrafts .unit-box").each(function () {
                        if (!$(this).hasClass("lab-space")) {
                            aircraftsList.push($(this).parent().wrap('<p/>').parent().html());
                        }
                    });
                }

                if (valueName == "Seaplanes") {

                    $(".seaplanes .unit-box").each(function () {
                        if (!$(this).hasClass("lab-space")) {
                            seaplanesList.push($(this).parent().wrap('<p/>').parent().html());
                        }
                    });
                }

                //if (valueName == "Commanders") {

                //    $(".commanders .unit-box").each(function () {
                //        if (!$(this).hasClass("lab-space")) {
                //            commandersList.push($(this).parent().wrap('<p/>').parent().html());
                //        }
                //    });
                //}

                setTimeout(function () {
                    var union = [...new Set([...kbotsList, ...vehiclesList, ...hovercraftsList, ...shipsList, ...aircraftsList, ...seaplanesList, ...commandersList])];
                    allArrays.push(union);
                }, 0.01);
            }
        });


        var buildingsList = [];
        var unitsList = [];
        $(".Type .ctn").each(function () {
            if ($(this).children().eq(0).is(':checked')) {
                var valueName = $(this).attr("value");

                if (valueName == "Buildings") {
                    $(".buildings-section .unit-box").each(function () {
                        buildingsList.push($(this).parent().wrap('<p/>').parent().html());
                    });
                    setTimeout(function () {
                        allArrays.push(buildingsList);
                    }, 0.01);
                }

                if (valueName == "Units") {
                    $(".units-content .unit-box").each(function () {
                        if (!($(this).parent().parent().parent().parent().parent().hasClass("buildings-section") || $(this).hasClass("lab-space"))) {
                            unitsList.push($(this).parent().wrap('<p/>').parent().html());
                        }
                    });
                    setTimeout(function () {
                        allArrays.push(unitsList);
                    }, 0.01);
                }
            }
        });


        var fighterUnitsList = [];
        var consList = [];
        var consListNames = [];
        var unitsListAA = [];
        var radarUnitsList = [];
        var radarUnitsNamesList = [];
        var jammerUnitsList = [];
        var jammerUnitsNamesList = [];
        var scoutUnitsList = [];
        $(".Role .ctn").each(function () {
            if ($(this).children().eq(0).is(':checked')) {
                var valueName = $(this).attr("value");

                if (valueName == "Fighter") {
                    $(".units-content .unit-box").each(function () {
                        if ($(this).attr("w1") != undefined && (!$(this).parent().parent().parent().parent().parent().hasClass("buildings-section") && $(this).attr("uname") != "Mechanic" && $(this).attr("uname") != "Angler" && $(this).attr("uname") != "Refuge" && $(this).attr("uname") != "Decoy Commander" && $(this).attr("uname") != "Commander")) {
                            fighterUnitsList.push($(this).parent().wrap('<p/>').parent().html());
                        }
                    });
                    setTimeout(function () {
                        allArrays.push(fighterUnitsList);
                    }, 0.01);
                }

                if (valueName == "Builder/supporter") {
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

                if (valueName == "Anti air") {
                    $(".units-content .unit-box").each(function () {
                        if (!($(this).attr("w1-aa") == undefined && $(this).attr("w2-aa") == undefined && $(this).attr("w3-aa") == undefined)) {
                            unitsListAA.push($(this).parent().wrap('<p/>').parent().html());
                        }
                    });
                    setTimeout(function () {
                        allArrays.push(unitsListAA);
                    }, 0.01);
                }

                //if (valueName == "Defense") {
                //    $(".units-content .unit-box").each(function () {
                //        if ($(this).attr("urole") == "defense") {
                //            defenseUnitsList.push($(this).parent().wrap('<p/>').parent().html());
                //        }
                //    });
                //    setTimeout(function () {
                //        allArrays.push(defenseUnitsList);
                //    }, 0.01);
                //}

                if (valueName == "Radar") {
                    for (i = 0; i < csvObj.length; i++) {
                        if (csvObj[i].radardistance > 1100) {
                            radarUnitsNamesList.push(csvObj[i].name);
                        }
                    }
                    $(".units-content .unit-box").each(function () {
                        if (radarUnitsNamesList.includes($(this).attr("uname")) && !$(this).hasClass("lab-space")) {
                            radarUnitsList.push($(this).parent().wrap('<p/>').parent().html());
                        }
                    });
                    setTimeout(function () {
                        allArrays.push(radarUnitsList);
                    }, 0.01);
                }

                if (valueName == "Jammer") {
                    for (i = 0; i < csvObj.length; i++) {
                        if (csvObj[i].radardistancejam > 100) {
                            jammerUnitsNamesList.push(csvObj[i].name);
                        }
                    }
                    $(".units-content .unit-box").each(function () {
                        if (jammerUnitsNamesList.includes($(this).attr("uname"))) {
                            jammerUnitsList.push($(this).parent().wrap('<p/>').parent().html());
                        }

                    });
                    setTimeout(function () {
                        allArrays.push(jammerUnitsList);
                    }, 0.01);
                }

                if (valueName == "Scout") {

                    $(".units-content .unit-box").each(function () {
                        if ($(this).attr("urole") == "scout") {
                            scoutUnitsList.push($(this).parent().wrap('<p/>').parent().html());
                        }
                    });
                    setTimeout(function () {
                        allArrays.push(scoutUnitsList);
                    }, 0.01);
                }
            }
        });


        var mcostUnitsNamesList = [];
        var mcostUnitsList = [];
        $(".Mcost").each(function () {
            if ($(this).attr("value") == "Mcost" && $(obj).hasClass("btn-filter") || $(".Mcost .ctn-range input").is(':checked')) {
                var mcostFrom = parseFloat($("#mcost-from").val());
                var mcostTo = parseFloat($("#mcost-to").val());
                if (!isNaN(mcostTo) || !isNaN(mcostFrom)) {
                    $(".Mcost .ctn-range").show();
                    $(".Mcost .ctn-range input").prop("checked", "true");
                    for (i = 0; i < csvObj.length; i++) {
                        if (parseFloat(csvObj[i].buildcostmetal) >= mcostFrom && parseFloat(csvObj[i].buildcostmetal) <= mcostTo) {
                            mcostUnitsNamesList.push(csvObj[i].name);
                        }
                    }
                    $(".units-content .unit-box").each(function () {
                        if (mcostUnitsNamesList.includes($(this).attr("uname")) && !$(this).hasClass("lab-space")) {
                            mcostUnitsList.push($(this).parent().wrap('<p/>').parent().html());
                        }
                    });
                    setTimeout(function () {
                        allArrays.push(mcostUnitsList);
                    }, 0.01);
                } else {
                    $(".Mcost .ctn-range").hide();
                }
            }
        });

        var ecostUnitsNamesList = [];
        var ecostUnitsList = [];
        $(".Ecost").each(function () {
            if ($(this).attr("value") == "Ecost" && $(obj).hasClass("btn-filter") || $(".Ecost .ctn-range input").is(':checked')) {
                var ecostFrom = parseFloat($("#ecost-from").val());
                var ecostTo = parseFloat($("#ecost-to").val());
                if (!isNaN(ecostTo) || !isNaN(ecostFrom)) {
                    $(".Ecost .ctn-range").show();
                    $(".Ecost .ctn-range input").prop("checked", "true");
                    for (i = 0; i < csvObj.length; i++) {
                        if (parseFloat(csvObj[i].buildcostenergy) >= ecostFrom && parseFloat(csvObj[i].buildcostenergy) <= ecostTo) {
                            ecostUnitsNamesList.push(csvObj[i].name);
                        }
                    }
                    $(".units-content .unit-box").each(function () {
                        if (ecostUnitsNamesList.includes($(this).attr("uname")) && !$(this).hasClass("lab-space")) {
                            ecostUnitsList.push($(this).parent().wrap('<p/>').parent().html());
                        }
                    });
                    setTimeout(function () {
                        allArrays.push(ecostUnitsList);
                    }, 0.01);
                } else {
                    $(".Ecost .ctn-range").hide();
                }
            }
        });

        //    if ($(this).children().eq(0).is(':checked')) {
        //        var valueName = $(this).attr("value");


        //        if (valueName == "Movement speed") {
        //            var unitsListNameMs = [];
        //            var unitsListMs = [];
        //            if ($(this).is("[from]") || $(this).is("[to]")) {
        //                var movementFrom = parseFloat($(this).attr("from"));
        //                var movementTo = parseFloat($(this).attr("to"));
        //                $("#movement-from").val($(this).attr("from"));
        //                $("#movement-to").val($(this).attr("to"));
        //            }
        //            else {
        //                var movementFrom = $("#movement-from").val();
        //                var movementTo = $("#movement-to").val();
        //            }

        //            for (i = 0; i < csvObj.length; i++) {
        //                if (parseFloat(csvObj[i].maxvelocity) >= movementFrom && parseFloat(csvObj[i].maxvelocity) <= movementTo) {
        //                    unitsListNameMs.push(csvObj[i].name);
        //                }
        //            }

        //            $(".units-content .unit-box").each(function () {
        //                if (unitsListNameMs.includes($(this).attr("uname"))) {
        //                    unitsListMs.push($(this).parent().wrap('<p/>').parent().html());
        //                }
        //            });
        //            setTimeout(function () {
        //                allArrays.push(unitsListMs);
        //            }, 0.01);
        //        }


        //    }
        //});


        setTimeout(function () {
            if (allArrays.length >= 2) {
                result = allArrays.shift().filter(function (v) {
                    return allArrays.every(function (a) {
                        return a.indexOf(v) !== -1;
                    });
                });
                $(".filter-results").html("");
                var uniq = [...new Set(result)];
                for (i = 0; i < uniq.length; i++) {
                    $(".filter-results").append(uniq[i]);
                }
            }
            else if (allArrays.length == 1) {
                $(".filter-results").html("");
                var uniq = [...new Set(allArrays[0])];
                for (i = 0; i < uniq.length; i++) {
                    $(".filter-results").append(uniq[i]);
                }
            }
            else {
                $(".filter-results").html("");
                $(".unit-box").each(function () {
                    if (!$(this).hasClass("lab-space")) {
                        result.push($(this).parent().wrap('<p/>').parent().html());
                    }
                });
                var uniq = [...new Set(result)];
                for (i = 0; i < uniq.length; i++) {
                    $(".filter-results").append(uniq[i]);
                }
            }
            appendChosenFiltersList(obj);
            chosenFiltersArray = [];
            allArrays = [];
            result = [];
            if ($(".chosen-filter").length == 0) {
                $(".chosen-filters-container").hide();
                $(".filter-results-count").html($(".filter-results .unit-box").length);
            } else {
                $(".chosen-filters-container").show();
                $(".filter-results-count").html($(".filter-results .unit-box").length);
                showOrHideClearAllFilters();
            }



        }, 0.5);

    }, 0.01);
}

function appendChosenFiltersList(obj) {
    chosenFiltersArray = [];
    chosenFilterTitles = [];

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    if (($(obj).attr("value") == "Mcost" || $(".Mcost .ctn-range input").is(':checked')) && !$(obj).parent().hasClass("ctn-range")) {
        chosenFiltersArray.push($("#mcost-from").val() + " - " + $("#mcost-to").val());
        $(".Mcost .ctn-range").attr("value", $("#mcost-from").val() + " - " + $("#mcost-to").val());
        chosenFilterTitles.push("M cost");
    }
    if (($(obj).attr("value") == "Ecost" || $(".Ecost .ctn-range input").is(':checked')) && !$(obj).parent().hasClass("ctn-range")) {
        chosenFiltersArray.push($("#ecost-from").val() + " - " + $("#ecost-to").val());
        $(".Ecost .ctn-range").attr("value", $("#ecost-from").val() + " - " + $("#ecost-to").val());
        chosenFilterTitles.push("E cost");
    }

    $(".ctn input").each(function () {
        if ($(this).is(':checked') && !$(this).parent().hasClass("ctn-range")) {
            chosenFiltersArray.push($(this).parent().text());
            chosenFilterTitles.push($(this).parent().parent().attr("name"));
        }
    });
    $(".chosen-filters-list").html("");
    for (i = 0; i < chosenFiltersArray.length; i++) {
        $(".chosen-filters-list").append("<span class='chosen-filter' value='" + chosenFiltersArray[i] + "'><span class='filter-title'>" + chosenFilterTitles[i] + ": </span>" + chosenFiltersArray[i] + "<span class='close-btn'>&#10006;</span></span>" + " ");
    }

}


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
setInputFilter(document.getElementById("mcost-from"), function (value) {
    return /^\d*\.?\d*$/.test(value);
});
setInputFilter(document.getElementById("mcost-to"), function (value) {
    return /^\d*\.?\d*$/.test(value);
});
setInputFilter(document.getElementById("ecost-from"), function (value) {
    return /^\d*\.?\d*$/.test(value);
});
setInputFilter(document.getElementById("ecost-to"), function (value) {
    return /^\d*\.?\d*$/.test(value);
});

function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
        });
    });
}

function showOrHideClearAllFilters() {
    if ($('.chosen-filter').length >= 2) {
        $(".chosen-filters-list").append('<button class="normal-button filters-x-clearall ug-button">Remove filters</button>');
    }
    else {
        $(".filters-x-clearall").remove();
    }
}


$("body").on("mouseover", ".filters-x-clearall", function () {
    $(".chosen-filter .close-btn").css("color", "#dea73c");
});
$("body").on("mouseleave", ".filters-x-clearall", function () {
    $(".chosen-filter .close-btn").css("color", "");
});

$('body').on('click', '.filters-x-clearall', function () {
    $(".chosen-filters-container").hide();
    $(".ctn input").each(function () {
        $(this).prop("checked", false);
    });
    $(".ctn-range").hide();
    $(".chosen-filters-list").children().remove();
    generateFiltersResult();
    showOrHideClearAllFilters();
});
