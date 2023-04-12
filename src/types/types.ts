export type Image = {
  name: string,
  url: string,
  value: number,
  title?: string,
  description?: string,
  footer?: string
}

export type ImageData = {
  name: string,
  url: string,
  title?: string,
  description?: string,
  footer?: string
}

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

export type DebtPaymentSender = {
  id: number,
  name: string
  receivers: {
    id: number,
    name: string,
    amount: number
  }[]
}
