import { belongsTo, Entity, model, property } from '@loopback/repository';
import { Customer } from './customer.model';
import { Role } from './role.model';

@model({
  name: 'pusers'
},
)
export class Users extends Entity {
  @belongsTo(() => Customer, { name: 'customer' }, { keyTo: 'customerid', name: 'customerid' })
  customerid: number;
  @property({
    type: 'number',
    id: true,

    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  firstname: string;

  @property({
    type: 'string',
    required: true,
  })
  middlename: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;
  @belongsTo(() => Role, { name: 'role' }, { keyTo: 'name', name: 'role' })
  roleName: string;
  @belongsTo(() => Customer, { name: 'customer' }, { keyTo: 'name', name: 'customername' })
  customerName: string;

  @property({
    type: 'string',
    required: true,
  })

  address: string;

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}


