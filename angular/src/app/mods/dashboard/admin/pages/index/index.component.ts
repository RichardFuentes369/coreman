import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class AdminDashboardComponent {

  constructor(
  ) {
  }

}
