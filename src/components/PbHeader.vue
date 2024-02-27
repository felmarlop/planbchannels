<template>
  <v-container>
    <v-app-bar app color="primary" flat height="80" elevation="5">
      <v-row>
        <v-col cols="2">
          <v-btn icon small class="mx-4 my-4" @click="drawer = !drawer">
            <v-img :src="logo" max-width="60" />
          </v-btn>
        </v-col>
        <v-spacer />
        <v-col cols="8">
          <v-text-field
            color="tertiary"
            prepend-inner-icon="mdi-magnify"
            label="Buscar canales"
            rounded
            hide-details
            outlined
          />
        </v-col>
      </v-row>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary color="primary">
      <v-row>
        <v-col align="center">
          <v-img :src="logoTitle" max-width="160" class="my-10" />
          <v-divider />
        </v-col>
        <v-col>
          <v-list-item-group>
            <v-list-item class="pl-12" @click="action()">
              <v-list-item-icon>
                <v-icon color="tertiary">mdi-playlist-play</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="text-left">Canales</v-list-item-title>
            </v-list-item>
            <v-list-item class="pl-12" @click="action()">
              <v-list-item-icon>
                <v-icon color="tertiary">mdi-play-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="text-left">Player</v-list-item-title>
            </v-list-item>
            <v-list-item class="pl-12" @click="action()">
              <v-list-item-icon>
                <v-icon color="tertiary">mdi-desktop-tower-monitor</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="text-left">Ajustes</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-col>
      </v-row>
    </v-navigation-drawer>
  </v-container>
</template>
<script>
import Logo from '@/assets/img/logo.png'
import LogoTitle from '@/assets/img/logo-title.png'

export default {
  name: 'PbHeader',
  data: () => ({
    drawer: null,
    logo: Logo,
    logoTitle: LogoTitle
  }),
  methods: {
    action() {
      return false
    }
  }
}
</script>
