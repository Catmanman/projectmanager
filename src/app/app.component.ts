// In the component where you're trying to use <app-project-list>
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ProjectListComponent]  // Add ProjectListComponent here
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}
