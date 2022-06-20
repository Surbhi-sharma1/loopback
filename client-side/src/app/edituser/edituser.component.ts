import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HTTPServiceRequest } from '../httpRequestService';
import { User } from '../userModel';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {
  userData: any = [];
  user!: User;
  id!: string;
  data: any = [];
  role: any = [];


  editForm!: FormGroup;
  customerList: any = [];
  editable: boolean = false;
  customerDataById!: any[];
  constructor(private router: Router, protected readonly route: ActivatedRoute, private fb: FormBuilder, private httpRequestService: HTTPServiceRequest) {
    this.httpRequestService.get().subscribe(Response => {
      this.userData = Response;
    }
    )
  }
  ngOnInit() {
    this.httpRequestService.getCustomer().subscribe(Response => {
      this.customerList = Response;

    });
    this.httpRequestService.getRoleList().subscribe(Response => {
      this.role = Response;

    });


    this.id = this.route.snapshot.paramMap.get('id') || '';

    this.editForm = this.fb.group({
      customerid: [],
      id: [],
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      middlename: [''],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      roleName: ['', [Validators.required]],
      address: ['', [Validators.required]]

    })

    this.httpRequestService.getUserId(parseInt(this.id)).subscribe(value => {

      if (value) {
        this.data = value;

        Object.keys(this.data).forEach((Key) => {
          this.editForm.patchValue({ [Key]: this.data[Key] });
        });

      }
    })
  }

  showDetails(user: any) {
    this.editForm.patchValue(user)

  }

  onSubmit() {

    const form = this.editForm.value;
    this.httpRequestService.getCustomerById(form.customerid).subscribe(response => {
      this.customerDataById = Object.values(response);
      console.log(this.customerDataById[1])
      const customerID = Number(form.customerid);
      let myBody = {
        "customerid": customerID,
        "id": form.id,
        "firstname": form.firstname,
        "middlename": form.middlename,
        "lastname": form.lastname,
        "email": form.email,
        "phone": form.phone,
        "roleName": form.roleName,
        "customerName": this.customerDataById[1],
        "address": form.address
      }

      this.httpRequestService.updateUser(myBody).subscribe((response) => {
        this.router.navigate(['/']);
      }
      )
    })

  }
  cancelChanges() {
    this.httpRequestService.getUserId(parseInt(this.id)).subscribe(data => {
      this.editForm.patchValue(data)
    });
    this.router.navigate(['showUsers']);
  }
}
