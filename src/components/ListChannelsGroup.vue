<template>
  <v-row>
    <v-col cols="10" class="text-h6">
      {{ `${group} (${count})` }}
    </v-col>
    <v-col cols="2" class="text-right">
      <v-btn icon small color="tertiary" :outlined="!selectedGroup" @click="setGroup(null)" v-if="selectedGroup">
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
