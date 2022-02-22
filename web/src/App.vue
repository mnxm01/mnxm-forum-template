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
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #515a6e;
}
ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}
dd, dl{
  display: block;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
}
div, a, input, button, h1, h2, h3, h4, h5, h6{
  margin: 0;
  padding: 0;
}
a, button{
  cursor: pointer;
}
input, button{
  outline: none;
}
table{
  border-collapse: collapse;
  border: solid 1px #e8eaec;
}
body {
  margin: 0;
  padding: 0;
  font-size: 14px;
}
.ivu-btn{
  color: #747b8b!important;
}
.ivu-btn:disabled,.ivu-btn:disabled:hover{
  background-color: #fff!important;
  color: #dcdee2!important;
}
.ivu-btn:not([disabled]):hover, .ivu-input:hover{
  color: #747b8b!important;
}
.ivu-btn:not([disabled]):focus, .ivu-input:focus {
    box-shadow: 0 0 0 2px rgba(45,140,240,.0)!important;
}
</style>
