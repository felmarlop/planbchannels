<template>
  <v-footer padless color="primary" elevation="5" class="pt-10">
    <v-col class="text-center" cols="12">
      <v-img :src="logoBW" max-width="32" class="mx-auto mb-2" />
      {{ title }} &copy; {{ new Date().getFullYear() }}
    </v-col>
  </v-footer>
</template>

<script>
import { APP_TITLE } from '@/config'
import LogoBW from '@/assets/img/logo.png'

export default {
  name: 'PbFooter',
  data: () => ({
    logoBW: LogoBW,
    title: APP_TITLE
  })
}
</script>
