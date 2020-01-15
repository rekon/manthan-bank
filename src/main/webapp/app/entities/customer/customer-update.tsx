import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICustomerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICustomerUpdateState {
  isNew: boolean;
}

export class CustomerUpdate extends React.Component<ICustomerUpdateProps, ICustomerUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { customerEntity } = this.props;
      const entity = {
        ...customerEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/customer');
  };

  render() {
    const { customerEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="manthanBankApp.customer.home.createOrEditLabel">Create or edit a Customer</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : customerEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="customer-id">ID</Label>
                    <AvInput id="customer-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="customerIdLabel" for="customer-customerId">
                    Customer Id
                  </Label>
                  <AvField
                    id="customer-customerId"
                    type="string"
                    className="form-control"
                    name="customerId"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="customer-name">
                    Name
                  </Label>
                  <AvField
                    id="customer-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="limitBalanceLabel" for="customer-limitBalance">
                    Limit Balance
                  </Label>
                  <AvField
                    id="customer-limitBalance"
                    type="string"
                    className="form-control"
                    name="limitBalance"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="sexLabel" for="customer-sex">
                    Sex
                  </Label>
                  <AvInput
                    id="customer-sex"
                    type="select"
                    className="form-control"
                    name="sex"
                    value={(!isNew && customerEntity.sex) || 'OTHER'}
                  >
                    <option value="OTHER">OTHER</option>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="educationLabel" for="customer-education">
                    Education
                  </Label>
                  <AvInput
                    id="customer-education"
                    type="select"
                    className="form-control"
                    name="education"
                    value={(!isNew && customerEntity.education) || 'UNKNOWN0'}
                  >
                    <option value="UNKNOWN0">UNKNOWN0</option>
                    <option value="GRADUATE_SCHOOL">GRADUATE_SCHOOL</option>
                    <option value="UNIVERSITY">UNIVERSITY</option>
                    <option value="HIGH_SCHOOL">HIGH_SCHOOL</option>
                    <option value="OTHERS">OTHERS</option>
                    <option value="UNKNOWN">UNKNOWN</option>
                    <option value="UNKNOWN2">UNKNOWN2</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="marriageLabel" for="customer-marriage">
                    Marriage
                  </Label>
                  <AvInput
                    id="customer-marriage"
                    type="select"
                    className="form-control"
                    name="marriage"
                    value={(!isNew && customerEntity.marriage) || 'UNKNOWN'}
                  >
                    <option value="UNKNOWN">UNKNOWN</option>
                    <option value="MARRIED">MARRIED</option>
                    <option value="SINGLE">SINGLE</option>
                    <option value="OTHERS">OTHERS</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="ageLabel" for="customer-age">
                    Age
                  </Label>
                  <AvField
                    id="customer-age"
                    type="string"
                    className="form-control"
                    name="age"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="creditHistoryLabel" for="customer-creditHistory">
                    Credit History
                  </Label>
                  <AvField id="customer-creditHistory" type="text" name="creditHistory" />
                </AvGroup>
                <AvGroup>
                  <Label id="isDefaulterLabel" check>
                    <AvInput id="customer-isDefaulter" type="checkbox" className="form-control" name="isDefaulter" />
                    Is Defaulter
                  </Label>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/customer" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  customerEntity: storeState.customer.entity,
  loading: storeState.customer.loading,
  updating: storeState.customer.updating,
  updateSuccess: storeState.customer.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerUpdate);
