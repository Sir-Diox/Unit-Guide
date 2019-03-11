function fillMobileTemplate() {

    mobileTemplate = `<div class="mobile-dt-info-wrapper">
                                    <p class="unit-name-text unit-name-mobile-dt teko-29 white" id="mobile-unit-nav"><i class="far fa-arrow-left back-to-main-page"></i>${unitData.name} <span style="font-weight:600;"></span></p>
                                    <p class="unit-description-text exo2-16" style="${$("#mobile-unit-nav").height() < 55 ? `padding: 55px 25px 10px 25px` : ""}">${unitData.description}</p>
    ${upgradeData.name != "" ? `
        <div class="row unit-basic-info-upgr" style="padding: 13px 13px 9px 13px; margin:0 0 0 0;">
        <div class="col col-xs-2 unit-image-box" style="">
`: `
    <div class="unit-basic-info row">
    <div class="col-12 unit-image-box">`
        }
            <div class="unit-box-in-preview" style="${unitData.imgSrc}"></div>
        </div>


${upgradeData.name != "" ? `
<div class="col-12" style="padding-left: 12px;">
`: `
<div class="col-12" style="padding-left: 12px;">
        `}
            <div class="basic-info-wrapper">
            <div class="res-cost-row"><div class="energy-cost-bar exo2-16">Energy cost</div><span class="energy-cost-digit exo2-16">${setSpacesInBigNumbers(unitData.energyCost)}</span></div>
            <div class="res-cost-row" style="margin-bottom:3px;"><div class="metal-cost-bar exo2-16">Metal cost</div><span class="metal-cost-digit exo2-16">${setSpacesInBigNumbers(unitData.metalCost)} </span></div>
            <div class="summoning-code exo2-16" data-toggle="popover" data-placement="bottom" data-content="<div class='tooltip-content'><span class='tooltip-title'>Summoning code</span>You can type this code in game to summon <span style='font-weight:600'>${unitData.name}</span>. Just press Enter and type: <span style='color: #DEA73C; font-weight:500'>+${unitData.summoningCode}</span>. Then you can press Insert key to summon more.</br> It always works in single player. If you want to summon a unit in multiplayer, you have to switch <b>Cheat codes</b> (in game's lobby) to <b>Allowed</b> before starting a game. This is very handy when you want to test units. </br></br><p style='font-weight:600'>Useful codes:</p><ul><li><span style='color: #DEA73C; font-weight:500'>+los</span> - infinite view.</li><li><span style='color: #DEA73C; font-weight:500'>+corcheat</span> - almost infinite resources.</li> <li><span style='color: #DEA73C; font-weight:500'>+corkrog 1</span> - summons a Krogoth for another player (numbers from 1 to 9 are other players).</li><li><span style='color: #DEA73C; font-weight:500'>+showranges</span> - type it, then select a unit and hold Shift key to see many types of ranges.</li></ul> </div>"><span>Summoning</span> <span>code</span></div><span class="summoning-code-text exo2-16">+${unitData.summoningCode}</span>
        </div>
</div>
    </div>
${fillStatisticsInfo()}
                                                <div class="detailed-info-header exo2-26">
                                                Tips & trivia
                                                </div>
${generalInfoTemplate}

<div class="exo2-26 detailed-info-header built-by"> ${builtByHTML}</div><div class="can-build">${canBuildHTML}</div>
</div>
    `;
}