<script>
  import { dictionaries } from "../scripts/Dictionnaries";
  import { push, pop, replace } from "svelte-spa-router";

  let setChoice = 0;
  const chooseSet = (event) => {
    switch (event.target.id) {
      case "set1":
        setChoice = 0;
        break;
      case "set2":
        setChoice = 1;
        break;
      case "set3":
        setChoice = 2;
        break;
    }
    push("/Card/" + setChoice);
  };
</script>

<div class="menu">
  <h2 class="menu__heading">Choisir un set de carte :</h2>
  <div class="menu__content">
    {#each dictionaries as dictionary, index}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="menu__content__option"
        id="set{index + 1}"
        on:click={chooseSet}
      >
        <h3 class="menu__content__option-heading">Set de carte {index + 1}</h3>
      </div>
    {/each}
  </div>
</div>

