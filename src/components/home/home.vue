<template>
  <div class='home'>
    <div class="header">
      <span class="span-date">{{ dayAndTime }}</span>

      <div class="new-tab new-tab-header">
        <tabModalHeader :userEmail="user" :todayDate="todayDate" @update="updateTabs"></tabModalHeader>
      </div>

      <span class="span-user">{{ user }}</span>
      <button @click='signOut'>
        Sign Out
        <font-awesome-icon :icon="icon.signOut" class="icon-signOut" />
      </button>
    </div>

    <div class="todo-tabs">
      <todolist v-for="(tab, index) in tabs" :key="index" :title="tab.title" @update="updateTabs" />

      <div class="new-tab new-tab-main">
        <tabModal v-show="tabModal" @close="tabModal = false" :userEmail="user" :todayDate="todayDate">+</tabModal>
        <p class="add-tab" @click="addTab" v-bind:class="{ iconPlusActive: tabModal }">+</p>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../../main'
import firebase from 'firebase'
import tabModal from "../modal/tabModal"
import tabModalHeader from "../modal/tabModalHeader"
import moment from 'moment'
import todolist from "../todolist/todolist"
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faSignOutAlt, faCalendar } from '@fortawesome/fontawesome-free-solid'

export default {
  name: 'home',
  data() {
    return {
      user: this.getUsername(),
      tabs: [],
      tabModal: false,
      showTodos: true,
      dayAndTime: moment().format("ddd, hA"),
      todayDate: moment().format('YYYY-MM-D')
    }
  },
  created: function() {
    this.updateTabs();
  },
  components: {
    FontAwesomeIcon,
    todolist,
    tabModal,
    tabModalHeader
  },
  computed: {
    icon () {
      return {
        signOut: faSignOutAlt,
        calendar: faCalendar
      }
    }
  },
  methods: {
    signOut: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('sign');
      })
    },
    getUsername: function() {
      const authenticatedUser = firebase.auth().currentUser;
      return authenticatedUser.email;
    },
    showCalendar: function() {
      this.calendarModal = true;
    },
    addTab: function() {
      this.tabModal == false ? this.tabModal = true : this.tabModal = false;
    },
    updateTabs: function() {
      let tabsClone = [];
      let collectionRef = db.collection('users').doc(this.user).collection('tabs');
      collectionRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          tabsClone.push(doc.data());
        });
      });
      this.tabs = tabsClone;
    },
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
}
.header {
  width: 100%;
  height: 6vmin;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}
.span-date {
  margin-right: auto;
  margin-left: 1vw;
}
.span-user {
  margin-right: 1vw;
}
.header span {
  font-size: 1.5em;
}
.header button {
  height: 2.2em;
  width: 8em;
  border-radius: 2px;
  outline: none;
  border: none;
  font-size: 0.9em;
  cursor: pointer;
  background: #c8d6e5;
  margin-right: 1vw;
}
.todo-tabs {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  margin: 20px 20px;
}
.add-tab {
  font-size: 5em;
  margin-left: 100px;
  user-select: none;
  animation: rotateReverse .5s;
  animation-fill-mode: forwards;
}
.add-tab:hover {
  cursor: pointer;
}
.iconPlusActive {
  animation: rotate .5s;
  animation-fill-mode: forwards;
}
@keyframes rotate {
  from {
    margin-left: 100px;
    transform: rotate(0);
  }
  to {
    margin-left: 200px;
    transform: rotate(45deg) ;
  }
}
@keyframes rotateReverse {
  from {
    margin-left: 200px;
    transform: rotate(45deg);
  }
  to {
    margin-left: 100px;
    transform: rotate(0) ;
  }
}
.new-tab {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}
.new-tab p {
  margin-right: 20px;
}
.new-tab span {
  font-size: 2vw;
}
.new-tab-header {
  display: none;
}
@media only screen and (max-width: 1450px) {
  .todo-tabs {
    justify-content: center;
    align-items: center;
  }
  .new-tab-main {
    display: none;
  }
  .header .new-tab-header {
    display: flex;
    height: 100%;

    margin: 0 auto;
    transform: translateX(-9.3vw);
  }
}
@media only screen and (max-width: 850px) {
  .header {
    justify-content: flex-end;
  }
  .new-tab-header {
    margin: 0;
    transform: translateX(0);
  }
  .icon-signOut, .span-date {
    display: none;
  }
}
@media only screen and (max-width: 650px) {
  .span-user {
    display: none;
  }
}
/*
.navbar {
  border: 1px solid grey;
  width: 420px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  overflow: hidden;
  height: 68px;
  transform: translateY(-15px);
  background: #c8d6e5;

  animation: underlineExpand 1s linear forwards;
  animation-delay: .5s;
}
.icon {
  cursor: pointer;
  opacity: 0;
  animation: fadeInLeft 1s ease-in forwards;
  margin: 0 10px;
}
.icon:nth-child(4) {
  animation-delay: .5s;
}
.icon:nth-child(3) {
  animation-delay: 1s;
}
.icon:nth-child(2) {
  animation-delay: 1.3s;
}
.icon:nth-child(1) {
  animation-delay: 1.4s;
}
@keyframes fadeInLeft {
  from {
    transform: translateX(-200px);
    opacity: 0;
  } to {
    transform: translateX(0);
    opacity: 1;
  }
}
*/
</style>
