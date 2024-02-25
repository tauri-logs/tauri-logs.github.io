import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  @Input() fontSize: string = '8rem';
  /**
   * If true, the logo will be a link to the home page
   */
  @Input() link: boolean = false;

  cursorStyle!: string;
  routerLink!: string | null;

  constructor() {}

  ngOnInit(): void {
    this.cursorStyle = this.link ? 'pointer' : 'default';
    this.routerLink = this.link ? '/' : null;
  }

}
