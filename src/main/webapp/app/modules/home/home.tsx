import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Button, Row, Col, Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const { account } = this.props;
    return (
      <Row>
        <Col md="9">
          <h2>Welcome, Manthan Bank</h2>
          {account && account.login ? (
            <div>
              <p className="lead">Hello {account.login}, please select:</p>
              {/* <Alert color="success">You are logged in as user {account.login}.</Alert> */}
              <Row>
                <Col sm="4">
                  <Button tag={Link} to={`entity/customer`} color="info" size="md">
                    <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">All Customers</span>
                  </Button>
                </Col>
                <Col sm="4">
                  <Button tag={Link} to={`entity/customer/defaulters`} color="danger" size="md">
                    <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Defaulters</span>
                  </Button>
                </Col>
                <Col sm="4" />
              </Row>
            </div>
          ) : (
            <div>
              <Alert color="warning">
                If you want to
                <Link to="/login" className="alert-link">
                  {' '}
                  sign in
                </Link>
                , you can try the default accounts:
                <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
              </Alert>

              <Alert color="warning">
                You do not have an account yet?&nbsp;
                <Link to="/register" className="alert-link">
                  Register a new account
                </Link>
              </Alert>
            </div>
          )}
        </Col>
        <Col md="3" className="pad">
          <span className="hipster rounded" />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
