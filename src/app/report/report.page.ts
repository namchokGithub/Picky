import { Component, ViewChild, OnInit } from "@angular/core";
import { Ng2GoogleChartsModule } from "ng2-google-charts";

import { GoogleChartInterface } from "ng2-google-charts/google-charts-interfaces";
import { AccountService } from "src/app/services/account.service";
import { TransactionService } from "src/app/services/transaction.service";
@Component({
  selector: "app-report",
  templateUrl: "./report.page.html",
  styleUrls: ["./report.page.scss"]
})
export class ReportPage implements OnInit {
  

  bars: any;
  colorArray: any;


  private account_id: string;
  private account_name: string;
  private income: number;
  private Expense: number;
  private transaction = [];
  private tran = [];

  public columnChart1: GoogleChartInterface;
  public columnChart2: GoogleChartInterface;
  public pieChart: GoogleChartInterface;
  constructor(
    private accountService: AccountService,
    private tracsactionService: TransactionService
  ) {}

  async ngOnInit() {
    this.income = 0;
    this.Expense = 0;
    this.account_id = await this.accountService.get_session_account_id();
    this.account_name = await this.accountService.get_session_account_name();
    this.load_transaction();
  }

  ionViewDidEnter() {
    this.loadSimplePieChart();
    // this.loadGroupColumnChart();
    // this.loadBarChart();
  }

  loadSimplePieChart() {
    this.pieChart = {
      chartType: 'PieChart',
      dataTable: [
        ['Task', 'Hours per Day'],
        ['รายรับ', this.income],
        ['รายจ่าย', this.Expense]
      ],
      //opt_firstRowIsData: true,
      options: {
        pieHole :0.6,
        height: '100%',
        width: '100%'
      },
    };
  }

  load_transaction() {
    this.tracsactionService.get_transaction().subscribe(res => {
      this.tran = res;
      this.check_transaction();
    });
  }

  check_transaction() {
    for (let i = 0; i < this.tran.length; i++) {
      console.log(
        i + " " + this.tran[i].tran_account_id + " " + this.account_id
      );
      if (this.tran[i].tran_account_id == this.account_id) {
        this.transaction.push(this.tran[i]) 
      }
    }
    this.setvalue();
  }

  async setvalue() {
    for (let i = 0; i < this.transaction.length; i++) {
      if (this.transaction[i].tran_category_type == "income") {
        console.log('income');
        this.income += parseInt(this.transaction[i].tran_amount);
      } else {
        this.Expense += parseInt(this.transaction[i].tran_amount);
      } 
    }
    await this.loadSimplePieChart();
  }
}
