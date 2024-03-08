<template>
  <v-container fluid>
    <v-row v-if="selectedChannel">
      <v-col cols="12">
        <pb-player :channel="selectedChannel" />
      </v-col>
    </v-row>
    <v-row v-else>
      <!-- <v-col cols="12">
        <v-file-input
          label="Lista de reproducción M3U"
          color="tertiary"
          hide-details
          outlined
          dense
          clearable
          @change="handleFile($event)"
        />
      </v-col> -->
      <v-col :key="g" cols="12" v-for="g in sortedGroupNames">
        <list-channels-title :group="g" :count="groups[g]" />
        <list-channels
          :channels="filteredChannels"
          :group="g"
          :all="selectedGroup != null"
          @more="setGroup($event || null)"
          @select="setSelected($event)"
        />
      </v-col>
      <v-col cols="12" class="text-center pt-16 justify-center" v-if="!sortedGroupNames.length">
        <span class="text-body-1 text-uppercase text--disabled">
          {{
            loading ? 'Cargando canales...' : search && channels.length ? 'No se encuentran canales' : 'No hay canales'
          }}
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { ListChannels, ListChannelsTitle, PbPlayer } from '@/components'
import { getFileData, getURLData } from '@/helpers/utils'

export default {
  name: 'MainView',
  components: { ListChannels, ListChannelsTitle, PbPlayer },
  data() {
    return {
      loading: false,
      channels: []
    }
  },
  computed: {
    ...mapGetters('channel', {
      search: 'search',
      selectedChannel: 'selected',
      selectedGroup: 'group'
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
    }
  },
  created() {
    this.loading = true
    getURLData('https://iptv-org.github.io/iptv/languages/spa.m3u', chs => {
      this.channels = chs
      this.loading = false
    })
  },
  methods: {
    ...mapActions('channel', ['clear', 'setSelected', 'setGroup', 'setSearching']),
    handleFile(f) {
      this.clear()
      this.channels = []
      this.loading = true
      getFileData(f, chs => {
        this.channels = chs
        this.loading = false
      })
    }
  }
}
</script>
