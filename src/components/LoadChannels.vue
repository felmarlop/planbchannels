<template>
  <v-col cols="12" md="6">
    <v-card color="secondary">
      <v-card-text class="d-flex">
        <v-row>
          <v-col cols="12" class="pt-2 pb-0">Opción 1:</v-col>
          <v-col cols="12" class="d-flex pb-0">
            <v-text-field v-model="uri" color="tertiary" label="URL" class="mr-1" dense outlined clearable />
            <v-btn
              outlined
              height="40px"
              color="tertiary"
              :loading="loading"
              :disabled="!validURL"
              @click="handleURL(uri)"
            >
              <v-icon>mdi-cloud-download</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" class="pt-0 pb-3">Opción 2:</v-col>
          <v-col cols="12" class="pt-0">
            <input ref="up" type="file" style="display: none" @change="handleFile" />
            <v-btn outlined dense :loading="loading" width="100%" color="tertiary" @click="$refs.up.click()">
              <v-icon class="mr-2">mdi-file-upload</v-icon>
              <span>Subir playlist</span>
            </v-btn>
          </v-col>
          <v-col cols="12" class="text-center pt-5">
            <p width="100%">
              Plan B Channels sólo descarga y reproduce el contenido de tu playlist. No hace peticiones a ningun
              servidor ni guarda información sobre la lista de canales.
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

import { getFileData, getURLData } from '@/helpers/utils'

export default {
  name: 'LoadChannels',
  data() {
    return {
      uri: '',
      document
    }
  },
  computed: {
    ...mapGetters('channel', ['url', 'list', 'loading']),
    validURL() {
      const r = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/)
      return r.test(this.uri)
    }
  },
  created() {
    this.uri = this.url
  },
  methods: {
    ...mapActions('channel', ['setList', 'setUrl', 'setLoading']),
    handleURL(u) {
      this.setUrl(u)
      this.setLoading(true)
      getURLData(this.url, chs => {
        this.setList(chs)
        this.setLoading(false)
      })
    },
    handleFile(e) {
      this.setLoading(true)
      getFileData(e.target.files[0], chs => {
        this.setList(chs)
        this.setLoading(false)
      })
    }
  }
}
</script>
