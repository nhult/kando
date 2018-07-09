<template>
  <div class='sign-form'>
    <h1>Register</h1>
    <input type='email' v-model='registerEmail' @keyup.enter='signUp' placeholder='Email' />
    <input type='text' v-model='registerUsername' @keyup.enter='signUp' placeholder='Username' />
    <input type='password' v-model='registerPassword' @keyup.enter='signUp' placeholder='Password' />
    <button @click='signUp()' type='submit' id='sign-register'>Register</button>

    <hr>

    <h2>Already a user?</h2>
    <input type='email' v-model='loginEmail' @keyup.enter='signIn' placeholder='Email' />
    <input type='password' v-model='loginPassword' @keyup.enter='signIn' placeholder='Password' />
    <button @click='signIn' type='submit' id='sign-login'>Login</button>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../../main'

export default {
  name: 'sign-form',
  data () {
    return {
      registerEmail: '',
      registerUsername: '',
      registerPassword: '',
      loginEmail: '',
      loginPassword: '',
    }
  },
  methods: {
    signUp: function() {
      firebase.auth().createUserWithEmailAndPassword(this.registerEmail, this.registerPassword)
      .catch(function(error) { alert(error.message) });
    },
    signIn: function() {
      firebase.auth().signInWithEmailAndPassword(this.loginEmail, this.loginPassword).then(
        function (user) {
          //alert('Welcome back!')
        },
        function (err) {
          alert('Oops...' + err.message)
        }
      );
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
.sign-form {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;

  -webkit-box-shadow: 0px 1px 1px 1px rgba(0,0,0,0.15);
  -moz-box-shadow: 0px 1px 1px 1px rgba(0,0,0,0.15);
  box-shadow: 0px 1px 1px 1px rgba(0,0,0,0.15);
  width: 390px;
  height: 510px;

  animation: bounce .8s ease-in forwards;
  animation-delay: 5s;
}
@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(0);
  }
  70% {
    transform: translateY(-4px);
  }
  96%, 100% {
    transform: translateY(0);
  }
}
input {
  height: 28px;
  width: 250px;
  margin: 5px 0;
  font-size: 12px;
  padding-left: 10px;
}
#sign-register, #sign-login {
  height: 28px;
  width: 264px;
  border-radius: 2px;
  outline: none;
  border: none;
  margin-top: 10px;
  font-size: 16px;
}
#sign-register:hover, #sign-login:hover {
  cursor: pointer;
}
hr {
  width: 80%;
  opacity: .2;
  margin-top: 30px;
}

@media only screen and (max-width: 450px) {
  .sign-form {
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    margin-top: 0;
    min-width: 95vw;
  }
}
</style>
