<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ChordEditor from '@/components/ChordEditor.vue'
import ChordProduction from '@/components/ChordProduction.vue'
import type { Chord, ChordSettings } from 'svguitar'

const { t: $t } = useI18n()

const maxInputNumber = 50

const chordProductionDom = ref()
const title = ref<string>('')
const startFret = ref<number>(0)
const numberOfFret = ref<number>(5)
const numberOfString = ref<number>(6)
const chartConfig = ref<ChordSettings>({})
const chord = ref<Chord>({
  fingers: [],
  barres: []
})
const chordEditorDom = ref()

onBeforeMount(()=>{
  nextTick(()=>{
    handleClickFret(chordEditorDom.value.state)
  })
})

const handleClickFret = (state:Set<string>) => {
  console.log('state', state)
  const fretPress = Array.from(state)
  const fretPressArr = fretPress.map(i=>i.split('-'))
  chord.value.fingers = fretPressArr.map(i=>{
    const [string, fret] = i
    return [parseInt(string), parseInt(fret)]
  })
}

const handleDownload = (type: string) => {
  if (!chordProductionDom.value) {
    throw new Error("chordProductionDom is not a valid")
  }
  chordProductionDom.value.download(type)
}

</script>

<template>
  <div class="flex flex-col gap-5">
    <el-form class="flex flex-row gap-3">
      <el-input :placeholder="$t('title')" :v-model="title"/>
      <el-input :placeholder="$t('startFret')" type="number" :v-model="startFret"/>
      <el-input :placeholder="$t('numberOfFret')" type="number" :v-model="numberOfFret"/>
      <el-input :placeholder="$t('numberOfString')" type="number" :v-model="numberOfString"/>
    </el-form>
      <el-card style="width:100%; height: 100%;">
        <chord-editor :fret-number="numberOfFret" :string-number="numberOfString" @click-fret="handleClickFret" ref="chordEditorDom"/>
      </el-card>
      <el-card style="width:100%; height: 100%;">
        <chord-production ref="chordProductionDom" :chart-config="chartConfig" :chord="chord"/>
      </el-card>
    <el-button @click="handleDownload('')" type="primary">{{ $t('download') }}</el-button>
  </div>
</template>

<style scoped lang="scss">
</style>
