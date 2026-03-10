import { ChangeDetectorRef, Component } from '@angular/core';
import { Fashion } from '../classes/Fashion';
import { FashionApiservice } from '../myservice/fashion-apiservice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fashion-update',
  standalone: false,
  templateUrl: './fashion-update.html',
  styleUrl: './fashion-update.css',
})
export class FashionUpdate {
  fashion = new Fashion()
  errMessage: string = ''

  constructor(
    private _service: FashionApiservice,
    private cdr: ChangeDetectorRef,
    private activeRouter: ActivatedRoute,  // ← thêm để lấy id từ URL
    private router: Router                 // ← thêm để redirect sau khi update
  ) {
    // Lấy id từ URL → gọi API lấy data hiện tại của fashion đó
    let fashionId = this.activeRouter.snapshot.paramMap.get("id")
    if (fashionId != null) {
      this._service.getFashion(fashionId).subscribe({
        next: (data) => {
          this.fashion = data  // ← load data lên form
          this.cdr.detectChanges()
        },
        error: (err) => { this.errMessage = err }
      })
    }
  }

  onFileSelected(event: any, fashion: Fashion) {
    let file = event.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      fashion.fashion_image = reader.result!.toString()
      
    }
    reader.onerror = function (error) {
      console.log('Error: ', error)
    }
  }

  updateFashion() {
    setTimeout(() => {
        this._service.updateFashion(this.fashion).subscribe({
            next: (data) => {
                alert("Cập nhật thành công!")
                this.router.navigate(["/ex53"])
            },
            error: (err) => { this.errMessage = err }
        })
    }, 500)
  }
}
