<template>
  <v-container>
    <v-app-bar app flat height="80" elevation="5" style="background: rgba(0, 0, 0, 0.7)">
      <v-row>
        <v-col cols="2">
          <v-btn icon large @click="drawer = !drawer">
            <v-img :src="Logo" max-width="45" />
          </v-btn>
        </v-col>
        <v-spacer />
        <v-col cols="10" sm="6">
          <v-text-field
            :value="search"
            :loading="searching"
            color="tertiary"
            prepend-inner-icon="mdi-magnify"
            label="Buscar canales"
            dense
            rounded
            hide-details
            outlined
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
        <v-col cols="12">
          <v-list-item-group class="text-uppercase">
            <v-list-item class="pl-10" :to="{ name: 'main' }">
              <v-list-item-icon>
                <v-icon color="tertiary">mdi-playlist-play</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Canales</v-list-item-title>
            </v-list-item>
            <v-list-item class="pl-10" @click="action()">
              <v-list-item-icon>
                <v-icon color="tertiary">mdi-checkbox-multiple-blank</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Categorías</v-list-item-title>
            </v-list-item>
            <v-list-item class="pl-10" @click="action()">
              <v-list-item-icon>
                <v-icon color="tertiary">mdi-monitor-cellphone</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Dispositivo</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
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
    Logo,
    LogoTitle
  }),
  computed: {
    ...mapGetters('channel', ['search', 'searching'])
  },
  methods: {
    ...mapActions('channel', ['setSearch', 'setSearching']),
    debounce,
    handleSearch(v) {
      this.setSearching(true)
      this.debounceSearch(v)
    },
    debounceSearch: debounce(function (v) {
      this.setSearch(v)
    }, 400),
    action() {
      return false
    }
  }
}
</script>
