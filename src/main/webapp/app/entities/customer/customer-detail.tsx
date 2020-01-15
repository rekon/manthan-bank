import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CustomerDetail extends React.Component<ICustomerDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { customerEntity } = this.props;
    return (
      <Row>
        <Col md="6" sm="12">
          <h2>
            Customer [<b>{customerEntity.customerId}</b>]
          </h2>
          <dl className="jh-entity-details">
            {/* <dt>
              <span id="customerId">Customer Id</span>
            </dt>
            <dd>{customerEntity.customerId}</dd> */}
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{customerEntity.name}</dd>
            <dt>
              <span id="limitBalance">Limit Balance</span>
            </dt>
            <dd>{customerEntity.limitBalance}</dd>
            <dt>
              <span id="sex">Sex</span>
            </dt>
            <dd>{customerEntity.sex}</dd>
            <dt>
              <span id="education">Education</span>
            </dt>
            <dd>{customerEntity.education}</dd>
            <dt>
              <span id="marriage">Marriage</span>
            </dt>
            <dd>{customerEntity.marriage}</dd>
            <dt>
              <span id="age">Age</span>
            </dt>
            <dd>{customerEntity.age}</dd>
            {/* <dt>
              <span id="creditHistory">Credit History</span>
            </dt> */}
            {/* <dd>{customerEntity.creditHistory}</dd> */}
            <dt>
              <span id="isDefaulter">Is Defaulter</span>
            </dt>
            <dd>{customerEntity.isDefaulter ? 'YES' : 'NO'}</dd>
          </dl>
          <Button tag={Link} to="/entity/customer" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          {/* <Button tag={Link} to={`/entity/customer/${customerEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button> */}
        </Col>
        <Col md="6" sm="12">
          <Row>
            <dl>
              <dt>
                <span id="creditHistory">Credit History</span>
              </dt>
              <dd>{customerEntity.creditHistory}</dd>
            </dl>
          </Row>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ customer }: IRootState) => ({
  customerEntity: customer.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDetail);
