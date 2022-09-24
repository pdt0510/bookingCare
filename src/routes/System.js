import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/UserRedux'; //38ms10ss
import Header from '../containers/Header/Header';
import AdminUser from '../containers/System/AdminUser';
import DoctorUser from '../containers/System/DoctorUser';
import { routeLinks } from '../connectSupplyFE/otherSupplies';

//src14
class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    const { userManageLink, userReduxLink, userDoctorLink, userAdminLink } = routeLinks;
    return (
      <>
        {/* 2ms48ss */}
        {isLoggedIn && <Header />}

        <div className='system-container'>
          <div className='system-list'>
            {/* 24ms37ss */}
            <Switch>
              <Route path={userManageLink} component={UserManage} />
              {/* 38ms10ss */}
              <Route path={userReduxLink} component={UserRedux} />
              <Route path={userDoctorLink} component={DoctorUser} />
              <Route path={userAdminLink} component={AdminUser} />

              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />; // 39ms10ss
                }}
              />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
