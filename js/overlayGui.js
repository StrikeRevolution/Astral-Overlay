var encounterDetails = new Vue({
	el: '#encounterDetails',
	data: {
		encounterLocation:'No Data',
		encounterTime:'.',
		encounterEnemy:'',
		encounterMaxHit:''
	}
});

var combatDetails = new Vue({
	el: '#combatDetails',
	data: {
		combatDPS: ''
	}
});


var combatantDPS = new Vue({
	el: '#combatantStatus',
	data: {
		combatDPS: 'Idling'
	}
});

var combatantList = new Vue({
	el: '#combatantList',
	data:{
		items:[
		],
		isActive: false,
		show:false
	},
	methods:{
		getPic(pic){
			return './img/'+pic+'.png';
		}
	}
});

var updateList = new Vue({
	el:'#updates',
	data:{
		show:true
	}
});