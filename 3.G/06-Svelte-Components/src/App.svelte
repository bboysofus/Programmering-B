<script>
	import Recipe from './components/Recipe.svelte'
	let recipes = ['pasta', 'bøf']
</script>

<header>
	<h1>Web components</h1>
</header>

<main>
	{#each recipes as title, index}
		<Recipe {title} {index}/>
	{/each}
	<Recipe />
</main>

<style>
	h1{
		color: hotpink;
		text-transform: uppercase;
		font-weight: bold;
	}

	main{
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 4rem;
	}
</style>