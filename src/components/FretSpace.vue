<script setup lang="ts">
import { watchEffect } from 'vue'

const props = withDefaults(defineProps<{
  mode: 'normal' | 'stringState'
  fretPosition?: 'start' | 'normal' | 'end',
  showFretBorder?: boolean,
  initState?: boolean
}>(), {
  fretPosition: 'normal',
  showFretBorder: true,
  mode: 'normal',
  initState: false
})
enum FretState {
  IDLE,
  SELECTED,
}
const state = ref(props.initState ? FretState.SELECTED : FretState.IDLE)
const emit = defineEmits<{
  (e: 'fretClick'): void
}>()
const handleClick = () => {
  state.value = state.value === FretState.IDLE ? FretState.SELECTED: FretState.IDLE
  emit('fretClick')
}


</script>

<template>
  <div class="fret flex-no_change_size"
       :class="{
          'strings': mode === 'normal',
          'fret_start': fretPosition === 'start',
          'fret_normal': fretPosition === 'normal',
          'fret_end': fretPosition === 'end',
          'fret-no_border': !showFretBorder || mode === 'stringState',
  }">
    <div class="fret-target" @click="handleClick" :class="{'fret-selected': state === FretState.SELECTED && mode === 'normal', 'string-selected': state === FretState.SELECTED && mode === 'stringState', 'string-disabled': state === FretState.IDLE && mode === 'stringState'}">
    </div>
  </div>
</template>

<style scoped lang="scss">

$--fret-height: 40px;
$--fret-width: 50px;


.flex-no_change_size {
  flex-shrink: 0;
  flex-grow: 0;
}
.strings {
  border-top: solid 3px #888;
}

.fret {
  position: relative;
  height: $--fret-height;
  width: $--fret-width;
  text-align: center;
}
.fret-border {
  border-left: 3px double #ccc;
}

.fret_start {
  @extend .fret;
  border-left: 6px solid #777;
}

.fret_normal {
  @extend .fret;
  border-left: 3px solid #777;
}

.fret_end {
  @extend .fret_normal;
  border-right: 6px solid #777;
}

.fret-no_border {
  @extend .fret;
  border-left-color: rgba($color: #000000, $alpha: 0);
  border-right-color: rgba($color: #000000, $alpha: 0);
}
.fret-target {
  border-radius: 50%;
  height: $--fret-height;
  width: $--fret-height;
  margin: auto;
  position: absolute;
  top: -50%;
  left: ($--fret-width - $--fret-height ) * 0.5;
}
.fret-selected {
  background: black;
}
.evt-target {
  width: $--fret-width;
  height: $--fret-height * 0.5;
  position: absolute;
  top: -25%;
}
.string-selected {
  @extend .fret-selected;
}
.string-disabled {
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
  &::after {
    content: "✖️";
    font-size: 30px;
  }
}
</style>
