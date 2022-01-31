<template>
  <vue-final-modal
    v-slot="{ params, close }"
    v-bind="$attrs"
    classes="flex justify-center items-center"
    content-class="relative flex flex-col max-h-full w-6/12 mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900">
    <span class="text-2xl font-bold mb-8">
      <slot name="title"></slot>
    </span>
    <div class="flex-grow overflow-y-auto">
      <slot v-bind:params="params"></slot>
    </div>
    <div class="flex-shrink-0 flex justify-center items-center pt-4 mt-8">
      <button class="bg-green-500 py-1 px-2 rounded-md text-md mx-2 text-white" @click="$emit('confirm', close)">Criar</button>
      <button class="bg-red-500 py-1 px-2 rounded-md text-md mx-2 text-white" @click="$emit('cancel', close)">Cancelar</button>
    </div>
  </vue-final-modal>
</template>

<script>
export default {
  name: 'Modal',
  inheritAttrs: false
}
</script>