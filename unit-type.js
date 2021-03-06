function setLabelParametersAndValues(unitType) {
    if (unitType.isFighter) {
        if (unitData.isAntiAir1 == 1 && unitData.isAntiAir2 == undefined && unitData.isAntiAir3 == undefined) {
            firstParameter = "Damage per second:";
        } else {
            firstParameter = "Damage per second:";
        }
        secondParameter = "Damage per shot:";
        thirdParameter = "Range:";
        fourthParameter = "Health:";
        fifthParameter = "Movement speed:";
        sixthParameter = "Sight range:";
    }
    else if (unitType.isFighterDpsOnly) {
        firstParameter = "Damage per second:";
        secondParameter = "Range:";
        thirdParameter = "Health:";
        fourthParameter = "Movement speed:";
        fifthParameter = "Sight range:";
    }

    else if (unitType.isAirFigther) {
        firstParameter = "Damage per second:";
        secondParameter = "Range:";
        thirdParameter = "Health:";
        fourthParameter = "Flying speed:";
        fifthParameter = "Sight range:";
    }
    else if (unitType.isBomber) {
        firstParameter = "Damage per bomb:";
        secondParameter = "Health:";
        thirdParameter = "Flying speed:";
        fourthParameter = "Sight range:";
    }
    else if (unitType.isAntiAirBuilding) {
        firstParameter = "Damage per second:";
        secondParameter = "Range:";
        thirdParameter = "Health:";
        fourthParameter = "Sight range:";
    }
    else if (unitType.isMine) {
        firstParameter = "Max explosion damage:";
        secondParameter = "Explosion range:";
        thirdParameter = "Health:";
    }
    else if (unitType.isClawlingBomb) {
        firstParameter = "Max explosion damage:";
        secondParameter = "Explosion range:";
        thirdParameter = "Health:";
        fourthParameter = "Movement speed:";
        fifthParameter = "Sight range:";
    }
    else if (unitType.isNuke) {
        firstParameter = "Max explosion damage:";
        secondParameter = "Explosion range:";
        thirdParameter = "Health:";
    }
    else if (unitType.isCons) {
        firstParameter = "Build speed:";
        secondParameter = "Build range:";
        thirdParameter = "Health:";
        fourthParameter = "Movement speed:";
        fifthParameter = "Sight range:";
    }
    else if (unitType.isCom) {
        firstParameter = "Build speed:";
        secondParameter = "Build range:";
        thirdParameter = "Health:";
        fourthParameter = "Movement speed:";
        fifthParameter = "Sight range:";
    }
    else if (unitType.isAirCons) {
        firstParameter = "Build speed:";
        secondParameter = "Build range:";
        thirdParameter = "Health:";
        fourthParameter = "Flying speed:";
        fifthParameter = "Sight range:";
    }
    else if (unitType.isSemiCon) {
        firstParameter = "Build speed (assisting):";
        secondParameter = "Build range:";
        thirdParameter = "Health:";
        fourthParameter = "Movement speed:";
        fifthParameter = "Sight range:";
    }
    else if (unitType.isBuilding) {
        firstParameter = "Health:";
        secondParameter = "Sight Range:";
    }
    else if (unitType.isLab) {
        firstParameter = "Build speed:";
        secondParameter = "Health:";
        thirdParameter = "Sight Range:";
    }
    else if (unitType.isEco) {
        firstParameter = "Health:";
    }
    else if (unitType.isAirUnit) {
        firstParameter = "Damage per second:";
        secondParameter = "Range:";
        thirdParameter = "Health:";
        fourthParameter = "Flying speed";
    }
    else if (unitType.isDefenseShootingBuilding) {
        if (unitData.isAntiAir1 == 1) {
            firstParameter = "Damage per second:";

        }
        else {
            firstParameter = "Damage per second:";
        }
        secondParameter = "Damage per shot:";
        thirdParameter = "Range:";
        fourthParameter = "Health:";
        fifthParameter = "Sight range:";

    }
    else if (unitType.isDefenseShootingBuildingDpsOnly) {
        firstParameter = "Damage per second:";
        secondParameter = "Range:";
        thirdParameter = "Health:";
        fourthParameter = "Sight range:";
    }
    else if (unitType.isEnergySupplier) {
        firstParameter = "Health:"
    }
    else if (unitType.isMetalSupplier) {
        firstParameter = "Build Speed:"
        secondParameter = ""
        thirdParameter = "Health:";
    }
    else if (unitType.isRadarAndJammerUnit) {
        firstParameter = "Radar range:";
        secondParameter = "Jammer range:";
        thirdParameter = "Health:";
        fourthParameter = "Movement speed:";
        fifthParameter = "Sight range:";
    }
    else if (unitType.isRadarAndJammerAircraft) {
        firstParameter = "Radar range:";
        secondParameter = "Jammer range:";
        thirdParameter = "Health:";
        fourthParameter = "Flying speed:";
        fifthParameter = "Sight range:";
    }
    else if (unitType.isRadarAndJammerBuilding) {
        firstParameter = "Radar range";
        secondParameter = "Jammer range:";
        thirdParameter = "Health:";
        fourthParameter = "Sight range:";
    }
    else if (unitType.isRadarBuilding) {
        firstParameter = "Radar range:";
        secondParameter = "Health:";
        thirdParameter = "Sight range:";
    }
    else if (unitType.isRadarUnit) {
        firstParameter = "Radar range:";
        secondParameter = "Health:";
        thirdParameter = "Movement speed:";
        fourthParameter = "Sight range:";
    }
    else if (unitType.isJammerBuilding) {
        firstParameter = "Jammer range:";
        secondParameter = "Health:";
        thirdParameter = "Sight range:";
    }
    else if (unitType.isJammerUnit) {
        firstParameter = "Jammer range:";
        secondParameter = "Health:";
        thirdParameter = "Movement speed:";
        fourthParameter = "Sight range:";
    }
    else if (unitType.isJammerAircraft) {
        firstParameter = "Jammer range:";
        secondParameter = "Health:";
        thirdParameter = "Flying speed:";
        fourthParameter = "Sight range:";
    }
    else if (unitType.isUndefinedUnit) { 
        firstParameter = "Health:";
        secondParameter = "Movement speed:";
        thirdParameter = "Sight range:";
    }
    else if (unitType.isUndefinedAircraft) {
        firstParameter = "Health:";
        secondParameter = "Flying speed:";
        thirdParameter = "Sight range:";
    }
    else if (unitType.isUndefinedBuilding) {
        firstParameter = "Health:";
        thirdParameter = "Sight range:";
    }
    else {// undefined building
        firstParameter = "Health:";
        secondParameter = "Sight range:";
    }
}

function checkUnitType() {
    var unitTypeObj = {
        isFighter: false,
        isFighterDpsOnly: false,
        isBuilding: false,
        isAirFigther: false,
        isBomber: false,
        isAntiAir: false,
        isCons: false,
        isAirCons: false,
        isSemiCon: false,  // rector, flea, etc.
        isLab: false,
        isEco: false,
        isDefenseShootingBuilding: false,
        isDefenseShootingBuildingDpsOnly: false,
        isRadarBuilding: false, // radar range
        isRadarUnit: false, // radar range
        isRadarAndJammerAircraft: false,
        isRadarAndJammerBuilding: false,
        isRadarAndJammerUnit: false,
        isRadarBuilding: false,
        isJammerUnit: false,
        isJammerAircraft: false,
        isJammerBuilding: false,
        isEnergySupplier: false, // +energy per second (+2500 with adj. bonus)
        isMetalSupplier: false, // +max metal per second, energy drain         
        isMine: false,
        isClawlingBomb: false,
        isNuke: false,
        isBuildingType:false,
        isUndefined: false,

    }


    if (unitData.builder != 1 && (unitData.jammerRange == "" || unitData.jammerRange == "0") && unitData.canAttack == 1 && unitData.isMineOrClawlingBomb != 1 && unitData.canMove == 1 && unitData.movementSpeed < 4 && unitData.name != "Decimator" && unitData.name != "Mechanic") { // is fighting unit/building?
        if (unitData.name == "Voyeur" || unitData.name == "Marky" || unitData.name == "Seer" || unitData.name == "Informer") {
            unitTypeObj.isRadarUnit = true;
        }
        else if (unitData.canMove == 1) {
            if (unitData.onlyDps == 1)
                unitTypeObj.isFighterDpsOnly = true;
            else {
                if (unitData.name == "Croc" || unitData.name == "Gimp" || unitData.name == "Triton" || unitData.name == "Defiler") {
                    unitData.HP = unitData.HP / 4;
                }
                unitTypeObj.isFighter = true;
            }
        }
    }
    else if (unitData.builder != 0 && unitData.builder != "" && (unitData.jammerRange == "" || unitData.jammerRange == "0") && unitData.movementSpeed != "" || unitData.name == "Mechanic") // is cons, semi-con
    {
        if (unitData.builder != 0 && unitData.canMove == 1 && unitData.canBuild != "" && unitData.movementSpeed < 4 || unitData.name == "Mechanic") {
            if (unitData.name == "Podger" || unitData.name == "Spoiler") {
                unitData.HP = unitData.HP / 4;
            }
            if (unitData.name.includes("Commander")) {
                unitTypeObj.isCom = true;
            } else {
                unitTypeObj.isCons = true;
            }
        }
        else if (unitData.movementSpeed > 4) {
            unitTypeObj.isAirCons = true;
        }
        else if (unitData.canMove == 1 && unitData.canBuild == "") {
            unitTypeObj.isSemiCon = true;
        }
    }
    else if (unitData.movementSpeed >= 3.15 && unitData.jammerRange == "") { // is air figthing unit?
        if (unitData.name == "Peeper" || unitData.name == "Fink" || unitData.name == "Sky Crane" || unitData.name == "Emissary" || unitData.name == "Valkyrie" || unitData.name == "Atlas") {
            unitTypeObj.isUndefinedAircraft = true;
        }
        else if (unitData.reloadTime_w1 == undefined) {
            unitTypeObj.isBomber = true;
        }
        else {
            unitTypeObj.isAirFigther = true;
        }
    }
    else if (unitData.movementSpeed < 0.5 || unitData.movementSpeed == "" && unitData.isMineOrClawlingBomb != 1) { // is building?
        unitTypeObj.isBuildingType = true;
        if (unitData.canMove == 1) {
            unitTypeObj.isLab = true;
        }
        else if (unitData.canAttack == 1) {
            if (unitData.name == "Geothermal Powerplant") {
                unitTypeObj.isEco = true;
            }
            else if (unitData.name == "Galactic Gate") {
                unitTypeObj.isUndefinedBuilding = true;
            } 
            else if (unitData.name == "Retaliator" || unitData.name == "Neutralizer" || unitData.name == "Silencer" || unitData.name == "Repulsor") { // is nuke?
                unitTypeObj.isNuke = true;
            }
            else {
                if (unitData.onlyDps == 1)
                    unitTypeObj.isDefenseShootingBuildingDpsOnly = true;
                else {
                    unitTypeObj.isDefenseShootingBuilding = true;
                }

            }
        }
        else if (unitData.radarRange != 0 && unitData.radarRange != "") { // is radar or jammer building?
            if (unitData.radarRange != 0 && unitData.jammerRange != "") {
                unitTypeObj.isRadarAndJammerBuilding = true;
            }
            else {
                unitTypeObj.isRadarBuilding = true;
            }
        }
        else if (unitData.jammerRange != "" && (unitData.name != "Surveyor" || unitData.name != "Scanner")) { // is jammer building?
            unitTypeObj.isJammerBuilding = true;
        }
        else if (unitData.isEco) {
            unitTypeObj.isEco = true;
            if (unitData.minEnergyIncome != undefined) {
                unitTypeObj.isEnergySupplier = true;
            }
            else {
                unitTypeObj.isMetalSupplier = true;
            }
        }

        else {
            unitTypeObj.isBuilding = true;
        }

    }

    else if (unitData.isMineOrClawlingBomb == 1) { // is mine or crawling bomb?
        if (unitData.canMove == 1)
            unitTypeObj.isClawlingBomb = true;
        else {
            unitTypeObj.isMine = true;
        }
    }


    else if (unitData.radarRange != 0 && unitData.radarRange != "" && unitData.radarRange > 100) { // is radar unit or radar+jammer unit?
        if (unitData.jammerRange != "" && unitData.movementSpeed > 4) {
            if (unitData.radarRange > 200) {
                unitTypeObj.isRadarAndJammerAircraft = true;
            }
            else {
                unitTypeObj.isJammerAircraft = true;
            }
        }
        else if (unitData.jammerRange != "" && unitData.movementSpeed < 3) {
            unitTypeObj.isRadarAndJammerUnit = true;
        }
        else if (unitData.radarRange > 400 && unitData.canMove == 1) {
            unitTypeObj.isRadarUnit = true;
        }
    }

    else if (unitData.jammerRange != "") { // is jammer only unit?
        if (unitData.jammerRange != "" && unitData.movementSpeed > 4) {
            unitTypeObj.isJammerAircraft = true;
        }
        else if (unitData.jammerRange != "" && unitData.canMove == 1) {
            unitTypeObj.isJammerUnit = true;
        }
    }
    else {
        if (unitData.movementSpeed > 0.5 && unitData.movementSpeed < 4) {
            unitTypeObj.isUndefinedUnit = true;
        }
        else if (unitData.movementSpeed >= 4) {
            unitTypeObj.isUndefinedAircraft = true;
        } else {
            unitTypeObj.isUndefined = true;
        }
    }

    return unitTypeObj;
}