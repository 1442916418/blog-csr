<template>
  <div class="avatar" @click.stop="emits('click', user)">
    <el-avatar :icon="User" :src="user.image" :size="avatarSize" />

    <div class="avatar-info">
      <el-button type="info" link>{{ user.username }}</el-button>

      <span v-show="date">{{ date }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { User } from '@element-plus/icons-vue'

import { computed, type PropType } from 'vue'
import type { AuthorResult } from '@/types/response-types'

const props = defineProps({
  user: {
    type: Object as PropType<AuthorResult>,
    required: true
  },
  date: {
    type: String,
    default: ''
  },
  avatarSize: {
    type: [String, Number],
    default: 'default',
    validator(value: string | number) {
      if (typeof value === 'number') return true

      return ['large', 'small', 'default'].includes(value)
    }
  },
  direction: {
    type: String,
    default: 'row',
    validator(value: string) {
      return ['row', 'row-reverse', 'column', 'column-reverse'].includes(value)
    }
  }
})

const emits = defineEmits<{
  (e: 'click', data: AuthorResult): void
}>()

/** Compute */
const styles = computed(() => {
  const { direction } = props
  return {
    direction: direction,
    ml: direction === 'row' ? '12px' : 0,
    mt: direction === 'row' ? 0 : '12px'
  }
})
</script>

<style lang="scss" scoped>
.avatar {
  margin-left: v-bind('styles.ml');
  display: flex;
  flex-direction: v-bind('styles.direction');
  align-items: center;

  &-info {
    margin-top: v-bind('styles.mt');
    margin-left: v-bind('styles.ml');
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
}
</style>
