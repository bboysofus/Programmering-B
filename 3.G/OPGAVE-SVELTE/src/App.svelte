<script>
	//Disable right click
	//document.addEventListener('contextmenu', event => event.preventDefault());



	let pulled = 0
	let card

	const drawCard = () => {
		fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
			.then(res => res.json())
				.then(json => {
					card = json
					console.log(card);
				})
		pulled = pulled + 1
	}
	$: if(pulled >= 10) pulled = 1;

	const rotation = () => {
		document.querySelector('#hej').style.animation = "anim 2s ease-in-out"
		console.log('Hejsa');
	}

</script>

<main>
	<div style="display: grid; place-items: center;">
		<img src="https://www.atomsindustries.com/assets/images/items/ASD1750/roadhouse-back.png" alt="">
		<button style="cursor: pointer;" on:click={drawCard}>Draw a card</button>
		<h2>Cards pulled: {pulled}</h2>
	</div>
	<div class="page">
		{#if card}
			<div class="card">
				<img id="hej" style="cursor: pointer;" src="{card.cards[0].image}" alt="" on:click={rotation}>
				<div class="description">
					<h2>Type: {card.cards[0].suit}</h2>
					<h2>Value: {card.cards[0].value}</h2>
				</div>
			</div>
		{/if}
	</div>
</main>

<style>
	:global(body){
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		height: 100vh;
		width: 100vw;
	}

	main{
		height: 100vh;
		width: 100vw;
	}

	.page{
		transition: .5s all ease-in-out;
		background-color: rgb(53, 157, 255);
	}

	.card{
		border: 2px solid black;
		border-radius: 5px;
		display: grid;
		place-items: center;
	}

	@keyframes anim{
		50% {transform: rotate(180deg);}
		100%{transform: rotate(180deg);}
	}
</style>