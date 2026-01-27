import { Component } from '@angular/core';
import { UserDetailsComponent } from '../user-details/user-details.component';
@Component({
  selector: 'app-user-template',
  imports: [UserDetailsComponent],
  templateUrl: './user-template.component.html',
  styleUrl: './user-template.component.scss'
})
export class UserTemplateComponent {

}
