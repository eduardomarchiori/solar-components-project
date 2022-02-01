<template>
  <section class="bg-gray-200">
    <div class="flex justify-center py-20">
      <div class="w-9/12 text-center flex flex-col items-center">
        <h2 class="text-2xl color-primary font-bold mb-2">Calculadora</h2>
        <span class="text-md">Calcule a cubagem dos seus componentes agora mesmo.</span>
        <div class="flex flex-col p-2 mt-8 w-2/3">
          <Multiselect class="mb-8"
            noResultsText="Não há items para serem selecionados"
            ref="multiselect"
            mode="multiple"
            placeholder="Selecione os componentes"
            :close-on-select="false"
            v-model="componentsSelected"
            :options="componentsMapped"
            @clear="clear">
              <template v-slot:multiplelabel="{ values }">
                <div class="multiselect-multiple-label">
                  {{ values.length }} items selecionados
                </div>
              </template>
          </Multiselect>
          <div class="flex flex-col items-start mb-4">
            <div v-for="component in componentsSelected" :key="component.id">
              <div class="inline-flex justify-center px-2 py-2 mr-4 w-/12 font-bold leading-none text-white bg-primary rounded-md mb-4 w-40 cursor-pointer" @click="removeSelected(component)">
                <span class="truncate">
                {{ getSelectedById(component).name }}
                </span>
              </div>
              <input type="number" placeholder="Quantidade..." class="px-2 rounded-md py-1" v-model="getSelectedById(component).quantity">
            </div>
          </div>
          <div class="flex">
            <div>
              <button class="bg-white text-green-600 mr-4 rounded-md text-md w-40 h-32 hover:bg-green-500 hover:text-white" @click="calculate">Calcular</button>
            </div>
            <div class="bg-white w-full rounded-md grid grid-cols-3 gap-4">
              <div class="flex flex-col justify-center items-center">
                <span class="mb-2">Cubagem</span>
                <span class="font-bold text-3xl color-primary">{{result?.cubagem || 0}}</span>
              </div>
              <div class="flex flex-col justify-center items-center">
                <span>Peso bruto</span>
                <span class="font-bold text-3xl color-primary">{{result?.pesoBruto || 0}}</span>
              </div>
              <div class="flex flex-col justify-center items-center">
                <span>Peso líquido</span>
                <span class="font-bold text-3xl color-primary">{{result?.pesoLiquido || 0}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, onMounted, ref, inject, reactive } from 'vue'
import * as solarService from '../../services/solar/solarService';
import Multiselect from '@vueform/multiselect'

export default {
  components: {
    Multiselect,
  },
  props: {
    components: {
      type: Object,
      required: true
    }
  },
  async setup(props) {
    const components = props.components;
    const componentsSelected = ref(null);
    const multiselect = ref(null);
    const result = ref(null);

    const componentsMapped = computed(() => components.values.map(({ id, name }) => ({
      label: name,
      value: id
    })));

    const calculate = async () => {
      const selecteds = components.values.filter((el) =>{
        return componentsSelected.value.find((selected) => selected === el.id);
      })

      try {
       result.value = await solarService.calculateCubage({
        components: selecteds.map(({ id, quantity }) => ({ id, quantidade: quantity }))
       });
      } catch (error) {
        console.log(error);
      }
    }

    const getSelectedById = (id) => components.values.find(el => el.id === id);

    const removeSelected = (id) => {
      const selected = getSelectedById(id);
      selected.quantity = null;
      multiselect.value.remove(selected.id);
    }

    const clear = () => {
      components.values.forEach((value) =>{
        value.quantity = null;
      });
    }

    return {
      componentsSelected,
      componentsMapped,
      calculate,
      removeSelected,
      multiselect,
      result,
      getSelectedById,
      clear
    }
  }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>