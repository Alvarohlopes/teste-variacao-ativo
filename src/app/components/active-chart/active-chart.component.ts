import { Component, Input, OnInit } from '@angular/core';
import { TableModel } from 'src/app/models/models';
import { ChartDataset } from 'chart.js';

@Component({
  selector: 'app-active-chart',
  templateUrl: './active-chart.component.html',
  styleUrls: ['./active-chart.component.scss']
})
export class ActiveChartComponent implements OnInit {
  @Input() selectedActive: TableModel[] = [];

  lineChartOptions: (any) = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
      align: 'center',
      fullWidth: true,
      labels: {
        fontSize: 10,
        usePointStyle: false,
        padding: 20,
        boxWidth: 18
      },
    },
    plugins: {
      datalabels: {
        labels: {
          title: null,
        }
      }
    },
    tooltips: {
      mode: 'label',
      titleFontSize: 10,
      xPadding: 10,
      yPadding: 10,
    }
  };

  lineChartData: any[] = [];
  lineChartLabels: any[] = [];
  lineChartLegend = true;
  lineChartType = 'line';

  ngOnInit(): void {
    this.getDataChart();
  }

  getDataChart(): void {
    const values: number[] = [];
    const variation1: number[] = [];
    const variation2: number[] = [];

    this.selectedActive.forEach((active: TableModel) => {
      values.push(Number(active.value));
      variation1.push(active.valueYesterday === '-' ? 0 : Number(active.valueYesterday));
      variation2.push(active.valueFirstDay === '-' ? 0 : Number(active.valueFirstDay));

      this.lineChartLabels.push(active.date)
    })

    this.lineChartData = [{
      data: values,
      label: 'Valor',
    },
    {
      data: variation1,
      label: 'Variação em relaçào a D-1',
    },
    {
      data: variation2,
      label: 'Variação em relação a primeira data',
    }];

  }

}
