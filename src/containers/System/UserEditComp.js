import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userService } from '../../services';

class UserEditComp extends Component {
  state = {
    userEditing: null,
  };

  render() {
    return (
      <div className='text-center'>
        <h3>Editing users</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEditComp);
