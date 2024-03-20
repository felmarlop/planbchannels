<template>
  <v-container fluid>
    <pb-player :channel="selectedChannel" v-if="selectedChannel" />
    <v-row justify="center" v-else-if="channels.length">
      <v-col :key="g" cols="12" class="pb-2" v-for="g in filteredData.groups">
        <v-card color="secondary">
          <v-card-title>
            <list-channels-group :group="g" />
          </v-card-title>
          <v-card-text>
            <list-channels
              :channels="filteredData.channels"
              :group="selectedGroup ? '' : g"
              @setGroup="setGroup($event || null)"
              @select="setSelected($event)"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <go-to-top v-if="filteredData.groups.length" />
      <v-col cols="12" class="pb-2" v-else>
        <v-card color="secondary">
          <v-card-title v-if="selectedGroup">
            <list-channels-group :group="selectedGroup" />
          </v-card-title>
          <v-card-text>
            <v-col cols="12" class="text-center py-10">
              <span class="text-body-1 text-uppercase text--disabled">
                {{ notFoundMessage }}
              </span>
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" v-else>
      <load-channels />
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { GoToTop, ListChannels, ListChannelsGroup, LoadChannels, PbPlayer } from '@/components'
import { GROUP_LIMIT } from '@/config'

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
      scrollY: 'scrollY',
      groupScrollY: 'groupScrollY'
    }),
    filteredData() {
      let chs = []
      let g = null
      let ch = null
      let check = false
      const s = this.normalizeStr(this.search)
      const gs = []
      chs = this.channels.filter(c => {
        ch = c[0]
        g = c[1]
        if (this.selectedGroup) {
          check = g == this.selectedGroup && this.normalizeStr(ch).includes(s)
        } else {
          check = this.normalizeStr(ch).includes(s) || this.normalizeStr(g).includes(s)
        }
        if (check && gs.indexOf(g) < 0) {
          gs.push(g)
        }
        return check
      })
      this.setSearching(false)
      return { channels: chs, groups: gs.sort().slice(0, GROUP_LIMIT) }
    },
    notFoundMessage() {
      return this.loading ? 'Buscando canales...' : 'Canal no encontrado'
    }
  },
  watch: {
    selectedChannel(v) {
      if (v && this.selectedGroup) {
        this.setGroupScrollY(window.scrollY + 80)
      } else if (v) {
        this.setScrollY(window.scrollY + 80)
      } else if (this.selectedGroup) {
        this.$vuetify.goTo(this.groupScrollY, { duration: 0 })
      } else {
        this.$vuetify.goTo(this.scrollY, { duration: 0 })
      }
      this.setMessage('')
    },
    selectedGroup(v) {
      if (v) {
        this.setScrollY(window.scrollY + 80)
        this.$vuetify.goTo(0, { duration: 0 })
      } else {
        this.$vuetify.goTo(this.scrollY, { duration: 0 })
      }
    }
  },
  methods: {
    ...mapActions('alert', ['setMessage']),
    ...mapActions('channel', ['setSelected', 'setScrollY', 'setGroupScrollY', 'setGroup', 'setSearching']),
    normalizeStr(s) {
      return s
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
    }
  }
}
</script>
