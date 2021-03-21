import { Component } from '@angular/core';
import { ImageFile } from './model/image-file';

@Component({
  selector: 'corp-root',
  template: `
    <div class="container">
      <div class="row">
        <div class="drop-box" corpImgUpload (dropFiles)="onDropFiles($event)">
          <span class="message">Drop File Images Here</span>
        </div>
      </div>
      <div class="row">
        <img *ngFor="let file of files" [src]="file.url" />
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
      }

      .drop-box {
        min-height: 300px;
        min-width: 300px;
        display: table;
        background-color: #c6e4f1;
        border: solid 1px #75c5e7;
      }

      .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }

      .message {
        display: table-cell;
        text-align: center;
        vertical-align: middle;
        color: #686868;
      }

      img {
        width: 200px;
        height: 200px;
      }
    `,
  ],
})
export class AppComponent {
  files: ImageFile[] = [];

  onDropFiles(files: ImageFile[]): void {
    this.files = [...this.files, ...files];
  }
}
