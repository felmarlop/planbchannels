<template>
  <v-container fluid>
    <v-card rounded color="secondary">
      <v-card-text class="text-center">
        <v-text-field
          v-model="m3u8Link"
          color="white"
          prepend-inner-icon="mdi-video-outline"
          label="Link del canal"
          dense
          hide-details
          outlined
          class="mb-4"
        />
        <VideoPlayer
          type="default"
          :link="m3u8Link"
          :preview-image-link="LogoBg"
          :is-muted="false"
          :autoplay="true"
          :is-controls="true"
          :progress="30"
          width="100%"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { VideoPlayer } from 'vue-hls-video-player'

import LogoBg from '@/assets/img/logo-title-bg.png'

export default {
  name: 'Inicio',
  components: { VideoPlayer },
  props: {},
  data() {
    return {
      LogoBg,
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      m3u8Link: 'https://30a-tv.com/feeds/ceftech/30atvmusic.m3u8'
    }
  }
}
</script>
