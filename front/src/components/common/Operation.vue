<template>
  <section class="bg-primary">
    <Modal 
      v-model="modalVisible" 
      @confirm="confirmCreation" 
      @cancel="cancelCreation" 
      @edit="editComponent" 
      @cancel-edit="cancelEditionComponent" 
      name="algo"
      :isEdition="isEdition">
      <template v-slot:title>Criar componente fotovoltaico</template>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col">
          <p class="mb-4"><b>Dados Gerais</b></p>
          <label for="gtim" class="mb-2">Nome</label>
          <input type="text" v-model="name" class="mb-2 bg-gray-100 py-1 px-2 rounded-md w-min">
          <label for="gtim" class="mb-2">GTIM</label>
          <input type="text" v-model="gtim" class="mb-2 bg-gray-100 py-1 px-2 rounded-md w-min">
          <label for="gtim" class="mb-2">Segmento</label>
          <input type="text" v-model="sector" class="mb-2 bg-gray-100 py-1 px-2 rounded-md w-min">
          <label for="gtim" class="mb-2">Grupo</label>
          <input type="text" v-model="group" class="mb-2 bg-gray-100 py-1 px-2 rounded-md w-min">
          <p class="my-4"><b>Pesos</b></p>
          <label for="gtim" class="mb-2">Peso Bruto</label>
          <input type="text" v-model="grossWeight" class="mb-2 bg-gray-100 py-1 px-2 rounded-md w-min">
          <label for="gtim" class="mb-2">Peso Líquido</label>
          <input type="text" v-model="netWeight" class="mb-2 bg-gray-100 py-1 px-2 rounded-md w-min">
        </div>
        <div class="flex flex-col">
          <p class="mb-4"><b>Dimensões Logísticas</b></p>
          <label for="gtim" class="mb-2">Altura</label>
          <input type="text" v-model="height" class="mb-2 bg-gray-100 py-1 px-2 rounded-md w-min">
          <label for="gtim" class="mb-2">Largura</label>
          <input type="text" v-model="width" class="mb-2 bg-gray-100 py-1 px-2 rounded-md w-min">
          <label for="gtim" class="mb-2">Profundidade</label>
          <input type="text" v-model="depth" class="mb-2 bg-gray-100 py-1 px-2 rounded-md w-min">
        </div>
      </div>
    </Modal>
    <div class="flex justify-center py-20">
      <div class="w-9/12 text-center flex flex-col items-center">
        <h2 class="text-2xl text-white font-bold mb-2">Lista de componentes</h2>
        <span class="text-md text-white">Crie, edite e exclua seus items rapidamente.</span>
        <div class="flex p-2 mt-8 w-2/3">
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
              <span>{{component.sector}}</span>
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
import { computed, onMounted, ref, inject, reactive } from 'vue'
import * as mocks from '../../mocks'
import Modal from './Modal.vue'
import * as solarService from '../../services/solar/solarService';
import useAuth from '../../use/useAuth';

export default {
  components: {
    Modal
  },
  props: {
    components: {
      type: Object,
      required: true
    }
  },
  async setup(props) {
    
    const { user } = useAuth();
    const components = props.components;
    
    const solarComponentId = ref('');
    const logisticDimensionId = ref('');    
    const name = ref('');
    const gtim = ref('');
    const sector = ref('');
    const group = ref('');
    const grossWeight = ref('');
    const netWeight = ref('');
    const height = ref('');
    const width = ref('');
    const depth = ref('');

    const filtred = ref('');
    const modalVisible = ref(false);
    const isEdition = ref(false);

    const componentsBySearch = computed(() => components.values.filter((el) => 
      el.name.toLowerCase().includes(filtred.value.toLowerCase()) 
      || el.group.toLowerCase().includes(filtred.value.toLowerCase())
    ));    
    const componentsFiltred = computed(() => !filtred.value ? components.values : componentsBySearch.value);

    const create = () => {
      modalVisible.value = true;
    }

    const confirmCreation = async () => {
      try {
        await solarService.createSolarComponent({
          name: name.value,
          gtim: gtim.value,
          sector: sector.value,
          group: group.value,
          grossWeight: +grossWeight.value,
          netWeight: +netWeight.value,
          height: +height.value,
          width: +width.value,
          depth: +depth.value,
        });

        const response = await solarService.getSolarComponents();
        components.values = response.solarComponents;

        modalVisible.value = false;
      } catch (error) {
        console.log(error);
      }
    }

    const cancelCreation = () => {
      modalVisible.value = false;
    }

    const edit = (component) => {
      isEdition.value = true;
      modalVisible.value = true;

      solarComponentId.value = component.id;
      logisticDimensionId.value = component.logisticDimensionId;
      name.value = component.name;
      gtim.value = component.gtim;
      sector.value = component.sector;
      group.value = component.group;
      grossWeight.value = component.grossWeight;
      netWeight.value = component.netWeight;
      height.value = component.height;
      width.value = component.width;
      depth.value = component.depth;
    }

    const editComponent = async () => {
      try {
        await solarService.updateSolarComponent({ 
          solarComponentId: solarComponentId.value,
          logisticDimensionId: logisticDimensionId.value,
          name: name.value,
          gtim: gtim.value,
          sector: sector.value,
          group: group.value,
          grossWeight: +grossWeight.value,
          netWeight: +netWeight.value,
          height: +height.value,
          width: +width.value,
          depth: +depth.value,
        })

        const response = await solarService.getSolarComponents();
        components.values = response.solarComponents;
        clearInputComponents();
        isEdition.value = false;
        modalVisible.value = false;
      } catch (error) {
        console.log(error);
      }
    }

    const cancelEditionComponent = () => {
      clearInputComponents();

      isEdition.value = false
      modalVisible.value = false;
    }

    const clearInputComponents = () => {
      solarComponentId.value = "";
      logisticDimensionId.value = "";
      name.value = "";
      gtim.value = "";
      sector.value = "";
      group.value = "";
      grossWeight.value = "";
      netWeight.value = "";
      height.value = "";
      width.value = "";
      depth.value = "";
    }
    

    const remove = async (solarComponentId) => {
      try {      
        await solarService.deleteSolarComponent({ solarComponentId })
        const response = await solarService.getSolarComponents();
        components.values = response.solarComponents;

      } catch (error) {
        console.log(error);
      }
    }

    return {
      name,
      gtim,
      sector, 
      group,
      grossWeight,
      netWeight, 
      height,
      width,
      depth,
      components,
      componentsFiltred,
      componentsBySearch,
      filtred,
      modalVisible,
      isEdition,
      confirmCreation,
      cancelCreation,
      cancelEditionComponent,
      editComponent,
      edit,
      remove,
      create,
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