<template>
  <div class="text-center">
    <video
      ref="videoPlayer"
      class="video-js vjs-default-skin vjs-16-9"
      @error="setMessage('Ups! vídeo no disponible. Error de conexión o formato no soportado.')"
    ></video>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import videojs from 'video.js'

export default {
  name: 'VideoPlayer',
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      player: null
    }
  },
  mounted() {
    const { autoplay, ...opts } = this.options
    this.player = videojs(this.$refs.videoPlayer, opts, () => {
      if (autoplay) {
        setTimeout(() => {
          this.player.play()
        }, 1000)
      }
    })
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  },
  methods: {
    ...mapActions('alert', ['setMessage'])
  }
}
</script>
<style lang="scss" scoped>
div.video-js {
  width: 100%;
}
</style>
