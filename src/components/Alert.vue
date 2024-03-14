<template>
  <Transition name="fade" class="text-center">
    <div class="alert-message text-body-1 text-center" v-if="message">
      <v-icon class="mr-2" color="warning">mdi-alert</v-icon>
      <p class="my-2" color="warning">{{ message }}</p>
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
  position: absolute;
  top: 15px;
  left: 1%;
  z-index: 10;
  width: 98%;
  padding: 5px 15px 5px 15px;
  color: rgb(255, 204, 0) !important;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  .v-icon {
    color: rgb(255, 204, 0) !important;
  }
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
