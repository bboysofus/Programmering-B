<script>
	import { fly } from 'svelte/transition'
	let name = 'Brian';
	let names = ['Mie', 'Otis', 'Maeve']
	const removeItem = (i) => {
		names.splice(i, 1)
		names = names
	}
	let magic = false
</script>

<main>
	<h1>Hello {name}!</h1>
	<input type="text" bind:value={name}>
	<button on:click={()=>{names = [...names, name]; name=''}} >Add to list</button>
	<button on:click={()=>magic=!magic}>Tryllestav</button>
	{#if magic}
	<div class="people">
		{#each names as n, index}
			<div transition:fly="{{ y: 200, duration: 2000, delay:index*100}}" class="person" on:click={()=>removeItem(index)}> {n}</div>
		{/each}
	</div>
	{/if}
</main>

<style>
	main {
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	.people{
		display: grid;
		gap: 2rem;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	}

	.person{
		font-size: 3rem;
		color: white;
		display: grid;
		place-items: center;
		background-color: grey;
		height: 10rem;
		border-radius: 1rem;
		border: 2px solid white;
		box-shadow: 10px 10px 20px 2px hotpink;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>