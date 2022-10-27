<template>
  <div class="box">
    <div class="box-body">
      <slot></slot>
    </div>
    <div class="box-footer">
      <slot name="fl"></slot>
      <slot name="fr"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.box {
  background-color: #f7f7f7;
  border: 1px solid #dcdfe6;
  border-radius: 5px;

  &-body {
    background-color: white;
  }

  &-footer {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #dcdfe6;
  }
}
</style>
