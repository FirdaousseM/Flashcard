<script>
  import { onMount } from "svelte";
  import { dictionaries } from "../scripts/Dictionnaries";

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



<div class="recto">
  <h2>{word}</h2>
</div>

<div class="verso">  
  {#each meanings as meaning}
  <div class="definition-block">
    <span class="definition-block__type">{meaning.partOfSpeech} : </span>
    <p class="definition-block__content">{meaning.definitions[0].definition}</p>
  </div>
  {/each}
</div>







