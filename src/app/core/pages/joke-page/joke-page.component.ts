import { Component, inject } from '@angular/core';
import { JokeFormComponent } from '../../../shared/forms/joke-form/joke-form.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-joke-page',
  imports: [JokeFormComponent],
  templateUrl: './joke-page.component.html',
  styleUrl: './joke-page.component.css',
})
export class JokePageComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  public jokeId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
}
