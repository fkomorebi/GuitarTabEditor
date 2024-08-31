<script setup lang="ts">
const props = withDefaults(defineProps<{
  fretNumber: number,
  isLastString: boolean,
}>(),{
    fretNumber: 5,
    isLastString: false,
  }
)

/**
 * 琴弦能不能发出声音
 */
const stringState = ref(true)

const fretPosition = (index: number) => {
  if (index === 1) {
    return 'start'
  } else if (index === props.fretNumber){
    return 'end'
  } else {
    return 'normal'
  }
}

const emit = defineEmits<{
  (e: 'fretClick', num: number):void
}>()

const handleFretClick = (index: number)=> {
  if (index === 0) {
    stringState.value = !stringState.value
  }
  emit('fretClick', index)
}
</script>

<template>
  <div class="flex reactive">
    <fret-space mode="stringState" :init-state="stringState" @fret-click="handleFretClick(0)"></fret-space>
    <fret-space v-for="j in fretNumber" :key="`fret${j}`"
                :fret-position="fretPosition(j)"
                :show-fret-border="!isLastString"
                @fret-click="handleFretClick(j)"
    >
    </fret-space>
  </div>
</template>

<style lang="scss" scoped>
</style>
