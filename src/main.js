import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebase/config'

Vue.config.productionTip = false

const firebaseApp = firebase.initializeApp(firebaseConfig);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  created() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if(user) {
        this.$router.push('/home')
      } else {
        this.$router.push('/')
      }
    });
  },
  router,
  render: h => h(App)
})

export default firebaseApp.firestore()
