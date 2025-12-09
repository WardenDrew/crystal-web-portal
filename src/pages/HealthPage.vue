<script setup>
import {ref} from 'vue';
import GridPicker from 'components/GridPicker.vue';

import medicationImage from 'assets/health/pexels-shvetsa-3683074.jpg';
import cannabisImage from 'assets/health/pexels-fecundap6-2178565.jpg';
import massageImage from 'assets/health/pexels-kindelmedia-7298899.jpg';
import appointmentsImage from 'assets/health/pexels-rdne-6129111.jpg';

const entries = ref([
  {
    label: 'Medications',
    iconInline: 'mdi-medication',
    color: 'blue-grey',
    background: medicationImage,
    to: 'health/medication',
  },
  {
    label: 'Cannabis',
    iconInline: 'mdi-cannabis',
    color: 'blue-grey',
    background: cannabisImage,
    to: 'health/medication',
  },
  {
    label: 'Massage',
    iconInline: 'mdi-hand-clap',
    color: 'blue-grey',
    background: massageImage,
    to: 'health/massage',
  },
  {
    label: 'Appointments',
    iconInline: 'mdi-hospital-building',
    color: 'blue-grey',
    background: appointmentsImage,
    to: 'health/appointments',
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
