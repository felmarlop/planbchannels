<template>
  <v-row>
    <v-col cols="10" class="text-h6 pb-0 two-lines">{{ channel[0] }}</v-col>
    <v-col cols="2" class="text-right pb-0">
      <v-btn icon outlined small text color="tertiary" @click="setSelected(null)">
        <v-icon>mdi-keyboard-backspace</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="10" class="text--disabled text-body-1 py-0 font-weight-regular text-truncate">{{ channel[1] }}</v-col>
    <v-col cols="12">
      <video-player :options="videoOptions" />
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

import LogoBg from '@/assets/img/logo-bg.png'
import VideoPlayer from '@/components/VideoPlayer.vue'
import { getMediaType } from '@/helpers/utils'
import 'video.js/dist/video-js.css'

export default {
  name: 'PbPlayer',
  components: { VideoPlayer },
  props: {
    channel: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    LogoBg
  }),
  computed: {
    ...mapGetters('alert', ['message']),
    previewImg() {
      return this.channel[2] || LogoBg
    },
    videoOptions() {
      return {
        autoplay: true,
        controls: true,
        poster: this.previewImg,
        textTrackSettings: false,
        bigPlayButton: false,
        sources: [
          {
            src: this.channel[3],
            type: getMediaType(this.channel[3])
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
  created() {
    this.$vuetify.goTo(0, { duration: 0 })
  },
  methods: {
    ...mapActions('channel', ['setSelected'])
  }
}
</script>
