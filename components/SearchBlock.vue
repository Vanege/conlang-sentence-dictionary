<template>
  <div>
    <v-text-field
      v-model="searchedText"
      outlined
      placeholder="Type substring in Esperanto, English or Globasa to browse matches in the corpuses or the dictionary"
      value.sync="searchedText"
    />
    <template v-if="searchedText.length > 2">
      <ListOfMatches
        :matches="EOGLBSMatches"
        :title="'Esperanto -> Globasa matches'"
        :title-color="'green'"
        :other-language-code="'EO'"
        :is-other-language-bolded="true"
      />
      <ListOfMatches
        :matches="GLBSEOMatches"
        :title="'Globasa -> Esperanto matches'"
        :other-language-code="'EO'"
        :is-globasa-bolded="true"
      />
      <ListOfMatches
        :matches="ENGLBSMatches"
        :title="'English -> Globasa matches'"
        :title-color="'blue'"
        :other-language-code="'EN'"
        :is-other-language-bolded="true"
      />
      <ListOfMatches
        :matches="GLBSENMatches"
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
  get stringToMatch(): string { return this.searchedText.toLowerCase() }

  get EOGLBASRows(): SentenceRow[] { return [...this.$store.state.esperantoSentenceRows] }
  get EOGLBSMatches(): SentenceRow[] { return this.EOGLBASRows.filter(sr => sr.otherLanguage.match(new RegExp(this.stringToMatch, 'i'))).sort((a, b) => a.otherLanguage.length - b.otherLanguage.length) };
  get GLBSEOMatches(): SentenceRow[] { return this.EOGLBASRows.filter(sr => sr.globasa.match(new RegExp(this.stringToMatch, 'i'))).sort((a, b) => a.globasa.length - b.globasa.length) };

  // TODO: display wordRows (dictionary) somewhere else
  get ENGLBSRows(): SentenceRow[] { return [...this.$store.state.englishSentenceRows, ...this.$store.state.wordRows] }
  get ENGLBSMatches(): SentenceRow[] { return this.ENGLBSRows.filter(sr => sr.otherLanguage.match(new RegExp(this.stringToMatch, 'i'))).sort((a, b) => a.otherLanguage.length - b.otherLanguage.length) };
  get GLBSENMatches(): SentenceRow[] { return this.ENGLBSRows.filter(sr => sr.globasa.match(new RegExp(this.stringToMatch, 'i'))).sort((a, b) => a.globasa.length - b.globasa.length) };
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
