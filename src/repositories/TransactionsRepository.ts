import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(({ type }) => type === 'income')
      .reduce((soma, { value: valor }) => soma + valor, 0);
    const outcome = this.transactions
      .filter(({ type }) => type === 'outcome')
      .reduce((soma, { value: valor }) => soma + valor, 0);
    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, type, value }: Transaction): Transaction {
    const transation = new Transaction({
      title,
      type,
      value,
    });

    this.transactions.push(transation);

    return transation;
  }
}

export default TransactionsRepository;
