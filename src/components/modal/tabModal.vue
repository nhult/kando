<template>
  <div class='modal-addTab'>
    <div class='content'>
      <div class='vertical-line'>
      </div>
      <input type="text" v-model="value" placeholder="Title (e.g. groceries)" @keyup.enter='addTab'>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../../main'
import moment from 'moment'

export default {
  name: 'tabModal',
  props: ['userEmail', 'todayDate'],
  data() {
    return {
      value: ''
    }
  },
  methods: {
    addTab: function () {
      db.collection('users').doc(this.userEmail).collection('tabs').doc(this.value).set({
        title: this.value,
        todos: []
      })
      .then(function() {
        this.$emit('update');
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });

      this.$emit('update');
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.modal-addTab {
  position: relative;
}
.modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
}
.content {
    background-color: #fefefe;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    height: 30px;
    width: 0; /**/
    margin: 0;
    opacity: 0; /**/
    animation: slideInLeft .5s;
    animation-fill-mode: forwards;
    animation-delay: .3s;
}
@keyframes slideInLeft {
  from {
    transform: translateX(100px);
    opacity: 0;
    width: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slideInLeftReverse {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100px);
    opacity: 0;
  }
}
.vertical-line {
  border: 1px solid #888;
  width: 0;
  height: 100%;
}
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    margin-right: 10px;
    margin-left: 10px;
}
.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
input[type="text"] {
  width: 350px;
  height: 100%;
  text-align: center;
  margin-left: 20px;
  opacity: 0;
  animation: fadeIn 2s;
  animation-delay: .5s;
  animation-fill-mode: forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
