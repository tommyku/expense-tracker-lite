export const NEW_RECORD = 'NEW_RECORD'

export function addNewRecord({amount, currency, mode, categoryUuid}) {
  return {
    type: NEW_RECORD,
    payload: {
      amount: amount,
      currency: currency,
      mode: mode,
      categoryUuid: categoryUuid
    }
  }
}
