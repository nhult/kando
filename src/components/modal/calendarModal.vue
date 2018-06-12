<template>
  <div class='modal'>
    <div class='content'>
      <span class="close" @click="$emit('close')">&times;</span>

      <div class='calendar'>
        {{currentDate}}
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'calendar',
  data() {
    return {
      currentDate: moment().format("ddd, hA")
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
}
.content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
    min-height: 40px;
}
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>
