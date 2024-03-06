<template>
  <v-container fluid>
    <div class="error-message" v-if="error">
      <v-icon class="mb-1" color="rgb(255, 131, 43)">mdi-alert</v-icon>
      <p class="text-body-1">Ups! Canal no disponible en estos momentos.</p>
    </div>
    <v-row v-if="selectedChannel">
      <v-btn class="ml-4" icon @click="selectChannel(null)">
        <v-icon color="tertiary">mdi-keyboard-backspace</v-icon>
      </v-btn>
      <v-spacer />
      <v-col cols="12">
        <v-card rounded color="secondary">
          <v-card-title class="text-body-1 font-weight-bold">{{ channelName }}</v-card-title>
          <v-card-text>
            <v-text-field disabled :value="selectedChannel.link" />
            <video
              :src="selectedChannel.link"
              :muted="false"
              :autoplay="true"
              :controls="true"
              :loop="false"
              :poster="previewImg"
              width="100%"
              @error="error = true"
              v-if="isMP4(selectedChannel)"
            />
            <VideoPlayer
              type="default"
              :link="selectedChannel.link"
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
          label="Lista de reproducción M3U"
          color="tertiary"
          outlined
          dense
          clearable
          @change="handleFile($event)"
        />
      </v-col>
      <v-col :key="`${index}-${c.link}`" cols="4" sm="2" v-for="(c, index) in channels">
        <v-card color="secondary" rounded hover @click="selectChannel(c)">
          <v-img
            :src="c.img || LogoBg"
            aspect-ratio="1"
            contain
            gradient="179deg, rgba(89,94,109,0.00) 60%, #2D303B 100%"
            position="center"
            style="padding-bottom: 80px"
            class="px-5"
          >
            <template #placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular color="tertiary" indeterminate />
              </div>
            </template>
            <div class="text-caption" style="position: absolute; bottom: 2%; left: 2%; right: 2%">
              {{ c.name }}
            </div>
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="12" class="text-center pt-16 justify-center" v-if="!channels.length">
        <span class="text-subtitle-1 text-uppercase text--disabled">No hay canales</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { VideoPlayer } from 'vue-hls-video-player'

import Logo from '@/assets/img/logo.png'
import LogoBg from '@/assets/img/logo-title-bg.png'

export default {
  name: 'Channels',
  components: { VideoPlayer },
  props: {},
  data() {
    return {
      error: false,
      LogoBg,
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      selectedChannel: null,
      channels: []
    }
  },
  computed: {
    channelName() {
      return this.selectedChannel.name || 'Nombre no disponible'
    },
    previewImg() {
      if (this.selectedChannel && this.selectedChannel.link == this.selectedChannel.link) {
        return this.selectedChannel.img || Logo
      }
      return Logo
    }
  },
  watch: {
    selectedChannel() {
      this.error = false
    }
  },
  methods: {
    isMP4(c) {
      return c.link.includes('.mp4')
    },
    selectChannel(c) {
      this.selectedChannel = c
    },
    handleFile(f) {
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
<style lang="scss" scoped>
.error-message {
  position: absolute;
  text-align: center;
  top: 30%;
  right: 10%;
  z-index: 10;
  width: 80%;
  padding: 10px 10px 0 10px;
  background: rgba(0, 0, 0, 0.8);
  color: rgb(255, 131, 43);
  border-radius: 10px;
}
</style>
