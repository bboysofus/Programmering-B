<script>
	//importer web-komponenten Recipe  
	import Recipe from './components/Recipe.svelte'
	//søgeord som vi binder til et input felt 
	let query = ''
	//tomt array med opskrifter 
	let recipes = []
	//reaktivt statement som overvåger variablen query - når query ændrer sig kører følgende kode
	$: if(query.length > 2) fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + query)
	//der returneres først et response objekt fra serveren - det parser vi til json() 
	.then( res => res.json())
	//så når vi får json tilbage, så kan vi opdatere recipies 
	.then( json => {
		//men kun hvis der er nogen
		if(json.meals) recipes = json.meals
	})
</script>

 <header>
	<div class="query">
		<!-- input feltets value er bundet til VORES variabel query -->
		<input bind:value={query} type="text">
	</div>
</header>
<main>
	<!-- svelte html "funktion" som løber et array igennem -->
	{#each recipes as recipe}
		<Recipe  {recipe} />
	{/each}
</main>

<style>
	main{
		display:grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		place-items:center;
		gap:.5rem;
		position:relative;
	}
	header{
		display:grid;
		grid-template-columns: 1fr;
		place-items:center;
		padding:1rem;
		background-color: cornflowerblue;
		margin-bottom:.5rem;
	}
</style>