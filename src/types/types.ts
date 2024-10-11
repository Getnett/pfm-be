export interface ExpensePayload {
  amount: number;
  date: any; // revisit this
  note?: string;
  userId: string;
  categoryId: string;
  accountId?: string;
}
