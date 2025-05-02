<script>
	import { Router, Link, Route, navigate } from "svelte-routing";
	export let url = "";

	import Tryp from "./routes/tryb.svelte";
	import Gierka from "./routes/gierka.svelte";
	import { gameData } from "./store";

	navigate('/')
	$: if (typeof $gameData.mode === null) {
		navigate('/')
	}


</script>

<main>
	<Router {url}>
		<!-- <Route path="/blog/:id" component={BlogPost} />
		<Route path="/blog" component={Blog} />
		<Route path="/about" component={About} /> -->
		<Route path="/">
			<Tryp />
		</Route>
		<Route path="/gierka">
			<Gierka />
		</Route>
	</Router>
</main>