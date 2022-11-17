<template>
  <div class="rounded border-2 border-gray-200 bg-gray-100 overflow-hidden dark:bg-gray-600 dark:border-gray-600">
    <div class="bg-white dark:bg-gray-600">
      <slot></slot>
    </div>
    <div class="px-4 py-2 flex justify-between items-center border-t-2 border-gray-200">
      <slot name="fl"></slot>
      <slot name="fr"></slot>
    </div>
  </div>
</template>
