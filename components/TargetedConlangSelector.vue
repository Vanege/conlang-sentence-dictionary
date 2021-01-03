<template>
  <div class="tcs-container">
    <template v-for="conlangName in ['Globasa', 'Langugu']">
      <div :key="conlangName" class="tcs-choice" :class="{'selected': targetedConlang === conlangName}" @click="changeTargetedConlang(conlangName)">
        {{ conlangName }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { isDefined } from '~/tools/type-guards'

@Component
export default class TargetedConlangSelector extends Vue {
  get targetedConlang(): string { return this.$store.state.targetedConlang }

  changeTargetedConlang(conlangName: string) {
    this.$router.push({ path: '', query: { targetedConlang: conlangName } })
  }

  @Watch('$route.query')
  routeQueryWatcher() {
    this.updateStoreUsingQuery()
  }

  mounted() {
    this.updateStoreUsingQuery()
  }

  updateStoreUsingQuery() {
    const targetedConlang = this.$route.query?.targetedConlang ?? null
    if (!isDefined(targetedConlang)) { return }
    this.$store.commit('setProperty', {
      property: 'targetedConlang',
      value: targetedConlang
    })
  }
}
</script>

<style lang="scss" scoped>
.tcs-container {
  display: flex;

  .tcs-choice {
    border: 1px black solid;

    &:hover {
      cursor: pointer;
    }

    &.selected {
      background-color: lightgrey;
    }
  }

}
</style>
