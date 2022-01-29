<template>
  <header class="flex justify-center">
    <div class="flex justify-between w-8/12 my-4">
      <div>
        <RouterLink to="/">
          <img src="../../assets/images/logo.png" class="w-auto h-8 rounded-lg"/>
        </RouterLink>
      </div>
      <div class="flex items-center">
        <div class="mx-2">
          <RouterLink to="/">
            Home
          </RouterLink>
        </div>
        <button v-if="!isLogged" @click="signin" class="ml-4 bg-tertiary px-4 py-1 rounded-md">
          Entrar
        </button>
        <button v-else @click="signout" class="ml-4 bg-primary px-4 py-1 rounded-md text-white">
          Sair
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data: () => ({
    isLogged: true
  }),
  methods: {
    signout(){

    },
    signin(){

    }
  }
}
</script>