<template>
  <v-row>
    <v-col cols="10" class="text-h6 two-lines">
      {{ `${group}` }}
    </v-col>
    <v-col cols="2" class="text-right pb-0">
      <v-btn icon outlined small text color="tertiary" @click="setGroup(null)" v-if="selectedGroup">
        <v-icon>{{ selectedGroup ? 'mdi-keyboard-backspace' : 'mdi-plus' }}</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ListChannelsGroup',
  props: {
    group: {
      type: String,
      required: true
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
