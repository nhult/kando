<template>
  <div class="sign-intro">
    <h1>Kando</h1>
    <p class="animation-fadeIn">Kanban-based minimalistic <span class="animation-highlight">task management utility</span></p>
    <p class="animation-fadeIn">Real-time communication between user-authenticated groups</p>
    <p class="animation-fadeIn">Easy to manage and to distribute using cloud-based database</p>
    <span class="intro-footer">Register for free</span>
  </div>
</template>

<script>
export default {
  name: 'sign-intro',
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sign-intro {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 400px;
  height: 500px;
  padding: 10px;
}
h1 {
  font-weight: normal;
  font-size: 3em;
}
.intro-footer {
  font-weight: bold;
  font-size: 3em;
  margin-top: 60px;
  opacity: 0;
  background: rgba(220, 221, 225,1.0);
  outline: 10px solid rgba(220, 221, 225,1.0);

  animation: fadeIn 1s ease-in forwards;
  animation-delay: 4s;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animation-highlight {
  animation: emphasizingHighlight 1s ease-in forwards;
  animation-delay: 6s;
  margin: 2px;
}
@keyframes emphasizingHighlight {
  from {
    background: Transparent;
    outline: none;
    color: inherit;
    margin: 2px;
  }
  to {
    background: #273c75;
    outline: 3px solid #273c75;
    color: white;
    margin: 2px;
  }
}

.animation-fadeIn {
  opacity: 0;
  transform: translateY(-10px);
  animation: fadeInTop 1s ease-in forwards;
}
.animation-fadeIn:nth-child(2) {
  animation-delay: .5s;
}
.animation-fadeIn:nth-child(3) {
  animation-delay: 1.5s;
}
.animation-fadeIn:nth-child(4) {
  animation-delay: 2.5s;
}

@keyframes fadeInTop {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
