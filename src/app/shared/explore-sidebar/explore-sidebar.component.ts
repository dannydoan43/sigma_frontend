import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { UsersModel } from '../users-model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-explore-sidebar',
  templateUrl: './explore-sidebar.component.html',
  styleUrls: ['./explore-sidebar.component.css']
})
export class ExploreSidebarComponent implements OnInit {

  users: Array<UsersModel> = [];

  constructor(private usersService:UsersService) { }

  ngOnInit(): void {
    this.usersService.getAll().subscribe({next:(v) => {
      this.shuffle(v);
      if(v.length > 3) {
        this.users=v.slice(0,3);
      } else {
        this.users = v;
      }
    }, error : (e) => {
      throwError(()=>e);
    }})
  }

  private shuffle(array:any[]) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

}
