<script>
    export let recipe // javascript objekt med en hel opskrift
    console.log(recipe)
    let active = false 

    let ytUrl = recipe.strYoutube.split("=")
    console.log(ytUrl);
</script>

<main on:click={()=>active=!active} class={active ? 'active' : ''} style='background-image:url({recipe.strMealThumb});'>
    <h1>{recipe.strMeal}</h1>
    {#if active}
    <iframe width="420" height="315" src="{'https://www.youtube.com/embed/' + ytUrl[1]}" frameborder="1rem"></iframe>
        <div class="description">
            {recipe.strInstructions}
        </div>
         <!-- content here -->
    {/if}
</main>

<style>
    main{
        height:400px;
        width:100%;
        display:grid;
        place-items:center;
        font-weight: 100;
        color:white;
        border-radius:1rem;
        transition: all 1s ease-in-out;
    }
    .active{
        transition: all 1s ease-in-out;
        width:100vw;
        height:100vh;
        z-index:2;
        position:absolute;
        left:0;
        top:0;
        background-size: cover;
    }

    .description{
        background-color: white;
        color: black;
        border-radius: 1rem;
        margin: 5rem;
        padding: 1rem;
    }
</style>