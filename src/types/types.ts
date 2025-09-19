export type Image = ImageData & {
  value: number
}

export type ImageData = {
  name: string,
  url: string,
  title?: string,
  description?: string,
  footer?: string
}

export type MikaneEvent = {
  id: string,
  name: string,
  description: string,
  created: Date,
  adminIds: string[],
  private: boolean,
  status: {
    id: number,
    name: string
  }
}

export type MikanePayment = {
  sender: {
    id: string,
    name: string
  },
  receiver: {
    id: string,
    name: string
  },
  amount: number
}

export type MikanePaymentSender = {
  id: string,
  name: string
  receivers: {
    id: string,
    name: string,
    amount: number
  }[]
}
