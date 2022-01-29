<template>
  <div class="flex justify-center items-center py-8">
    <div class="w-1/2 flex flex-col items-center justify-center">
      <h2 class="text-xl"><b>Tool for calculating gas fee taxes</b></h2>
      <h2 class="mt-2 mb-12 text-md">You have to have the calculated result (BNB gas value) in your wallet.</h2>

      <div class="bg-white shadow-2xl rounded-xl calculator flex flex-col items-center justify-center px-4">
        <div class="flex flex-col items-center space-event h-full">
          <div>
            <span class="text-md"><b>Gas Fee Calculator</b></span>
          </div>
          <div class="flex flex-col text-center">
            <label for="gas" class="text-left text-sm">Max gas</label>
            <input placeholder="6400000" id="gas" class="border border-black rounded-md mb-2 mt-1 py-1 px-2" type="number" v-model="gas">
            <label for="gwei" class="text-left text-sm">Gwei</label>
            <input placeholder="30" id="gwei" class="border border-black rounded-md mb-2 px-2 mt-1 py-1" v-model="gwei">
            <span class="my-2 ">Buy and sell</span>
            <span class="my-2"><b>{{amount}} BNB</b></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    gas: 6400000,
    gwei: 30
  }),
  computed:{
    amount(){
      return (((this.gas * this.gwei) * 2) * 0.000000001).toFixed(5);
    }
  }
}
</script>


<style scoped>
  .calculator {
    height:400px;
  }

  .space-event {
    justify-content:space-evenly;
  }
</style>