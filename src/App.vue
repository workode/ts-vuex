<template>
  <div>
    <nav>
      <router-link :to="'/'">Home</router-link>
      <router-link :to="'Tasks'">Tasks</router-link>
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
<style>
@import '~bulma/css/bulma.css';
  nav {
    text-align: right;

    background-color:#42b983;
  }
  nav a{
    border:none;
    padding:10px 25px; margin:10px;
    display:inline-block;
    background:#42b983;
    color:#333;

  }
  nav a:hover, nav a.router-link-active{
    background: #9fc6b4;
    color: #1f5d41;
    border-color: #42b983;
  }
  main{
    min-height:80vh;
    display:flex;
    align-items: center;
    vertical-align:middle;
  }
  main > div{
    width:100%;
  }
</style>
