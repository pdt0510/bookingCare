import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userService } from '../../services';
import './UserManage.scss';
import ModalUser from './ModalUser';

class UserManage extends Component {
  state = {
    isOpen: false,
    userList: [],
    message: '',
    userEdit: null,
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

  // v52xx1
  editUserHandle = (user) => {
    this.toggleModalFn();
    this.setState({
      userEdit: user,
    });
  };

  // v51xx1
  deleleUserHandle = async (userId) => {
    if (userId) {
      try {
        const data = await userService.deleteUser(userId);

        if (data.errCode === 0) {
          const newList = [...this.state.userList];
          this.setState({
            userList: newList.filter((item) => item.id !== userId),
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

  //58ms50ss
  createNewUserFn = async (newUser) => {
    if (newUser) {
      try {
        const data = await userService.newUser(newUser);

        if (data.errCode === 0) {
          const userCreated = {
            ...data.user,
            gender: data.user.gender ? '1' : '0', //v52xx6 rendering to UI
          };

          const newList = [...this.state.userList];
          newList.push(userCreated);

          this.setState({
            userEdit: null,
            userList: newList, //update the list for UI
            message: 'Successfully created',
          });
          return true; //v50xx4
        }

        alert(data.message);
        return false; //v50xx4
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

  // 35ms06ss
  toggleModalFn = () => {
    if (this.state.userEdit) {
      this.setState({
        userEdit: null,
        isOpen: !this.state.isOpen,
      });
    } else {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }
  };

  render() {
    const { userList, isOpen, message, userEdit } = this.state;

    const renderUserList = () => {
      return (
        <div className='container'>
          <a
            className='btn btn-primary btn-add' //2ms45ss
            href='##'
            role='button'
            onClick={this.toggleModalFn}
          >
            <i className='fas fa-plus'></i> ADD AN USER
          </a>
          {/* 31ms23ss, v52xx3 */}
          {isOpen ? (
            <ModalUser
              toggleModalFn={this.toggleModalFn} //35ms06ss
              createNewUserFn={this.createNewUserFn}
              updateAnUser={this.updateAnUser}
              userEdit={userEdit}
            />
          ) : null}
          <table className=' table table-hover table-bordered table-sm'>
            <thead className='table-success'>
              <tr>
                <th scope='col'>No.</th>
                <th scope='col'>Email</th>
                <th scope='col'>Firstname</th>
                <th scope='col'>Lastname</th>
                <th scope='col'>Address</th>
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
        <h3>Managing users</h3>
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
