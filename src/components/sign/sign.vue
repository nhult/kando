<template>
  <div class="sign">
    <signIntro />
    <signForm />
  </div>
</template>

<script>
import signIntro from "./sign-intro"
import signForm from "./sign-form"

export default {
  name: 'sign',
  components: {
    signIntro,
    signForm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sign {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 830px;
}
@media only screen and (max-width: 800px) {
  .sign {
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 90%;
    height: 100%;
  }
}
</style>
