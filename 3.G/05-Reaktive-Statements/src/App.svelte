<script>
	let counter = 0
	let juices = ['orange', 'apple', 'multifruit', 'ginger', 'tropical']

	$: console.log('When counter changes - this log will be induced: ' + counter);
	$: if(counter >= juices.length) counter = 0;

	let random = 1
</script>

<main>
	<h2>Todays juice is {juices[counter]}</h2>
	<button on:click={()=>counter = counter + 1}>Switch</button>

</main>

<style>

</style>