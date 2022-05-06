import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn:boolean=false;
  username:string='';

  constructor(private authService:AuthenticationService, private router : Router) { }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data:boolean) => this.isLoggedIn=data);
    this.authService.username.subscribe((data:string)=>this.username=data);
    this.isLoggedIn=this.authService.isLoggedIn();
    this.username=this.authService.getUserName();
  }

  goToProfile(){
    this.router.navigateByUrl('/user-profile/' + this.username);
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn=false;
    this.router.navigateByUrl('');
    //whenever i route to /login it reloads the page? but when it is '' it does not
  }
}
