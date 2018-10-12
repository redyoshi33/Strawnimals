import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  @Input() id: number;

  constructor(
  	public activeModal: NgbActiveModal,
  	private _httpservice: HttpService,
  ) { }

  ngOnInit() {
  }

  closeModal(msg) {
  	this.activeModal.close(msg);
  }

  deleteProduct(id){
  	let obs = this._httpservice.deleteProduct(id)
  	obs.subscribe(data => {
  		this.closeModal('Deleted')
  	})
  }
}
