<template>
  <v-container fluid>
    <v-row v-if="selectedChannel">
      <v-btn icon @click="setSelected(null)">
        <v-icon color="tertiary">mdi-keyboard-backspace</v-icon>
      </v-btn>
      <v-spacer />
      <v-col cols="12">
        <pb-player :channel="selectedChannel" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-file-input
          label="Lista de reproducción M3U"
          color="tertiary"
          hide-details
          outlined
          dense
          clearable
          @change="handleFile($event)"
        />
      </v-col>
      <v-col :key="g" cols="12" v-for="g in sortedGroupNames">
        <v-toolbar-title class="group-title text-h6 font-weight-bold pb-1">
          <v-btn class="mr-2" icon @click="setGroup(null)" v-if="selectedGroup">
            <v-icon color="tertiary">mdi-keyboard-backspace</v-icon>
          </v-btn>
          {{ `${g} (${groups[g] || 0})` }}
        </v-toolbar-title>
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

import { ListChannels, PbPlayer } from '@/components'
import { getFileData } from '@/helpers/utils'

export default {
  name: 'MainView',
  components: { ListChannels, PbPlayer },
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
        chs = this.channels.filter(c => {
          return c.name.toLowerCase().includes(this.search) || c.group.toLowerCase().includes(this.search)
        })
      }
      this.setLoading(false)
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
  methods: {
    ...mapActions('channel', ['clear', 'setSelected', 'setGroup', 'setLoading']),
    handleFile(f) {
      this.clear()
      this.channels = []
      this.loading = true
      getFileData(f, ch => {
        this.channels = ch
        this.loading = false
      })
    }
  }
}
</script>
