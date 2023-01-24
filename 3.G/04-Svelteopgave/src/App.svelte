<script>
	let names = ['George', 'Ringo', 'John', 'Poul', 'Joni']

	let people = [
			{
			"name":"Rick",
			"surname":"Morty",      
			"role":"combined"
			},
			{
			"name":"Morty",
			"surname":"Rick",      
			"role":"confused"
			}
		]

	let cocktail
	
	const getCocktail = () => {
		fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
				.then(res => res.json()) //først får vi et response objekt som laves til json
					.then(json => { //så når vi får json tilbage ud af response objektet
						cocktail = json.drinks[0] //gemmer vi objektet i en variabel
						console.log(cocktail) //i konsollen kan du se al info i objektet 
					})
	}
</script>

<main>
	<ul>
		{#each names as name, index}
			<li>Nummer {index} i listen, hedder {name}</li>
		{/each}
	</ul>

	<ul>
		{#each people as p, index}
			<div class="person">
				<h1>{p.name}</h1>
				<p>{p.surname} - role: {p.role}</p>
			</div>
		{/each}
	</ul>

	{#if cocktail}
		<div class="cocktail">
			<div class="description">
				<h2>{cocktail.strDrink}</h2>
				<p>{cocktail.strInstructions}</p>
			</div>
			<img src="{cocktail.strDrinkThumb}" alt="">
		</div>
	{/if}
	<button on:click={getCocktail} >Hent ny cocktail</button>
</main>

<style>
	.cocktail{
		display: grid;
		grid-template-columns: 2fr 1fr;
		width: 50vw;
		box-shadow: .5rem 2rem 4rem 1rem black;
	}

	.cocktail img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.cocktail .description{
		padding: 1rem;
	}
</style>