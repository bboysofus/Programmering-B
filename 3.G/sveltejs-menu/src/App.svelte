<script>
	import Menuitem from './components/Menuitem.svelte'
	import Frontpage from './components/Frontpage.svelte'
	import FindCocktail from './components/FindCocktail.svelte'
	import SavedCocktails from './components/SavedCocktails.svelte'
	let menu = ['frontpage', 'find cocktail', 'saved cocktails']
	let activePage = menu[1]
</script>

<header>
	{#each menu as item}
		<Menuitem bind:activePage={activePage} title={item} />
	{/each}
</header>
<main>
	{#if activePage == menu[0]}
		<Frontpage/>
	{:else if  activePage == menu[1]}
		<FindCocktail />
	{:else if  activePage == menu[2]}
		<SavedCocktails />
	{/if}
</main>

<style>
	:global(*, body){
		box-sizing: border-box;
		margin:0;
		padding:0;
	}
	:global(.page){
		display:grid;
		place-items:center;
		height:90vh;
	}
	header{
		display:grid;
		height:10vh;
		grid-auto-flow:column;
		place-items:center;
		background:black;
	}
	main {
		display:grid;
		place-items:center;
	}

	h1 {
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 100;
	}
</style>