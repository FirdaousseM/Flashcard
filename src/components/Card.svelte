<!-- this is where the magic improt happens -->

<script >

  import { dictionaries } from '../scripts/Dictionnaries';
  import { onMount } from 'svelte';
  
  //export let setNumber;
  let setNumber = 1;

  let dictionary = dictionaries[setNumber];
  let userDictionary = dictionary;

  let progress = 2 + 10;
  let isFlipped = false;
  
  //words and definitons are passed into an reactive array
  //cardNumber is the porsition of the array

  $: cardNumber=1;
  $: word=dictionary[cardNumber];
  $: meanings = []

  /*****************
   * API           *
   *****************/
  let apiAddress = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  onMount(async () => {
    dictionary.forEach(oneWord => {
      fetch(apiAddress + oneWord)
      .then(response => response.json())
      .then(data => {
        meanings = [...meanings, data[0].meanings];
      }).catch(error => {
        console.log(error);
        return [];
      });
    })
  });

  //functions
  const fun= () => isFlipped=!isFlipped;  

  const prevCard = () => {
    let isFlipped=false;
    if(cardNumber===1){
      cardNumber = 9;
    }
    else{
      cardNumber -= 1;
    }
  }

  const nextCard = () => {
    let isFlipped=false;
    if(cardNumber===9){
      cardNumber=0;
    }
    else{
      cardNumber+=1;
    }   
  }

</script>

<section>
  <div class="card">
    <div class="card__inner" class:flip={isFlipped}>
      <div class="card__position cardRecto">
        <h1>{word}</h1>
      </div>
      <div class="card__position cardVerso">
        <div class="card_content">
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
    
  <div class="progress-bar" >
    <div id="my_progress" style="width:{progress}%">
      <div id="my_bar"></div>
    </div>
  </div>
  <div class="buttonFlip">
    <button class="button__left" on:click={prevCard}>prev</button>
    <button on:click={fun}>Flip Back</button>
    <button class="button__right" on:click={nextCard}>next</button>
  </div>
</section>

<style>
  section{
    margin-bottom: 30px;
  }

  .card{
    margin: 100px auto 0;
    width: 800px;
    height: 400px;
    perspective: 1000px; 
    padding: 30px;
  }

  .card__inner{
    width: 100%;
    height: 100%;
    transition: transform 1s;
    transform-style: preserve-3d;
    cursor: pointer;
    position:relative;
  }

  .flip{
    transform: rotateY(180deg);
  }

  .card__position{
    /* width: 600px;
    height: 400px; */
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden; 
    transform-style: preserve-3d;

    overflow: hidden;
    border-radius: 16;
    box-shadow: 0px 3px 18px 3px rgba(0, 0, 0, 0.2);
  }

  .cardRecto{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card_content{
    display: flex;
    align-items: center;
    justify-content: center;
    /* padding: 30px; */
  }

  .cardRecto h1{
    font-size:32px;
  }

  .cardVerso{
    transform: rotateY(180deg);
  }

  .definition-title{
    display: flex;
    justify-content: flex-start;
  }

  .definition-title h3{
    font-size: 20px;
    font-style: bold;
    padding:25px;
    width:150px;

  }

  .definition-desc{
    display:flex;
    justify-content: flex-end;
    align-items: center;
    padding:25px;
  }

  /* buttons */
  .buttonFlip{
    margin-top:20px;
  }

  .button__left{
    width: 50px;
    height: 40px;
  }

  .button__right{
    width: 50px;
    height: 40px;
  }

  /* Progress bar */
  #my_progress {
		width: 100%;
		height: 50px;
		position: relative;
		margin-top: 5%;
	}
	
	#my_bar {
		height: 30px;
		background-color: hsl(102, 27%, 60%);	
		border: 1px solid #333;
	}
</style>