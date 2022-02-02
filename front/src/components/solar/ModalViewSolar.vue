<template>
  <Modal 
    name="modal-view"
    v-model="isVisualization"
    @close="onClose"
    noAction="false">
    <template v-slot:title>Criar componente fotovoltaico</template>
    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col">
        <p class="mb-4 text-lg"><b>Dados Gerais</b></p>
        <span for="gtim" class="mb-1 font-bold">Nome</span>
        <span class="mb-4">{{ component.name }}</span>
        <span for="gtim" class="mb-1 font-bold">GTIM</span>
        <span class="mb-4">{{ component.gtim }}</span>
        <span for="gtim" class="mb-1 font-bold">Segmento</span>
        <span class="mb-4">{{ component.sector }}</span>
        <span for="gtim" class="mb-1 font-bold">Grupo</span>
        <span class="mb-4">{{ component.group }}</span>
        <p class="my-4 text-lg"><b>Pesos</b></p>
        <span for="gtim" class="mb-1 font-bold">Peso Bruto</span>
        <span class="mb-4">{{ component.grossWeight }}</span>
        <span for="gtim" class="mb-1 font-bold">Peso Líquido</span>
        <span class="mb-4">{{ component.netWeight }}</span>
      </div>
      <div class="flex flex-col">
        <p class="mb-4 text-lg"><b>Dimensões Logísticas</b></p>
        <span for="gtim" class="mb-1 font-bold">Altura</span>
        <span class="mb-4">{{ component.height }}</span>
        <span for="gtim" class="mb-1 font-bold">Largura</span>
        <span class="mb-4">{{ component.width }}</span>
        <span for="gtim" class="mb-1 font-bold">Profundidade</span>
        <span class="mb-4">{{ component.depth }}</span>
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
      required: true,
    },
    isVisualization: {
      type: Boolean,
      required: true,
    }
  },
  setup(props, { emit }) {
    const component = computed(() => props.component);
    const isVisualization = computed(() => props.isVisualization);

    const onClose = () => {
      emit('cancel');
    }

    return {
      component,
      isVisualization,
      onClose
    }
  },
}
</script>