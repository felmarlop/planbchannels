<template>
  <v-container fluid>
    <v-card rounded color="secondary" class="px-4 mb-4">
      <v-card-title>Opción 1 (live streaming)</v-card-title>
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
          :is-muted="false"
          :autoplay="true"
          :is-controls="true"
          :progress="30"
          width="100%"
        />
      </v-card-text>
    </v-card>
    <v-card rounded color="secondary" class="px-4">
      <v-card-title>Opción 2 (video URL)</v-card-title>
      <v-card-text class="text-center">
        <v-text-field
          v-model="url"
          color="white"
          prepend-inner-icon="mdi-video-outline"
          label="URL del video"
          dense
          hide-details
          outlined
          class="mb-4"
        />
        <Viaudio
          :ref="'player'"
          :kind="'video'"
          :muted="false"
          :src="[url]"
          :autoplay="false"
          :controls="true"
          :loop="false"
          width="100%"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Viaudio from '@dongido/vue-viaudio'

import { VideoPlayer } from 'vue-hls-video-player'

export default {
  name: 'Inicio',
  components: { Viaudio, VideoPlayer },
  props: {},
  data() {
    return {
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      m3u8Link: 'https://30a-tv.com/feeds/ceftech/30atvmusic.m3u8'
    }
  }
}
</script>
