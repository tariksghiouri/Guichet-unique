import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-layout>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
      <h2 class="text-center m-4">dashboard works!</h2>
    </app-layout>
  `,
  styles: [],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
