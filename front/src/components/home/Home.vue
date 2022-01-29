<template>
  <div>
    <Introduction />
    <Operation />
  </div>
</template>

<script>
import Introduction from '../common/Introduction.vue'
import Operation from '../common/Operation.vue'
import Purchase from '../common/Purchase.vue'
import Faq from '../common/Faq.vue'

export default {
  components: {
    Introduction, Operation, Purchase, Faq
  }
}
</script>
