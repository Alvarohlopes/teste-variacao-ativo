import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiServices } from './services/api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActiveResponse, ActivesModel, ChartResponseModel, TableModel } from './models/models';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  unsubscribeAll: Subject<any> = new Subject();

  activeSelected: string = '';
  actives: ActivesModel[] = [
    { name: 'PETR4', value: 'PETR4.SA' },
    { name: 'BBAS3', value: 'BBAS3.SA' },
    { name: 'ITUB4', value: 'ITUB4.SA' },
  ];

  selectedActive: ChartResponseModel | undefined;
  newActiveSelected: TableModel[] = [];
  showData: boolean = false;

  setTypeView: string = 'table';

  constructor(
    private apiServices: ApiServices
  ) { }

  ngOnInit(): void { }

  getActive(active: any): void {
    this.showData = false;
    this.newActiveSelected = [];

    this.apiServices.GetActiveVariation(active.value)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((data: ActiveResponse) => {
        if (data.chart.result.length !== 0) {
          this.selectedActive = data.chart.result[0];
          this.generateActive(data.chart.result[0]);
        }

        if (this.newActiveSelected.length > 0) {
          this.showData = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(false);
    this.unsubscribeAll.complete();
  }

  generateActive(data: ChartResponseModel): void {
    const openReverse = data.indicators.quote[0].open;

    data.timestamp.forEach((date: number, index: number) => {
      const active: TableModel = {
        day: index + 1,
        date: this.formatDate(new Date(Number(date + '000'))),
        value: (openReverse[index]).toFixed(2),
        valueYesterday: index !== 0 ?
          this.getPercentage(
            (openReverse[index]).toFixed(2),
            (openReverse[index - 1]).toFixed(2)
          ) : '-',
        valueFirstDay: index !== 0 ?
          this.getPercentage(
            (openReverse[index]).toFixed(2),
            (openReverse[0]).toFixed(2)
          ) : '-',
      }
      this.newActiveSelected.push(active)
    });
  }

  getPercentage(value1: number, value2: number): string {
    const percentage = (((value1 - value2) / value1) * 100).toFixed(2);
    return percentage;
  }

  formatDate(date: Date): string {
    const formatDate = (this.addZeroDate(date.getDate().toString()) + "/" + (this.addZeroDate(date.getMonth() + 1).toString()) + "/" + date.getFullYear());
    return formatDate;
  }

  addZeroDate(number: any): any {
    if (number <= 9) {
      return '0' + number;
    } else {
      return number;
    }
  }

}
