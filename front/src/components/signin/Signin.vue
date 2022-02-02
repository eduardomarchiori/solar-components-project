<template>
  <div class="flex flex-col justify-center items-center">
    <Toaster :toaster="toaster" />
    <div class="p-4 flex flex-col bg-white rounded-md w-3/12">      
      <label for="" class="mb-1">Email</label>
      <input v-model="email" type="text" class="mb-2 bg-gray-100 py-1 px-2 rounded-md">
      <label for="" class="mb-1">Senha</label>
      <input v-model="password" type="password" class="bg-gray-100 py-1 px-2 rounded-md">
      <RouterLink :to="{name: 'Signup'}" class="text-sm text-center my-8">Ainda não possui uma conta? Crie agora!</RouterLink>
      <button :disabled="!isValidForm" :class="{'cursor-not-allowed': !isValidForm}" @click="signin" class="bg-green-500 py-1 px-2 rounded-md mx-2 text-white w-2/3 self-center">Entrar</button>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue';
import * as authenticationService from '../../services/authentication/authenticationService';
import { setCookie } from '../../services/common/cookie';
import { useRouter } from 'vue-router';
import useAuth from '../../use/useAuth';
import Toaster from '../common/Toaster.vue';

export default {
  components: {
    Toaster
  },
  setup(props, context) {

    const router = useRouter();
    const { setUser } = useAuth();
    const toaster = ref(null);

    onMounted(() => {
      context.emit('change-bg', 'bg-primary');
    })

    const email = ref('');
    const password = ref('');
    const isValidForm = computed(() => email.value && password.value);

    const signin = async () => {

      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if(!emailRegex.test(email.value)){
        toaster.value = {
          type: 'error',
          title: 'E-mail inválido',
          message: 'Por favor, verifique se seu e-mail está correto.'
        }
        return;
      }

      try {
        const response = await authenticationService.signin({ 
          email: email.value, 
          password: password.value
        });
        setCookie({ accessToken: response.accessToken });
        setUser({ 
          id: response.user.userId,
          name: response.user.name,
          email: response.user.email,
        });
        
        router.push({name: 'Home'});
      } catch (e) {
        const { error, content } = e.response.data
        toaster.value = {
          type: 'error',
          title: error,
          message: content
        }
      }
    }

    return {
      email,
      password,
      signin,
      toaster,
      isValidForm
    }
  },
}
</script>