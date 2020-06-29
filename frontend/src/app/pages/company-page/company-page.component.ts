import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'neward-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
