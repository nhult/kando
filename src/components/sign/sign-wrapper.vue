<template>
  <div class="sign-wrapper">
    <signIntro />
    <signForm />
  </div>
</template>

<script>
import signIntro from "./sign-intro"
import signForm from "./sign-form"

export default {
  name: 'sign-wrapper',
  components: {
    signIntro,
    signForm
  }
}
</script>

<style scoped>
.sign-wrapper {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 830px;
  height: 100%;
  margin-top: 40px;
}
@media only screen and (max-width: 800px) {
  .sign-wrapper {
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    margin-top: 0;
    width: 100vw;
  }
}
</style>
