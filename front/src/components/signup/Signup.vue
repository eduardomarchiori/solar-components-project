<template>
  <div class="flex flex-col justify-center items-center">
    <Toaster :toaster="toaster" />
    <div class="p-4 flex flex-col bg-white rounded-md w-8/12 md:w-6/12 lg:w-3/12">
      <label for="" class="mb-1">Nome</label>
      <input v-model="name" type="text" class="mb-2 bg-gray-100 py-1 px-2 rounded-md">
      <label for="" class="mb-1">Email</label>
      <input v-model="email" type="text" class="mb-2 bg-gray-100 py-1 px-2 rounded-md">
      <label for="" class="mb-1">Senha</label>
      <input v-model="password" type="password" class="bg-gray-100 py-1 px-2 rounded-md">
      <RouterLink :to="{name: 'Signin'}" class="text-sm text-center my-8">Ja possui uma conta? Acesse agora!</RouterLink>
      <button :disabled="!isValidForm" :class="{'cursor-not-allowed': !isValidForm}" @click="signup" class="bg-green-500 py-1 px-2 rounded-md mx-2 text-white w-2/3 self-center">Criar</button>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue';
import * as authenticationService from '../../services/authentication/authenticationService';
import { useRouter } from 'vue-router';
import { setCookie } from '../../services/common/cookie';
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

    const name = ref('');
    const email = ref('');
    const password = ref('');
    const isValidForm = computed(() => email.value && password.value && name.value);

    const signup = async () => {

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
        await authenticationService.signup({ 
          name: name.value, 
          email: email.value, 
          password: password.value
        });

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
        const { error, content } = e.response.data;
        toaster.value = {
          type: 'error',
          title: error,
          message: content
        }
      }
    }

    return {
      name,
      email,
      password,
      signup,
      toaster,
      isValidForm
    }
  },
}
</script>