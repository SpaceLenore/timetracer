<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Fira+Sans:300,400,500&display=swap");

html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  color: #2c3e50;
  background: #f1f2f6;
}
#app {
  width: 100%;
  height: 100%;
  font-family: "Fira Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 1rem 0;
  font-weight: 500;
}

hr {
  border: none;
  box-shadow: 0 0 0 0.5px;
}

.half-split {
  display: flex;
  flex-direction: row;
}

.half {
  flex: 1;
}

.half-left {
  padding: 1rem 0.5rem 1rem 1rem;
}

.half-right {
  padding: 1rem 1rem 1rem 0.5rem;
}

.card {
  background: #fff;
  border: 1px solid #ccc;
  margin: 0 0 1rem 0;
  padding: 1rem;
  box-shadow: 2px 2px 5px rgba(150, 150, 150, 0.3);
}

.card-center {
  margin-left: auto;
  margin-right: auto;
}

.card-header {
  font-weight: 300;
  margin: 0;
  padding: 0.5rem;
}

.card-full {
  width: 100%;
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

.smaller-text {
  font-size: 0.8rem;
}

.subtle-link {
  color: #3a3abb;
  text-decoration: none;
}

.subtle-link:hover {
  color: #5252b1;
}

.splitleftandright {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notify-wrap {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
}

.notify {
  margin-bottom: 1.5rem;
  padding: 1rem;
  width: 20%;
  text-align: center;
}

.error {
  color: #fff;
  background: #c0392b;
}

@media screen and (max-width: 700px) {
  .half-split {
    display: flex;
    flex-direction: column;
  }
  .half-left {
    padding: 0 1rem;
  }

  .half-right {
    padding: 0 1rem;
  }

  .card-wide {
    width: 90%;
  }

  .card-medium {
    width: 70%;
  }

  .card-small {
    width: 60%;
  }
}
</style>
