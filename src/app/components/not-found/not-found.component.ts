import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'prs-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  backToGame() {
    this.router.navigate(['game']);
  }
}
