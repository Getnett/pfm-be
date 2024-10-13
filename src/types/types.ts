export interface ExpensePayload {
  amount: number;
  date: any; // revisit this
  note?: string;
  userId: string;
  categoryId: string;
  accountId?: string;
}

export interface IncomePayload {
  amount: number;
  note?: string;
  date?: string;
  userId: string;
  incomeSourcesId: string;
  accountId?: string;
}
