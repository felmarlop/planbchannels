<template>
  <v-container fluid>
    <v-row v-if="selectedChannel">
      <v-btn class="ml-4" icon @click="selectChannel(null)">
        <v-icon color="tertiary">mdi-keyboard-backspace</v-icon>
      </v-btn>
      <v-spacer />
      <v-col cols="12">
        <v-card rounded color="secondary">
          <v-card-text>
            <span class="text-body-1 font-weight-bold">{{ channelName }}</span>
            <v-text-field
              v-model="selectedLink"
              color="white"
              prepend-inner-icon="mdi-video-outline"
              label="Link del canal"
              dense
              hide-details
              outlined
              class="my-4"
            />
            <VideoPlayer
              type="default"
              :link="selectedLink"
              :preview-image-link="previewImg"
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
        <v-card color="secondary" rounded hover @click="selectChannel(c)">
          <v-img
            :src="c.img"
            aspect-ratio="1"
            contain
            gradient="179deg, rgba(89,94,109,0.00) 78%, #2D303B 100%"
            position="center"
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
      selectedLink: null,
      channels: [
        {
          categgory: 'Music',
          img: 'https://i.imgur.com/7etSMR5.png',
          link: 'https://ibgrtv.streaming-pro.com/hls/ibgrlive.m3u8',
          name: 'Ibiza Global TV (720p) [Not 24/7]'
        },
        {
          categgory: 'General',
          img: 'https://i.imgur.com/BTJvvBK.png',
          link: 'https://streaming005.gestec-video.com/hls/canal24.m3u8',
          name: '8 La Marina TV (576p)'
        },
        {
          categgory: 'Music',
          img: 'https://i.imgur.com/0j5Aget.png',
          link: 'https://30a-tv.com/feeds/ceftech/30atvmusic.m3u8',
          name: '30A Music Channel'
        },
        {
          categgory: 'Music',
          img: 'https://i.imgur.com/wPeT7UL.png',
          link: 'https://scl.edge.grupoz.cl/music/live/music.m3u8',
          name: 'PlanetaTV Music (720p)'
        },
        {
          categgory: 'Entertainment',
          img: 'https://i.imgur.com/HSdwqZN.png',
          link: 'https://30a-tv.com/sidewalks.m3u8',
          name: '30A Sidewalks (720p)'
        },
        {
          categgory: 'General',
          img: 'https://i.imgur.com/TD6ZJoa.png',
          link: 'https://video03.logicahost.com.br/portaldatropical/portaldatropical/playlist.m3u8',
          name: 'TV Tropical (720p)'
        }
      ]
    }
  },
  computed: {
    channelName() {
      const na = 'Nombre no disponible'
      if (this.selectedChannel && this.selectedChannel.link == this.selectedLink) {
        return this.selectedChannel.name || na
      }
      return na
    },
    previewImg() {
      if (this.selectedChannel && this.selectedChannel.link == this.selectedLink) {
        return this.selectedChannel.img || LogoBg
      }
      return LogoBg
    }
  },
  methods: {
    selectChannel(c) {
      this.selectedChannel = c
      this.selectedLink = c?.link || null
    }
  }
}
</script>
