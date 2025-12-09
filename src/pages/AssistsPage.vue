<script setup>
import {ref} from 'vue';
import GridPicker from 'components/GridPicker.vue';

const entries = ref([
  {
    label: 'Laundry',
    icon: 'mdi-washing-machine',
    color: 'cyan-7',
    to: 'assists/new/laundry',
  },
  {
    label: 'Dishes',
    icon: 'mdi-countertop',
    color: 'teal-6',
    to: 'assists/new/dishes',
  },
  {
    label: 'Trash',
    icon: 'mdi-trash-can',
    color: 'purple-5',
    to: 'assists/new/trash',
  },
  {
    label: 'Paperwork',
    icon: 'mdi-clipboard-text',
    color: 'grey-7',
    to: 'assists/new/paperwork',
  },
  {
    label: 'Repair',
    icon: 'mdi-tools',
    color: 'pink-7',
    to: 'assists/new/repair',
  },
  {
    label: 'Sweep',
    icon: 'mdi-broom',
    color: 'amber-8',
    to: 'assists/new/sweep',
  },
  {
    label: 'Organize',
    icon: 'mdi-package-variant',
    color: 'green-10',
    to: 'assists/new/organize',
  },
  {
    label: 'Disinfect',
    icon: 'mdi-spray-bottle',
    color: 'red-5',
    to: 'assists/new/disinfect',
  },
  {
    label: 'Propane',
    icon: 'mdi-propane-tank',
    color: 'blue',
    to: 'assists/new/propane',
  },
  {
    label: 'RV Tanks',
    icon: 'mdi-emoticon-poop',
    color: 'brown-8',
    to: 'assists/new/rvtanks',
  },
  {},
  {
    label: 'Other',
    icon: 'mdi-anvil',
    color: 'grey-10',
    to: 'assists/new/other',
  },

]);
</script>

<template>
  <q-page class="flex q-px-lg q-pb-lg">
    <grid-picker
      :cols="4"
      :rows="3"
      :entries="entries"
      class="full-width"
    />
  </q-page>
</template>

<style scoped lang="scss">

</style>
