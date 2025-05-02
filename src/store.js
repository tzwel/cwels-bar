import { writable, readable } from 'svelte/store';

export let gameData = writable({
	'mode' : null,
	'chamber': [],
	'shots': 0,
	'chamberSize': 6,
	'seed': null,
	'round': null,
	'cards': ['królowa', 'król', 'walet', 'as']
});

// function storeReset(params) {
// 	gameData = {
// 		'mode' : null,
// 		'chamber': [],
// 		'shot': 0,
// 	}
// }


