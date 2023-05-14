<!-- this is where the magic import happens -->

<script>
  //import methods for API
  import { dictionaries } from "../scripts/Dictionnaries";
  import { onMount } from "svelte";
  //import methods for routing
  import { push, pop, replace } from "svelte-spa-router";
  //import Score component
  import Score from "./Score.svelte";
  //import to use svelte icons previous and next
  import IoIosArrowBack from "svelte-icons/io/IoIosArrowBack.svelte";
  import IoIosArrowForward from "svelte-icons/io/IoIosArrowForward.svelte";

  export let params = {};
  let setNumber = params.id;

  let dictionary = dictionaries[setNumber];

  let isFlipped = false;

  //words and definitons are passed into an reactive array
  //cardNumber is the porsition of the array

  $: cardNumber = 0;

  $: userScore = 0;

  $: userDictionary = [...dictionary];

  $: word = userDictionary[cardNumber];
  $: meaningsAPI = [];
  $: meanings = [];

  /*****************
   * API           *
   *****************/
  let apiAddress = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  onMount(async () => {
    dictionary.forEach((oneWord) => {
      fetch(apiAddress + oneWord)
        .then((response) => response.json())
        .then((data) => {
          meaningsAPI = [...meaningsAPI, data[0].meanings];
          meanings = [...meaningsAPI]
        })
        .catch((error) => {
          console.log(error);
          return [];
        });
    });

    if (parseInt(localStorage.getItem("userScore" + setNumber)) > -1) {
      console.log(parseInt(localStorage.getItem("userScore" + setNumber)));
      userScore = parseInt(localStorage.getItem("userScore" + setNumber));
    }
  });

  /*****************
   * CARTE         *
   *****************/

  //functions to flip and change card
  const flipCard = () => {
    isFlipped = !isFlipped;
  };

  const prevCard = () => {
    isFlipped = false;
    if (cardNumber === 0) {
      cardNumber = userDictionary.length - 1;
    } else {
      cardNumber -= 1;
    }
  };

  const nextCard = () => {
    isFlipped = false;
    if (cardNumber === userDictionary.length - 1) {
      cardNumber = 0;
    } else {
      cardNumber += 1;
    }
  };

  /*****************
   * NAVIGATION    *
   *****************/

  const goToMenu = () => {
    push("/Menu");
    try {
      localStorage.setItem("userScore" + setNumber, JSON.stringify(userScore));
    } catch (error) {
      console.log(error);
    }
  };

  /*****************
   * SCORE         *
   *****************/

  const success = () => {
    if (userDictionary.length > 0 && userScore < dictionary.length) {
      userScore++;
      userDictionary.splice(cardNumber, 1);
      word = userDictionary[cardNumber];
      meanings.splice(cardNumber, 1);
      arrayEmpty();
      cardNumber = 0;
      console.log(dictionary.length);
      console.log("userDictionary :" + userDictionary);
      console.log("word :" + word);
      console.log("meanings :" + meanings);
    }
    try {
      localStorage.setItem("userScore" + setNumber, JSON.stringify(userScore));
    } catch (error) {
      console.log(error);
    }
  };

  /*****************
   * RESET BUTTON   *
   *****************/
  $: displayreset = "none";
  const arrayEmpty = () => {
    if (userScore == dictionary.length) {
      displayreset = "block";
    } else {
      displayreset = "none";
    }
  };

  const reset = () => {
    localStorage.clear();
    userDictionary = [...dictionary];
    userScore = 0;
    meanings = [...meaningsAPI];

  };
</script>

<section>
  <button class="button__home" on:click={goToMenu}>Accueil</button>

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="card" on:click={flipCard}>
    <div class="card__content" class:flip={isFlipped}>
      <div class="card__position cardRecto">
        <h1>{word}</h1>
      </div>
      <div class="card__position cardVerso" class:hidetext={isFlipped}>
        <div class="cardVerso__content">
          {#each meanings as meaning, index}
            {#if index == cardNumber}
              <div class="definition-title">
                <h3>{meaning[0].partOfSpeech}</h3>
              </div>
              <div class="definition-desc">
                <p>{meaning[0].definitions[0].definition}</p>
              </div>
            {/if}
          {/each}
        </div>
      </div>
    </div>
  </div>

  <div>
    <button on:click={success}>J'ai réussi ce mot</button>
    <button class="resetButton" on:click={reset} style="display:{displayreset}">Reset</button>
  </div>

  <div class="button__flip">
    <button class="button__flip--left" on:click={prevCard}
      ><IoIosArrowBack /></button
    >
    <button class="button__flip--right" on:click={nextCard}
      ><IoIosArrowForward /></button
    >
  </div>
  <div class="progress-bar">
    <div id="progress-bar__progress" style="width:{userScore * 10}%">
      <div id="progress-bar__bar" />
    </div>
  </div>

  <div class="score-container">
    <!-- SCORE - debut -->
    <Score score={userScore} wordPerSet={dictionary.length} />
    <!-- SCORE - fin -->
  </div>
</section>

<style>
  .resetButton{
    margin:10px auto;
  }

  section {
    margin-bottom: 30px;
  }
  .score-container{
    margin-top:10px;
  }

  .card {
    margin: 100px auto 0;
    width: 800px;
    height: 400px;
    perspective: 1000px;
    padding: 30px;
  }

  .card__content {
    width: 100%;
    height: 100%;
    transition: transform 1s;
    transform-style: preserve-3d;
    cursor: pointer;
    position: relative;
  }

  .flip {
    transform: rotateY(180deg);
  }

  /* delay appearance of the text at the back of the card to hide it */
  @keyframes change-color{
    100% {color:black}
  }
  .hidetext{
    animation: change-color 0.5s forwards;
  }

  .card__position {
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    overflow: hidden;
    border-radius: 16;
    box-shadow: 0px 3px 18px 3px rgba(0, 0, 0, 0.2);
  }

  .cardRecto {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cardVerso__content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cardRecto h1 {
    font-size: 32px;
  }

  .cardVerso {
    color:rgb(255, 255, 255);
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotateY(180deg);
  }

  .definition-title {
    display: flex;
    justify-content: flex-start;
  }

  .definition-title h3 {
    font-size: 20px;
    font-style: bold;
    padding: 25px;
    width: 150px;
  }

  .definition-desc {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 25px;
  }

  /* buttons */
  button {
    border-color: #c0c0c0;
  }

  .button__flip {
    margin-top: 20px;
  }
  .button__home {
    width: 200px;
    height: 50px;
  }

  .button__flip--left {
    width: 50px;
    height: 40px;
  }

  .button__flip--right {
    width: 50px;
    height: 40px;
  }

  /* Progress bar */

  .progress-bar {
    width: 90%;
    margin-left: 42px;
    height: 18px;
    /* background: #808080; */
    border-radius: 10px;
    box-shadow: 0 0 5px #35ec3b7c;
    transition: all 0.3s;
  }
  :root {
    --custom-color: {getColor()};
  }
  #progress-bar__progress {
    width: 100%;
    height: 14px;
    position: relative;
    margin-top: 5%;
    transition: all 0.3s;
  }

  #progress-bar__bar {
    height: 18px;
    border-radius: 10px;
    background-color: hsl(102, 27%, 60%);
    border: 0.5px solid hsl(102, 27%, 60%);
    transition: all 0.3s;
  }
</style>
