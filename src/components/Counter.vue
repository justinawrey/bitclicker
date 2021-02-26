<template>
  <div>
    <button @click="store.commit(INCREMENT_BY_ACTIVE_STEP)">
      BTC: {{ store.state.count }}
    </button>
    <div>rate: {{ store.state.passiveStep }}</div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { INCREMENT_BY_ACTIVE_STEP } from "../store";

const store = useStore();
</script>