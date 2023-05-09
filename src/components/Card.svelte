<script>
       
    // window.addEventListener("load", ()=>{
    //     let card = document.querySelector('.cardInner');
    // let classes= card.classList;
    // card.addEventListener('click', function() {
    //     classes.toggle('flip');
    //     });
    // });
    

   
    window.addEventListener('load', () => {
            document.querySelector('.cardInner').addEventListener("onclick", () => {
                alert("Test successful");
                console.log("test");
            });
        })
</script>

<div class="card">
    <div class="cardInner">
        <div class="cardPos cardRecto">
            <h2>A word</h2>
        </div>
        <div class="cardPos cardVerso">
            <div class="cardContent">
                <p>test</p>
            </div>
        </div>
    </div>
</div>

<style>
  .card{
    margin: 100px auto 0;
    width: 400px;
    height: 600px;
    perspective: 1000px;
  }

  .cardInner{
    width: 100%;
    height: 100%;
    transition: transform 1s;
    transform-style: preserve-3d;
    cursor: pointer;
    position:relative;
  }

  .cardInner.flip{
    transform: rotateY(180deg);
  }
  .cardPos{
    width: 600px;
    height: 400px;
    
    backface-visibility: hidden; 
    overflow: hidden;
    border-radius: 16;
    box-shadow: 0px 3px 18px 3px rgba(0, 0, 0, 0.2);
  }

  .cardRecto{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cardcontent{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cardRecto h2{
    font-size:32px;
  }

  .cardVerso{
    transform: rotateY(180deg);
  }
</style>