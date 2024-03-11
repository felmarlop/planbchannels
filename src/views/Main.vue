<template>
  <v-container fluid>
    <v-row v-if="selectedChannel">
      <v-col cols="12">
        <pb-player :channel="selectedChannel" />
      </v-col>
    </v-row>
    <v-row justify="center" v-else>
      <v-col :key="g" cols="12" class="py-0" v-for="g in sortedGroupNames">
        <list-channels-title :group="g" :count="groups[g]" />
        <list-channels
          :channels="filteredChannels"
          :group="g"
          :all="selectedGroup != null"
          @setGroup="setGroup($event || null)"
          @select="setSelected($event)"
        />
      </v-col>
      <load-channels v-if="!channels.length" />
      <v-col cols="12" class="text-center pt-16" v-else-if="!sortedGroupNames.length">
        <span class="text-body-1 text-uppercase text--disabled">
          {{ notFoundMessage }}
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { ListChannels, ListChannelsTitle, LoadChannels, PbPlayer } from '@/components'

export default {
  name: 'MainView',
  components: { ListChannels, ListChannelsTitle, LoadChannels, PbPlayer },
  computed: {
    ...mapGetters('channel', {
      url: 'url',
      channels: 'list',
      search: 'search',
      loading: 'loading',
      selectedGroup: 'group',
      selectedChannel: 'selected'
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
  methods: {
    ...mapActions('channel', ['setSelected', 'setGroup', 'setSearching'])
  }
}
</script>
