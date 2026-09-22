export const money = new Intl.NumberFormat('ru-RU')
export const formatMoney = (value: number) => `${money.format(value)} ¥`

export const createOrderId = () =>
  globalThis.crypto?.randomUUID?.() ??
  `order-${Date.now()}-${Math.random().toString(16).slice(2)}`
