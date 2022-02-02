<script setup>
import Header from './components/header/Header.vue';
import Footer from './components/footer/Footer.vue';
</script>

<template>
  <div class="content">
    <Header />
      <main class="flex flex-col justify-center bg-primary">
        <Suspense>
          <router-view />
        </Suspense>
      </main>
    <Footer />
  </div>
</template>

<style>
main {
  flex-grow: 1;
}

.content {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

html, body {
  width: 100%;
  height: 100%;
}

header, main, footer {
  flex-shrink: 0;
}
</style>
