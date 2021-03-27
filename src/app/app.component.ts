import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CloudinaryAsset } from './model/cloudinary-asset';
import { ImageFile } from './model/image-file';
import { ImageUploaderService } from './services/image-uploader.service';

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
        <a
          *ngFor="let file of imageFiles$ | async"
          [href]="file.url"
          target="_blank"
        >
          <img [src]="file.url" />
        </a>
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
  imageFiles$: Observable<CloudinaryAsset[]>;

  constructor(private imageUploaderService: ImageUploaderService) {}

  onDropFiles(imageFiles: ImageFile[]): void {
    this.imageFiles$ = this.imageUploaderService.uploadImages(imageFiles);
  }
}
