import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Token } from '@shared/auth/models/token';
import orderBy from 'lodash/orderBy';

@Component({
  selector: 'neward-votes-table',
  templateUrl: './votes-table.component.html',
  styleUrls: ['./votes-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VotesTableComponent implements OnInit, OnChanges {
  @Input()
  tokens: Token[];
  displayedColumns = ['email', 'created'];
  dataSource = new MatTableDataSource<Token>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tokens) {
      this.dataSource.data = orderBy(this.tokens, t => t.created, 'desc');
    }
  }

  trackByEmail(index: number, token: Token) {
    return token.email;
  }

}
