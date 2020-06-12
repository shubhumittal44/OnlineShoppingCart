import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowingHeaderServiceService {
  // showingHeader2 = new Subject; for demonstration
  showingHeader: BehaviorSubject<boolean> = new BehaviorSubject(false);



  constructor() { }

}
  