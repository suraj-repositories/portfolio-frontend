import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { environment } from 'src/environments/environment';
import { LoadingComponent } from "../loading/loading.component";
import { Router } from '@angular/router';
import 'iconify-icon';

@Component({
  selector: 'app-project',
  imports: [RouterLink, LoadingComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProjectComponent {
  appName = environment.appName;
  projects: any[] = [];
  constructor(
    private projectService: ProjectService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadProjects();

  }

  loadProjects(){
    this.projectService.getAllWithImage().subscribe({
      next: (response) => {
        if (response) {

          if(this.router.url == '/projects'){
            this.projects = response;
          }else{
            this.projects = response.slice(0, 9);
          }

          this.cdRef.detectChanges();
        } else {
          console.error('Received unexpected response format:', response);
          this.projects = [];
          this.cdRef.detectChanges();
        }

      },
      error: (error) => {
        console.error(error);
        this.projects = [];
        this.cdRef.detectChanges();
      },
    });
  }
}
