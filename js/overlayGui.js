var encounterDetails = new Vue({
	el: '#encounterDetails',
	data: {
		encounterLocation:'An Encounter',
		encounterTime:'-',
		encounterEnemy:''
	}
});

var combatDetails = new Vue({
	el: '#combatDetails',
	data: {
		combatDPS: '',
		combatMaxHit:''
	}
});
var combatantStatus = new Vue({
	el: '#combatantStatus',
	data: {
		pineapples: 'Idling'
	}
});

var combatantList = new Vue({
	el: '#combatantList',
	data:{
		items:[
		],
		isActive: false
	},
	methods:{
		getPic(pic){
			return './img/'+pic+'.png';
		}
	}
});