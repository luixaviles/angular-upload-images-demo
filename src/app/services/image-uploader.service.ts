import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { mergeMap, map, toArray } from 'rxjs/operators';
import { CloudinaryAsset } from '../model/cloudinary-asset';
import { ImageFile } from '../model/image-file';

const uploadUrl = 'https://api.cloudinary.com/v1_1/demo/image/upload';
const uploadPreset = 'docs_upload_example_us_preset';

@Injectable({
  providedIn: 'root',
})
export class ImageUploaderService {
  constructor(private httpClient: HttpClient) {}

  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    this.httpClient
      .post(uploadUrl, formData)
      .subscribe((result) => console.log(result));
  }

  uploadImages(imageFiles: ImageFile[]): Observable<CloudinaryAsset[]> {
    const files = imageFiles.map((imageFile) => imageFile.file);
    const files$ = from(files);
    return files$.pipe(
      map((file) => this.getFormData(file)),
      mergeMap((formData) =>
        this.httpClient.post<CloudinaryAsset>(uploadUrl, formData)
      ),
      toArray()
    );
  }

  private getFormData(file: File): FormData {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    return formData;
  }
}
