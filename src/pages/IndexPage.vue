<template>
  <q-page class="flex q-px-lg q-pb-lg">
    <grid-picker
      :cols="3"
      :rows="3"
      :entries="entries"
      class="full-width"
    />
  </q-page>
</template>

<script setup>
import {ref} from 'vue';
import GridPicker from 'components/GridPicker.vue';
import foodImage from 'assets/home/pexels-janetrangdoan-1092730.jpg';
import healthImage from 'assets/home/pexels-karola-g-4226769.jpg';
import assistsImage from 'assets/home/pexels-pixabay-271711.jpg';
import socialImage from 'assets/home/pexels-d-ng-nhan-324384-1021145.jpg';
import planImage from 'assets/home/pexels-thngocbich-636243.jpg';
import safetyImage from 'assets/home/pexels-atypeek-5650141.jpg';
import statusImage from 'assets/home/pexels-frans-van-heerden-201846-632470.jpg';
import storeImage from 'assets/home/pexels-pixabay-264636.jpg';

const entries = ref([
  {
    label: 'Food',
    iconInline: 'mdi-food-apple',
    color: 'blue-grey',
    background: foodImage,
    to: 'food',
  },
  {
    label: 'Health',
    iconInline: 'mdi-heart-pulse',
    color: 'blue-grey',
    background: healthImage,
    to: 'health',
  },
  {
    label: 'Assists',
    iconInline: 'mdi-home-lightbulb',
    color: 'blue-grey',
    background: assistsImage,
    to: 'assists',
  },
  {
    label: 'Social',
    iconInline: 'mdi-account-group',
    color: 'blue-grey',
    background: socialImage,
    to: 'social',
  },
  {
    label: 'Plan',
    iconInline: 'mdi-calendar',
    color: 'blue-grey',
    background: planImage,
    to: 'plan',
  },
  {
    label: 'Store List',
    iconInline: 'mdi-cart-variant',
    color: 'blue-grey',
    background: storeImage,
    to: 'store',
  },
  {
    label: 'Safety',
    iconInline: 'mdi-cctv',
    color: 'blue-8',
    background: safetyImage,
    to: 'safety',
  },
  {
    label: 'Status',
    iconInline: 'mdi-order-bool-ascending-variant',
    color: 'blue-grey',
    background: statusImage,
    to: 'status',
  },
  {
    label: 'I Need Help',
    icon: 'mdi-car-emergency',
    color: 'orange-7',
    to: 'help',
    touchHold: true,
  }
]);
</script>
