<template>
  <div class="flex flex-col justify-center items-center">
    <div class="p-4 flex flex-col bg-white rounded-md w-3/12">
      <label for="" class="mb-1">Nome</label>
      <input type="text" class="mb-2 bg-gray-100 py-1 px-2 rounded-md">
      <label for="" class="mb-1">Email</label>
      <input type="text" class="mb-2 bg-gray-100 py-1 px-2 rounded-md">
      <label for="" class="mb-1">Senha</label>
      <input type="text" class="mb-2 bg-gray-100 py-1 px-2 rounded-md">
      <button @click="signup" class="mt-4 bg-green-500 py-1 px-2 rounded-md mx-2 text-white w-2/3 self-center">Criar</button>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, watch, toRefs } from 'vue'

export default {
  setup(props, context) {

    onMounted(() => {
      context.emit('change-bg', 'bg-primary')
    })

    const name = ref('');
    const email = ref('');
    const password = ref('');

    const signup = () => {

    }

    return {
      name,
      email,
      password,
      signup,
    }
  },
}
</script>