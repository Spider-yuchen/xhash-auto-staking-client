export enum StepKey {
  MnemonicImport,
  MnemonicGeneration,
  KeyConfiguration,
  KeyGeneration,
  Finish,
  Deposit,
  Upload
}

export enum StepSequenceKey {
  MnemonicGeneration = "mnemonicgeneration",
  MnemonicImport = "mnemonicimport"
}

export enum Network {
  MAINNET = "Mainnet",
  GOERLI = "Goerli",
  PRATER = "Prater",
  KINTSUGI = "Kintsugi",
  ROPSTEN = "Ropsten",
  KILN = "Kiln"
}

export enum LanguageEnum {
  zhTW = "繁体中文",
  enUS = "English",
}

export interface DepositKeyInterface {
  pubkey: string;
  withdrawal_credentials: string;
  amount: number;
  signature: string;
  deposit_message_root: string;
  deposit_data_root: string;
  fork_version: string;
  deposit_cli_version: string;
  transactionStatus: TransactionStatus;
  txHash?: string;
  depositStatus: DepositStatus;
}

export enum DepositStatus {
  VERIFYING,
  ALREADY_DEPOSITED,
  READY_FOR_DEPOSIT,
}

export enum TransactionStatus {
  'READY',
  'PENDING',
  'STARTED',
  'SUCCEEDED',
  'FAILED',
  'REJECTED',
}
