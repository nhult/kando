<template>
  <div class='todolist'>
    <div class='todolist-header'>
      <input type="text" maxlength="27" v-bind:placeholder="'tab' + this.nthTab" @keyup.enter='addTodo' v-model='value' />
    </div>
    <ul>
      <li v-for="(todo, index) in todos" v-if="!todo.completed" :key="todo.id" :index="index" @click="selectTodo($event, todo.id)">
        <input type="checkbox" v-bind:checked="todo.completed" class="checkbox-selectTodo" name="selectTodo" />
        <label for="selectTodo">{{ todo.value }}</label>
      </li>

      <li v-else :key="todo.id" :index="index" @click="selectTodo($event, todo.id)">
        <input type="checkbox" v-bind:checked="todo.completed" class="checkbox-selectTodo" name="selectTodo" />
        <label for="selectTodo">{{ todo.value }}</label>
      </li>
    </ul>
    <span class="todos-clearCompleted" @click="clearCompleted">CLEAR COMPLETED</span>
  </div>
</template>

<script>
import moment from 'moment'
import firebase from 'firebase'
import db from '../../main'

export default {
  name: 'todolist',
  props: ['todayDate', 'nthTab'],
  data: function() {
    return {
      title: this.todayDate, /*if no selectedDate present, pick the present day. Which will happen on page refresh.*/
      todos: [],
      value: '',
      userEmail: firebase.auth().currentUser.email
    }
  },
  created: function() {
    db.collection('users').doc(this.userEmail).collection('default').doc('tabs').collection('tab' + this.nthTab)
    .onSnapshot(snapshot => {
      this.todos = [];
      snapshot.forEach(doc => {
        !doc.data().completed == true ?
        this.todos.unshift(doc.data()) :
        this.todos.push(doc.data());
      });
    }, function(error) {
      alert("Couldn't fetch todos :/")
    });

    this.updateTodos();
  },
  methods: {
    addTodo: function () {
      if(this.value === '') {
        alert("Todo is an empty string")
        return false;
      }

      const ref = db.collection('users').doc(this.userEmail).collection('default').doc('tabs').collection('tab' + this.nthTab).doc();
      ref.set({
        value: this.value,
        id: ref.id,
        completed: false
      });
      this.value = '';
    },
    updateTodos: function() {
      let todosClone = [];
      db.collection('users').doc(this.userEmail).collection('default').doc('tabs').collection('tab' + this.nthTab).get()
      .then(snapshot  => {
        snapshot.forEach(doc => {
          todosClone.push(doc.data());
        });
      });

      this.todos = todosClone;
    },
    selectTodo: function (e, id) {
      e.preventDefault();
      db.collection('users').doc(this.userEmail).collection('default').doc('tabs').collection('tab' + this.nthTab).doc(id).get()
      .then(doc => {
        db.collection('users').doc(this.userEmail).collection('default').doc('tabs').collection('tab' + this.nthTab).doc(id).update({
          completed: !doc.data().completed
        });
      })
    },
    clearCompleted: function () {
      db.collection('users').doc(this.userEmail).collection('default').doc('tabs').collection('tab' + this.nthTab)
      .where("completed", "==", true).get()
      .then((querySnapshot) => {
        let batch = db.batch();
        querySnapshot.forEach(function(doc) {
          batch.delete(doc.ref);
        });

        return batch.commit();
      });
    }
  }
}
</script>

<style scoped>
.todolist {
  position: relative;
  width: 420px;
  height: 400px;
  border-radius: 2px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  margin: 10px;
  margin-right: 50px;
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
@media only screen and (max-width: 800px) {
  .header {
    flex-flow: row nowrap;
    width: 100%;
    justify-content: center;
  }
  .todolist {
    max-width: 100%;
    margin: 0;
  }
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
  cursor: pointer;
  padding-top: 5px;
}
.todos-clearCompleted:hover {
  background: rgba(223, 230, 233, .5);
  transition: all .2s;
}
label {
  cursor: pointer;
}
</style>
