import { Component, OnInit, Input } from '@angular/core';
import { TransactionsService } from '../../Services/transactions.service';
import { IsLoadingService } from '@service-work/is-loading';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  constructor(
    private transactionsService: TransactionsService,
    private loadingService: IsLoadingService
  ) {}

  @Input() account: string;

  transactions: Observable<any[]>;
  displayedColumns: string[] = [
    'logo',
    'date',
    'account',
    'amount',
    'vendor',
    'category',
    'merchant',
    'type',
  ];

  ngOnInit(): void {
    this.loadingService.add({ key: ['default', 'transactions-table'] });
    this.transactions = this.account
      ? this.transactionsService.getTransactionsByAccountId(this.account)
      : this.transactionsService.getTransactions();

    this.transactions = this.transactions.pipe(
      tap(() =>
        this.loadingService.remove({ key: ['default', 'transactions-table'] })
      )
    );
  }
}
