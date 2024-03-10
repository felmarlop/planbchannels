<template>
  <v-app id="app">
    <alert />
    <Pb-Header />
    <v-main color="primary">
      <router-view />
    </v-main>
    <Pb-Footer />
  </v-app>
</template>

<script>
import { Alert, PbHeader, PbFooter } from '@/components'

export default {
  name: 'App',
  components: {
    Alert,
    PbHeader,
    PbFooter
  }
}
</script>
