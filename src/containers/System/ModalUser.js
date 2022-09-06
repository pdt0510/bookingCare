import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Label,
  Input,
  Form,
  Row,
  Col,
} from 'reactstrap';

import './ModalUser.scss';

//src11, 22ms14ss
class ModalUser extends Component {
  state = {
    email: '',
    password: '',
    passwordConfirmed: '',

    //v50xx1, v50xx2
    firstName: '', //v52xx2
    lastName: '',
    address: '',
    phoneNumber: '',
    gender: '',
    roleId: '',
  };

  componentDidMount = () => {
    const { userEdit } = this.props;
    if (userEdit) {
      this.setState({
        ...userEdit, //v52xx2
        gender: `${userEdit.gender}`, //v52xx6, for update -> server
      });
    }
  };

  // v50xx3
  restAndSpreadTesting = () => {
    // rest of array
    const array = [1, 2, 3, 4];
    const [t, e, ...rest] = array; //kết hợp destructuring array
    // console.log(t, e, ...rest);

    /* rest of object */
    const object = {
      key1: 'key1',
      key2: 'key2',
      key3: 'key3',
      key4: 'key4',
    };
    const { key1, key2, ...restObj } = object; //kết hợp destructuring obj
    // console.log(key1, key2, restObj);

    /* spread of array */
    const array2 = [...array];
    // console.log('array2 - ', array2);

    /* spread of obj */
    const stateCloned = { ...this.state };
    // console.log('stateCloned - ', stateCloned);
  };

  // 3ms23ss
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value, //v50xx1
    });
  };

  checkingEditValues = (state) => {
    let isValid = false;
    for (let key in state) {
      if (!state[key]) {
        if (key === 'id') {
          continue;
        } else if (key === 'phoneNumber') {
          alert(`Missing field: PHONE NUMBER`);
        } else if (key === 'roleId') {
          alert(`Missing param: ROLE`);
        } else {
          alert(`Missing param: ${key.toUpperCase()}`);
        }
        return isValid;
      }
    }
    return (isValid = true);
  };

  // 45ms31ss
  checkingInputValues = (state) => {
    let isValid = false;
    for (let key in state) {
      if (!state[key]) {
        if (key === 'passwordConfirmed') {
          alert(`Missing param: CONFIRM PASSWORD`);
        } else if (key === 'phoneNumber') {
          alert(`Missing field: PHONE NUMBER`);
        } else if (key === 'roleId') {
          alert(`Missing param: ROLE`);
        } else {
          alert(`Missing param: ${key.toUpperCase()}`);
        }
        return isValid;
      }
    }
    return (isValid = true);
  };

  resettingForm = () => {
    const stateCloned = { ...this.state };
    for (let key in stateCloned) {
      stateCloned[key] = '';
    }
    this.setState({
      ...stateCloned,
    });
  };

  submitHandle = async () => {
    this.restAndSpreadTesting();
    let isValid = null;
    let isSuccess = null;

    // 35ms06ss
    const { createNewUserFn, updateAnUser, userEdit } = this.props;

    if (userEdit) {
      const dataForUpdate = {
        id: this.state.id,
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        gender: this.state.gender,
        phoneNumber: this.state.phoneNumber,
        roleId: this.state.roleId,
      };
      isValid = this.checkingEditValues(dataForUpdate);
      if (isValid) {
        isSuccess = await updateAnUser(dataForUpdate);
      }
    } else {
      isValid = this.checkingInputValues(this.state);
      if (isValid) {
        isSuccess = await createNewUserFn(this.state);
      }
    }

    // v50xx4
    if (isSuccess) {
      this.cancelHandle();
    }
  };

  cancelHandle = () => {
    const { toggleModalFn } = this.props;
    this.resettingForm();
    toggleModalFn();
  };

  render() {
    const { toggleModalFn, userEdit } = this.props; // 35ms06ss
    const {
      email,
      password,
      passwordConfirmed,
      firstName,
      lastName,
      address,
      phoneNumber,
      gender,
      roleId,
    } = this.state;

    return (
      // 53ms29ss
      <Modal
        isOpen={true} //v52xx3
        centered
        size='lg'
        className='model-user-container-custom'
      >
        {/* 57ms21ss */}
        <ModalHeader toggle={toggleModalFn} className='header-custom'>
          {userEdit ? 'Update an user' : 'Create an new user'}
        </ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col className='mb-3'>
                <FormGroup>
                  <Label for='EmailFor'>Email</Label>
                  <Input
                    disabled={userEdit ? true : false}
                    type='email'
                    name='email'
                    value={email} //39ms47ss, v50xx2
                    id='EmailFor'
                    placeholder='Email'
                    onChange={this.handleChange} //3ms23ss
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col lg='6' className='mb-3'>
                <FormGroup>
                  <Label for='PasswordFor'>Password</Label>
                  <Input
                    type='text'
                    name='password'
                    disabled={userEdit ? true : false} //v52xx4
                    value={password ? password : '***'} //39ms47ss, v50xx2, v52xx5
                    id='PasswordFor'
                    placeholder='Password'
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col lg='6' className='mb-3'>
                <FormGroup>
                  <Label for='passwordConfirmedFor'>Confirm Password</Label>
                  <Input
                    type='text'
                    name='passwordConfirmed'
                    disabled={userEdit ? true : false} //v52xx4
                    value={passwordConfirmed ? passwordConfirmed : '***'} //39ms47ss, v52xx5
                    id='passwordConfirmedFor'
                    placeholder='Confirm password'
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg='6' className='mb-3'>
                <FormGroup>
                  <Label for='firstNameFor'>Firstname</Label>
                  <Input
                    type='text'
                    name='firstName'
                    value={firstName} //v52xx2
                    id='firstNameFor'
                    placeholder='Firstname'
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col lg='6' className='mb-3'>
                <FormGroup>
                  <Label for='LastnameFor'>Lastname</Label>
                  <Input
                    type='text'
                    name='lastName'
                    value={lastName} //v52xx2
                    id='LastnameFor'
                    placeholder='Lastname'
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className='mb-3'>
                <FormGroup>
                  <Label for='addressFor'>Address</Label>
                  <Input
                    type='text'
                    name='address'
                    value={address}
                    id='addressFor'
                    placeholder='Address'
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg='4' className='mb-3'>
                <FormGroup>
                  <Label for='phoneNumberFor'>Phone number</Label>
                  <Input
                    type='number'
                    name='phoneNumber'
                    value={phoneNumber}
                    id='phoneNumberFor'
                    placeholder='Phone number'
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col lg='4' className='mb-3'>
                <FormGroup>
                  <Label for='exampleSelect'>Gender</Label>
                  <Input
                    type='select'
                    name='gender'
                    value={gender}
                    id='exampleSelect'
                    onChange={this.handleChange}
                  >
                    <option value=''>Select ---</option>
                    <option value='0'>Female</option>
                    <option value='1'>Male</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg='4' className='mb-3'>
                <FormGroup>
                  <Label for='roleFor'>Role</Label>
                  <Input
                    type='select'
                    name='roleId'
                    value={roleId}
                    id='roleFor'
                    onChange={this.handleChange}
                  >
                    <option value=''>Select ---</option>
                    <option value='0'>Admin</option>
                    <option value='1'>Doctor</option>
                    <option value='2'>Patient</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color='primary'
            onClick={this.submitHandle}
            className='modalFooter-btn-group'
          >
            {userEdit ? 'Update' : 'Add new'}
          </Button>
          <Button
            color='secondary'
            onClick={this.cancelHandle}
            className='modalFooter-btn-group'
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
