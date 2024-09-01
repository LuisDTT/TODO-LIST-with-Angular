import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './components/card/card.component';

interface ITask {
  title: string;
  description: string;
  id: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, JsonPipe, CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'repaso_web';
  public tasks: ITask[] = [];

  // FormControl
  // FormGroup

  public titleTask!: FormControl;
  public description!: FormControl;

  public form!: FormGroup;

  public taskIdToUpdate: number | null = null;

  constructor() {
    this.initForm();
  }

  public saveTask() {
    if (this.taskIdToUpdate !== null) {
      this.tasks = this.tasks.map((task, index) => {
        if (index === this.taskIdToUpdate) {
          return { ...this.form.value };
        } else {
          return task;
        }
      });
      this.form.reset();
      this.taskIdToUpdate = null;
    } else {
      this.tasks.push(this.form.value);
      console.log(this.tasks);
      this.form.reset();
    }
  }

  public removeTask(id: number) {
    console.log('🚀  ~ AppComponent ~ removeUser ~ id:', id);
    const newUsers: ITask[] = [];
    for (let i = 0; i < this.tasks.length; i++) {
      const element = this.tasks[i];
      if (i !== id) {
        newUsers.push(element);
      }
    }
    this.tasks = newUsers;
  }

  public updateTask(data: ITask) {
    this.taskIdToUpdate = data.id;
    this.initForm(data.title, data.description);
  }

  // SRP -> Principio de unica responsabilidad
  private initForm(title?: string, description?: string) {
    this.titleTask = new FormControl(title || '', [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.description = new FormControl(description || '', [
      Validators.required,
      Validators.minLength(5),
    ]);

    // Agrupar mis controladores
    this.form = new FormGroup({
      title: this.titleTask,
      description: this.description,
    });
  }

  public updateDone(data: { id: number; isDone: boolean }) {
    this.tasks = this.tasks.map((task, index) => {
      if (index === data.id) {
        return { ...task, done: data.isDone };
      } else {
        return task;
      }
    });
    console.log(this.tasks);
  }
}
