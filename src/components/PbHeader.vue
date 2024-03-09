<template>
  <v-container>
    <v-app-bar app flat height="80" elevation="5" style="background: rgba(0, 0, 0, 0.7)">
      <v-row>
        <v-col cols="2">
          <v-img :src="Logo" max-width="45" style="cursor: pointer" @click="drawer = !drawer" />
        </v-col>
        <v-spacer />
        <v-col cols="10" sm="6">
          <v-text-field
            :value="search"
            :loading="searching"
            :disabled="!list.length"
            color="tertiary"
            prepend-inner-icon="mdi-magnify"
            class="rounded-lg"
            label="Buscar"
            :hint="list.length ? `${list.length} canales/vídeos` : ''"
            persistent-hint
            dense
            outlined
            clearable
            @input="handleSearch($event)"
          />
        </v-col>
      </v-row>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary color="primary">
      <v-row>
        <v-col cols="12" align="center">
          <div style="min-height: 190px">
            <v-img :src="LogoTitle" width="140" class="my-5">
              <template #placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular color="tertiary" indeterminate />
                </div>
              </template>
            </v-img>
          </div>
          <v-divider />
        </v-col>
        <v-col cols="12" class="text-uppercase text-caption py-0">
          <v-list two-line>
            <v-list-item class="pl-10" @click="emptyList()">
              <v-icon color="tertiary" class="mr-5">mdi-playlist-plus</v-icon>
              <v-list-item-title>Nueva playlist</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-navigation-drawer>
  </v-container>
</template>
<script>
import { debounce } from 'lodash'
import { mapActions, mapGetters } from 'vuex'

import Logo from '@/assets/img/logo.png'
import LogoTitle from '@/assets/img/logo-title.png'

export default {
  name: 'PbHeader',
  data: () => ({
    drawer: null,
    view: null,
    Logo,
    LogoTitle
  }),
  computed: {
    ...mapGetters('channel', ['search', 'searching', 'list'])
  },
  methods: {
    ...mapActions('channel', ['clear', 'setSearch', 'setSearching']),
    debounce,
    handleSearch(v) {
      this.setSearching(true)
      this.debounceSearch(v)
    },
    debounceSearch: debounce(function (v) {
      this.setSearch(v)
    }, 400),
    emptyList() {
      this.clear()
      this.drawer = false
    },
    action() {
      return false
    }
  }
}
</script>
