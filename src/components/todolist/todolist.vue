<template>
  <div class='todolist'>
    <div class='todolist-header'>
      <input type="text" maxlength="27" v-bind:placeholder="title" @keyup.enter='addTodo' v-model='value' />
    </div>
    <ul>
      <li v-for="(todo, index) in todos" v-if="!todo.completed" :key="index" :index="index" @click="selectTodo($event, index)">
        <input type="checkbox" v-bind:checked="todo.completed" class="checkbox-selectTodo" name="selectTodo" />
        <label for="selectTodo">{{ todo.value }}</label>
      </li>

      <li v-else :key="index" :index="index" @click="selectTodo($event, index)">
        <input type="checkbox" v-bind:checked="todo.completed" class="checkbox-selectTodo" name="selectTodo" />
        <label for="selectTodo">{{ todo.value }}</label>
      </li>
    </ul>
    <div class="todolist-footer">
      <span class="todos-clearCompleted" @click="clearCompleted">CLEAR COMPLETED</span>
      <span class="tab-removeTab" @click="removeTab">REMOVE TAB</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import firebase from 'firebase'
import db from '../../main'

export default {
  name: 'todolist',
  props: ['title'],
  data: function() {
    return {
      todos: [],
      value: '',
      userEmail: firebase.auth().currentUser.email
    }
  },
  created: function() {
    db.collection('users').doc(this.userEmail).collection('tabs').doc(this.title).get()
    .then(doc => {
      this.todos = doc.data().todos.map(item => {
        return {completed: item.completed, value: item.value}
      })
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
  },
  methods: {
    addTodo: function () {
      if(this.value === '') {
        alert("Todo can't be empty")
        return false;
      }
      let newTodo = {value: this.value, completed: false}
      this.todos.unshift(newTodo);

      db.collection('users').doc(this.userEmail).collection('tabs').doc(this.title)
      .set({title: this.title, todos: this.todos});

      this.value = '';
      this.updateTodos();
    },
    updateTodos: function() {
      let docRef = db.collection('users').doc(this.userEmail).collection('tabs').doc(this.title).get()
      .then(doc => {
        this.todos = doc.data().todos;
      });
    },
    selectTodo: function (e, index) {
      e.preventDefault();
      this.todos[index].completed = !this.todos[index].completed;

      db.collection('users').doc(this.userEmail).collection('tabs').doc(this.title)
      .set({title: this.title, todos: this.todos});
    },
    clearCompleted: function () {
      let clearedList = this.todos.filter(item => {
        return !item.completed
      });
      this.todos = clearedList;

      db.collection('users').doc(this.userEmail).collection('tabs').doc(this.title)
      .set({title: this.title, todos: clearedList});
      this.updateTodos();
    },
    removeTab: function() {
      db.collection('users').doc(this.userEmail).collection('tabs').doc(this.title).delete();
      this.$emit('update');
    }
  }
}
</script>

<style scoped>
.todolist {
  transition: all .5s;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;

  z-index: 2;
  width: 37vmin;
  height: 37vmin;
  min-width: 220px;
  min-height: 200px;
  border-radius: 2px;
  margin: 10px;
  -webkit-box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.25);
  -moz-box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.25);
  box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.25);
}
.todolist-header {
  height: 55px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  border-bottom: 1px solid white;
}
.todolist-title {
  color: grey;
  margin: 0;
  font-size: 28px;
}
ul {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;
  overflow: auto;
  cursor: move;
}
li {
  margin: 0;
  padding: 0;
  margin: 0;
  margin-left: auto;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid grey;
  background: rgba(178, 190, 195, 0);
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
  user-select: none;

  -webkit-box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.25);
  -moz-box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.25);
  box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.25);
}
/*
li:first-child {
  margin-top: 0;
}
li:last-child {
  margin-bottom: 0;
}
*/
input[type="text"] {
  height: 50px;
  text-align: center;
  font-size: 28px;
  border: none;
  border-bottom: 1px solid grey;
  outline: none !important;
}
input[type="text"]:focus {
  box-shadow: 0 0 5px #719ECE;
}
.checkbox-selectTodo {
  margin-right: 20px;
  margin-left: 10px;
}
.checkbox-selectTodo[type=checkbox]:checked + label {
  color: #ccc;
  font-style: italic;
  text-decoration: line-through;
}
.todos-clearCompleted {
  background: rgba(223, 230, 233, 0);
  cursor: pointer;
  width: 50%;
  border-bottom: 1px solid rgba(9, 132, 227, .6);
}
.todos-clearCompleted:hover {
  background: rgba(223, 230, 233, .7);
  transition: all .2s;

  background: -moz-linear-gradient(bottom, rgba(9, 132, 227, .6) -50%, rgba(0,0,0,0) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(bottom, rgba(9, 132, 227, .6) -50%,rgba(0,0,0,0) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to top, rgba(9, 132, 227, .3) -50%,rgba(0,0,0,0) 110%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a6000000', endColorstr='#00000000',GradientType=0 ); /* IE6-9 */
}
.tab-removeTab {
  background: rgba(231, 76, 60, 0);
  cursor: pointer;
  width: 50%;
  border-bottom: 1px solid rgba(231, 76, 60, .6);
}
.tab-removeTab:hover {
  background: rgba(231, 76, 60, .15);
  transition: all 2s;

  background: -moz-linear-gradient(bottom, rgba(231, 76, 60, .6) -50%, rgba(0,0,0,0) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(bottom, rgba(231, 76, 60, .6) -50%,rgba(0,0,0,0) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to top, rgba(231, 76, 60, .2) -50%,rgba(0,0,0,0) 110%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a6000000', endColorstr='#00000000',GradientType=0 ); /* IE6-9 */
}
.todolist-footer {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}
label {
  cursor: pointer;
}
@media only screen and (max-width: 1450px) {
  .todolist {
  }
}
@media only screen and (max-width: 1000px) {
  .header {
    flex-flow: row nowrap;
    width: 100%;
    justify-content: center;
  }
  .todolist {
    max-width: 100%;
    margin: 0;
    width: 100vw;
    height: 37vmin;
  }
}
</style>
