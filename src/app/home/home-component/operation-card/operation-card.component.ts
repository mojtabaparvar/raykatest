import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NumbersModel, OPERATIONS_ENUM } from '../../services/home.service';

@Component({
  selector: 'app-operation-card',
  templateUrl: './operation-card.component.html',
  styleUrls: ['./operation-card.component.scss']
})
export class OperationCardComponent implements OnInit {
  @Output() onCardClicked = new EventEmitter<NumbersModel>();
  @Input() data!: NumbersModel;
  constructor() { }

  ngOnInit(): void {
  }
  emitClickEvent() {
    this.onCardClicked.emit(this.data);
  }

}
