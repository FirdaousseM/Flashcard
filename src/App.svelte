<script>
  import Card from './components/Card.svelte';
  import Menu from './components/Menu.svelte';

  import Router from "svelte-spa-router";


  let routes = {
    "/Card/:id" : Card,
    
    "*" : Menu
  }

</script>


<main>
  <h1>Flashcard</h1>
  <Router {routes}></Router>
</main>

<style>
  
</style>