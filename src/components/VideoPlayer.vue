<template>
  <div class="text-center">
    <video ref="videoPlayer" class="video-js vjs-default-skin vjs-16-9" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
  computed: { ...mapGetters('channel', ['selected']) },
  mounted() {
    const { autoplay, ...opts } = this.options
    this.player = videojs(this.$refs.videoPlayer, opts, () => {
      if (autoplay) {
        setTimeout(() => {
          if (this.player && this.selected) {
            this.player.play()
          }
        }, 1000)
      }
    })
    this.player.error = e => {
      switch (e?.code) {
        case 1:
        case 2:
        case 3:
        case undefined:
          return false
        case 4:
        default:
          return this.setMessage('Ups! vídeo no disponible. Error de conexión o formato no soportado.')
        case 5:
          return this.setMessage('Ups! el vídeo está encriptado y no podemos reproducirlo.')
      }
    }
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
