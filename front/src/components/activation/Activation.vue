<template>
  <div class="flex justify-center items-center py-8 h-full">

    <div v-if="isValid === 'success'" class="w-1/2 flex flex-col items-center justify-center">
      <div  class="divide-y-2 text-center divide-black">
          <h1 class="text-2xl mb-4">
            <b>Transaction successfully completed!</b>
          </h1>
          <div class="pt-4">
            <h2 class="text-xl mb-12 bg-green-400">
              Start getting money now!
            </h2>
          </div>
      </div>

      <div class="flex flex-col mb-4">
        <span class="text-lg mb-4">
          Now, send a message for us <b>by Telegram</b> with your <b>hash trasaction</b> to configure the product!
        </span>

        <span class="mb-1">
          <b>Your Hash transaction:</b> 
          <a href="https://bscscan.com/tx/0xe85bb2b770f311e813eec535251e120151a89bbcdb358052f16d5fde4dcf38aa" target="_blank" rel="noopener noreferrer" class="hover:text-red-600">
            0xe85bb2b770f311e813eec535251e120151a89bbcdb358052f16d5fde4dcf38aa
          </a>
        </span>
        <span>
         <b>Our Telegram:</b> <a href="https://t.me/snipergateway_admin" target="_blank" rel="noopener noreferrer" class="hover:text-red-600">@falcongateway</a>
        </span>
      </div>
    </div>

    <div v-else-if="isValid === 'fail'" class="text-center">
      <h1 class="text-2xl mb-4">
        <b>Transaction failed!</b>
      </h1>
      <h2 class="text-xl mb-12">
        There was an error in the transaction or some information is invalid.
      </h2>
    </div>

    <div v-else class="flex flex-col">
      <h2 class="mb-6 text-xl">Checking transaction status...</h2>
      <div class="flex justify-center items-center">
        <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-300 h-12 w-12"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as checkoutService from '../../services/checkout/checkoutService';

export default {
  name: 'activation',
  async mounted(){    

    try {
      await checkoutService.validate({ txn: this.$route.params?.txn, address: this.$route.params?.address });
      this.isValid = 'success';
    } catch (error) {    
      this.isValid = 'fail';
    }

  },
  data(){
    return {
      isValid: 'loading',
    }
  },
}
</script>


<style scoped>
  .loader {
    border-top-color: #617267;
    -webkit-animation: spinner 1.5s linear infinite;
    animation: spinner 1.5s linear infinite;
  }

  @-webkit-keyframes spinner {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>