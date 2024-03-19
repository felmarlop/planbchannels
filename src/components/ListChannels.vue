<template>
  <v-row class="channel">
    <v-col :key="`${index}-${c.link}`" cols="6" md="3" v-for="(c, index) in chunk">
      <v-card
        rounded
        elevation="0"
        class="d-flex flex-column"
        :height="$vuetify.breakpoint.xsOnly ? '140' : '200'"
        :style="getCardStyle(c)"
        @click="$emit('select', c)"
      >
        <v-spacer />
        <v-card-title class="pt-0 pb-2 px-0">
          <v-col cols="12" class="two-lines text-body-2 font-weight-bold py-0 nowrap">{{ c[0] }}</v-col>
        </v-card-title>
      </v-card>
    </v-col>
    <v-col cols="12" v-if="!selectedGroup">
      <v-btn rounded text outlined width="100%" color="tertiary" @click="openGroup(group)">
        <v-icon color="tertiary" class="mr-1">mdi-plus</v-icon>
        <span class="text-caption">Ver todos</span>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

import LogoBg from '@/assets/img/logo-bg.png'
import { CHANNEL_LIMIT, PREVIEW_CHANNEL_LIMIT } from '@/config'

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
      required: true,
      default: ''
    }
  },
  computed: {
    ...mapGetters('channel', { selectedGroup: 'group' }),
    groupChannels() {
      if (this.group) {
        return this.channels.filter(c => {
          return c[1] == this.group
        })
      }
      return []
    },
    chunk() {
      if (this.group) {
        return this.groupChannels.slice(0, PREVIEW_CHANNEL_LIMIT)
      }
      return this.channels.slice(0, CHANNEL_LIMIT)
    }
  },
  methods: {
    ...mapActions('channel', ['setSearch']),
    openGroup(g) {
      this.$emit('setGroup', g)
      this.setSearch('')
    },
    getImage(c) {
      return c[2] || LogoBg
    },
    getCardStyle(c) {
      return (
        `background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url(${this.getImage(c)});` +
        'background-repeat: no-repeat;' +
        'background-size: contain;' +
        'background-position: center;' +
        'border-bottom: 1px solid;' +
        'border-right: 1px solid;' +
        'border-color: #00eeff'
      )
    }
  }
}
</script>
