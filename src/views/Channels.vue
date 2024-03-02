<template>
  <v-container fluid>
    <v-row v-if="selectedChannel">
      <v-btn class="ml-4" icon @click="selectedChannel = null">
        <v-icon color="tertiary">mdi-keyboard-backspace</v-icon>
      </v-btn>
      <v-spacer />
      <v-col cols="12">
        <v-card rounded color="secondary">
          <v-card-text>
            <span class="text-body-1 font-weight-bold">{{ selectedChannel.name }}</span>
            <v-text-field
              v-model="selectedChannel.link"
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
              :link="selectedChannel.link"
              :preview-image-link="selectedChannel.img || LogoBg"
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
        <v-card color="secondary" rounded hover @click="selectedChannel = c">
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
      channels: [
        {
          categgory: 'Education',
          img: 'https://i.imgur.com/XnxPIqn.png',
          link: 'https://otv3.ocfl.net/VisionTV/smil:VisionTV.smil/playlist.m3u8',
          name: 'Orange County Vision TV (Orange County FL) (720p)'
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
        },
        {
          categgory: 'Music',
          img: 'https://i.imgur.com/sF2g7KE.png',
          link: 'https://videostream.jpbgdigital.com/NOWTV.m3u8',
          name: 'Now TV 102.3FM Edmonton (CKNO-FM)'
        }
      ]
    }
  }
}
</script>
