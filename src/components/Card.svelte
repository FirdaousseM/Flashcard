<!-- this is where the magic improt happens -->

<script >

  import { dictionaries } from '../scripts/Dictionnaries';
  import Api from './Api.svelte';

  //export let setNumber;
  let setNumber = 1;

  let dictionary = dictionaries[setNumber];
  let userDictionary = dictionary;

  let progress = 2 + 10;
  let isFlipped=false;
//words and definitons are passed into an reactive array
//card_number is the porsition of the array
let card_number=1;
$: word=dictionaries[1][card_number] ;
$:definition=[card_number];

//functions
const fun= () => isFlipped=!isFlipped;  

const prevCard=()=>{
  let isFlipped=false;
  if(card_number===1){
    card_number = 9;
  }
  else{
    card_number-=1;
  }
 
}

const nextCard=()=>{
  let isFlipped=false;
  if(card_number===10){
    card_number=0;
  }
  else{
    card_number+=1;
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
          
          <div class="definition-title">
            <h3>monsieur</h3>
          </div>
          <div class="definition-desc">
            <p>madame</p>
          </div>
          
          
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
    <button class="button__left">prev</button>
    <button  on:click={fun}>Flip Back</button>
    <button class="button__right">next</button>
  </div>
</section>

<style>
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