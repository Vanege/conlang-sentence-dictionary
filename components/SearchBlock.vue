<template>
  <div>
    <v-text-field
      v-model="searchedText"
      outlined
      placeholder="Enter the text in English or Globasa that you want to search"
      value.sync="searchedText"
    />
    <template v-if="searchedText.length > 2">
      <ListOfMatches
        :matches="ENGLBSMatches"
        :title="'English -> Globasa matches'"
        :other-language-code="'EN'"
        :is-other-language-bolded="true"
      />
      <ListOfMatches
        :matches="hasGLBSENMatches"
        :title="'Globasa -> English matches'"
        :other-language-code="'EN'"
        :is-globasa-bolded="true"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { SentenceRow } from '~/types'
import ListOfMatches from '~/components/ListOfMatches.vue'

@Component({
  components: {
    ListOfMatches
  }
})
export default class SearchBlock extends Vue {
  searchedText: string = ''
  matchesMax: number = 20

  // TODO: display wordRows (dictionary) somewhere else
  get ENGLBSRows(): SentenceRow[] { return [...this.$store.state.englishSentenceRows, ...this.$store.state.wordRows] }
  get stringToMatch(): string { return this.searchedText.toLowerCase() }
  get ENGLBSMatches(): SentenceRow[] { return this.ENGLBSRows.filter(sr => sr.otherLanguage.match(new RegExp(this.stringToMatch, 'i'))).sort((a, b) => a.otherLanguage.length - b.otherLanguage.length) };
  get GLBSENMatches(): SentenceRow[] { return this.ENGLBSRows.filter(sr => sr.globasa.match(new RegExp(this.stringToMatch, 'i'))).sort((a, b) => a.globasa.length - b.globasa.length) };
  get hasENGLBSMatches(): boolean { return this.ENGLBSMatches.length > 0 }
  get hasGLBSENMatches(): boolean { return this.GLBSENMatches.length > 0 }
}
</script>

<style lang="scss" scoped>
.match {
  margin-top: 10px;
  margin-left: 10px;
}
.matches-header{
  margin-top: 20px;
}
</style>
