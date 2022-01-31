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
        <RouterLink to="/signin" v-if="!isLogged" class="ml-4 bg-tertiary px-4 py-1 rounded-md">
          Entrar
        </RouterLink>
        <button v-else @click="signout" class="ml-4 bg-primary px-4 py-1 rounded-md text-white">
          Sair
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { computed, ref, onMounted, watch, toRefs } from 'vue'
import { removeCookie } from '../../services/common/cookie';
import useAuth from '../../use/useAuth';
import { useRouter } from 'vue-router';

export default {
  setup(){
    const { isLogged } = useAuth();
    const router = useRouter();

    const signout = () => {
      removeCookie('accessToken');
      router.push({ name: 'Signin' });
    }

    return { 
      signout,
      isLogged
    }
  }
}
</script>