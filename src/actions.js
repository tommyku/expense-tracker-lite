export const NEW_RECORD = 'NEW_RECORD'

export function addNewRecord({amount, currency, details, mode, categoryUuid}) {
  return {
    type: NEW_RECORD,
    payload: {
      amount: amount,
      currency: currency,
      details: details,
      mode: mode,
      categoryUuid: categoryUuid
    }
  }
}
