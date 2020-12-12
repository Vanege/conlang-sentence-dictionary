import { Store } from 'vuex/types/index'
import { isDefined } from '~/tools/type-guards'
import { SentenceRow, emptySentenceRowFactory, WordRow, emptyWordRowFactory } from '~/types'

type State = {
  sentenceRows: SentenceRow[],
  wordRows: WordRow[]
}

export const state = (): State => ({
  sentenceRows: [],
  wordRows: []
})

export const mutations = {
  setSentenceRows (state: State, payload) {
    state.sentenceRows = payload
  },
  setWordRows (state: State, payload) {
    state.wordRows = payload
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

  let sentenceRows: SentenceRow[] = []
  for (const entry of entries) {
    const { row, col, inputValue } = entry
    const sentenceRowPatch = {
      ...(col === '1' && { english: inputValue }),
      ...(col === '2' && { globasa: inputValue })
    }
    const sentenceRow = sentenceRows[row]
    sentenceRows[row] = isDefined(sentenceRow) ? { ...sentenceRow, ...sentenceRowPatch } : { ...emptySentenceRowFactory(), ...sentenceRowPatch }
  }
  sentenceRows = sentenceRows.filter(wR => isDefined(wR))
  // remove the first row that names the columns
  sentenceRows.shift()
  // remove the rows that are comments
  sentenceRows = sentenceRows.filter(sr => !sr.english.includes('--'))
  store.commit('setSentenceRows', sentenceRows)
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
      ...(col === '3' && { english: inputValue }),
      ...(col === '1' && { globasa: inputValue })
    }
    const wordRow = wordRows[row]
    wordRows[row] = isDefined(wordRow) ? { ...wordRow, ...wordRowPatch } : { ...emptyWordRowFactory(), ...wordRowPatch }
  }
  wordRows = wordRows.filter(wR => isDefined(wR))
  // remove the first row that names the columns
  wordRows.shift()
  // TODO formatting of the english translation
  store.commit('setWordRows', wordRows)
}
