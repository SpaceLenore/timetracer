<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
#app {
  width: 100%;
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #f1f2f6;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 1rem 0;
}

.card {
  background: #fff;
  border: 1px solid #ccc;
  margin: auto;
  padding: 1rem;
  box-shadow: 2px 2px 5px rgba(150, 150, 150, 0.3);
}

.card-header {
  font-weight: 300;
  margin: 0;
  padding: 0.5rem;
}

.card-wide {
  width: 80%;
}

.card-medium {
  width: 60%;
}

.card-small {
  width: 40%;
}

.input-type {
  margin: 0.5rem 0;
}

.input-text {
  padding: 0.5rem;
  font-size: 1.05rem;
  border: 1px solid #ccc;
  color: #2c3e50;
}

.input-button {
  padding: 0.5rem 1rem;
  font-size: 1.05rem;
  border: none;
  background: #2c3e50;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
}
</style>
