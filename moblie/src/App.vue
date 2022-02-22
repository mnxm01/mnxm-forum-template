<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Arial", "Microsoft YaHei";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #757575;
}
dd,
dl {
  display: block;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
}
ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

div, a, p, input, button, h1, h2, h3, h4, h5, h6{
  margin: 0;
  padding: 0;
}
img {
  max-width: 100%;
}
legend{
  padding-inline-start: 0px;
  padding-inline-end: 0px;
}
body {
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
}
html {
  font-size: calc(100vw / 20);
}
</style>
