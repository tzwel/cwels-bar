<script>
	import { get } from 'svelte/store';
	import { gameData } from '../store';
  import { navigate } from 'svelte-routing';
	import pocisk from '../assets/pocisk.png'
	import pociskzapytanie from '../assets/pociskzapytanie.png'
	import pociskszary from '../assets/pociskszary.png'


	function random(seed) {
		let x = seed++ / Math.PI;
		return x - Math.floor(x);
	}

	let card = getRandomCard()

	function getRandomCard() {
		const cards = $gameData.cards
		const quantity = $gameData.cards.length
		const index = Math.floor(
			random($gameData.seed + $gameData.round) * quantity
		)
		return cards[index]
	}
	

	$: console.log($gameData);	

	if (!$gameData.round) {
		$gameData.round = 1
	}

	function nextRound() {
		$gameData.round += 1
		alive = true
		writeChamber()
		card = getRandomCard()
	}


	function reset() {
		$gameData = {
			...$gameData,
			...{
			'mode' : null,
			'chamber': [],
			'shots': 0,
			'chamberSize': 6,
			'seed': null,
			'round': null
			}
		}
		navigate('/')
	}

	if ($gameData.mode === 'Do 3') {
			$gameData.chamberSize = 3
	}

	let alive = true

	function shot() {

		if (!alive) {
			return alert('nie zyjesz zjebie')
		}

		$gameData.shots += 1
		
		switch ($gameData.mode) {
			case 'Klasyczny':
				
				const los = Math.floor(
						Math.random() * ($gameData.chamberSize + 1 - $gameData.shots)
					)

				console.log(los);

				if (los === 0) {
					console.log('zdech');
					alive = false
				}

				break;
		
			case 'Do 3':
				if ($gameData.shots === 3) {
					alive = false
				}
				break;
		}

		writeChamber()

	}

	function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}


	let chamber = '0'.repeat($gameData.chamberSize)

	function writeChamber() {
		chamber = ''
		chamber += 'V'.repeat($gameData.shots)
		chamber += '0'.repeat($gameData.chamberSize - $gameData.shots)

		if (!alive) {
			// @ts-ignore
			chamber = setCharAt(chamber, $gameData.shots-1, 'X')
		}
	}

	

</script>

<h1> Runda {$gameData.round}</h1>

<span>
	Wykładamy: <strong> {card} </strong>
</span>

<span>
	Tryb: {get(gameData).mode}
</span>


<span> Komora: </span>
<span>

	<pociski>
	

		{#if alive}
			{#each {length: $gameData.shots}}
				<img class="pocisk" src={pociskszary}/>
			{/each}
	
	
			{#each {length: $gameData.chamberSize - $gameData.shots}}
				<img class="pocisk" src={pociskzapytanie}/>
			{/each}
		{:else}
			{#each {length: $gameData.shots-1}}
				<img class="pocisk" src={pociskszary}/>
			{/each}
			<img class="pocisk" src={pocisk}/>
	
			{#each {length: $gameData.chamberSize - $gameData.shots}}
				<img class="pocisk" src={pociskszary}/>
			{/each}
	
		{/if}
	
	</pociski>

</span>
<span>
	Wystrzelono: {$gameData.shots} {$gameData.shots === 1 ? 'raz' : 'razy'}
</span>


<button class="shot {alive ? '' : 'zdechniety'}" on:click={shot}> 
	{#if alive}
		Strzał
	{:else}
		ZDECHŁEŚ KURWO
	{/if}
</button>




<button on:click={nextRound}> Następna runda </button>
<button on:click={reset} class="reset"> Do menu </button>


<style>

	* {
		margin-bottom: .25rem;
	}

	button.shot {
		font-size: 2rem;
	}

	.reset {
		font-size: .85rem;
		max-width: 6rem;
	}

	.zdechniety {
		background-color: brown;
		color: #fff;
	}

	pociski {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.pocisk {
		max-width: 1rem;
	}

</style>
