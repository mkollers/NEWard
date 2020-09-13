import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RankingData } from './ranking-data';

@Component({
  selector: 'neward-ranking-table',
  templateUrl: './ranking-table.component.html',
  styleUrls: ['./ranking-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RankingTableComponent implements OnChanges {
  @Input()
  rankings: RankingData[];
  displayedColumns = ['name', 'points', 'count', 'average'];
  dataSource = new MatTableDataSource<RankingData>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes.rankings) {
      this.dataSource.data = this.rankings;
    }
  }

}
