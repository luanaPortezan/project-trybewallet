export const REMOVEEXPENSES = 'REMOVEEXPENSES';

export const removeExpenses = (id) => ({
  type: REMOVEEXPENSES,
  payload: id,
});

// Editar despesas

export const EDITMODEON = 'EDITMODEON';
export const MODIFYEXPENSES = 'MODIFYEXPENSES';
export const EDITMODEOFF = 'EDITMODEOFF';

export const editModeON = (id) => ({
  type: EDITMODEON,
  payload: id,
});

export const modifyExpenses = (payload) => ({
  type: MODIFYEXPENSES,
  payload,
});

export const editModeOFF = () => ({
  type: EDITMODEOFF,
  payload: 0,
});
