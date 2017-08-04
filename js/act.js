var parseActive = false; //is the parse active

document.addEventListener("onOverlayDataUpdate",function(e){
	update(e.detail);
});

/*window.addEventListener("message", function (e) {
        if (e.data.type === "onOverlayDataUpdate") {
			console.log(e.data.detail);
            update(e.data.detail);
        }
});*/

document.addEventListener("onLogLine", function (e) {
	console.log("Echo Received");
	if(e.detail.isImported)return
	if(e.detail.type === 'echo'){
		console.log('you said:',e.detail.message);
	}
});
var count=0;

document.addEventListener("onBroadcastMessageReceive", function(e){
	if(count==0){
		
	}
});
document.addEventListener("onMessageReceive", function(e){
	console.log("Mini parse Event Listening");
	toConsole(e.detail.message);
	console.log(e.detail.message);
});

function update(data){
	//console.log(OverlayPluginApi.broadcastMessage("Test"));
	updateEncounter(data);
	updatePineapples(data); //Pineapples are a running joke for parsing with some friends
}

function updateEncounter(data){
	 parseActive = parseActFormat("{isActive}", data) == "true";
	 if(parseActive){
		 if(updateList.show==true){
			updateList.show = !updateList.show;
			combatantList.show = !combatantList.show;
		 }
		 encounterDetails.encounterLocation 	=	parseActFormat("{CurrentZoneName}:",data.Encounter);
		 encounterDetails.encounterTime 		=	parseActFormat("{duration}",data.Encounter);
		 encounterDetails.encounterEnemy		=	parseActFormat("{title}", data.Encounter);
		 encounterDetails.encounterMaxHit		=   parseActFormat("{maxhit}", data.Encounter);
		 
		 combatDetails.combatDPS				=	parseActFormat("{encdps}", data.Encounter);

		 /*{CurrentZoneName}: {title} {duration} RAID DPS: {encdps}*/
	 }
	 else{
		 combatDetails.combatStatus = "Idling";
	 }
	 /*parseTest = parseActFormat("{CurrentZoneName}: {title} {duration} RAID DPS: {encdps}",data.Encounter);
	 parseCombat=parseActFormat("{job} {i.icon} {Player Name} {per_second}",data.Combatant);
	 combatStatus.message=parseTest;
	 combatantStatus.message=parseCombat;
	 console.log(parseDmg);*/
}

function updatePineapples(data){
	var combatantIndex = 0;
	var combatants = [];
	var fixedCombatant=[];
	for(var combatantName in data.Combatant){
		var combatant = data.Combatant[combatantName];
		/*combatantStatus.message = parseActFormat("{Job} {name} {encdps}",combatant);
		combatants[combatantIndex]=parseActFormat("{Job} {name} {encdps}",combatant);*/
		
		
		//collect all data
		var JOB 	= parseActFormat("{Job}",combatant)			
		var NAME 	= parseActFormat("{name}", combatant);
		//If role is dps / tank display  DH/CRIT/MAX HIT
		var MHIT 	= parseActFormat("{maxhit}", combatant);
		var CHIT 	= parseActFormat("{crithit%}", combatant);
		var DHIT 	= parseActFormat("{DirectHitPct}", combatant);
		var DPS		= parseActFormat("{encdps}",combatant);
		
		//if(data.timerFrames)
		//	var Uni		= parseActFormat("{}",data.timerFrames);
		
		//If role is healer display  MAX HEAL/MAX HIT / MAX HEAL
		if(JOB === "Min"|| JOB ==="Fsh"|| JOB==="Btn"){
			JOB="Unk"
		}
		
		fixedCombatant[combatantIndex] =[JOB,NAME,MHIT,CHIT,DHIT,DPS];
		combatantIndex++;
	}
		combatantList.items=fixedCombatant;
		combatantList.isActive=true;
}

function parseActFormat(str, dictionary) {
    var result = "";
    
    var currentIndex = 0;
    do {
        var openBraceIndex = str.indexOf('{', currentIndex);
        if (openBraceIndex < 0) {
            result += str.slice(currentIndex);
            break;
        }
        else {
            result += str.slice(currentIndex, openBraceIndex);
            var closeBraceIndex = str.indexOf('}', openBraceIndex);
            if (closeBraceIndex < 0) {
                // parse error!
                console.log("parseActFormat: Parse error: missing close-brace for " + openBraceIndex.toString() + ".");
                return "ERROR";
            }
            else {
                var tag = str.slice(openBraceIndex + 1, closeBraceIndex);
                if (typeof dictionary[tag] !== 'undefined') {
                    result += dictionary[tag];
                } else {
                    console.log("parseActFormat: Unknown tag: " + tag);
                    result += "ERROR";
                }
                currentIndex = closeBraceIndex + 1;
            }
        }
    } while (currentIndex < str.length);
    
    return result;
}


function toConsole(obj){
	console.log(JSON.stringify(obj));
}