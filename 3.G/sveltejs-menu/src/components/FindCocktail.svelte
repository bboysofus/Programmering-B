<script>
    let q = 'strawberry'
    let cocktails = []
    $: console.log(q + ' is the query')
    $:  if (q.length > 1) {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + q)
        .then(res => res.json())
        .then(json => {
            if(json.drinks) cocktails = json.drinks
        })
    }
</script>

<main class='page'>
    <div class="searchbar">
        <input type="text" bind:value={q} on:click={()=>q=''}>
    </div>
    <div class="results">
        {#each cocktails as cocktail}
            {#if cocktail.strDrink.toLowerCase().includes(q.toLowerCase())}
                <div class="cocktail">
                    <h2>{cocktail.strDrink}</h2>
                    <img src={cocktail.strDrinkThumb} alt="">
                </div>
            {/if}
        {/each}
    </div>
</main>

<style>
    main{
        display:grid;
        grid-template-rows: 10vh 80vh;
        align-items: flex-start;
    }
    .searchbar{
        display:grid;
        background-color: cornflowerblue;
        width:100vw;
        height:100%;
        place-items:center;
    }
    input{
        border-radius: .6rem;
        width:60vw;
        text-align: center;
    }
    .results{
        display:grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        justify-content: center;
        align-items: center;
        grid-gap:.2rem;
        width:100vw;
        padding:.8rem;
        overflow: scroll;
    }
    .cocktail{
        display:grid;
        min-width:100px;
        height:100px;
        grid-template-rows: 1fr 2fr;
        place-items:center;
        border:1px solid black;
        border-radius:5px;
        padding:1rem;
        transition:.1s ease-in-out all;
    }
    .cocktail h2{
        text-align:center;
        font-size:.5rem;
    }
    .cocktail img{
        width:50px;
        height:50px;
        object-fit:cover;
        border-radius:50%;
    }
    .cocktail:hover{
        transform:scale(1.1);
    }
    
</style>