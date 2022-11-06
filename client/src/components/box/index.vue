<template>
  <div class="rounded border-2 border-gray-200 bg-gray-100 overflow-hidden">
    <div class="bg-white">
      <slot></slot>
    </div>
    <div class="px-4 py-2 flex justify-between items-center border-t-2 border-gray-200">
      <slot name="fl"></slot>
      <slot name="fr"></slot>
    </div>
  </div>
</template>
