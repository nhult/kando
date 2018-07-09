<template>
  <div class='tabModalHeader'>
    <p @click="addTab">+</p>
    <input type="text" v-model="value" placeholder="Title (e.g. groceries)" @keyup.enter='addTab'>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../../main'
import moment from 'moment'

export default {
  name: 'tabModalHeader',
  props: ['userEmail', 'todayDate'],
  data() {
    return {
      value: ''
    }
  },
  methods: {
    addTab: function () {
      db.collection('users').doc(this.userEmail).collection('tabs').get().then(snap => {
        if (snap.size > 5) {
          alert("Limit of tabs is 6, sorry...");
          return false;
        }
      });
      
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

      this.value = '';
      this.$emit('update');
    }
  }
}
</script>
<style scoped>
.tabModalHeader {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}
input {
  min-width: 40px;
  height: 42px;
  border: 1px solid #30336b;
  border-left: none;
  border-radius: 3px;
  font-size: 2vw;
  text-align: center;
  cursor: pointer;
  user-select: none;
}
p {
  min-width: 40px;
  height: 40px;
  border: 1px solid #30336b;
  border-radius: 3px;
  font-size: 39px;
  transform: scale(1.1);
  cursor: pointer;
  user-select: none;
}
@media only screen and (max-width: 850px) {

}
</style>
