<template>
  <div class="floating-social-menu d-flex" @click="top()" v-if="scrollY > 300">
    <v-icon large color="tertiary" class="mt-n2 mr-1">mdi-chevron-up</v-icon>
  </div>
</template>
<script>
export default {
  name: 'GoToTop',
  data() {
    return {
      scrollY: 0
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY
    })
  },
  beforeDestroy() {
    window.removeEventListener('scroll', () => (this.scrollY = 0))
  },
  methods: {
    top() {
      this.$vuetify.goTo(0, { duration: 500, easing: 'easeInOutCubic' })
    }
  }
}
</script>
<style lang="scss" scoped>
.floating-social-menu {
  color: #00eeff;
  position: fixed;
  bottom: 5%;
  right: 0;
  z-index: 5;
  width: 60px;
  height: 40px;
  padding-top: 10px;
  padding-left: 10px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px 0 0 10px;
  cursor: pointer;
}
</style>
