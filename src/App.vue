<template>
  <v-app id="app">
    <Pb-Header v-if="!selected" />
    <alert />
    <v-main color="primary" :class="selected ? 'channel' : ''">
      <router-view />
    </v-main>
    <Pb-Footer />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

import { Alert, PbHeader, PbFooter } from '@/components'

export default {
  name: 'App',
  components: {
    Alert,
    PbHeader,
    PbFooter
  },
  computed: {
    ...mapGetters('channel', ['selected'])
  }
}
</script>
