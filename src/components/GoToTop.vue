<template>
  <div class="floating-social-menu d-flex text-body-2" @click="top()" v-if="scrollY > 300">
    <v-icon color="tertiary" class="mt-n2 mr-1">mdi-arrow-up</v-icon>
    <span>Volver arriba</span>
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
  bottom: 7%;
  right: 0;
  z-index: 10;
  width: 130px;
  height: 40px;
  padding-top: 10px;
  padding-left: 5px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px 0 0 10px;
  border-bottom: 1px solid;
  cursor: pointer;
}
</style>
