import { Store } from 'vuex/types/index'
import { isDefined } from '~/tools/type-guards'
import { SentenceRow, emptySentenceRowFactory, WordRow, emptyWordRowFactory } from '~/types'

type State = {
  esperantoSentenceRows: SentenceRow[],
  englishSentenceRows: SentenceRow[],
  wordRows: WordRow[]
}

export const state = (): State => ({
  esperantoSentenceRows: [],
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
      getEsperantoSentences(store, this),
      getEnglishSentences(store, this),
      getWords(store, this)
    ])
  }
}

const getEsperantoSentences = async (store: Store<State>, that: any) => {
  const GOOGLE_SPREADSHEET_ID = '1aeo2v0MG6VGSio12-t0issmL1N2DIdwG4l5GpMFBVIc'
  const ESPERANTO_VANEGE_PAGE_ID = 2
  const ESPERANTO_EKTOR_PAGE_ID = 3
  const ESPERANTO_MIRAHEZE_PAGE_ID = 4
  const esperantoSentenceRows = [
    ...(await getSentences(that, GOOGLE_SPREADSHEET_ID, ESPERANTO_VANEGE_PAGE_ID)),
    ...(await getSentences(that, GOOGLE_SPREADSHEET_ID, ESPERANTO_EKTOR_PAGE_ID)),
    ...(await getSentences(that, GOOGLE_SPREADSHEET_ID, ESPERANTO_MIRAHEZE_PAGE_ID))
  ]
  store.commit('setProperty', {
    property: 'esperantoSentenceRows',
    value: esperantoSentenceRows
  })
}

const getEnglishSentences = async (store: Store<State>, that: any) => {
  const GOOGLE_SPREADSHEET_ID = '1aeo2v0MG6VGSio12-t0issmL1N2DIdwG4l5GpMFBVIc'
  const ENGLISH_PAGE_ID = 1
  const englishSentenceRows = await getSentences(that, GOOGLE_SPREADSHEET_ID, ENGLISH_PAGE_ID)
  store.commit('setProperty', {
    property: 'englishSentenceRows',
    value: englishSentenceRows
  })
}

const getSentences = async function(that: any, googleSpreadsheetId, pageId) {
  const url = `https://spreadsheets.google.com/feeds/cells/${googleSpreadsheetId}/${pageId}/public/full?alt=json`
  const json = await that.$axios.$get(url)
  const entries = json.feed.entry.map(e => e.gs$cell)

  let sentenceRows: SentenceRow[] = []
  for (const entry of entries) {
    const { row, col, inputValue } = entry
    const sentenceRowPatch = {
      ...(col === '1' && { otherLanguage: inputValue }),
      ...(col === '2' && { globasa: inputValue })
    }
    const sentenceRow = sentenceRows[row]
    sentenceRows[row] = isDefined(sentenceRow) ? { ...sentenceRow, ...sentenceRowPatch } : { ...emptySentenceRowFactory(), ...sentenceRowPatch }
  }
  sentenceRows = sentenceRows.filter(wR => isDefined(wR))
  // remove the first row that names the columns
  sentenceRows.shift()
  // remove the rows that are comments
  sentenceRows = sentenceRows.filter(sr => !sr.otherLanguage.includes('--'))
  return sentenceRows
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
