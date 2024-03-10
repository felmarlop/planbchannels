<template>
  <v-row>
    <div class="error-message" v-if="error">
      <v-icon class="mb-1" color="rgb(255, 131, 43)">mdi-alert</v-icon>
      <p>Ups! Canal no disponible en estos momentos.</p>
    </div>
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
        @error="error = true"
      >
        <source :src="channel.link" :type="isStreaming(channel) ? 'application/x-mpegURL' : 'video/mp4'" />
      </video>
    </v-col>
  </v-row>
</template>
<script>
import Hls from 'hls.js'
import { mapActions } from 'vuex'

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
    LogoBg,
    error: false
  }),
  computed: {
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
<style lang="scss" scoped>
div.error-message {
  position: absolute;
  text-align: center;
  top: 30%;
  right: 10%;
  z-index: 10;
  width: 80%;
  padding: 10px 10px 0 10px;
  background: rgba(0, 0, 0, 0.7);
  color: rgb(255, 131, 43);
  border-radius: 10px;
}
video {
  min-height: 300px;
}
</style>
