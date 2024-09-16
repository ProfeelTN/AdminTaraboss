import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/Notifucation.service';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent {
  // bread crum items
  breadCrumbItems!: Array<{}>;
  users: User[] = [];

  ngOnInit(): void {
    this.getAllUsers();
    this.breadCrumbItems = [{ label: 'Tables' }, { label: 'Basic Tables', active: true }];
  }
  constructor(private userService:AuthenticationService ,private notif:NotificationService){

  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe((response: any) => {
      this.users = response;
      });
  }
  deleteUser(id:number){
    this.userService.deleteUser(id).subscribe(
      (response: any) => {
        this.notif.showSuccess("utilisateur supprimée ","Suppression")
        this.getAllUsers();
        

    
  });
}
}