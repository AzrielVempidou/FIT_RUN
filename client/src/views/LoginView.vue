<template>
  <section class="bg-white">
    <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
      <section class="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
        <img alt="Night"
          src="https://cms.sehatq.com/cdn-cgi/image/format=auto,width=1080,quality=90/public/img/article_img/mengenal-5-cabang-olahraga-lari-dalam-atletik-1614177238.jpg"
          class="absolute inset-0 h-full w-full object-cover opacity-80" />
        <div class="hidden lg:relative lg:block lg:p-12">


          <h2 class="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Welcome to FitRun
          </h2>
        </div>
      </section>

      <main class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
        <div class="max-w-xl lg:max-w-3xl">
          <div class="relative -mt-16 block lg:hidden">
            <span class="sr-only">Home</span>
            <svg class="h-8 sm:h-10" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            </svg>

            <h1 class="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to SportTopia
            </h1>
          </div>

          <!-- Form Login -->
          <section class="flex flex-col">
            <h1 class="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Please Login With Strava
            </h1>
            <a href="https://www.strava.com/oauth/authorize?client_id=112873&redirect_uri=http://localhost:3000/strava/callback&response_type=code&scope=activity:read_all,activity:write,profile:read_all"
              class="mt-4 text-white bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-400 dark:hover:bg-pink-500 dark:focus:ring-pink-700"
              style="margin-top: 20px;">
              Login With Strava
            </a>

          </section>

        </div>
      </main>
    </div>

  </section>
</template>

<script>
import { mapWritableState } from 'pinia'
import { useRootStore } from '../stores/root'

export default {
  computed: {
    ...mapWritableState(useRootStore, ['isLogin'])
  },
  created() {
    console.log(this.$route)
    if (this.$route.query.access_token) {
      this.isLogin = true
      localStorage.setItem('access_token', this.$route.query.access_token)
      this.$router.push('/')
    }
  }
}
</script>

<style></style>