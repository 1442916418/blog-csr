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
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  background-color: #f7f7f7;
  overflow: hidden;

  &-body {
    background-color: white;
  }

  &-footer {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #dcdfe6;
  }
}
</style>
