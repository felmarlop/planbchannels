<template>
  <v-container fluid>
    <v-row v-if="selectedChannel">
      <v-btn class="ml-4" icon @click="selectedChannel = null">
        <v-icon color="tertiary">mdi-keyboard-backspace</v-icon>
      </v-btn>
      <v-spacer />
      <v-col cols="12">
        <v-card rounded color="secondary">
          <v-card-text class="text-center">
            <v-text-field
              v-model="selectedChannel"
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
              :link="selectedChannel"
              :preview-image-link="LogoBg"
              :is-muted="false"
              :autoplay="true"
              :is-controls="true"
              :progress="30"
              width="100%"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col :key="`${index}-${c.link}`" cols="6" sm="4" v-for="(c, index) in channels">
        <v-card color="secondary" rounded hover @click="selectedChannel = c.link">
          <v-img
            :src="c.img"
            aspect-ratio="1"
            contain
            gradient="179deg, rgba(89,94,109,0.00) 78%, #2D303B 100%"
            position="center top"
            style="padding-bottom: 60px"
            class="px-5"
          >
            <template #placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular color="tertiary" indeterminate />
              </div>
            </template>
            <div class="text-caption font-weight-bold text-uppercase" style="position: absolute; bottom: 5%; left: 5%">
              {{ c.name }}
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
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
      selectedChannel: null,
      channels: [
        {
          categgory: 'Music',
          img: 'https://i.imgur.com/0j5Aget.png',
          link: 'https://30a-tv.com/feeds/ceftech/30atvmusic.m3u8',
          name: '30A Music Channel'
        },
        {
          categgory: 'Music',
          img: 'https://i.imgur.com/0j5Aget.png',
          link: 'https://30a-tv.com/feeds/ceftech/30atvmusic.m3u8',
          name: '30A Music Channel'
        },
        {
          categgory: 'Music',
          img: 'https://i.imgur.com/0j5Aget.png',
          link: 'https://30a-tv.com/feeds/ceftech/30atvmusic.m3u8',
          name: '30A Music Channel'
        },
        {
          categgory: 'Music',
          img: 'https://i.imgur.com/0j5Aget.png',
          link: 'https://30a-tv.com/feeds/ceftech/30atvmusic.m3u8',
          name: '30A Music Channel'
        },
        {
          categgory: 'Music',
          img: 'https://i.imgur.com/0j5Aget.png',
          link: 'https://30a-tv.com/feeds/ceftech/30atvmusic.m3u8',
          name: '30A Music Channel'
        },
        {
          categgory: 'Music',
          img: 'https://i.imgur.com/0j5Aget.png',
          link: 'https://30a-tv.com/feeds/ceftech/30atvmusic.m3u8',
          name: '30A Music Channel'
        }
      ]
    }
  }
}
</script>
