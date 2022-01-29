<template>
  <section class="bg-secondary" id="buy">
    <div class="flex justify-center py-20">
      <div class="w-9/12 text-center">
        <h2 class="text-2xl font-bold mb-2 color-tertiary">Buy right now</h2>
        <span class="text-md color-tertiary">For you to get the best results, we have prepared amazing products.</span>
        <div class="flex justify-center mt-8">
          <div class="bg-primary rounded-xl p-4 shadow-xl mt-4 w-48 mx-4">
            <div class="flex flex-col justify-center items-center">
              <img src="https://cdn3d.iconscout.com/3d/premium/thumb/upload-social-media-post-4291893-3569926.png" class="w-auto h-40 rounded-lg"/>
              <p class="font-semibold text-xl mb-1 color-tertiary">Falcon Node</p>
              <p class="font-semibold text-sm text-center color-tertiary">With our nodem you will have 0-2 ms when buying the token</p>
              <button class=" mt-4 bg-secondary shadow-xl color-tertiary font-bold py-2 px-4 rounded" @click="buy('node')">
                BUY
              </button>                
            </div>
          </div>
          <div class="bg-primary rounded-xl p-4 shadow-xl mt-4 w-48 mx-4">
            <div class="h-full flex flex-col justify-between items-center">
              <img src="https://cdn3d.iconscout.com/3d/premium/thumb/upload-social-media-post-4291893-3569926.png" class="w-auto h-40 rounded-lg"/>
              <p class="font-semibold text-xl mb-1 color-tertiary">Falcon Bot</p>
              <p class="font-semibold text-sm text-center color-tertiary">With our bot, you will trade on the liquidity block</p>
              <button class=" mt-4 bg-secondary shadow-xl color-tertiary font-bold py-2 px-4 rounded" @click="buy('bot')">
                BUY
              </button>                
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Web3 from 'web3/dist/web3.min.js';
import * as checkoutService from '../../services/checkout/checkoutService';

export default {
  async mounted(){
    const response = await checkoutService.getPrices();
    this.prices = response.prices;
  },
  data(){
    return {
      prices: {},
    }
  },
  methods: {
    async buy(product) {  
      if (typeof window.ethereum !== 'undefined') {
        await ethereum.request({ method: 'eth_requestAccounts' }); 
  
        if(ethereum.chainId !== '0x38'){
          ethereum.request({ method: 'wallet_switchEthereumChain', params:[{chainId: '0x38'}]});
          return;
        }
  
        const web3 = new Web3('https://bsc-dataseed1.binance.org:443');
        const reciever = '0x5DE608c1884ba36E16EB02F883C972C1b206F622';
  
        const gasPrice = await web3.eth.getGasPrice();

        try {        
          const hash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [
              {
                from: ethereum.selectedAddress,
                to: reciever,
                value: web3.utils.toHex(web3.utils.toWei(this.prices[product], 'ether')),
                gasPrice: web3.utils.toHex(gasPrice),
                gas: web3.utils.toHex(100000),
              },
            ],
          });

          this.$router.push({ name: 'activation', params: { 
            txn: hash,
            address: ethereum.selectedAddress
          }});
  
        } catch (error) {
          console.log(error);
        }
  
      }
    }
  }
}

</script>