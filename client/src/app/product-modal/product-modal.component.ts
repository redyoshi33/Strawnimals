import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {

  @Input() data: any;

  constructor(public activeModal: NgbActiveModal) { }

  product: any;
  name: string;
  description: string;
  category: string;

  ngOnInit() {
  	
  }
  closeModal() {

  	this.activeModal.close('Modal Closed');
  }
  print(){
  	console.log(this.data)
  }
}
