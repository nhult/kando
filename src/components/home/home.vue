<template>
  <div class='home'>
    <div class="header">
      <span class="span-dayAndTime">{{ dayAndTime }}</span>
      <font-awesome-icon :icon="icon.calendar" size="1x" class="icon icon-calendar" @click="showCalendar" />
      <span class="span-user">{{ user }}</span>
      <button @click='signOut'>
        Sign Out
        <font-awesome-icon :icon="icon.signOut" class="icon-signOut" />
      </button>
    </div>

    <calendarModal v-show="calendarModal" @close="calendarModal = false" />

    <div class="todo-tabs">
      <todolist v-for="(tab, index) in tabs" :key="tab.id" :todayDate="todayDate" :nthTab="index" />

      <div class="newTab">
        <tabModal v-show="tabModal" @close="tabModal = false" :userEmail="user" :todayDate="todayDate">+</tabModal>
        <p class="add-tab" @click="addTab" v-bind:class="{ iconPlusActive: tabModal }">+</p>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../../main'
import firebase from 'firebase'
import calendarModal from "../modal/calendarModal"
import tabModal from "../modal/tabModal"
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
      calendarModal: false,
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
    calendarModal,
    todolist,
    tabModal
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
    removeTab: function() {
    },
    updateTabs: function() {
      const tabsClone = [];

      let i = 0;
      for (i; i < 3; i++) {
        tabsClone.push([]);
        db.collection('users').doc(this.user).collection('default').doc('tabs').collection('tab' + i).get()
        .then(documents => {
          documents.forEach(doc => {
            tabsClone[i].push(doc.data());
          });
        });
      }
      this.tabs = tabsClone;
    },
  }
}
</script>

<style scoped>
.header {
  position: absolute;
  top: 0;
  right: 0;

  width: 100%;

  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
}
.header span {
  font-size: 22px;
}
.span-user {
  margin-left: 20px;
}
.span-dayAndTime {
  margin-right: auto;
  margin-left: 20px;
}
.header button {
  height: 28px;
  width: 105px;
  border-radius: 2px;
  outline: none;
  border: none;
  margin: 10px;
  margin-left: 20px;
  font-size: 16px;
  cursor: pointer;
  background: #c8d6e5;
  flex-shrink: 0;
}
button * {
  margin: 0 5px;
}

/*Nav-bar*/
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
  /*
  animation: underlineExpand 1s linear forwards;
  animation-delay: .5s;
  */
}
@media only screen and (max-width: 800px) {
  .home {
    width: 100%;
    height: 100%;
  }
  .home * {
    margin: 0;
  }
  .header {
    flex-flow: row nowrap;
    width: 100%;
    justify-content: center;
  }
  .todo-tabs {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .add-tab {
    right: 0;
  }
  .header span {
    font-size: 12px;
  }
  .span-user {
    margin: 0;
  }
  .header button {
    height: 38px;
    width: 70px;
    border-radius: 2px;
    outline: none;
    border: none;
    margin: 10px;
    margin-left: 20px;
    font-size: 16px;
    cursor: pointer;
    background: #c8d6e5;
    flex-shrink: 0;
  }
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
.todo-tabs {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
}
.newTab {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}
</style>
