export interface UserModel {
  name: string
  email: string
  phone?: string
  institution?: string
  createdOn: string
  isInternalStudent?: boolean
  studentIdNumber?: string
  couponCode?: string
}

export interface TransactionModel {
  txnid: string
  baseAmount: number
  discountPercentApplied?: number
  taxPercent: number
  amountPaid: number
}