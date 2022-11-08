<template>
  <div class="inline-block" @click.stop="emits('click', user)">
    <div class="avatar">
      <template v-if="user.image">
        <img
          :src="user.image"
          :title="user.username"
          class="inset-0 w-10 h-10 object-cover bg-gray-100 sm:rounded-lg"
        />
      </template>
      <template v-else>
        <div class="inset-0 w-10 h-10 rounded-lg bg-gray-200 align-middle"></div>
      </template>

      <div class="avatar-info">
        <y-button type="info" link>{{ user.username }}</y-button>

        <!-- TODO: 时间格式 -->
        <span v-show="date" class="date">2022-11-08</span>
        <!-- <span v-show="date" class="date">{{ date }}</span> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, type PropType } from 'vue'
import type { AuthorResult } from '@/types/response-types'

import yButton from '@/components/custom/button/button.vue'

const props = defineProps({
  user: {
    type: Object as PropType<AuthorResult>,
    required: true
  },
  date: {
    type: String,
    default: ''
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
    ml: direction === 'row' ? '8px' : 0,
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
