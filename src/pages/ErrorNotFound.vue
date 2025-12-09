<template>
  <div class="fullscreen text-center q-pa-md flex column flex-center">
    <h2 class="q-pa-none q-ma-none">
      Oops. Nothing here...
    </h2>

    <q-btn
      class="q-mt-xl"
      color="red"
      push
      icon="mdi-history"
      label="Go Back"
      stack
      size="xl"
      @click="historyBack"
    />
  </div>
</template>

<script setup>
function historyBack() {
  window.history.back();
}
</script>
