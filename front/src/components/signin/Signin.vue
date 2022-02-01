<template>
  <div class="flex flex-col justify-center items-center">
    <div class="p-4 flex flex-col bg-white rounded-md w-3/12">      
      <label for="" class="mb-1">Email</label>
      <input v-model="email" type="text" class="mb-2 bg-gray-100 py-1 px-2 rounded-md">
      <label for="" class="mb-1">Senha</label>
      <input v-model="password" type="password" class="mb-2 bg-gray-100 py-1 px-2 rounded-md">
      <button @click="signin" class="mt-4 bg-green-500 py-1 px-2 rounded-md mx-2 text-white w-2/3 self-center">Criar</button>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, watch, toRefs } from 'vue';
import * as authenticationService from '../../services/authentication/authenticationService';
import { setCookie } from '../../services/common/cookie';
import { useRouter } from 'vue-router';
import useAuth from '../../use/useAuth';

export default {
  setup(props, context) {

    const router = useRouter();
    const { setUser } = useAuth();

    onMounted(() => {
      context.emit('change-bg', 'bg-primary')
    })

    const email = ref('');
    const password = ref('');

    const signin = async () => {
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
      } catch (error) {
        console.log(error);
      }
    }

    return {
      email,
      password,
      signin,
    }
  },
}
</script>