<script setup>
import {ref} from 'vue';

import GridPicker from 'components/GridPicker.vue';

import safeImage from 'assets/food/pexels-muffin-1639930.jpg';
import deliveryImage from 'assets/food/pexels-olga-volkovitskaia-131638009-33542441.jpg';
import dinnerImage from 'assets/food/pexels-chanwalrus-958545.jpg';
import restockImage from 'assets/food/pexels-heyho-6508357.jpg';

const entries = ref([
  {
    label: 'Safe Foods Chart',
    iconInline: 'mdi-silverware',
    color: 'blue-grey',
    background: safeImage,
    to: 'food/safe',
  },
  {
    label: 'Delivery Order',
    iconInline: 'mdi-truck-delivery',
    color: 'blue-grey',
    background: deliveryImage,
    to: 'food/delivery',
  },
  {
    label: 'Dinner Schedule',
    iconInline: 'mdi-food-turkey',
    color: 'blue-grey',
    background: dinnerImage,
    to: 'food/dinner',
  },
  {
    label: 'Restock Item',
    iconInline: 'mdi-fridge-variant-alert',
    color: 'blue-grey',
    background: restockImage,
    to: 'food/restock',
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
