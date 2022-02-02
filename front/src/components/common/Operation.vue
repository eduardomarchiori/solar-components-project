<template>
  <section class="bg-primary">
    <ModalViewSolar :component="componentsSelected" @cancel="cancelVisualization" :isVisualization="isVisualization" />
    <ModalCreateEditSolar
      v-model:name="name"
      v-model:gtim="gtim"
      v-model:sector="sector"
      v-model:group="group"
      v-model:grossWeight="grossWeight"
      v-model:netWeight="netWeight"
      v-model:height="height"
      v-model:width="width"
      v-model:depth="depth"
      @confirm="confirmCreation" 
      @cancel="cancelCreation" 
      @edit="editComponent" 
      @cancel-edit="cancelEditionComponent"
      :isEdition="isEdition"
      :modalVisible="modalVisible" />
    <Toaster :toaster="toaster" />
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
              <button class="bg-green-500 py-1 px-2 rounded-md text-md mx-2 text-white" @click="view(component)">
                <fa-icon icon="eye"/>
              </button>
              <button class="bg-blue-500 py-1 px-2 rounded-md text-md mx-2 text-white" @click="edit(component)">
                <fa-icon icon="pencil-alt"/>
              </button>
              <button class="bg-red-500 py-1 px-2 rounded-md mx-2 text-white" @click="remove(component.id)">
                <fa-icon icon="trash-alt"/>
              </button>
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
import { computed, onMounted, ref, inject, reactive } from 'vue';
import Toaster from './Toaster.vue';
import * as solarService from '../../services/solar/solarService';
import ModalViewSolar from '../solar/ModalViewSolar.vue';
import ModalCreateEditSolar from '../solar/ModalCreateEditSolar.vue';

export default {
  components: {
    ModalViewSolar,
    ModalCreateEditSolar,
    Toaster
  },
  props: {
    components: {
      type: Object,
      required: true
    }
  },
  async setup(props, { emit }) {
    
    const components = props.components;

    const solarComponentId = ref('');
    const logisticDimensionId = ref('');    
    const name = ref(null);
    const gtim = ref(null);
    const sector = ref('ongrid');
    const group = ref('perfil');
    const grossWeight = ref(null);
    const netWeight = ref(null);
    const height = ref(null);
    const width = ref(null);
    const depth = ref(null);
    const componentsSelected = ref({});

    const filtred = ref('');
    const modalVisible = ref(false);
    const isEdition = ref(false);
    const isVisualization = ref(false);
    const toaster = ref(null);

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

        emit('update-components');
        clearInputComponents();
        toaster.value = {
          type: 'success',
          title: 'Sucesso',
          message: 'Componente criado com sucesso.'
        }
        modalVisible.value = false;
      } catch (e) {
        const { error, content } = e.response.data;
        toaster.value = {
          type: 'error',
          title: error,
          message: content
        }
      }
    }

    const cancelCreation = () => {
      clearInputComponents();
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

        emit('update-components');
        clearInputComponents();
        toaster.value = {
          type: 'success',
          title: 'Sucesso',
          message: 'Componente alterado com sucesso.'
        }
        isEdition.value = false;
        modalVisible.value = false;
      } catch (e) {
        const { error, content } = e.response.data;
        toaster.value = {
          type: 'error',
          title: error,
          message: content
        }
      }
    }

    const cancelEditionComponent = () => {
      clearInputComponents();

      isEdition.value = false
      modalVisible.value = false;
    }

    const clearInputComponents = () => {
      solarComponentId.value = null;
      logisticDimensionId.value = null;
      name.value = null;
      gtim.value = null;
      sector.value = 'ongrid';
      group.value = 'perfil';
      grossWeight.value = null;
      netWeight.value = null;
      height.value = null;
      width.value = null;
      depth.value = null;
    }
    

    const remove = async (solarComponentId) => {
      try {      
        await solarService.deleteSolarComponent({ solarComponentId })
        toaster.value = {
          type: 'success',
          title: 'Sucesso',
          message: 'Componente excluído com sucesso.'
        }
        emit('update-components');
      } catch (e) {
        const { error, content } = e.response.data;
        toaster.value = {
          type: 'error',
          title: error,
          message: content
        }
      }
    }

    const cancelVisualization = () => {
      isVisualization.value = false;
    }

    const view = (component) => {
      componentsSelected.value = component;
      isVisualization.value = true;
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
      componentsSelected,
      filtred,
      modalVisible,
      isEdition,
      isVisualization,
      toaster,
      confirmCreation,
      cancelCreation,
      cancelEditionComponent,
      cancelVisualization,
      editComponent,
      edit,
      remove,
      create,
      view
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