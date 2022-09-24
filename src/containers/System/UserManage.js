import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { userService } from '../../services';
import ModalUser from './ModalUser';
import './UserManage.scss';
import { userManageLangs } from './userManageLangs';

//src14
class UserManage extends Component {
  state = {
    isOpen: false,
    userEdit: null,
    userList: [],
    message: '',
  };

  updateAnUser = async (userUpdated) => {
    if (userUpdated) {
      try {
        const data = await userService.updateUser(userUpdated);

        if (data.errCode === 0) {
          const id = userUpdated.id;
          const newList = this.state.userList.map((item) => {
            if (item.id === id) {
              item = userUpdated;
            }
            return item;
          });
          this.setState({
            userEdit: null,
            userList: newList,
            message: 'Successfully updated',
          });
          return true;
        }

        alert(data.message);
        return false;
      } catch (error) {
        console.log('UserManage.js: ', error);
      }
    }
  };

  editUserHandle = (user) => {
    this.toggleModalFn();
    this.setState({
      userEdit: user,
    });
  };

  deleleUserHandle = async (userId) => {
    if (userId) {
      try {
        const data = await userService.deleteUser(userId);

        if (data.errCode === 0) {
          this.setState({
            userList: this.state.userList.filter((item) => item.id !== userId),
            message: 'Successfully deleted',
          });
          return;
        }

        alert(data.message);
        return;
      } catch (error) {
        console.log('UserManage.js: ', error);
      }
    }
  };

  createNewUserFn = async (newUser) => {
    if (newUser) {
      try {
        const data = await userService.newUser(newUser);

        if (data.errCode === 0) {
          const userCreated = {
            ...data.user,
            // gender: data.user.gender ? '1' : '0',
            gender: data.user.gender, //37ms20ss
          };

          const newList = [...this.state.userList];
          newList.push(userCreated);

          this.setState({
            userEdit: null,
            userList: newList,
            message: 'Successfully created',
          });
          return true;
        }

        alert(data.message);
        return false;
      } catch (error) {
        console.log('UserManage.js: ', error);
      }
    }
  };

  getAllUsers = async () => {
    const data = await userService.userList();
    this.setState({
      userList: data.users,
    });
  };

  componentDidMount = async () => {
    await this.getAllUsers();
  };

  toggleModalFn = () => {
    this.setState({
      userEdit: null, //reset userEdit to null if valued or not
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { userList, isOpen, message, userEdit } = this.state;
    const { name1, name2, name3, name4, name5, name6, name7 } = userManageLangs; //v62xx1

    const renderUserList = () => {
      return (
        <div className='container'>
          <a
            className='btn btn-primary btn-add'
            href='##'
            role='button'
            onClick={this.toggleModalFn}
          >
            <i className='fas fa-plus'></i>
            {''} <FormattedMessage id={name2} />
          </a>

          {isOpen ? (
            <ModalUser
              toggleModalFn={this.toggleModalFn}
              createNewUserFn={this.createNewUserFn}
              updateAnUser={this.updateAnUser}
              userEdit={userEdit}
            />
          ) : null}
          <table className=' table table-hover table-bordered table-sm'>
            <thead className='table-success'>
              <tr>
                <th scope='col'>
                  <FormattedMessage id={name3} />
                </th>
                <th scope='col'>
                  <FormattedMessage id={name4} />
                </th>
                <th scope='col'>
                  <FormattedMessage id={name5} />
                </th>
                <th scope='col'>
                  <FormattedMessage id={name6} />
                </th>
                <th scope='col'>
                  <FormattedMessage id={name7} />
                </th>
                <th scope='col'></th>
              </tr>
            </thead>
            {userList.map((item, idx) => (
              <tbody key={idx}>
                <tr>
                  <th scope='row'>{idx + 1}</th>
                  <td>{item.email}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.address}</td>
                  <td className='btn-group-user'>
                    <a
                      href='##'
                      role='button'
                      className='btn-user-list btn-edit'
                      onClick={() => this.editUserHandle(item)}
                    >
                      <i className='fas fa-pencil-alt'></i>
                    </a>
                    <a
                      href='##'
                      type='button'
                      className='btn-user-list btn-delete'
                      onClick={() => this.deleleUserHandle(item.id)}
                    >
                      <i className='fas fa-trash delete-icon'></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          <h4 className='modal-success-message'>{message ? message : ''}</h4>
        </div>
      );
    };

    return (
      <div className='text-center'>
        {/* <h3>Managing users</h3> */}
        <h3>
          {/* v62xx1 */}
          <FormattedMessage id={name1} />
        </h3>
        {userList ? renderUserList() : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
