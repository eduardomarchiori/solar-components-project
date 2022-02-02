<template>
  <Modal 
    v-model="modalVisible" 
    @cancel="cancelCreation" 
    @cancel-edit="cancelEditionComponent" 
    name="solar-create-edit"
    :isEdition="isEdition"
    :isValidForm="isValidForm">
    <template v-slot:title>Criar componente fotovoltaico</template>
    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col">
        <p class="mb-4 text-lg"><b>Dados Gerais</b></p>
        <label for="name" class="mb-2">Nome</label>
        <input type="text" v-model="name" class="mb-1 bg-gray-100 py-1 px-2 rounded-md w-2/3" @keydown="validate($event,'name')">
        <span v-if="name === ''" class="text-red-500 text-sm mb-2">Por favor digitar um nome válido.</span>

        <label for="gtim" class="mb-2">GTIM</label>
        <input type="text" v-model="gtim" class="mb-2 bg-gray-100 py-1 px-2 rounded-md w-2/3" @keydown="validate($event,'gtim')">
        <span v-if="gtim === ''" class="text-red-500 text-sm mb-2">Por favor digite um GTIM válido.</span>

        <label for="sector" class="mb-2">Segmento</label>
        <select v-model="sector" class="mb-2 bg-gray-100 py-1 px-2 rounded-md cursor-pointer w-2/3">
          <option value="ongrid">Ongrid</option>
          <option value="offgrid">Offgrid</option>
        </select>

        <label for="group" class="mb-2">Grupo</label>
        <select v-model="group" class="mb-2 bg-gray-100 py-1 px-2 rounded-md cursor-pointer w-2/3">
          <option value="perfil">Perfil</option>
          <option value="modulo">Modulo</option>
          <option value="inversor">Inversor</option>
          <option value="cabos">Cabos</option>
          <option value="conectores">Conectores</option>
          <option value="baterias">Baterias</option>            
        </select>
        
        <p class="my-4 text-lg"><b>Pesos</b></p>
        <label for="grossWeight" class="mb-2">Peso Bruto</label>
        <input type="number" v-model="grossWeight" class="mb-2 bg-gray-100 py-1 px-2 rounded-md w-2/3" step="any">
        <span v-if="grossWeight === ''" class="text-red-500 text-sm mb-2">Por favor digite um peso bruto válido.</span>

        <label for="netWeight" class="mb-2">Peso Líquido</label>
        <input type="number" v-model="netWeight" class="mb-2 bg-gray-100 py-1 px-2 rounded-md w-2/3">
        <span v-if="netWeight === ''" class="text-red-500 text-sm mb-2">Por favor digite um peso líquido válido.</span>
      </div>
      <div class="flex flex-col">
        <p class="mb-4 text-lg"><b>Dimensões Logísticas</b></p>
        <label for="height" class="mb-2">Altura</label>
        <input type="number" v-model="height" class="mb-2 bg-gray-100 py-1 px-2 rounded-md w-2/3">
        <span v-if="height === ''" class="text-red-500 text-sm mb-2">Por favor digite uma altura válida.</span>

        <label for="width" class="mb-2">Largura</label>
        <input type="number" v-model="width" class="mb-2 bg-gray-100 py-1 px-2 rounded-md w-2/3">
        <span v-if="width === ''" class="text-red-500 text-sm mb-2">Por favor digite uma largura válida.</span>

        <label for="depth" class="mb-2">Profundidade</label>
        <input type="number" v-model="depth" class="mb-2 bg-gray-100 py-1 px-2 rounded-md w-2/3">
        <span v-if="depth === ''" class="text-red-500 text-sm mb-2">Por favor digite uma profundidade válida.</span>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '../common/Modal.vue';
import { computed } from 'vue';

export default {
  components: {
    Modal
  },
  props: {
    component: {
      type: Object,
      default: {},
    },
    isEdition: {
      type: Boolean,
      required: true,
    },
    modalVisible: {
      type: Boolean,
      required: true,
    },
    name: null,
    gtim: null,
    sector: null,
    group: null,
    grossWeight: null,
    netWeight: null,
    height: null,
    width: null,
    depth: null
  },
  setup(props, { emit }) {
    const component = computed(() => props.component);
    const isEdition = computed(() => props.isEdition);
    const modalVisible = computed(() => props.modalVisible);
    const modelWrapper = (name = '') => {
      return computed({ 
        get: () => props[name], 
        set: (value) => emit(`update:${name}`, value) 
      });
    } 

    const name = modelWrapper('name');
    const gtim = modelWrapper('gtim');
    const sector = modelWrapper('sector');
    const group = modelWrapper('group');
    const grossWeight = modelWrapper('grossWeight');
    const netWeight = modelWrapper('netWeight');
    const height = modelWrapper('height');
    const width = modelWrapper('width');
    const depth = modelWrapper('depth');

    const onClose = () => {
      emit('cancel');
    }

    const confirmCreation = () => {
      emit('confirm');
    }

    const cancelCreation = () => {
      emit('cancel');
    }

    const editComponent = () => {
      emit('edit');
    }

    const cancelEditionComponent = () => {
      emit('cancel-edit');
    }

    const changeName = (name) => {
      this.$emit('update:modelValue', name);
    }

    const isValidForm = computed(() => 
      !!name.value && 
      !!gtim.value && 
      !!sector.value && 
      !!group.value && 
      !!grossWeight.value && 
      !!netWeight.value && 
      !!height.value && 
      !!width.value && 
      !!depth.value
    );

    const validate = (evt, name) => {
      if(name == 'name'){
        if (!/^[a-zA-Z\s]+$/.test(evt.key)) {
          evt.preventDefault();
        }
      }

      if(name == 'gtim'){
        if(evt.code == 'Backspace') return;
        if(evt.code == 'Tab') return;
        if (!/[0-9]+/.test(evt.key)) evt.preventDefault();
      }

      if(name == 'decimal'){
        if(evt.code == 'Backspace') return;
        if(!/^\d{0,2}(\.\d{0,2}){0,1}$/.test(evt.key)) evt.preventDefault();
      }
    }

    return {
      component,
      isEdition,
      modalVisible,
      changeName,
      confirmCreation,
      cancelCreation,
      editComponent,
      cancelEditionComponent,
      onClose,
      name,
      gtim,
      sector,
      group,
      grossWeight,
      netWeight,
      height,
      width,
      depth,
      isValidForm,
      validate
    }
  },
}
</script>