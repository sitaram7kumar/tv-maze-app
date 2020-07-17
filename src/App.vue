<template>
  <div>
    <header id="nav">
      <router-link to="/">Home</router-link>
    </header>
    <section class="card">
      <router-view/>
    </section>
  </div>
</template>

<style lang="less">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #999;
    a {
      text-decoration: none;
      color: #0573be;
    }
    #nav {
      padding: 20px;
      a {
        font-weight: bold;
        a.router-link-exact-active {
          color: #42b983;
        }
      }
    }
    .card {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      max-width: 100%;
      margin: auto;
      text-align: center;
      font-family: arial;
      padding: 3%;
      min-height: 300px;
    }
  }
</style>
