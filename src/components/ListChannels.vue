<template>
  <v-row class="mb-5 channel">
    <v-col :key="`${index}-${c.link}`" cols="6" md="3" v-for="(c, index) in chunk">
      <v-card
        class="d-flex flex-column"
        :height="$vuetify.breakpoint.xsOnly ? '140' : '200'"
        :style="getCardStyle(c)"
        @click="$emit('select', c)"
      >
        <v-spacer />
        <v-card-title class="pt-0 pb-2 px-0">
          <v-col cols="12" class="two-lines text-body-1 py-0 px-2 nowrap">{{ c.name }}</v-col>
          <v-col class="text--disabled text-body-2 py-0 px-2 text-truncate">{{ c.group }}</v-col>
        </v-card-title>
      </v-card>
    </v-col>
    <v-col cols="12" v-if="groupChannels.length > CHANNEL_LIMIT && !all">
      <v-btn rounded width="100%" @click="$emit('setGroup', group)">
        <v-icon color="tertiary" class="mr-1">mdi-plus</v-icon>
        <span class="text-caption">Ver más</span>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import LogoBg from '@/assets/img/logo-bg.png'

const CHANNEL_LIMIT = 4

export default {
  name: 'ListChannels',
  props: {
    channels: {
      type: Array,
      required: true,
      default: Array
    },
    group: {
      type: String,
      required: false,
      default: ''
    },
    all: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      CHANNEL_LIMIT
    }
  },
  computed: {
    groupChannels() {
      if (this.group) {
        return this.channels.filter(c => {
          return c.group == this.group
        })
      }
      return this.channels
    },
    chunk() {
      if (this.all) {
        return this.groupChannels
      }
      return this.groupChannels.slice(0, CHANNEL_LIMIT)
    }
  },
  methods: {
    getImage(c) {
      return c.img || LogoBg
    },
    getCardStyle(c) {
      return (
        'border-bottom: 1px solid;' +
        'border-right: 1px solid;' +
        'border-radius: 0 0 10px 0;' +
        'border-color: #01939e;' +
        `background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url(${this.getImage(c)});` +
        'background-repeat: no-repeat;' +
        'background-size: contain;' +
        'background-position: center;'
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.two-lines {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
