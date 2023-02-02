<script>
    import MenuItem from "./components/MenuItem.svelte";
	import FindCocktail from "./components/FindCocktail.svelte";
	import SavedCocktail from "./components/SavedCocktail.svelte";
	import FrontPage from "./components/FrontPage.svelte";

	let menu = ['Frontpage', 'Find Cocktail', 'Saved Cocktails']
	let activePage = menu[0]
</script>

<header>
	{#each menu as page}
		<MenuItem bind:activePage={activePage} title = {page}/>
	{/each}
</header>

<main>
	{#if activePage == menu[0]}
		<FrontPage />
	{:else if  activePage == menu[1]}
		<FindCocktail />
	{:else if activePage == menu[2]}
		<SavedCocktail />
	{/if}
</main>

<style>
	:global(*, body){
		margin: 0;
		padding: 0;
		box-sizing: border-box;	
	}

	header{
		display: grid;
		height: 10vh;
		grid-auto-flow: column;
		place-items: center;
	}

	main{
		display: grid;
		place-items: center;
	}

	h1{
		text-transform: uppercase;
		font-size: 2rem;
		font-weight: 100;
	}

</style>