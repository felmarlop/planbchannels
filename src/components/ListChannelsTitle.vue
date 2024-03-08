<template>
  <v-toolbar color="transparent" class="pr-2">
    <v-toolbar-title class="text-h6 font-weight-bold pr-2">
      {{ `${group} (${count})` }}
    </v-toolbar-title>
    <v-spacer />
    <v-btn icon small color="tertiary" :outlined="!selectedGroup" @click="setGroup(null)" v-if="selectedGroup">
      <v-icon>{{ selectedGroup ? 'mdi-keyboard-backspace' : 'mdi-plus' }}</v-icon>
    </v-btn>
  </v-toolbar>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ListChannelsTitle',
  props: {
    group: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      required: false,
      default: 0
    }
  },
  computed: {
    ...mapGetters('channel', { selectedGroup: 'group' })
  },
  methods: {
    ...mapActions('channel', ['setGroup'])
  }
}
</script>
