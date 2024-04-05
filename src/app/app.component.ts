import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/auth/login.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  isLoginPage: boolean = false;
  title = 'elex_frontend'
  constructor(public loginService: LoginService, private router: Router) {
  }
  ngOnInit(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd) 
    ).subscribe((event: NavigationEnd) => {
      this.isLoginPage = event.url === '/login';
    });
  }
  
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
