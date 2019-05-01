import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Key } from 'protractor';
import { keyframes } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  data = {
    todo : [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep'
    ],
    doning: [
      'Get up',
      'Brush teeth',
      'Take a shower',
      'Check e-mail',
      'Walk dog'
    ],
    done :[
      'Take a shower',
      'Check e-mail',
      'Walk dog'
    ]
   }

  constructor() { }

  ngOnInit() {
    this.setItems();
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    Object.keys(this.data).forEach((key) => {
      localStorage.setItem(key, JSON.stringify(this.data[key]));
    });
  }
  addTodo(todo) {
    this.data.todo.push(todo.value);
    todo.value = "";
    localStorage.setItem('todo', JSON.stringify(this.data.todo));

  }
  setItems() {
    Object.keys(this.data).forEach((key) => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(this.data[key]));
      }
      else {
        this.data[key]=JSON.parse(localStorage.getItem(key))
      }
    });
  }
}
