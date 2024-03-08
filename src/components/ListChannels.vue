<template>
  <v-list color="primary" lines="three" class="px-0">
    <v-list-item
      :key="`${index}-${c.link}`"
      class="channel mb-3 rounded-lg"
      @click="$emit('select', c)"
      v-for="(c, index) in chunk"
    >
      <v-list-item-avatar :size="$vuetify.breakpoint.xs ? 50 : 100">
        <v-img :src="getImage(c)" contain position="center">
          <template #placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular color="tertiary" indeterminate />
            </div>
          </template>
        </v-img>
      </v-list-item-avatar>
      <v-list-item-content class="text-truncate text-right">
        <v-list-item-title class="mb-2 text-body-1">{{ c.name }}</v-list-item-title>
        <v-list-item-subtitle class="text--disabled">{{ c.group }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-row v-if="groupChannels.length > CHANNEL_LIMIT && !all">
      <v-col cols="12">
        <v-btn rounded width="100%" @click="$emit('more', group)">
          <v-icon color="tertiary" class="mr-1">mdi-plus</v-icon>
          <span class="text-caption">Ver más</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-list>
</template>

<script>
import Logo from '@/assets/img/logo.png'

const CHANNEL_LIMIT = 3

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
    return { CHANNEL_LIMIT, Logo }
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
      return c.img || Logo
    }
  }
}
</script>
<style lang="scss" scoped>
div.v-list-item.channel {
  border: 1px solid;
  border-left: none;
  border-top: none;
  border-color: rgb(0, 96, 102);
}
</style>
