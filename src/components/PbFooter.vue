<template>
  <v-footer padless color="primary" elevation="5">
    <v-col class="text-center" cols="12">
      <v-img :src="Logo" max-width="28" class="mx-auto mb-2" />
      {{ title }} &copy; {{ new Date().getFullYear() }}
    </v-col>
  </v-footer>
</template>

<script>
import { APP_TITLE } from '@/config'
import Logo from '@/assets/img/logo.png'

export default {
  name: 'PbFooter',
  data: () => ({
    Logo,
    title: APP_TITLE
  })
}
</script>
