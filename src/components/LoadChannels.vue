<template>
  <v-col cols="12" md="6">
    <v-card color="secondary">
      <v-card-text>
        <v-row v-if="loading">
          <v-col cols="12" class="text-center">
            <div class="my-5">Cargando canales...</div>
            <v-progress-circular color="tertiary" indeterminate />
          </v-col>
        </v-row>
        <v-row class="d-flex" v-else>
          <v-col cols="12" class="pt-2 pb-0">Opción 1:</v-col>
          <v-col cols="12" class="d-flex pb-0">
            <v-text-field v-model="uri" color="tertiary" label="URL" class="mr-1" dense outlined clearable />
            <v-btn outlined height="40px" color="tertiary" :disabled="!validURL" @click="handleURL(uri)">
              <v-icon>mdi-cloud-download</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" class="pt-0 pb-3">Opción 2:</v-col>
          <v-col cols="12" class="pt-0">
            <input ref="up" type="file" style="display: none" @change="handleFile" />
            <v-btn outlined dense width="100%" color="tertiary" @click="$refs.up.click()">
              <v-icon class="mr-2">mdi-file-upload</v-icon>
              <span>Subir playlist</span>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="text-center pt-5">
            <p width="100%">
              Plan B Channels sólo descarga y reproduce el contenido de tu playlist. No hace peticiones a ningún
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
      errorMessage: 'Ups! No se encontró ningún canal.'
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
    ...mapActions('alert', ['setMessage']),
    ...mapActions('channel', ['setList', 'setUrl', 'setLoading']),
    handleURL(u) {
      this.setUrl(u)
      this.setLoading(true)
      getURLData(this.url, chs => {
        this.setLoading(false)
        if (chs.length) {
          this.setList(chs)
        } else {
          this.setMessage(this.errorMessage)
        }
      })
    },
    handleFile(e) {
      this.setLoading(true)
      getFileData(e.target.files[0], chs => {
        this.setLoading(false)
        if (chs.length) {
          this.setList(chs)
        } else {
          this.setMessage(this.errorMessage)
        }
      })
    }
  }
}
</script>
