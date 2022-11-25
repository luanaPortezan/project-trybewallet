export const REMOVECASH = 'REMOVECASH';

export const removeCash = (id) => ({
  type: REMOVECASH,
  payload: id,
});

// Editar despesas

export const EDITON = 'EDITON';
export const MODIFYCASH = 'MODIFYCASH';
export const EDITOFF = 'EDITOFF';

export const editOn = (id) => ({
  type: EDITON,
  payload: id,
});

export const modifyCash = (payload) => ({
  type: MODIFYCASH,
  payload,
});

export const editOff = () => ({
  type: EDITOFF,
  payload: 0,
});
