<template>
  <div class="ml-4 flex flex-1 flex-col">
    <h1 id="my-heading">My Activities</h1>
    <div class="mt-2">
      <template v-if="activities.length > 0"> 
        <table  class="w-full  table-auto">
          <thead class="justify-between">
            <tr class="bg-pink-600">
              <th class="px-16 py-2">
                <span class="text-gray-100 font-semibold">Sport</span>
              </th>
              <th class="px-16 py-2">
                <span class="text-gray-100 font-semibold">Title</span>
              </th>
              <th class="px-16 py-2">
                <span class="text-gray-100 font-semibold">Distance</span>
              </th>
              <th class="px-16 py-2">
                <span class="text-gray-100 font-semibold">Date</span>
              </th>
    
              <th class="px-16 py-2">
                <span class="text-gray-100 font-semibold">Time</span>
              </th>
    
              <th class="px-16 py-2">
                <span class="text-gray-100 font-semibold">Setting</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-gray-200">
            <tr v-for="activity in activities" v-bind:key="activity.id" class="bg-white border-b-2 border-gray-200">
              <td class="px-16 py-2">
                <span>{{ activity.type }}</span>
              </td>
              <td>
                <span class="text-center ml-2 font-semibold">{{ activity.name }}</span>
              </td>
    
              <td class="px-16 py-2">
                <span>{{ (activity.distance  / 1000).toFixed(2) }} KM</span>
              </td>
              <td class="px-16 py-2">
                <span>{{ new Date(activity.start_date).toLocaleDateString() }}</span>
              </td>
              <td class="px-16 py-2">
                <span>{{ secondsToHMS(activity.moving_time) }}</span>
              </td>
    
              <td class="px-16 py-2">
                <span class="text-pink-500 flex">
                  <svg @click.prevent="changePage(activity.id)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-700 mx-2" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path fill-rule="evenodd"
                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                      clip-rule="evenodd" />
                  </svg>
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <button @click="page--">Prev</button>
        <button @click="page++">Next</button>
      </template>
      <template v-else>
        <p class="text-gray-600 text-center mt-4">You haven't added any activities yet...</p>
      </template>
    </div>
  </div>
  <div class="fixed bottom-4 right-4">
    <RouterLink to="/AddActivies" class="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded">
      Add New Activities +
    </RouterLink>
  </div>

</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useRootStore } from '../stores/root';
import { RouterLink } from 'vue-router';
export default {
  data(){
    return{
      page : 1
    }
  },
    computed: {
        ...mapState(useRootStore, ['activities'])
    },
    watch:{
      page(newPage){
        this.handleFecthData(newPage)
      }
    },
    methods: {
        ...mapActions(useRootStore, ['handleFecthData']),
        changePage(id) {
            this.$router.push('/Activties/' + id);
        },
        secondsToHMS(seconds) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const remainingSeconds = seconds % 60;
            const formattedHours = String(hours).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');
            const formattedSeconds = String(remainingSeconds).padStart(2, '0');
            return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        }
    },
    created() {
        this.handleFecthData();
    },
    components: { RouterLink }
}
</script>

<style>
  #my-heading {
    font-size: 36px; /* Ganti dengan ukuran yang Anda inginkan */
  }
</style>