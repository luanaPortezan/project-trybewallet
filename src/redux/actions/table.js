export const REMOVEEXPENSES = 'REMOVEEXPENSES';

export const removeExpenses = (id) => ({
  type: REMOVEEXPENSES,
  payload: id,
});
