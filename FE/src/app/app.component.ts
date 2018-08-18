import { Component } from '@angular/core';
import { User } from './_models/user';
import { DataService } from './_services/data/data.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'The cinema';
  
  user: User;

  submitted = false;

  constructor(private dataService: DataService,
  public Router: Router) { }

  ngOnInit() {    
      this.user = this.dataService.getUser();
  }


  onSubmit() {
    this.dataService.logedin = false;
    this.Router.navigate(['/dashboard'])
  }
  
}


