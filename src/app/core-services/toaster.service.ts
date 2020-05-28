import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private toasterOptions = {
    timeOut: 3000,
    positionClass: 'toast-top-center'
  };


  constructor(private toastr: ToastrService) { }
  
  public success(title: string, body?: string) {
    this.toastr.success(title, body, this.toasterOptions);
  }

  public error(title: string, body?: string) {
    this.toastr.error(title, body, this.toasterOptions);
  }

  public info(title: string, body?: string) {
    this.toastr.info(title, body, this.toasterOptions);
  }

  public warning(title: string, body?: string) {
    this.toastr.warning(title, body, this.toasterOptions);
  }
}
