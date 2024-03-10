<template>
  <Transition name="fade">
    <div class="alert-message text-body-1 d-flex" v-if="message">
      <v-icon class="mr-2 mb-2">mdi-alert</v-icon>
      <p class="mb-4 mt-2">{{ message }}</p>
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
  top: 80px;
  left: 2%;
  z-index: 10;
  width: 96%;
  padding: 10px 10px 0 10px;
  background: rgba(255, 204, 0, 0.7);
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
