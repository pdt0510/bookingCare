import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserRedux.scss';
import { FormattedMessage } from 'react-intl';
import {
  Button,
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
import { textLangs } from '../../../connectSupplyFE/otherSupplies';
import { userService } from '../../../services';
import { LANGUAGES } from '../../../utils/constant';

let isSuccess = null;

//src15, UserRedux1
class UserRedux extends Component {
  state = {
    email: '',
    image: '',
    password: '',
    passwordConfirmed: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    gender: '',
    roleId: '',
    genderDb: null,
    roleDb: null,
  };

  // 48ms45ss
  componentDidMount = async () => {
    const data = await userService.allCodeUser();
    if (data.errCode === 0) {
      const genderCols = [];
      const roleCol2 = [];

      data.allCodes.filter((item) => {
        if (item.type === 'GENDER') {
          genderCols.push(item);
        } else if (item.type === 'ROLE') {
          roleCol2.push(item);
        }
        return null;
      });

      this.setState({
        genderDb: genderCols,
        roleDb: roleCol2,
      });
    }
  };

  handleChange = (event) => {
    isSuccess = null;
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  checkingInputValues = (state) => {
    let isValid = false;
    let password, passwordConfirm;

    for (let key in state) {
      //password fields
      if (key === 'password') {
        password = state[key];
      } else if (key === 'passwordConfirmed') {
        passwordConfirm = state[key];
      }

      //empty fields
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

    //checking password fields
    if (password !== passwordConfirm) {
      alert(`Password fields're incorrect`);
      return isValid;
    }
    return (isValid = true);
  };

  submitHandle = async () => {
    let isValid = null;
    isValid = this.checkingInputValues(this.state);

    if (isValid) {
      isSuccess = true;
    }

    if (isSuccess) {
      this.resettingForm();
    }
  };

  resettingForm = () => {
    const stateCloned = { ...this.state };
    for (const key in stateCloned) {
      if (key === 'genderDb' || key === 'roleDb') {
        continue; //keeping db cols for next 'add new' time
      }
      stateCloned[key] = '';
    }
    this.setState({
      ...stateCloned,
    });
  };

  // 48ms45ss
  renderOptionEle = (dataArr) => {
    const { language } = this.props;
    return (
      <>
        <option value=''>
          {language === LANGUAGES.EN ? 'Select' : 'Lựa chọn'} ---
        </option>

        {dataArr.map((item) => (
          <option value={item.keymap} key={item.keymap}>
            {language === LANGUAGES.EN ? item.valueEN : item.valueVI}
          </option>
        ))}
      </>
    );
  };

  render() {
    const { userEdit } = this.props;

    const {
      email,
      image,
      password,
      passwordConfirmed,
      firstName,
      lastName,
      address,
      phoneNumber,
      gender,
      roleId,
      genderDb,
      roleDb,
    } = this.state;

    const {
      createNewUserL,
      emailL,
      imageL,
      passwordL,
      passwordConfirmedL,
      firstnameL,
      lastnameL,
      addressL,
      mobileL,
      genderL,
      roleL,
      saveL,
    } = textLangs;

    return (
      <div className='container'>
        <ModalHeader className='userRedux-header'>
          <FormattedMessage id={createNewUserL} />
        </ModalHeader>
        <ModalBody className='userRedux-body'>
          <Form>
            <Row>
              <Col lg='6'>
                <FormGroup>
                  <Label className='userRedux-label' for='EmailFor'>
                    <FormattedMessage id={emailL} />
                  </Label>
                  <Input
                    type='email'
                    name='email'
                    disabled={userEdit ? true : false}
                    value={email}
                    id='EmailFor'
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col lg='6'>
                <FormGroup>
                  <Label className='userRedux-label' for='imageFor'>
                    <FormattedMessage id={imageL} />
                  </Label>
                  <Input
                    type='input'
                    name='image'
                    disabled={userEdit ? true : false}
                    value={image}
                    id='imageFor'
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg='6'>
                <FormGroup>
                  <Label className='userRedux-label' for='PasswordFor'>
                    <FormattedMessage id={passwordL} />
                  </Label>
                  <Input
                    type='text'
                    name='password'
                    disabled={userEdit ? true : false}
                    value={password}
                    // value={password ? password : '***'}
                    id='PasswordFor'
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col lg='6'>
                <FormGroup>
                  <Label className='userRedux-label' for='passwordConfirmedFor'>
                    <FormattedMessage id={passwordConfirmedL} />
                  </Label>
                  <Input
                    type='text'
                    name='passwordConfirmed'
                    disabled={userEdit ? true : false}
                    value={passwordConfirmed}
                    // value={passwordConfirmed ? passwordConfirmed : '***'}
                    id='passwordConfirmedFor'
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg='6'>
                <FormGroup>
                  <Label className='userRedux-label' for='firstNameFor'>
                    <FormattedMessage id={firstnameL} />
                  </Label>
                  <Input
                    type='text'
                    name='firstName'
                    value={firstName}
                    id='firstNameFor'
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col lg='6'>
                <FormGroup>
                  <Label className='userRedux-label' for='LastnameFor'>
                    <FormattedMessage id={lastnameL} />
                  </Label>
                  <Input
                    type='text'
                    name='lastName'
                    value={lastName}
                    id='LastnameFor'
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label className='userRedux-label' for='addressFor'>
                    <FormattedMessage id={addressL} />
                  </Label>
                  <Input
                    type='text'
                    name='address'
                    value={address}
                    id='addressFor'
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg='4'>
                <FormGroup>
                  <Label className='userRedux-label' for='phoneNumberFor'>
                    <FormattedMessage id={mobileL} />
                  </Label>
                  <Input
                    type='number'
                    name='phoneNumber'
                    value={phoneNumber}
                    id='phoneNumberFor'
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col lg='4'>
                <FormGroup>
                  <Label className='userRedux-label' for='exampleSelect'>
                    <FormattedMessage id={genderL} />
                  </Label>
                  <Input
                    type='select'
                    name='gender'
                    value={gender}
                    id='exampleSelect'
                    onChange={this.handleChange}
                  >
                    {genderDb && genderDb.length > 0
                      ? this.renderOptionEle(genderDb)
                      : ''}
                  </Input>
                </FormGroup>
              </Col>
              <Col lg='4'>
                <FormGroup>
                  <Label className='userRedux-label' for='roleFor'>
                    <FormattedMessage id={roleL} />
                  </Label>
                  <Input
                    type='select'
                    name='roleId'
                    value={roleId}
                    id='roleFor'
                    onChange={this.handleChange}
                  >
                    {roleDb && roleDb.length > 0
                      ? this.renderOptionEle(roleDb)
                      : ''}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter className='userRedux-footer'>
          <h4 className='userRedux-footer-text'>
            {isSuccess ? 'Successfully request' : ''}
          </h4>
          <Button
            color='primary'
            onClick={this.submitHandle}
            className='userRedux-btn'
          >
            <FormattedMessage id={saveL} />
          </Button>
        </ModalFooter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
