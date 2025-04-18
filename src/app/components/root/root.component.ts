import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss'
})
export class RootComponent {
  constructor(private authService: AuthService) {
  }
  onLogout() {
    this.authService.logout();
  }
}
