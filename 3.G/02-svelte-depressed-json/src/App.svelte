<script>
    //Opretter to variabler til data fra json med henrettelserne. Datacopy er en kopi af det rigtige data, som vi kan bruge til funktioner
    let data = []
    let dataCopy = []

    //Vi henter json dokumentet med fetch og sætter de til data
    fetch('./deathrow.json')
    .then(res => res.json())
    .then(json => {
                console.log(json);
                data = json
                dataCopy = data
            })

    //Opretter variabel til at 
    let searchName = ''

    //Opretter en funktion til at søge efter navn på siden. .filter() bruges og returnerer en ny liste, der indeholder de bogstaver, der søges på i json-elementerne; First Name og Last Name
    const filterByName = () => {
        dataCopy = data.filter( p => (p['First Name'] + ' ' + p['Last Name']).toLowerCase().includes(searchName.toLowerCase()) )
    }
    
    //Opretter variabel til 
    let race

    //Laver en funktion til at søge efter 'Race' i inputfeltet. Hvis * er valgt, skal der intet ske.
    const filterByRace = () => {
        if(race == '*'){
            dataCopy = data; return
        }
        dataCopy = data.filter( p => p["Race"].toLowerCase() == race)
    }
</script>

<main>
    <!-- Opretter div som bruges som header på siden -->
    <div class="header">
        <!-- Overskrift i headeren -->
        <h1>Den sorteste mørkeste hjemmeside</h1>
    </div>

    <!-- Opretter div, som indeholder de forskellige søgemekanismer -->
    <div class="filter">
        <p>Search by name</p>
        <input placeholder="Search here..." type="text" bind:value={searchName} on:input={filterByName}>
        <p>Search by skin color</p>
        <select placeholder="Please select" bind:value={race} on:change={filterByRace}>
            <option value="*">Please select</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="hispanic">Hispanic</option>
        </select>
    </div>
    <div class="prisoners">
        {#each dataCopy as prisoner}
            <div class="prisoner">
                <h2>{prisoner["First Name"]} {prisoner["Last Name"]}</h2>
                <div>Age: {prisoner["Age at Execution"]}</div>
                <div class="statement">"{prisoner["Last Statement"]}"</div>
            </div>
            {/each}
    </div>
</main>

<style>
    :global(body){
        background-color: black;
        color: white;
        padding: 1rem;
    }
    h1{
        font-weight: 100;
        text-transform: uppercase;
    }
    .header{
        border: 2px solid white;
        display: grid;
        place-items: center;
        margin-bottom: 1rem;
    }
    .prisoners{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 1rem;
    }
    .prisoner{
        border: 2px solid white;
        background-color: darkgray;
        color: #eee;
        padding: 1rem;
        cursor: pointer;
    }
    .filter{
        display: grid;
        grid-template-columns: 2fr 5fr;
        padding-bottom: 1rem;
    }
</style>