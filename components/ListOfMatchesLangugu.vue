<template>
  <div v-if="matches.length > 0">
    <div class="matches-title" :style="{'color': titleColor}">
      {{ title }}
    </div>
    <div v-for="(match, index) in matches" :key="`${otherLanguageCode}-${isOtherLanguageBolded}-match-${index}`" class="match">
      <template v-if="index < MAX_MATCHES">
        {{ otherLanguageCode }}: <span :class="{'bolded': isOtherLanguageBolded}">{{ match.esperanto }}</span><br>
        LU: <span :class="{'bolded': isLanguguBolded}">{{ match.langugu }}</span>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { SentenceRow } from '~/types'

@Component
export default class ListOfMatches extends Vue {
  @Prop({ default: [] }) matches!: SentenceRow[];
  @Prop({ default: 'xxx -> xxx matches:' }) title!: string;
  @Prop({ default: 'black' }) titleColor!: string;
  @Prop({ default: 'EO' }) otherLanguageCode!: string;
  @Prop({ default: false }) isOtherLanguageBolded!: boolean;
  @Prop({ default: false }) isLanguguBolded!: boolean;

  MAX_MATCHES = 10;
}
</script>

<style lang="scss" scoped>
.matches-title{
  margin-top: 20px;
}
.match {
  margin-top: 10px;
  margin-left: 10px;
}
.bolded {
  font-weight: bold;
}
</style>
