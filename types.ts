export type SentenceRow = {
  english: string
  globasa: string
}

export const emptySentenceRowFactory = (): SentenceRow => {
  return {
    english: '',
    globasa: ''
  }
}
