<script>
  import { dictionaries } from '../scripts/Dictionnaries';
  import Api from './Api.svelte';
</script>



<div>
  {#each dictionaries as dictionary}
    {#each dictionary as dictionaryWord}
      <Api word={dictionaryWord}></Api>
    {/each}
  {/each}
</div>