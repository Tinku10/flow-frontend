<template>
  <div id="foot" class="p-5 mt-2 h-32  w-screen bottom-auto">
    <p class="icons">
      <a href="https://flowwith.netlify.com" target=_blank style="text-decoration: none; color: inherit;"><div id="logo"></div></a>
      <span class=" ml-2  flow mr-2 mb-2">flow</span>
      <!-- <a href="https://www.linkedin.com/in/tinkumonikalita/" target=_blank style="text-decoration: none; color: inherit;"><div id="linkedin"></div></a>
      <a href="https://medium.com/@tinku.kvs" target=_blank style="text-decoration: none; color: inherit;"><div id="medium"></div></a> -->
      
    <div id="copyright" class="mt-2  align-center">Copyright © 2020 Flow</div>
    <!-- <a href="https://github.com/Tinku10/flow-frontend" target=_blank style="text-decoration: none; color: inherit;"><div id="github"></div></a> 
    <p>Contribute on GitHub</p> -->
  </div>
</template>

<script>
export default {
  components: {}
};
</script>

<style scoped>
div {
  display: block;
  text-align: center;
  margin: none;
  /* margin-left: -10px;
  margin-right: -10px; */
  padding: 5px;
  font-family: "Fira Sans", sans-serif;
  font-weight: lighter;
  font-size: 1.2vw;
  color: rgba(255, 251, 251, 0.644);
  background-color: rgb(49, 49, 49);
}
#logo{
  padding: 1px;
  background: url('../../public/quote.svg');
  height: 2.5rem;
  width: 2.5rem;
  background-repeat: no-repeat;
  margin-right: 10px;
  margin-left: 10px;

}

#github{
  padding: 1px;
  background: url('../../public/github.svg');
  height: 20px;
  width: 20px;
  background-repeat: no-repeat;
  margin-left: 10px;
  margin-right: 10px;

}
#linkedin{
  padding: 1px;
  background: url('../../public/Linkedin.svg');
  height: 20px;
  width: 20px;
  background-repeat: no-repeat;
  margin-left: 10px;
  margin-right: 10px;
  /* filter: grayscale(100%); */

}
/* #linkedin:hover{
  filter: grayscale(50%)
} */

/* #hackerrank:hover{
  filter: grayscale(50%)
} */
#foot{
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.icons{
    display:inline-flex;
    flex-direction: row;
    /* justify-content: space-evenly; */
    /* margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px; */

}
.flow{
  font-size: 1.5rem;
  font-family: 'Petit Formal Script', cursive;
}
#copyright{
  font-size: 0.8rem;
  font-family: 'Source Code Pro', sans-serif;
}
html, body{
  position: relative;
}
</style>
