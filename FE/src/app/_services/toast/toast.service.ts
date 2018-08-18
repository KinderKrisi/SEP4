import { Injectable } from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) { }

errorLogin(){
  this.messageService.add({severity:'error', summary:'Login info', detail:'Login failed'});
}

registrationFailed(){
  this.messageService.add({severity:'error', summary:'Registration', detail:'Registration failed'});
}

movieCreated(){
  this.messageService.add({severity:'success', summary:'Movie creation', detail:'Movie created successfuly'});
}
movieNotCreated(){
  this.messageService.add({severity:'error', summary:'Movie creation', detail:'Movie was not created'});
}
movieReservationSuccess(){
  this.messageService.add({severity:'success', summary:'Movie reservation', detail:'Moviereserved'});
}
movieReservationFail(){
  this.messageService.add({severity:'error', summary:'Movie reservation', detail:'Movie was not reserved'});
}
}
