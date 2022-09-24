import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'; //31ms47ss
import Navigator from '../../components/Navigator';
import './Header.scss';
import { adminMenu } from './menuApp';
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';

//src14
class Header extends Component {
  changeLangs = (lang) => {
    this.props.langsHandle(lang);
  };

  render() {
    const { processLogout, isLoggedIn, language, userInfo } = this.props;

    return (
      <div className='header-container'>
        {/* navigator bar */}
        <div className='header-tabs-container'>
          {
            isLoggedIn ? <Navigator menus={adminMenu} /> : '' //40ms53ss
          }
        </div>

        {/* btn langs, 14ms59ss */}
        <div className='switch-lang header-lang'>
          <span
            className={`${language === 'vi' ? 'active' : ''}`}
            onClick={() => this.changeLangs(LANGUAGES.VI)}
          >
            VI
          </span>
          <span>-</span>
          <span
            className={`${language === 'en' ? 'active' : ''}`}
            onClick={() => this.changeLangs(LANGUAGES.EN)}
          >
            EN
          </span>
        </div>

        {/* 2ms30ss */}
        <span>
          <FormattedMessage id={'home-header.welcome'} />
          {
            userInfo ? userInfo.firstName : 'No user' //7ms51ss
          }
        </span>

        {/* logout btn */}
        <div className='btn btn-logout' onClick={processLogout}>
          <i className='fas fa-sign-out-alt'></i>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo, //7ms51ss
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language, //14ms59ss
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    langsHandle: (lang) => dispatch(actions.changeLangsApp(lang)), //14ms59ss, 31ms47ss
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
