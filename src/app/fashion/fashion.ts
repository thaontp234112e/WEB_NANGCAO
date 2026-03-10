import { ChangeDetectorRef, Component } from '@angular/core';
import { FashionApiservice } from '../myservice/fashion-apiservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Fashion as FashionModel } from '../classes/Fashion';

@Component({
  selector: 'app-fashion',
  standalone: false,
  templateUrl: './fashion.html',
  styleUrl: './fashion.css',
})

export class Fashion {

  fashions: FashionModel[] = []
  filteredFashions: FashionModel[] = []

  keyword: string = ""

  errMessage: string = ''

  constructor(
    public _service: FashionApiservice,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {

    console.log("Fashion component khởi tạo!")

    this._service.getFashions().subscribe({

      next: (data: FashionModel[]) => {

        console.log("Data:", data)

        this.fashions = data
        this.filteredFashions = data

        this.cdr.detectChanges()
      },

      error: (err) => {
        console.log("Lỗi:", err)
        this.errMessage = err
      }

    })

  }

  search() {

    this.filteredFashions = this.fashions.filter(fashion =>
      fashion.fashion_subject
        .toLowerCase()
        .includes(this.keyword.toLowerCase())
    )

  }

  show_detail(fashionId: string) {

    this.router.navigate(["fashiondetail", fashionId])

  }

}