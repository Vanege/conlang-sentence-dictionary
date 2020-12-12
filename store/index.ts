import { Store } from 'vuex/types/index'
import { isDefined } from '~/tools/type-guards'
import { SentenceRow, emptySentenceRowFactory, WordRow, emptyWordRowFactory } from '~/types'

type State = {
  englishSentenceRows: SentenceRow[],
  wordRows: WordRow[]
}

export const state = (): State => ({
  englishSentenceRows: [],
  wordRows: []
})

export const mutations = {
  setProperty<Property extends keyof State> (state: State, {
    property,
    value
  }: {
    property: Property,
    value: State[Property]
  }) {
    state[property] = value
  }
}

export const actions = {
  async getStoreData (store: Store<State>) {
    await Promise.all([
      getSentences(store, this),
      getWords(store, this)
    ])
  }
}

const getSentences = async function(store: Store<State>, that: any) {
  const googleSpreadsheetId = '1aeo2v0MG6VGSio12-t0issmL1N2DIdwG4l5GpMFBVIc'
  const url = `https://spreadsheets.google.com/feeds/cells/${googleSpreadsheetId}/1/public/full?alt=json`
  const json = await that.$axios.$get(url)
  const entries = json.feed.entry.map(e => e.gs$cell)

  let englishSentenceRows: SentenceRow[] = []
  for (const entry of entries) {
    const { row, col, inputValue } = entry
    const sentenceRowPatch = {
      ...(col === '1' && { otherLanguage: inputValue }),
      ...(col === '2' && { globasa: inputValue })
    }
    const sentenceRow = englishSentenceRows[row]
    englishSentenceRows[row] = isDefined(sentenceRow) ? { ...sentenceRow, ...sentenceRowPatch } : { ...emptySentenceRowFactory(), ...sentenceRowPatch }
  }
  englishSentenceRows = englishSentenceRows.filter(wR => isDefined(wR))
  // remove the first row that names the columns
  englishSentenceRows.shift()
  // remove the rows that are comments
  englishSentenceRows = englishSentenceRows.filter(sr => !sr.otherLanguage.includes('--'))
  store.commit('setProperty', {
    property: 'englishSentenceRows',
    value: englishSentenceRows
  })
}

const getWords = async function(store: Store<State>, that: any) {
  const googleSpreadsheetId = '13iyvBfs3nqDID0n5EedG_bJKgL8CCHIW0ToJxRT-E6c'
  const url = `https://spreadsheets.google.com/feeds/cells/${googleSpreadsheetId}/1/public/full?alt=json`
  const json = await that.$axios.$get(url)
  const entries = json.feed.entry.map(e => e.gs$cell)

  let wordRows: WordRow[] = []
  for (const entry of entries) {
    const { row, col, inputValue } = entry
    const wordRowPatch = {
      ...(col === '3' && { otherLanguage: inputValue }),
      ...(col === '1' && { globasa: inputValue })
    }
    const wordRow = wordRows[row]
    wordRows[row] = isDefined(wordRow) ? { ...wordRow, ...wordRowPatch } : { ...emptyWordRowFactory(), ...wordRowPatch }
  }
  wordRows = wordRows.filter(wR => isDefined(wR))
  // remove the first row that names the columns
  wordRows.shift()
  // TODO formatting of the english translation
  store.commit('setProperty', {
    property: 'wordRows',
    value: wordRows
  })
}
