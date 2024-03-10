<template>
  <v-row>
    <v-col cols="12">
      <v-toolbar color="transparent" class="pr-2">
        <v-toolbar-title class="text-body-1 font-weight-bold pr-2">
          {{ channelName }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon small color="tertiary" @click="setSelected(null)">
          <v-icon>mdi-keyboard-backspace</v-icon>
        </v-btn>
      </v-toolbar>
      <video
        ref="VideoPlayer"
        :src="channel.link"
        :muted="false"
        :loop="false"
        :poster="previewImg"
        width="100%"
        autoplay
        controls
        @error="setMessage('Ups! Vídeo no disponible. Error de conexión o formato no soportado.')"
      >
        <source :src="channel.link" :type="isStreaming(channel) ? 'application/x-mpegURL' : 'video/mp4'" />
      </video>
    </v-col>
  </v-row>
</template>
<script>
import Hls from 'hls.js'
import { mapActions, mapGetters } from 'vuex'

import LogoBg from '@/assets/img/logo-bg.png'
import { isStreaming } from '@/helpers/utils'

export default {
  name: 'PbPlayer',
  components: {},
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    LogoBg
  }),
  computed: {
    ...mapGetters('alert', ['message']),
    channelName() {
      return this.channel.name || 'Nombre no disponible'
    },
    previewImg() {
      return this.channel.img || LogoBg
    }
  },
  watch: {
    channel() {
      this.error = false
      if (isStreaming(this.channel)) {
        this.prepareVideoPlayer()
      }
      this.$refs.VideoPlayer.play()
    }
  },
  mounted() {
    if (isStreaming(this.channel)) {
      this.prepareVideoPlayer()
    }
  },
  methods: {
    ...mapActions('alert', ['setMessage']),
    ...mapActions('channel', ['setSelected']),
    isStreaming,
    prepareVideoPlayer() {
      let hls = new Hls()
      hls.loadSource(this.channel.link)
      if (this.$refs.VideoPlayer) {
        hls.attachMedia(this.$refs.VideoPlayer)
      }
    },
    action() {
      return false
    }
  }
}
</script>
