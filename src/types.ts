export type DebtEvent = {
  id: number,
  name: string,
  created: Date
}

export type DebtPayment = {
  sender: {
    id: number,
    name: string
  },
  receiver: {
    id: number,
    name: string
  },
  amount: number
}