<template>
  <v-app id="app">
    <Pb-Header />
    <v-main>
      <router-view />
    </v-main>
    <Pb-Footer />
  </v-app>
</template>

<script>
import { PbHeader, PbFooter } from '@/components'

export default {
  name: 'App',
  components: {
    PbHeader,
    PbFooter
  }
}
</script>
