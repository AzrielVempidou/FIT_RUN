<template>
  <div class="flex items-center justify-center p-12">
    <div class="mx-auto w-full max-w-[550px]">
      <form @submit.prevent="doEdit">
        <div class="mb-5">
          <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
            Name
          </label>
          <input v-model="formEdit.name" type="text" id="name"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
        </div>
        <div class="mb-5">
          <label for="type" class="mb-3 block text-base font-medium text-[#07074D]">
            Type
          </label>
          <input v-model="formEdit.type" type="text" id="type"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
        </div>
        <div class="mb-5">
          <label for="sport_type" class="mb-3 block text-base font-medium text-[#07074D]">
            Sport Type
          </label>
          <input v-model="formEdit.sport_type" type="text" id="sport_type"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
        </div>
        <div class="mb-5">
          <label for="Description" class="mb-3 block text-base font-medium text-[#07074D]">
            Description
          </label>
          <textarea v-model="formEdit.description" rows="4" id="Description"
            class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"></textarea>
        </div>
        <div>
          <button type="submit"
            class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
            Submit
          </button>
          <button @click.prevent="changePage()" type="button"
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
      formEdit: {
        name: "",
        type: "",
        sport_type: "",
        description: ""
      }
    }
  },
  watch: {
    EditActivities(newValue) {
      this.formEdit.name = newValue.name
      this.formEdit.type = newValue.type
      this.formEdit.sport_type = newValue.sport_type
      this.formEdit.description = newValue.description
    }
  },
  computed: {
    ...mapState(useRootStore, ['EditActivities'])
  },
  methods: {
    ...mapActions(useRootStore, ['editData']),
    ...mapActions(useRootStore, ['handleUpdate']),
    async doEdit() {
      console.log(this.EditActivities);
      this.handleUpdate(this.$route.params.id, this.formEdit)
    },
    changePage() {
      this.$router.push('/Activties')
    }
  },
  created() {
    this.editData(this.$route.params.id)
  }
}
</script>

<style></style>