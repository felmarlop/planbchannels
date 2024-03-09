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
        :src="channel.link"
        :muted="false"
        :autoplay="true"
        :controls="true"
        :loop="false"
        :poster="previewImg"
        width="100%"
        @error="error = true"
        v-if="isVideo(channel)"
      />
      <HlsPlayer
        type="default"
        :link="channel.link"
        :preview-image-link="previewImg"
        :is-muted="false"
        :autoplay="true"
        :is-controls="true"
        :progress="0"
        width="100%"
        @error="error = true"
        v-else
      />
    </v-col>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex'
import { VideoPlayer as HlsPlayer } from 'vue-hls-video-player'

import LogoBg from '@/assets/img/logo-bg.png'
import { isVideo } from '@/helpers/utils'

export default {
  name: 'PbPlayer',
  components: { HlsPlayer },
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
    selectedChannel() {
      this.error = false
    }
  },
  methods: {
    ...mapActions('channel', ['setSelected']),
    isVideo,
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
