import React, { Component } from 'react';

//src14, 38ms10ss
import { connect } from 'react-redux';
class UserRedux extends Component {
  state = {};

  componentDidMount() {}

  // 45ms39ss
  render() {
    return (
      <div className='container user-redux-container text-center'>
        <h1 className='user-redux-title'>Redux User manager</h1>
        <div className='user-redux-body'>
          <a className='btn btn-primary btn-add' href='##' role='button'>
            <i className='fas fa-plus'></i> Add an user
          </a>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
