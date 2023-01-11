import { Component, Input, OnInit } from '@angular/core';
import { ActiveResponse, TableModel } from 'src/app/models/models';

@Component({
  selector: 'app-active-table',
  templateUrl: './active-table.component.html',
  styleUrls: ['./active-table.component.scss']
})
export class ActiveTableComponent implements OnInit {
  @Input() selectedActive: TableModel[] = [];

  displayedColumns: string[] = ['day', 'date', 'value', 'valueYesterday', 'valueFirstDay'];
  dataSource: any;

  ngOnInit(): void {
    this.dataSource = this.selectedActive;
  }
}
