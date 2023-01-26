<script>
    export let title = 'unavngivet'
    export let index = 0
</script>

<main>
	<h1>{title}</h1>
    <div class="number">
        {index}
    </div>
</main>

<style>
	main{
        display: grid;
        place-items: center;
        width: 100%;
        height: 400px;
        border: 2px solid black;
        border-radius: 2rem;
        position: relative;
    }

    h1{
        font-weight: bold;
    }

    .number{
        position: absolute;
        right: 1rem;
        bottom: 1rem;
        height: 2rem;
        width: 2rem;
        background-color: hotpink;
        border-radius: 50%;
        color: white;
        display: grid;
        place-items: center;
    }
</style>