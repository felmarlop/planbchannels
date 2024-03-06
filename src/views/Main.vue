<template>
  <v-container fluid>
    <v-row v-if="selectedChannel">
      <v-btn icon @click="selectedChannel = null">
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
          <v-btn class="mr-2" icon @click="selectedGroup = null" v-if="selectedGroup">
            <v-icon color="tertiary">mdi-keyboard-backspace</v-icon>
          </v-btn>
          {{ `${g} (${groups[g]})` }}
        </v-toolbar-title>
        <list-channels
          :channels="filteredChannels"
          :group="g"
          :all="selectedGroup != null"
          @more="selectedGroup = $event || null"
          @select="selectedChannel = $event"
        />
      </v-col>
      <v-col cols="12" class="text-center pt-16 justify-center" v-if="!sortedGroupNames.length">
        <span class="text-body-1 text-uppercase text--disabled">
          {{ loading ? 'Cargando canales...' : 'No hay canales' }}
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ListChannels, PbPlayer } from '@/components'
import { getFileData } from '@/helpers/utils'

export default {
  name: 'MainView',
  components: { ListChannels, PbPlayer },
  data() {
    return {
      loading: false,
      selectedGroup: null,
      selectedChannel: null,
      search: '',
      channels: []
    }
  },
  computed: {
    filteredChannels() {
      return this.channels.filter(c => {
        return c.name.toLowerCase().startsWith(this.search)
      })
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
    handleFile(f) {
      this.channels = []
      this.selectedChannel = null
      this.selectedGroup = null
      this.loading = true
      getFileData(f, ch => {
        this.channels = ch
        this.loading = false
      })
    }
  }
}
</script>
