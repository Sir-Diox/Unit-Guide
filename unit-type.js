function setLabelParametersAndValues(unitType){
    if(unitType.isFighter){
        if(unitData.isAntiAir1==1 && unitData.isAntiAir2==undefined && unitData.isAntiAir3==undefined){
            firstParameter = "AA damage per second:";
        }else{
            firstParameter = "Damage per second:";
        }
        secondParameter = "Range:";
        thirdParameter = "HP:";
        fourthParameter = "Movement speed:";
        fifthParameter = "Sight range:";
    }
    else if(unitType.isAirFigther){
        firstParameter = "Damage per second:";
        secondParameter =  "HP:";
        thirdParameter = "Flying speed:";
        fourthParameter = "Sight range:";
    }
    else if(unitType.isAntiAirBuilding){
        firstParameter = "AA damage per second:";
        secondParameter = "Range:";
        thirdParameter = "HP:";
        fourthParameter = "Sight range:";
    }
    else if(unitType.isMine){
        firstParameter = "Max explosion damage:";
        secondParameter = "Explosion range:";
        thirdParameter = "HP:";
    }
    else if(unitType.isClawlingBomb){
        firstParameter = "Max explosion damage:";
        secondParameter = "Explosion range:";
        thirdParameter = "HP:";
        fourthParameter = "Movement speed";
        fifthParameter = "Sight range";
    }
    else if(unitType.isCons){
        firstParameter = "Build Speed:";
        secondParameter = "Build range:";
        thirdParameter = "HP:";
        fourthParameter = "Movement speed";
        fifthParameter = "Sight range";
    }
    else if(unitType.isAirCons){
        firstParameter = "Build Speed:";
        secondParameter = "Build range:";
        thirdParameter = "HP:";
        fourthParameter = "Flying speed";
        fifthParameter = "Sight range";
    }
    else if(unitType.isSemiCon){
        firstParameter = "Build Speed (assisting):";
        secondParameter = "Build range:";
        thirdParameter = "HP:";
        fourthParameter = "Movement speed";
        fifthParameter = "Sight range";
    }
    else if(unitType.isLab){
        firstParameter = "Build Speed:";
        secondParameter = "HP:";
        thirdParameter = "Sight Range:";
    }
    else if(unitType.isEco){
        firstParameter =  "HP:";
    }
    else if(unitType.isAirUnit){
        firstParameter = "Damage per second:";
        secondParameter = "Range:";
        thirdParameter = "HP:";
        fourthParameter = "Flying speed";
    }
    else if(unitType.isDefenseShootingBuilding){
        if(unitData.isAntiAir1==1){
            firstParameter = "AA Damage per second:";
        }
        else{
            firstParameter = "Damage per second:";
            secondParameter = "Range:";
            thirdParameter = "HP:";
            fourthParameter = "Sight range:";
        }
    }
    else if(unitType.isEnergySupplier){
        firstParameter = "HP:"
    }
    else if(unitType.isMetalSupplier){
        firstParameter = "Build Speed:"
        secondParameter = ""
        thirdParameter = "HP:";
    }
    else if(unitType.isRadarAndJammerUnit){
        firstParameter = "Radar range";
        secondParameter = "Jammer range:";
        thirdParameter = "Energy drain per second";
        fourthParameter ="HP";
    }
    else if(unitType.isRadarAndJammerAircraft){
        firstParameter = "Radar range";
        secondParameter = "Jammer range:";
        thirdParameter = "Energy drain per second";
        fourthParameter ="HP";
    }
    else if(unitType.isRadarAndJammerBuilding){
        firstParameter = "Radar range";
        secondParameter = "Jammer range:";
        thirdParameter = "Energy drain per second";
        fourthParameter ="HP";
    }
    else if(unitType.isRadarBuilding){
        firstParameter = "Radar range";
        secondParameter = "Energy drain per second";
        thirdParameter = "HP:";
    }
    else if(unitType.isRadarUnit){
        firstParameter = "Radar range";
        secondParameter = "Energy drain per second";
        thirdParameter = "HP:";
        fourthParameter = "Movement Speed:";
        fifthParameter = "Sight Distance";                     
    }
    else if(unitType.isJammerUnit){
        firstParameter = "Jammer range:";
        secondParameter = "Energy drain per second:";
        thirdParameter = "HP:";
        fourthParameter = "Movement Speed:";
        fifthParameter = "Sight Distance";  
    }
    else if(unitType.isJammerAircraft){
        firstParameter = "Jammer range:";
        secondParameter = "Energy drain per second";
        thirdParameter = "HP:";
    }
    else if(unitType.isJammerBuilding){
        firstParameter = "Jammer range:";
        secondParameter = "Energy drain per second";
        thirdParameter = "HP:";
    }
    else{ // undefined
        firstParameter = "HP:";
        secondParameter = "Sight distance:";
        thirdParameter= "Damage reduction:"
    }
}

function checkUnitType(){
    var unitTypeObj ={
        isFighter:false,
        isBuilding:false,
        isAirFigther:false,
        isAntiAir:false,
        isCons:false,
        isAirCons:false,
        isSemiCon:false,  // rector, flea, etc.
        isLab:false,
        isEco:false,        
        isDefenseShootingBuilding:false,
        isRadarBuilding:false, // radar range
        isRadarUnit:false, // radar range
        isRadarAndJammerAircraft:false,
        isRadarAndJammerBuilding:false,
        isRadarAndJammerUnit:false,
        isRadarBuilding:false,
        isJammerUnit:false,
        isJammerAircraft:false,
        isJammerBuilding:false,
        isEnergySupplier:false, // +energy per second (+2500 with adj. bonus)
        isMetalSupplier:false, // +max metal per second, energy drain         
        isMine:false,
        isClawlingBomb:false,
        isUndefined:false
    }


    if(unitData.builder !=1  && (unitData.jammerRange =="n/a" || unitData.jammerRange =="0") && unitData.canAttack==1 && unitData.isMineOrClawlingBomb!=1 && unitData.canMove==1){ // is fighting unit/building?
        if(unitData.canMove==1){
        unitTypeObj.isFighter=true;
        }
    }
    else if (unitData.builder != 0 && (unitData.jammerRange == "n/a" || unitData.jammerRange == "0") && unitData.movementSpeed != "n/a") // is cons, semi-con
    {
            if(unitData.builder!=0 && unitData.canMove==1 && unitData.canBuild != "" && unitData.movementSpeed < 4){
            unitTypeObj.isCons=true;
            }
            else if(unitData.movementSpeed > 4){
            unitTypeObj.isAirCons=true;
            }
            else if(unitData.canMove==1 && unitData.canBuild == ""){
            unitTypeObj.isSemiCon=true;
            }          
    }
    else if(unitData.flyingSpeed > 4) // is air unit?
    {
            if(unitData.dps > 1){
            unitTypeObj.isAirFigther=true;
            }
    }
    else if(unitData.movementSpeed <0.5 || unitData.movementSpeed == "n/a"){ // is building?
        unitTypeObj.isBuilding=true;
        if (unitData.canMove == 1) {
            unitTypeObj.isLab = true;
        }
        else if (unitData.canAttack == 1) {
            if (unitData.name == "Geothermal Powerplant") {
                unitTypeObj.isEco = true;
            }
            else {
                unitTypeObj.isDefenseShootingBuilding = true;
            }
        }
        else if (unitData.radarRange != 0 && unitData.radarRange != "n/a") { // is radar or jammer building?
            if (unitData.radarRange != 0 && unitData.jammerRange != "n/a") {
                unitTypeObj.isRadarAndJammerBuilding = true;
            }
            else {
                unitTypeObj.isRadarBuilding = true;
            }
        }
        else if (unitData.jammerRange != "n/a") { // is jammer building?
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
            unitTypeObj.isLab = true;
        }

    }

    else if (unitData.isMineOrClawlingBomb == 1){ // is mine or crawling bomb?
        if(unitData.canMove == 1 )
        unitTypeObj.isClawlingBomb = true;
        else{
            unitTypeObj.isMine = true;
        }
    }


    else if (unitData.radarRange!=0 && unitData.radarRange!="n/a"){ // is radar unit or radar+jammer unit?
        if(unitData.jammerRange !="n/a" && unitData.movementSpeed>4){
        unitTypeObj.isRadarAndJammerAircraft=true;
        }
        else if(unitData.jammerRange !="n/a" && unitData.movementSpeed<3){
            unitTypeObj.isRadarAndJammerUnit=true;
        }
        else if(unitData.radarRange>200 && unitData.canMove==1){
            unitTypeObj.isRadarUnit=true;
        }
    } 

    else if(unitData.jammerRange !="n/a"){ // is jammer only unit?
        if(unitData.jammerRange !="n/a" && unitData.movementSpeed>4){
            unitTypeObj.isJammerAircraft=true;
        }
        else if(unitData.jammerRange !="n/a" && unitData.canMove==1){
            unitTypeObj.isJammerUnit=true;
        }
    }
    else{
        unitTypeObj.isUndefined=true;        
    } 

    return unitTypeObj;
}