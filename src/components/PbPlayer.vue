<template>
  <v-row>
    <v-col cols="10" class="text-h6">
      {{ channelName }}
      <div class="text-body-1 text-truncate font-weight-regular text--disabled">
        {{ channel.group }}
      </div>
    </v-col>
    <v-col cols="2" class="text-right">
      <v-btn icon color="tertiary" @click="setSelected(null)">
        <v-icon>mdi-keyboard-backspace</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="12">
      <video-player :options="videoOptions" />
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

import LogoBg from '@/assets/img/logo-bg.png'
import VideoPlayer from '@/components/VideoPlayer.vue'
import { isStreaming } from '@/helpers/utils'
import 'video.js/dist/video-js.css'

export default {
  name: 'PbPlayer',
  components: { VideoPlayer },
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
    },
    videoOptions() {
      return {
        autoplay: true,
        controls: true,
        errorDisplay: false,
        poster: this.previewImg,
        textTrackSettings: false,
        sources: [
          {
            src: this.channel.link,
            type: isStreaming(this.channel) ? 'application/x-mpegURL' : 'video/mp4'
          }
        ]
      }
    }
  },
  watch: {
    channel() {
      this.error = false
    }
  },
  methods: {
    ...mapActions('channel', ['setSelected']),
    isStreaming
  }
}
</script>
