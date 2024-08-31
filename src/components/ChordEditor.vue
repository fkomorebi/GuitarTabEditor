<script setup lang="ts">
import BuildString from '@/components/BuildString.vue'

const props = withDefaults(
  defineProps<{
    stringNumber: number
    fretNumber: number
    mode: 'vertical' | 'horizontal'
  }>(),
  {
    stringNumber: 6,
    fretNumber: 5,
    mode: 'horizontal'
  }
)
/**
 * 维护现在那些弦是按下的
 */
const state = ref<Set<string>>(new Set(Array.from({length: props.stringNumber}).map((_, i) => `${i+1}-0`)))

const emit = defineEmits<{
  (e: 'clickFret', state: Set<string>): void
}>()

const handleFretClick = (stringIndex: number, fretIndex: number) => {
  const stringFret = `${stringIndex}-${fretIndex}`
  if (state.value.has(stringFret)) {
    state.value.delete(stringFret)
  } else {
    state.value.add(stringFret)
  }
  emit('clickFret', state.value)
}

defineExpose({
  state
})
</script>

<template>
  <div v-if="mode === 'horizontal'" class="chord-editor-wrap">
    <div v-for="i in stringNumber" :key="`string${i}`">
      <build-string :is-last-string="stringNumber === i" @fret-click="(fretIndex:number)=>handleFretClick(i, fretIndex)"/>
    </div>
  </div>

  <div v-else>

  </div>
</template>

<style scoped lang="scss">
.chord-editor-wrap {
  overflow: auto;
  padding-top: 30px;
}
</style>
