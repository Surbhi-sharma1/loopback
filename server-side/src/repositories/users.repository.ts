import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {PgDataSource} from '../datasources';
import {Customer, Role, Users} from '../models';
import {CustomerRepository} from './customer.repository';
import {RoleRepository} from './role.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id

> {

  public readonly customers: HasManyRepositoryFactory<Customer, typeof Users.prototype.id>;

  public readonly customer: BelongsToAccessor<Customer, typeof Users.prototype.id>;

  public readonly role: BelongsToAccessor<Role, typeof Users.prototype.id>;

  constructor(
    @inject('datasources.PG') dataSource: PgDataSource, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>, @repository.getter('RoleRepository') protected roleRepositoryGetter: Getter<RoleRepository>,
  ) {
    super(Users, dataSource);
    this.role = this.createBelongsToAccessorFor('role', roleRepositoryGetter,);
    this.customer = this.createBelongsToAccessorFor('customer', customerRepositoryGetter,);

    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
  }
}
