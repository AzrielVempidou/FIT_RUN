<script>
import { mapWritableState } from 'pinia';
import Navbar from './components/Navbar.vue';
import { useRootStore } from './stores/root';
export default {
  components: {
    Navbar,
  },
  computed:{
    ...mapWritableState(useRootStore, ['isLogin'])
  },
  // updated(){
  //   this.isLogin()
  //   console.log('test', localStorage.getItem('access_token'));
  //   // this.isLogin()
  // }
  
  created() {
    if (localStorage.getItem('access_token')) {
      this.isLogin = true
    }
  }
}
</script>

<template>
  <div>
    <div class="flex flex-row">
      <Navbar v-if="isLogin" />
      <RouterView />
    </div>
  </div>
</template>

