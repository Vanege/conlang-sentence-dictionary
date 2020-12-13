<template>
  <div v-if="matches.length > 0">
    <div class="matches-title">
      {{ title }}
    </div>
    <div v-for="(match, index) in matches" :key="`${otherLanguageCode}-${isOtherLanguageBolded}-match-${index}`" class="match">
      <template v-if="index < MAX_MATCHES">
        {{ otherLanguageCode }}: <span :class="{'bolded': isOtherLanguageBolded}">{{ match.otherLanguage }}</span><br>GLBS: <span :class="{'bolded': isGlobasaBolded}">{{ match.globasa }}</span>
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
  @Prop({ default: 'EN' }) otherLanguageCode!: string;
  @Prop({ default: false }) isOtherLanguageBolded!: boolean;
  @Prop({ default: false }) isGlobasaBolded!: boolean;

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
