<template>
  <div class='todolist'>
    <div class='todolist-header'>
      <input type="text" maxlength="27" v-bind:placeholder="title" @keyup.enter='addTodo' v-model='value' />
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
  props: ['todayDate', 'nthTab', 'title'],
  data: function() {
    return {
      todos: [],
      value: '',
      userEmail: firebase.auth().currentUser.email
    }
  },
  created: function() {
    db.collection('users').doc(this.userEmail).collection('tabs')
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
        alert("Todo can't be empty")
        return false;
      }

      this.todos.unshift(this.value);
      let docRef = db.collection('users').doc(this.user).collection('tabs').doc(this.title);
      return docRef.update({
        todos: this.todos
      })
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
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
  transition: all .5s;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;

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
