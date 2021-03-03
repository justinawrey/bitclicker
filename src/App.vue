<template>
  <header class="header">
    <div class="left">
      <Counter />
      <Bits />
    </div>
    <Upgrades />
  </header>
  <Inventory />

  <SideEffects />
</template>

<script setup>
import Counter from "./components/Counter.vue";
import Upgrades from "./components/Upgrades.vue";
import Bits from "./components/Bits.vue";
import Inventory from "./components/Inventory.vue";
import SideEffects from "./components/SideEffects.vue";
</script>

<style scoped>
.header {
  display: flex;
}

.left {
  margin-right: auto;
}
</style>