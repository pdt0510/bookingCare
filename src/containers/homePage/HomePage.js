//src12, 21ms48ss
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';

class HomePage extends Component {
  render() {
    return (
      <>
        {/* 29ms03ss */}
        <HomeHeader />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
