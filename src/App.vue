<template>
  <header class="header">
    <div class="left">
      <Counter />
      <Bits />
    </div>
    <Upgrades />
  </header>
</template>

<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";

import "./main.css";
import { START_COUNTER } from "./store";
import Counter from "./components/Counter.vue";
import Upgrades from "./components/Upgrades.vue";
import Bits from "./components/Bits.vue";

const store = useStore();

onMounted(() => {
  store.dispatch(START_COUNTER);
});
</script>

<style scoped>
.header {
  display: flex;
}

.left {
  margin-right: auto;
}
</style>