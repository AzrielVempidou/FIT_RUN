<template>
<!-- component -->

<!-- This is an example component -->
<div class="max-w-2xl mx-auto flex flex-col items-center">
    <label for="level" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an Activity</label>
    <select v-model="level" id="level" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected>Choose an activity level</option>
        <option value="Pemula">Pemula</option>
        <option value="Menengah">Menengah</option>
        <option value="Mahir">Mahir</option>
    </select>

    <p class="mt-5 text-center">Pilihlah level yang sesuai dengan kemampuan anda</p>
    <p v-if="loadingLevel">Loading...</p>
    <div v-else>
      <div v-html="levelSuggestion[0].message.content" v-if="levelSuggestion.length">

      </div>
    </div>
  </div>

</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useRootStore } from '../stores/root';
export default {
  data(){
    return {
      level: 'Pemula'
    }
  },
  computed: {
    ...mapState(useRootStore, ['levelSuggestion', 'loadingLevel'])
  },
  watch: {
    level(newLevel) {
      this.handleLevelSuggestion(newLevel)
    }
  },
  methods: {
    ...mapActions(useRootStore, ['handleLevelSuggestion']),
  },
  created(){
    this.handleLevelSuggestion(this.level)
  }
}
</script>
