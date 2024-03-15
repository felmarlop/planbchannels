<template>
  <v-container class="py-5 px-5" fluid>
    <pb-player :channel="selectedChannel" v-if="selectedChannel" />
    <v-row justify="center" v-else-if="channels.length">
      <v-col :key="g" cols="12" class="pb-2" v-for="g in sortedGroupNames">
        <list-channels-group :group="g" :count="groups[g]" />
        <list-channels
          :channels="filteredChannels"
          :group="g"
          :all="selectedGroup != null"
          @setGroup="setGroup($event || null)"
          @select="setSelected($event)"
        />
      </v-col>
      <v-col cols="12" class="text-center pt-16" v-if="!sortedGroupNames.length">
        <span class="text-body-1 text-uppercase text--disabled">
          {{ notFoundMessage }}
        </span>
      </v-col>
    </v-row>
    <v-row justify="center" v-else>
      <load-channels />
    </v-row>
    <go-to-top />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { GoToTop, ListChannels, ListChannelsGroup, LoadChannels, PbPlayer } from '@/components'

export default {
  name: 'MainView',
  components: { GoToTop, ListChannels, ListChannelsGroup, LoadChannels, PbPlayer },
  computed: {
    ...mapGetters('channel', {
      url: 'url',
      channels: 'list',
      search: 'search',
      loading: 'loading',
      selectedGroup: 'group',
      selectedChannel: 'selected',
      scrollY: 'scrollY'
    }),
    filteredChannels() {
      let chs = this.channels
      if (this.search) {
        const s = this.search.toLowerCase()
        chs = this.channels.filter(c => {
          return ['group', 'name'].some(p => c[p].toLowerCase().includes(s))
        })
      }
      this.setSearching(false)
      return chs
    },
    groups() {
      let res = {}
      let ch = null
      for (let i = 0; i < this.filteredChannels.length; i++) {
        ch = this.filteredChannels[i]
        if (res[ch.group]) {
          res[ch.group] += 1
        } else {
          res[ch.group] = 1
        }
      }
      return res
    },
    sortedGroupNames() {
      if (this.selectedGroup) {
        return [this.selectedGroup]
      }
      return Object.keys(this.groups).sort()
    },
    notFoundMessage() {
      return this.loading ? 'Cargando canales...' : 'Canal no encontrado'
    }
  },
  watch: {
    selectedChannel(v) {
      if (v) {
        this.setScrollY(window.scrollY)
      } else {
        this.$vuetify.goTo(this.scrollY, { duration: 0 })
      }
    }
  },
  methods: {
    ...mapActions('channel', ['setSelected', 'setScrollY', 'setGroup', 'setSearching'])
  }
}
</script>
