export interface UserModel {
  name: string
  email: string
  phone?: string
  institution?: string
  createdOn: string
  isInternalStudent?: boolean
  studentIdNumber?: string
}

export interface TicketModel {
  userEmail: string
  createdOn: string
  couponCode?: string
  verified: boolean
  paymentId: string
  payment: {    
    baseAmount: number
    txnid: string
    discountPercentApplied?: number
    taxPercent: number
    amountPaid: number
  }
}

export interface TransactionModel {
  txnid: string
  createdOn: string
  completed: boolean
  verified: boolean
  amount: {
    base: number
    tax: number
    net: number
  }
}