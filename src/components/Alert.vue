<template>
  <Transition name="fade">
    <div class="alert-message text-body-1 font-weight-bold d-flex" v-if="message">
      <v-icon class="mr-2">mdi-alert</v-icon>
      <p class="my-2">{{ message }}</p>
    </div>
  </Transition>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Alert',
  computed: {
    ...mapGetters('alert', ['message'])
  }
}
</script>
<style lang="scss" scoped>
div.alert-message {
  position: fixed;
  top: 15px;
  left: 1%;
  z-index: 10;
  width: 98%;
  padding: 5px 15px 5px 15px;
  background: rgb(255, 204, 0);
  border-radius: 10px;
}
video {
  min-height: 300px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
