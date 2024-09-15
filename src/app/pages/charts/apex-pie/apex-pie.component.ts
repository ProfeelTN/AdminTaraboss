import { Component, OnInit } from '@angular/core';
import { CandidatureService } from 'src/app/core/services/candidature.service';

@Component({
  selector: 'app-apex-pie',
  templateUrl: './apex-pie.component.html',
  styleUrls: ['./apex-pie.component.scss']
})
export class ApexPieComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  simplePieChart: any;

  constructor(private candidatureService: CandidatureService) { }

  ngOnInit(): void {

    this.fetchCandidatureData();
  }

  // Fetch candidatures and calculate the percentage for each jobTitle
  private fetchCandidatureData() {
    this.candidatureService.getAllCandidatures().subscribe((candidatures: any[]) => {
      // Group candidatures by jobTitle and calculate percentages
      const jobTitleCounts: { [key: string]: number } = {};
      candidatures.forEach(candidature => {
        const jobTitle = candidature.jobTitle;
        if (jobTitle) {
          jobTitleCounts[jobTitle] = (jobTitleCounts[jobTitle] || 0) + 1;
        }
      });

      const totalCandidatures = candidatures.length;
      const jobTitleLabels = Object.keys(jobTitleCounts);
      const jobTitleSeries = jobTitleLabels.map(label => (jobTitleCounts[label] / totalCandidatures) * 100);

      this._simplePieChart(jobTitleLabels, jobTitleSeries);
    });
  }

  /**
  * Simple Pie Chart
  */
  private _simplePieChart(labels: string[], series: number[]) {
    this.simplePieChart = {
      series: series, // Percentages for each jobTitle
      chart: {
        height: 300,
        type: "pie",
      },
      labels: labels, // Job titles
      legend: {
        position: "bottom",
      },
      dataLabels: {
        dropShadow: {
          enabled: false,
        },
      },
      colors: this.getChartColorsArray('["--tb-primary", "--tb-success", "--tb-warning", "--tb-danger", "--tb-info"]'),
    };
  }

  // Chart Colors Set
  private getChartColorsArray(colors: any) {
    colors = JSON.parse(colors);
    return colors.map((value: any) => {
      const newValue = value.replace(" ", "");
      if (newValue.indexOf(",") === -1) {
        const color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
        return color ? color.replace(" ", "") : newValue;
      } else {
        const val = value.split(',');
        if (val.length === 2) {
          let rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
          rgbaColor = `rgba(${rgbaColor},${val[1]})`;
          return rgbaColor;
        } else {
          return newValue;
        }
      }
    });
  }
}
