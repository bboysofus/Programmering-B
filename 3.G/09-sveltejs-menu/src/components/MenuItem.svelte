<script>
    export let title
    export let activePage
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<main class={activePage == title ? 'active' : ''}
    on:click={()=>activePage=title}
    >
    {title}
</main>

<style>
    main{
        cursor: pointer;
        transition: .1s all ease-in-out;
    }
    
    .active{
        border-bottom: 2px solid hotpink;
    }
</style>