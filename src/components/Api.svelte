<script>
  import { onMount } from "svelte";

  let apiData = {};
  export let word;
  let meanings = [];
  let apiAddress = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;


  onMount(async () => {
    fetch(apiAddress)
    .then(response => response.json())
    .then(data => {
      apiData = data;
      meanings = apiData[0].meanings;
    }).catch(error => {
      console.log(error);
      return [];
    });

  });


</script>

<div>
  {#each meanings as meaning}
    <div class="definition-title">
      <h3>{meaning.partOfSpeech}</h3>
    </div>
    <div class="definition-desc">
      <p>{meaning.definitions[0].definition}</p>
    </div>
  {/each}
</div>





