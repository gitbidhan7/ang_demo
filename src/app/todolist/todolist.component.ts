import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  public taskName: string ="";
  public tasks: Array<{completed: boolean, editorVisible: boolean, taskname: string}> = [];
  constructor() { }

  ngOnInit(): void {
  }
  addTask(){
    if(!this.tasks.find((e)=>e.taskname==this.taskName))
      this.tasks.push({completed:false, editorVisible:false, taskname:this.taskName});
    else alert('Task already exists.');
    this.taskName = "";
  }
  editRow(task: string){
    let idx = this.tasks.findIndex((e)=>e.taskname==task);
    this.tasks[idx].editorVisible = !this.tasks[idx].editorVisible;
  }
  deleteRow(task: string){
    let idx = this.tasks.findIndex((e)=>e.taskname==task);
    for(let i=0; i<this.tasks.length; i++){
      if(i==idx) this.tasks.splice(i, 1);
    }
  }
  taskChecked(id:number, task: string){
    let idx = this.tasks.findIndex((e)=>e.taskname==task);
    this.tasks[idx].completed = !this.tasks[idx].completed;
  }
  txtChanged(e:any, id:number, task: string){
    this.tasks[id].taskname = e.target.value;
    this.tasks[id].editorVisible = !this.tasks[id].editorVisible;
  }
}
