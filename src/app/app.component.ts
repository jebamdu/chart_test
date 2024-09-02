import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule,HttpClient, HttpHeaders } from '@angular/common/http';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
public chartJson = [
  [
    {
      "Course_ID": 92,
      "Course_Name": " TOEFL",
      "Enrollment_Count": 17
    },
    {
      "Course_ID": 98,
      "Course_Name": "IELTS",
      "Enrollment_Count": 4
    },
    {
      "Course_ID": 101,
      "Course_Name": "OET",
      "Enrollment_Count": 4
    }
  ],
  [
    {
      "Month": "May",
      "Student_Count": 8
    },
    {
      "Month": "June",
      "Student_Count": 2
    },
    {
      "Month": "July",
      "Student_Count": 8
    },
    {
      "Month": "August",
      "Student_Count": 16
    }
  ],
  {
    "fieldCount": 0,
    "affectedRows": 0,
    "insertId": 0,
    "info": "",
    "serverStatus": 34,
    "warningStatus": 0,
    "changedRows": 0
  }
]
public chartPieData  : any
constructor(private http : HttpClient){
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMzUiLCJpYXQiOjE3MjQ4MjY1OTd9.sX9yzG864C88grZOUOhHDmYOM4hzqOZKAbWZNFsIIRQ'
  let headers : any =new HttpHeaders({
    'Authorization': `Bearer ${token}`,
  });
this.http.get('https://6eb5-103-141-56-67.ngrok-free.app/user/Get_Dashboard/',{headers}).subscribe((data)=>{
  console.log(data,"data")
})

}



ngAfterViewInit() {
  let couseNameArray : any= this.chartJson[0]
  let mothdata : any = this.chartJson[1]
  const ctx = document.getElementById('myPieChart') as HTMLCanvasElement;
  const barctx = document.getElementById('barchart') as HTMLCanvasElement;
  let courseName= couseNameArray.map((data : any)=>data.Course_Name)
let EnrollNumber = couseNameArray.map((data : any)=>data.Enrollment_Count)
 new Chart(barctx, {
  type: 'bar',
  data: {
    labels: mothdata.map((data : any) => data.Month),
    datasets: [{
      label: 'Month Wise Student Enrollment',
      data: mothdata.map((data : any)=> data.Student_Count),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      }
    }
  }
})

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: courseName,
      datasets: [{
        label: 'Popular Course',
        data: EnrollNumber,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          enabled: true,
        }
      }
    }
  });
}
}
