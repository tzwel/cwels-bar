<script>
	import { navigate } from "svelte-routing";
	import { gameData } from "../store";
	import { onMount } from 'svelte';

	let seedInput = 'N1GG3R';

	async function doGry() {
		$gameData.seed = await getSeed(seedInput)
		navigate("/gierka", { replace: true });
	}

	function setMode(tryb) {
		$gameData.mode = tryb
	}

	async function getSeed(message, algo = 'SHA-1') {
		return Number(
			Array.from(
			new Uint8Array(
			await crypto.subtle.digest(algo, new TextEncoder().encode(message))
			),
			(byte) => byte
		).join('').substring(9, 19)
		)
	}

	onMount(async () => {
		if (!$gameData.seed) {
			$gameData.seed = await getSeed('1')
		}
	});

</script>

<h1>
	Cwel's Bar
</h1>

<div>
	<h2> Wybierz tryb gry </h2>

	<button on:click={()=>{setMode('Klasyczny')}}> Klasyczny </button>
	<button on:click={()=>{setMode('Do 3')}}> Do 3 </button>
	<br>
	Wybrany tryb: {$gameData.mode || 'żaden'}
</div>

<div>
	<h2> Ustawienia gry </h2>

	<h3> Kod gry </h3>
	<input bind:value={seedInput} class="seed" type="text" name="seed" placeholder="Kod gry">
</div>


<button class="gramy" disabled={!($gameData.mode && seedInput.length > 3)} on:click={doGry}> Gramy </button>

<style>

	div {
		background-color: #1c1c1c;
		padding-bottom: 1rem;
		margin-bottom: 1rem;
		border-radius: 6px;
	}
</style>