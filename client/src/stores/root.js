import axios from 'axios'
import { defineStore } from 'pinia'

export const useRootStore = defineStore('root', {
  state: () => ({
    activities: [],
    EditActivities: [],
    isLogin: false,
    levelSuggestion: '',
    loadingLevel: false
  }
  ),
  // getters: {
  //   doubleCount: (state) => state.count * 2,
  // },
  actions: {
    async handleFecthData(page = 1){
      try {
        const response = await axios({
          url: 'http://localhost:3000/activities',
          method: "GET",
          headers: {
            access_token: localStorage.getItem("access_token")
          },
          params: {
            page,
            per_page:5
          }
        })
        this.activities = response.data
      } catch (error) {
        console.log(error);
      }
    },
    async handleLevelSuggestion(level){
      try {
        this.loadingLevel = true
        const response = await axios({
          url: 'http://localhost:3000/Suggestion_Activies',
          method: "GET",
          params: { level },
          headers:{
            access_token: localStorage.getItem("access_token")            
          }
        })
        this.levelSuggestion = response.data
        this.loadingLevel = false
      } catch (error) {
        this.loadingLevel = false
        console.log(error);
      }
    },
    async handleForm(form){
      try {
        // console.log(form , "<<", id, "aa");
        const response = await axios({
          url: `http://localhost:3000/activities`,
          method: "post",
          data: form,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        // fetvj
        this.handleFecthData()
        // router push ngarah kemana
        this.$router.push('/Activties')
        } catch (error) {
        console.log(error);
      }
    },
    async editData(id){
      try {
        const response = await axios({
          url: `http://localhost:3000/activities/${id}`,
          method: "GET",
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        this.EditActivities = response.data
        } catch (error) {
        console.log(error);
      }
    },
    async handleUpdate(id, form){
      try {
        // console.log(form , "<<", id, "aa");
        const response = await axios({
          url: `http://localhost:3000/activities/${id}`,
          method: "PUT",
          data: form,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        // fetvj
        this.handleFecthData()
        // router push ngarah kemana
        this.$router.push('/Activties')
        } catch (error) {
        console.log(error);
      }
    }
  }
})
