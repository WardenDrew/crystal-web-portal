<script setup>
import {ref} from 'vue';
import GridPicker from 'components/GridPicker.vue';

import bodydoubleImage from 'assets/social/pexels-helenalopes-27177953.jpg';
import natureImage from 'assets/social/pexels-jplenio-1567058.jpg';
import ventImage from 'assets/social/pexels-amar-27350239.jpg';
import hangoutImage from 'assets/social/pexels-a-darmel-6643424.jpg';

const entries = ref([
  {
    label: 'Body Double',
    iconInline: 'mdi-account-multiple-outline',
    color: 'blue-grey',
    background: bodydoubleImage,
    to: 'social/bodydouble'
  },
  {
    label: 'Nature Walk / Drive',
    iconInline: 'mdi-forest',
    color: 'blue-grey',
    background: natureImage,
    to: 'social/nature'
  },
  {
    label: 'Need to Vent',
    iconInline: 'mdi-emoticon-cry',
    color: 'blue-grey',
    background: ventImage,
    to: 'social/vent'
  },
  {
    label: 'Hangout',
    iconInline: 'mdi-multimedia',
    color: 'blue-grey',
    background: hangoutImage,
    to: 'social/hangout'
  },
]);
</script>

<template>
  <q-page class="flex q-px-lg q-pb-lg">
    <grid-picker
      :cols="2"
      :rows="2"
      :entries="entries"
      class="full-width"
    />
  </q-page>
</template>

<style scoped lang="scss">

</style>
