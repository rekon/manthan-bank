import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ICustomerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string; showDefaulters: boolean }> {}

export type ICustomerState = IPaginationBaseState;

export class Customer extends React.Component<ICustomerProps, ICustomerState> {
  state: ICustomerState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(
      `${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},&defaulter=${this.state.showDefaulters},${
        this.state.order
      }`
    );
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    const showDefaulters = this.props.location.pathname.indexOf('defaulter') == -1 ? false : true;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`, showDefaulters);
  };

  render() {
    const { match, totalItems, customerList } = this.props;
    return (
      <div>
        <h2 id="customer-heading">
          Customers
          {/* <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Customer
          </Link> */}
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                {/* <th className="hand" onClick={this.sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th> */}
                <th className="hand" onClick={this.sort('customerId')}>
                  Customer Id <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('name')}>
                  Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('limitBalance')}>
                  Limit Balance <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('sex')}>
                  Sex <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('education')}>
                  Education <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('marriage')}>
                  Marriage <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('age')}>
                  Age <FontAwesomeIcon icon="sort" />
                </th>
                {/* <th className="hand" onClick={this.sort('creditHistory')}>
                  Credit History <FontAwesomeIcon icon="sort" />
                </th> */}
                <th className="hand" onClick={this.sort('isDefaulter')}>
                  Is Defaulter <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {customerList.map((customer, i) => (
                <tr key={`entity-${i}`}>
                  {/* <td>
                    <Button tag={Link} to={`${match.url}/${customer.id}`} color="link" size="sm">
                      {customer.id}
                    </Button>
                  </td> */}
                  <td>
                    <Button tag={Link} to={`${match.url}/${customer.id}`} color="link" size="sm">
                      {customer.customerId}
                    </Button>
                  </td>
                  <td>{customer.name}</td>
                  <td>{customer.limitBalance}</td>
                  <td>{customer.sex}</td>
                  <td>{customer.education}</td>
                  <td>{customer.marriage}</td>
                  <td>{customer.age}</td>
                  {/* <td className="customers-td">{customer.creditHistory}</td> */}
                  <td>{customer.isDefaulter ? 'YES' : 'NO'}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${customer.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      {/* <Button tag={Link} to={`${match.url}/${customer.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${customer.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Row className="justify-content-center">
          <JhiPagination
            items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
            activePage={this.state.activePage}
            onSelect={this.handlePagination}
            maxButtons={5}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ customer }: IRootState) => ({
  customerList: customer.entities,
  totalItems: customer.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Customer);
