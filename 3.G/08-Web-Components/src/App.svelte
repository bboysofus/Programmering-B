<script>
	import Recipe from "./components/Recipe.svelte";
	let opskrifter = ['Pizza', 'Frikadeller', 'Suppe', 'Burger', 'Forårsruller', 'Lasagne', 'Sushi']
</script>

<main>
	{#each opskrifter as opskrift, index}
		<h2><Recipe title = {opskrift} index={index}/>
		</h2>
	{/each}

	<h1>Hello Emma!</h1>
</main>

<style>
	:global(*){
		box-sizing: border-box;
	}

	main{
		display:grid;
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
		gap:1rem;
	}

	h1{
		color: red;
		font-size: 5rem;
		font-weight: bold;

	}
</style>