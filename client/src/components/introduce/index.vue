<template>
  <div class="m-4">
    <a class="text-lg font-bold py-2" :href="url" target="_blank">{{ title }}</a>
    <div class="p-5"><slot></slot></div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  url: String,
  title: String
})
</script>
