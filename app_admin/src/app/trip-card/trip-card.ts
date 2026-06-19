import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard implements OnInit {
  @Input('trip') trip: any;

  constructor(
    private router: Router,
    private tripDataService: TripDataService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public editTrip(trip: Trip): void {
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  public deleteTrip(trip: Trip): void {
    if (confirm(`Are you sure you want to delete ${trip.name}?`)) {
      this.tripDataService.deleteTrip(trip.code)
        .subscribe({
          next: () => {
            window.location.reload();
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        });
    }
  }
}