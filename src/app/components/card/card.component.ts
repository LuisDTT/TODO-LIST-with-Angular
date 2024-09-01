import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  isDone: boolean = false;

  // Inputs
  @Input() id: number = 0;
  @Input() title: string = '';
  @Input() description: string = '';

  @Output() doClick = new EventEmitter();
  @Output() updateEvent = new EventEmitter();
  @Output() handleDoneEvent = new EventEmitter();

  public doDelete() {
    this.doClick.emit(this.id);
  }

  public update() {
    this.updateEvent.emit({
      title: this.title,
      description: this.description,
      id: this.id,
    });
  }

  public toggleDone() {
    this.isDone = !this.isDone;
    this.handleDoneEvent.emit({ isDone: this.isDone, id: this.id });
  }
}
