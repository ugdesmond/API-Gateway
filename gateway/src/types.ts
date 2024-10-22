export enum RoleEnum {
  INTEGRATOR = 'integrator',
  ADMIN = 'admin',
  REGULAR = 'user',
}

export enum TwoFaTypeEnum {
  EMAIL = 'email',
  SMS = 'sms',
  AUTHENTICATOR = 'authenticator',
}

export enum WalletTypeEnum {
  KONNADEX = 'KONNADEX',
  EXTERNAL = 'EXTERNAL',
}
export enum ModuleTypeEnum {
  INVOICE = 'INVOICE',
  SALARY = 'SALARY',
  GATEWAY = 'GATEWAY',
  WALLET = 'WALLET',
}
export enum InvoiceStatusEnum {
  Draft = 'draft',
  Viewed = 'viewed',
  Paid = 'paid',
  Received = 'received',
  AwaitingPayment = 'awaiting_payment',
  Approved = 'approved',
  Rejected = 'rejected',
  Overdue = 'overdue',
  Recurring = 'recurring',
  Processing = 'processing',
}
export enum AssetTypeEnum {
  crypto = 'crypto',
  fiat = 'fiat',
}
export enum SalaryStatusEnum {
  Paid = 'paid',
  Pending = 'pending',
  Canceled = 'canceled',
  Draft = 'draft',
  Processing = 'processing',
  InProgress = 'in_progress',
}
export enum SalaryTypeEnum {
  SINGLE = 'single',
  BULK = 'bulk',
}
export enum AccountStatusEnum {
  active = 'active',
  inactive = 'inactive',
  blacklist = 'blacklist',
  investigation = 'investigation',
}
export enum AssetCodeEnum {
  BTC = 'BTC',
  USDT = 'USDT',
  ETH = 'ETH',
  BNB = 'BNB',
  MATIC = 'MATIC',
  BUSD = 'BUSD',
  NEAR = 'NEAR',
  RWA = 'RWA',
}
export enum NetworkCodeEnum {
  BSC = 'BSC',
  ETHEREUM = 'ETHEREUM',
  POLYGON = 'POLYGON',
  CARDANO = 'CARDANO',
  TRON = 'TRON',
  NEAR = 'NEAR',
  ACH = 'ACH',
}
export enum CollectionStatusEnum {
  Created = 'created',
  Complete = 'complete',
  Failed = 'failed',
  Processing = 'processing',
  UnderPay = 'underpay',
  OverPay = 'overpay',
}

export enum AnalyticsGroupEnum {
  WEEK = '1w',
  MONTH = '1m',
  // SIX_MONTH = '6m',
  ONE_YEAR = '1y',
}
