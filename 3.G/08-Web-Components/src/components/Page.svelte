<script>
    
    export let number = 0
    export let show = true
</script>

{#if show}
    <main>
        {number}
    </main>
{/if}

<style>
    main{
        display: grid;
        font-size: 1rem;
        place-items: center;
        background-color: black;
        color: white;
        position: absolute;
        right: .5rem;
        bottom: .5rem;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        }
</style>