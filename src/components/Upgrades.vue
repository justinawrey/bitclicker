<template>
  <div
    v-for="upgrade in state.upgrades"
    :key="upgrade"
    :class="{ 'cant-upgrade': !getters.canUpgrade(upgrade) }"
  >
    <button @click="maybeUpgrade(upgrade)">
      {{ getters.getUpgradeName(upgrade) }}
    </button>
    <p>cost: {{ getters.getUpgradeCost(upgrade) }}</p>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { BUY_UPGRADE } from "../store";

const { state, getters, dispatch } = useStore();

function maybeUpgrade(upgrade) {
  if (getters.canUpgrade(upgrade)) {
    dispatch(BUY_UPGRADE, upgrade);
  }
}
</script>

<style scoped>
.cant-upgrade {
  background-color: lightcoral;
}

.cant-upgrade button {
  background-color: red;
}
</style>