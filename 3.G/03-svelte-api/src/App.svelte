<script>
	let animals =[    {"name": "lion"},    {"name": "tiger"},    {"name": "bear"},    {"name": "monkey"},    {"name": "elephant"},    {"name": "giraffe"},    {"name": "zebra"},    {"name": "hippopotamus"},    {"name": "rhinoceros"},    {"name": "crocodile"}]

	let screenW
	let shadow
	let animalsDiv

	const handleLight = (e) => {
		console.log(screenW);
		shadow = (e.clienX / screenW) * 10
		console.log(shadow);
		let children = animalsDiv.children
		for(let i=0; i > children.lenght; i++){
			console.log(children[i]);
			children[i].style.boxShadow = "4px 4px 4px 14px green"
		}
	}

</script>

<main bind:clientWidth={screenW} on:mousemove={handleLight}>
	<div class="header">
		Sjove dyr
	</div>
	<div class="animals">
		{#each animals as a}
			<div class="animal" bind:this={animalsDiv}>
				<h2>{a.name}</h2>
			</div>
		{/each}
	</div>
</main>

<style>
	.header{
		background-color: hotpink;
		display: grid;
		place-items: center;
		font-size: 2rem;
		font-weight: bold;
		padding: 1rem;
		color: white;
	}

	.animals{
		display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 1rem;
		padding: 1rem;
	}

	.animal{
		border: 2px solid hotpink;
		border-radius: 50%;
		display: grid;
		place-items: center;
		height: 300px;
		widows: 300px;
		box-shadow: -6px 5px 15px hotpink;

	}
</style>