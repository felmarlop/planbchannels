<template>
  <v-container>
    <v-app-bar app color="primary" flat height="80" elevation="5">
      <v-row>
        <v-col cols="2">
          <v-btn icon large @click="drawer = !drawer">
            <v-img :src="Logo" max-width="45" />
          </v-btn>
        </v-col>
        <v-spacer />
        <v-col cols="10" sm="6">
          <v-text-field
            color="tertiary"
            prepend-inner-icon="mdi-magnify"
            label="Buscar canales"
            rounded
            dense
            hide-details
            outlined
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
            <v-list-item class="pl-10" :to="{ name: 'channels' }">
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
import Logo from '@/assets/img/logo.png'
import LogoTitle from '@/assets/img/logo-title.png'

export default {
  name: 'PbHeader',
  data: () => ({
    drawer: null,
    Logo,
    LogoTitle
  }),
  methods: {
    action() {
      return false
    }
  }
}
</script>
