<template>
  <pre>{{ bits }}</pre>
</template>

<script setup>
import { ref, onUnmounted, computed, watch } from "vue";
import { useStore } from "vuex";
const { state } = useStore();

const bits = ref("");
refresh();
function getBits() {
  let builder = "";
  for (let i = 0; i < 256; i++) {
    builder = `${builder}${String(Math.round(Math.random()))}`;
    if ([32, 64, 96, 128, 160, 192, 224, 256].includes(i + 1)) {
      builder = `${builder}\n`;
    }
  }
  return builder;
}

function refresh() {
  bits.value = getBits();
}

const refreshRate = computed(() => Math.max(1000 / state.passiveStep, 16.66)); // max out at 60fps
watch(refreshRate, (refreshRate) => {
  clearInterval(interval);
  interval = setInterval(refresh, refreshRate);
});

let interval = setInterval(refresh, refreshRate.value);
onUnmounted(() => {
  clearInterval(interval);
});
</script>