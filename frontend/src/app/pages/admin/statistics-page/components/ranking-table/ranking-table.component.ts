import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'neward-ranking-table',
  templateUrl: './ranking-table.component.html',
  styleUrls: ['./ranking-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RankingTableComponent implements OnChanges {
  @Input()
  rankings: { name: string; points: number }[];
  displayedColumns = ['name', 'points'];
  dataSource = new MatTableDataSource<{ name: string; points: number }>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes.rankings) {
      this.dataSource.data = this.rankings;
    }
  }

}
