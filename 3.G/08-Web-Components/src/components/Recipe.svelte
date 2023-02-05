<script>
    import Page from "./Page.svelte";

    export let title = ''
    export let index = ''

</script>

<main>
    <p id="title">{title}</p>
    <Page number = {index}/>
    <button on:click={() => show = !show}>Hide/Show</button>
</main>

<style>
    main{
        min-width: 20rem;
        height: 20rem;
        padding: 1rem;
        border: 2px solid lightblue;
        border-radius: 1rem;
        position: relative;
    }

    #title{
        margin: 0;
        padding: 0;
        font-weight: bolder;
        margin-bottom: 1rem;
    }
</style>