<template>
  <div>
    <Introduction />
    <Operation :components="components" />
    <Calculator :components="components" />
  </div>
</template>

<script>
import Introduction from '../common/Introduction.vue'
import Operation from '../common/Operation.vue'
import Calculator from '../common/Calculator.vue'
import Faq from '../common/Faq.vue'
import useAuth from '../../use/useAuth';
import * as solarService from '../../services/solar/solarService';
import { computed, onMounted, ref, inject, reactive } from 'vue'

export default {
  components: {
    Introduction, Operation, Calculator, Faq
  },
  async setup(){
    const { getUser, isLogged, setLoggin } = useAuth();
    let components = reactive({ values: [] })

    if(isLogged.value){
      setLoggin();
      await getUser();

      const response = await solarService.getSolarComponents();
      components.values = response.solarComponents;
    }

    return {
      components
    }
  }
}
</script>
