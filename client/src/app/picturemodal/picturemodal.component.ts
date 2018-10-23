import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-picturemodal',
  templateUrl: './picturemodal.component.html',
  styleUrls: ['./picturemodal.component.css']
})
export class PicturemodalComponent implements OnInit {

  @Input() image: any;

  constructor(
  	public activeModal: NgbActiveModal,
  	) { }

  ngOnInit() {
  }
}
