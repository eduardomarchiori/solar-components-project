<template>
  <section class="bg-primary">
    <Modal v-model="modalVisible" @confirm="confirmCreation" @cancel="cancelCreation" name="algo">
      <template v-slot:title>Criar componente fotovoltaico</template>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col">
          <p class="mb-4"><b>Dados Gerais</b></p>
          <label for="gtim" class="mb-2">Nome</label>
          <input type="text" class="mb-2 bg-gray-100 py-1 px-2 rounded-md w-min">
          <label for="gtim" class="mb-2">GTIM</label>
          <input type="text" class="mb-2 bg-gray-100 py-1 px-2 rounded-md w-min">
          <label for="gtim" class="mb-2">Segmento</label>
          <input type="text" class="mb-2 bg-gray-100 py-1 px-2 rounded-md w-min">
          <label for="gtim" class="mb-2">Grupo</label>
          <input type="text" class="mb-2 bg-gray-100 py-1 px-2 rounded-md w-min">
          <p class="my-4"><b>Pesos</b></p>
          <label for="gtim" class="mb-2">Peso Bruto</label>
          <input type="text" class="mb-2 bg-gray-100 py-1 px-2 rounded-md w-min">
          <label for="gtim" class="mb-2">Peso Líquido</label>
          <input type="text" class="mb-2 bg-gray-100 py-1 px-2 rounded-md w-min">
        </div>
        <div class="flex flex-col">
          <p class="mb-4"><b>Dimensões Logísticas</b></p>
          <label for="gtim" class="mb-2">Altura</label>
          <input type="text" class="mb-2 bg-gray-100 py-1 px-2 rounded-md w-min">
          <label for="gtim" class="mb-2">Largura</label>
          <input type="text" class="mb-2 bg-gray-100 py-1 px-2 rounded-md w-min">
          <label for="gtim" class="mb-2">Profundidade</label>
          <input type="text" class="mb-2 bg-gray-100 py-1 px-2 rounded-md w-min">
        </div>
      </div>
    </Modal>
    <div class="flex justify-center py-20">
      <div class="w-9/12 text-center flex flex-col items-center">
        <h2 class="text-2xl text-white font-bold mb-2">Lista de componentes</h2>
        <span class="text-md text-white">Crie, edite e exclua seus items rapidamente.</span>
        <div class="flex p-2 mt-8 w-1/2">
          <div class="w-10/12">
            <input v-model="filtred" type="text" class="w-full p-1 rounded-md mr-4" placeholder="Pesquiser por nome ou grupo...">
          </div>
          <div class="w-2/12 ml-4">
            <button class="bg-white text-green-600 py-1 px-2 rounded-md text-md w-full" @click="create">Criar</button>
          </div>
        </div>
        <div v-if="componentsBySearch.length" class="mt-8 text-left bg-white rounded-lg p-2 w-full">
          <div class="flex justify-between p-2 my-2">
            <div class="w-8/12 grid grid-cols-4 gap-4">
              <span>Nome</span>
              <span>GTIM</span>
              <span>Tipo de Segmento</span>
              <span>Grupo de Componentes</span>
            </div>
            <div class="w-4/12"></div>
          </div>
          <div class="flex justify-between p-2" v-for="component in componentsFiltred" :key="component.id">
            <div class="w-8/12 grid grid-cols-4 gap-4">
              <span>{{component.name}}</span>
              <span>{{component.gtim}}</span>
              <span>{{component.sectorType}}</span>
              <span>{{component.group}}</span>
            </div>
            <div class="w-4/12 text-right">
              <button class="bg-blue-500 py-1 px-2 rounded-md text-md mx-2 text-white" @click="edit(component)">Editar</button>
              <button class="bg-red-500 py-1 px-2 rounded-md mx-2 text-white" @click="remove(component.id)">Excluir</button>
            </div>
          </div>
        </div>
        <div v-else class="flex flex-col items-center justify-center mt-8">  
          <img src="../../assets/images/sad.png" alt="not found" class="w-28 mb-6">
          <span class="text-white">Nenhum resultado foi encontrado.</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, ref, inject } from 'vue'
import * as mocks from '../../mocks'
import Modal from './Modal.vue'

export default {
  components: {
    Modal
  },
  setup() {
    const filtred = ref('');
    const modalVisible = ref(false);
    const $vfm = inject('$vfm')

    const components = mocks.components;
    const componentsBySearch = computed(() => components.filter((el) => 
      el.name.toLowerCase().includes(filtred.value.toLowerCase()) 
      || el.group.toLowerCase().includes(filtred.value.toLowerCase())
    ));    
    const componentsFiltred = computed(() => !filtred.value ? components : componentsBySearch.value);

    const create = () => {
      modalVisible.value = true;
    }

    const confirmCreation = () => {
      console.log('confirma');
    }

    const cancelCreation = () => {
      modalVisible.value = false;
    }

    const edit = (component) => {

    }

    const remove = (id) => {
      
    }

    return {
      components,
      componentsFiltred,
      componentsBySearch,
      filtred,
      modalVisible,
      confirmCreation,
      cancelCreation,
      edit,
      remove,
      create
    }
  },
}
</script>

<style scoped>
.card {
  width: 240px;
  height: 360px;
}
</style>