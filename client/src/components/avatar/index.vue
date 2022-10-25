<template>
  <div class="avatar" @click.stop="emits('click', user)">
    <el-avatar :icon="User" :src="user.image" />

    <div class="avatar-info">
      <el-button type="info" link>{{ user.username }}</el-button>

      <span v-show="date">{{ date }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { User } from '@element-plus/icons-vue'

import type { PropType } from 'vue'
import type { AuthorResult } from '@/types/response-types'

const props = defineProps({
  user: {
    type: Object as PropType<AuthorResult>,
    required: true
  },
  date: {
    type: String,
    default: ''
  }
})

const emits = defineEmits<{
  (e: 'click', data: AuthorResult): void
}>()
</script>

<style lang="scss" scoped>
.avatar {
  margin-left: 16px;
  display: flex;
  align-items: center;

  &-info {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
}
</style>
