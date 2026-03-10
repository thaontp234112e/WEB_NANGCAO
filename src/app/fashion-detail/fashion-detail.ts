import { ChangeDetectorRef, Component } from '@angular/core';
import { FashionApiservice } from '../myservice/fashion-apiservice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fashion-detail',
  standalone: false,
  templateUrl: './fashion-detail.html',
  styleUrl: './fashion-detail.css',
})
export class FashionDetail {
fashion:any={};
errMessage:string=''
constructor(private _service: FashionApiservice, private router:Router, private activeRouter:ActivatedRoute,private cdr: ChangeDetectorRef){
  
  activeRouter.paramMap.subscribe((params)=>{
    let fashionId=params.get("id")
    if (fashionId!=null)
      this.searchFashion(fashionId)
  })
}
searchFashion(fashionId:string)
{
this._service.getFashion(fashionId).subscribe({
next:(data)=>{this.fashion =data
  this.cdr.detectChanges()
},
error:(err)=>{this.errMessage=err}
})
}
}
