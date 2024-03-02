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
            <MP4Player :src="selectedLink" :poster="previewImg" v-if="isMP4(selectedLink)" />
            <VideoPlayer
              type="default"
              :link="selectedLink"
              :preview-image-link="previewImg"
              :is-muted="false"
              :autoplay="true"
              :is-controls="true"
              :progress="30"
              width="100%"
              v-else
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-file-input
          label="Selecciona lista de reproducción M3U"
          color="tertiary"
          outlined
          dense
          clearable
          @change="handle($event)"
        />
      </v-col>
      <v-col :key="`${index}-${c.link}`" cols="4" sm="2" v-for="(c, index) in channels">
        <v-card color="secondary" rounded hover @click="selectChannel(c)">
          <v-img
            :src="c.img || LogoBg"
            aspect-ratio="1"
            contain
            gradient="179deg, rgba(89,94,109,0.00) 55%, #2D303B 100%"
            position="center"
            style="padding-bottom: 60px"
            class="px-5"
          >
            <template #placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular color="tertiary" indeterminate />
              </div>
            </template>
            <div
              class="text-caption font-weight-bold text-uppercase"
              style="position: absolute; bottom: 2%; left: 2%; right: 2%"
            >
              {{ c.name }}
            </div>
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="12" class="text-center pt-16 justify-center" v-if="!channels.length">
        <span class="text-h5 text-uppercase text--disabled">No hay canales</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { VideoPlayer } from 'vue-hls-video-player'
import MP4Player from '@algoz098/vue-player'

import Logo from '@/assets/img/logo.png'
import LogoBg from '@/assets/img/logo-title-bg.png'

export default {
  name: 'Inicio',
  components: { MP4Player, VideoPlayer },
  props: {},
  data() {
    return {
      LogoBg,
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      selectedChannel: null,
      channels: []
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
        return this.selectedChannel.img || Logo
      }
      return Logo
    }
  },
  methods: {
    isMP4(link) {
      return link.includes('.mp4')
    },
    selectChannel(c) {
      this.selectedChannel = c
      this.selectedLink = c?.link || null
    },
    handle(f) {
      const reader = new FileReader()
      this.channels = []
      reader.onload = e => {
        const text = e.target.result
        const lines = text.split('\n')
        const len = lines.length
        let link = null
        let category = null
        let img = null
        let name = null
        let count = 0
        for (var i = 0; i < len; i++) {
          if (lines[i].includes('#EXTINF') && i != len - 1) {
            link = lines[i + 1]
          } else {
            continue
          }
          count++
          // Get name
          name = lines[i].split(',')
          if (name.length > 1) {
            name = name[name.length - 1]
          } else {
            name = 'Nombre no disponible'
          }
          // Get img
          img = lines[i].split('logo="')
          if (img.length > 1) {
            img = img[1].split('"')[0]
          } else {
            img = null
          }
          // Get category
          category = lines[i].split('group-title="')
          if (category.length > 1) {
            category = category[1].split('"')[0]
          } else {
            category = null
          }
          this.channels.push({
            category: category,
            img: img,
            link: link,
            name: name
          })
          if (count == 30) {
            break
          }
        }
      }
      reader.readAsText(f)
    }
  }
}
</script>
