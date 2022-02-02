<template>
  <div>
    <Toaster :toaster="toaster" />
    <Introduction />
    <Operation :components="components" @updateComponents="updateComponents" />
    <Calculator :components="components" @updateComponents="updateComponents" />
  </div>
</template>

<script>
import Introduction from '../common/Introduction.vue';
import Operation from '../common/Operation.vue';
import Calculator from '../common/Calculator.vue';
import useAuth from '../../use/useAuth';
import * as solarService from '../../services/solar/solarService';
import { ref, reactive } from 'vue';
import Toaster from '../common/Toaster.vue';

export default {
  components: {
    Introduction, Operation, Calculator, Toaster
  },
  async setup(){
    const { getUser, isLogged, setLoggin } = useAuth();
    let components = reactive({ values: [] });
    const toaster = ref(null);

    const updateComponents = async () => {
      try {        
        const response = await solarService.getSolarComponents();
        components.values = response.solarComponents;
      } catch (e) {
        const { error, content } = e.response.data
        toaster.value = {
          type: 'error',
          title: error,
          message: content
        }
      }
    }

    setLoggin();
    if(isLogged.value){
      setLoggin();
      await getUser();

      updateComponents();
    }

    return {
      components,
      updateComponents,
      toaster
    }
  }
}
</script>
