import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common'; 
import { ProjectService, Project } from '../project.service'; 

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, FormsModule],  
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent {
  projects: Project[] = [];
  newProject: Project = { 
    projectId: 0, 
    user: '', 
    status: 'Pending', 
    projectName: '', 
    projectDesc: '', 
    startDate: '', 
    endDate: '' 
  };
  isEditing: boolean = false;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.loadProjects();
  }

  // Load all projects from the API
  loadProjects() {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  // Add a new project
  addProject(): void {
    if (this.newProject.projectName && this.newProject.projectDesc) {
      this.projectService.addProject(this.newProject).subscribe((project) => {
        this.projects.push(project);
        this.resetForm();
      });
    }
  }

  editProject(project: Project) {
  this.newProject = {
    projectId: project.projectId,
    user: project.user,
    status: project.status,
    projectName: project.projectName,
    projectDesc: project.projectDesc,
    startDate: this.formatDate(new Date(project.startDate)), // Format the Date
    endDate: this.formatDate(new Date(project.endDate)) // Format the Date
  };
  this.isEditing = true;
}

private formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}



  updateProject() {
    this.projectService.updateProject(this.newProject).subscribe((updatedProject) => {
      const index = this.projects.findIndex(p => p.projectId === updatedProject.projectId);
      this.projects[index] = updatedProject;
      this.resetForm();
    });
  }

  // Delete a project
  deleteProject(id: number) {
    this.projectService.deleteProject(id).subscribe(() => {
      this.projects = this.projects.filter(project => project.projectId !== id);
    });
  }

  // Reset the form fields
  resetForm() {
    this.newProject = { 
      projectId: 0, 
      user: '', 
      status: 'Pending', 
      projectName: '', 
      projectDesc: '', 
      startDate: '', 
      endDate: '' 
    };
    this.isEditing = false;
  }
}
