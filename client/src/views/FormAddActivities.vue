<template>
    <div class="flex items-center justify-center p-12">
    <div class="mx-auto w-full max-w-[550px]">
      <form @submit.prevent="doAdd">
        <div class="mb-5">
          <label  for="name" class="mb-3 block text-base font-medium text-[#07074D]">
            Name
          </label>
          <input v-model="form.name" type="text" id="name"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
        </div>
        <div class="mb-5">
          <label for="type" class="mb-3 block text-base font-medium text-[#07074D]">
            Type
          </label>
          <input v-model="form.type" type="text" id="type"
          placeholder="For example - Run, Ride etc."  
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
        </div>
        <div class="mb-5">
          <label for="sport_type" class="mb-3 block text-base font-medium text-[#07074D]">
            Sport Type
          </label>
          <input v-model="form.sport_type" type="text" id="sport_type"
          placeholder="For example - Run, MountainBikeRide, Ride, etc"  
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
        </div>
        <div class="mb-5">
          <label for="start_date_local" class="mb-3 block text-base font-medium text-[#07074D]">
            Start Date Local
          </label>
          <input v-model="form.start_date_local" type="date" id="start_date_local"
            placeholder="ini dia" class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
        </div>
        <div class="mb-5">
          <label for="elapsed_time" class="mb-3 block text-base font-medium text-[#07074D]">
            Elapsed Time
          </label>
          <input v-model="form.elapsed_time" type="number" id="elapsed_time"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
        </div>
        <div class="mb-5">
          <label for="Description" class="mb-3 block text-base font-medium text-[#07074D]">
            Description
          </label>
          <textarea v-model="form.description" rows="4" id="Description"
            class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"></textarea>
        </div>
        <div class="mb-5">
          <label  for="distance" class="mb-3 block text-base font-medium text-[#07074D]">
            Distance
          </label>
          <input v-model="form.distance" type="text" id="name"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
        </div>
        <div>
          <button type="submit"
            class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
            Submit
          </button>
          <button  type="button"
            class="hover:shadow-form rounded-md bg-[#FF0000] py-3 px-8 text-base font-semibold text-white outline-none">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useRootStore } from '../stores/root';
export default {
  data() {
    return {
      form: {
        name: "",
        type: "",
        sport_type: "",
        start_date_local: "",
        elapsed_time: "",
        description: "",
        distance: ""
      }
    }
  },
  methods: {
    ...mapActions(useRootStore, ['handleForm']),
    async doAdd(){
      this.handleForm(this.form)
    }
  }
}
</script>

<style>

</style>