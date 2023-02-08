import { Component, OnInit } from '@angular/core';
import { Partners } from '../interfaces/partners';
import { PartnersServiceService } from '../services/partners-service.service';
@Component({
  selector: 'app-partners-details',
  templateUrl: './partners-details.component.html',
  styleUrls: ['./partners-details.component.scss'],
})
export class PartnersDetailsComponent implements OnInit {
  partnersDetails: Partners[] = [];
  constructor(private partnersServiceRef: PartnersServiceService) {}
  ngOnInit(): void {
    this.partnersServiceRef.getPartnersData().subscribe((data) => {
      this.partnersDetails = data;
      for (let x of this.partnersDetails) {
        for (let y of x.revenuedetails) {
        }
      }
    });
  }
}
