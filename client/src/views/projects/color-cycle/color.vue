<template>
  <div class="p-2 grid grid-cols-3 gap-2 rounded">
    <div>
      <label for="red">红色</label>
      <input type="text" :disabled="disabled" name="red" id="red" v-model="red" :pattern="pattern" class="w-full" />
    </div>
    <div>
      <label for="blue">蓝色</label>
      <input type="text" :disabled="disabled" name="blue" id="blue" v-model="blue" :pattern="pattern" class="w-full" />
    </div>
    <div>
      <label for="green">绿色</label>
      <input
        type="text"
        :disabled="disabled"
        name="green"
        id="green"
        v-model="green"
        :pattern="pattern"
        class="w-full"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'

const props = defineProps({
  color: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['change'])

/** Variable */
const pattern = '[0-9abcdefABCDEF]{2}'
let red = ref('')
let blue = ref('')
let green = ref('')

/** Operation */
const init = () => {
  if (!props.color) return

  red.value = props.color.substring(1, 3)
  blue.value = props.color.substring(3, 5)
  green.value = props.color.substring(5, 7)
}

/** Compute */
const computedColor = computed(() => {
  return {
    red: red.value,
    blue: blue.value,
    green: green.value
  }
})

/** Watch */
watch(
  () => computedColor.value,
  (newValue, oldValue) => {
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      handleColor(newValue)
    }
  }
)

/** Operation */
const handleColor = (value: { red: string; blue: string; green: string }) => {
  emits('change', `#${matchColor(value.red)}${matchColor(value.blue)}${matchColor(value.green)}`)
}
const matchColor = (value: string) => value.replace(/[^0-9abcdefABCDEF]/g, '').substring(0, 2)

/** Lifecycle Hooks */
onMounted(() => {
  init()
})
</script>

<style lang="postcss" scoped>
@tailwind components;

@layer components {
  label {
    @apply text-sm;
  }
}

input:invalid {
  border: 1px solid red;
}
</style>
