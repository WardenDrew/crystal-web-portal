<script setup>
import {onMounted, onUnmounted, ref, computed} from 'vue';
import {DateTime} from 'luxon';
import {useRoute} from 'vue-router';
import {useQuasar} from "quasar";

const route = useRoute();
const title = computed(() => route.meta['title']);

const quasar = useQuasar();
const isFullscreen = computed(() => quasar.fullscreen.isActive);
function toggleFullscreen() {
  if (quasar.fullscreen.isActive) {
    quasar.fullscreen.exit();
  }
  else {
    quasar.fullscreen.request();
  }
}

const time = ref('');
let timeUpdateInterval = null;

function setTime() {
  time.value = DateTime.now().toFormat('hh:mm a');
}

onMounted(() => {

  setTime();
  timeUpdateInterval = setInterval(() => {
    setTime();
  }, 200);
})

onUnmounted(() => {
  if (timeUpdateInterval) {
    clearInterval(timeUpdateInterval);
  }
})
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="flex justify-between items-center bg-transparent">
      <div class="flex justify-start items-center">
        <q-btn
          flat
          size="xl"
          icon="mdi-home"
          aria-label="Home"
          to="/"
          class="q-pa-md"
        />
        <h4 v-if="!title" class="q-pa-none q-my-none q-mx-sm">Crystal's Quick Support</h4>
        <div v-else class="flex column justify-center align-start q-mx-sm">
          <h6 class="q-pa-none q-ma-none">Crystal's Quick Support</h6>
          <span class="text-subtitle1">{{title}}</span>
        </div>
      </div>
      <div class="flex justify-end items-center">
        <h4 class="q-pa-none q-ma-none title-time">{{time}}</h4>
        <q-btn
          flat
          size="xl"
          :icon="isFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
          aria-label="Fullscreen Toggle"
          class="q-pa-md"
          @click="toggleFullscreen"
        />
        <q-btn
          flat
          size="xl"
          icon="mdi-cog"
          aria-label="Settings"
          to="settings"
          class="q-pa-md"
          disable
        />
      </div>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
.title-time {
  font-family: monospace;
}
</style>
