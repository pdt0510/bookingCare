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
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions';
import FullPreviewImg from '../FullPreviewImg';

//src15, UserRedux3
class UserRedux extends Component {
  state = {
    email: '',
    image: '',
    previewImgUrl: '',
    password: '',
    passwordConfirmed: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    gender: '',
    position: '',
    roleId: '',
    isFullPreview: false,
  };

  componentDidMount = async () => {
    const {
      reduxGenders,
      reduxRoles,
      reduxPositions,
      isFetching,
      loadingAllcodeAttrs,
    } = this.props;
    if (
      reduxGenders.length === 0 ||
      reduxRoles.length === 0 ||
      reduxPositions.length === 0
    ) {
      isFetching(); // v67xx1

      // 16ms48ss
      setTimeout(async () => {
        await loadingAllcodeAttrs();
      }, 2000);
    }
  };

  handleImageUploaded = (e) => {
    const { files } = e.target;
    let file = [];

    //multiple files
    // let file2 = [];
    // for (let i = 0; i < files.length; i++) {
    //   file2.push(files[i]);
    // }
    // console.log('file2', file2);

    //only file
    file = files[0];
    const prevImgLink = URL.createObjectURL(file); // 47ms35ss
    this.setState({
      previewImgUrl: prevImgLink,
    });
  };

  previewClick = () => {
    const { isFullPreview } = this.state;
    this.setState({ isFullPreview: !isFullPreview });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  checkingInputValues = (state) => {
    let isValid = false;
    let password, passwordConfirm;

    for (let key in state) {
      if (key === 'password') {
        password = state[key];
      } else if (key === 'passwordConfirmed') {
        passwordConfirm = state[key];
      }

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

    if (password !== passwordConfirm) {
      alert(`Password fields're incorrect`);
      return isValid;
    }

    return (isValid = true);
  };

  submitHandle = async () => {
    let isValid = this.checkingInputValues(this.state);
    if (isValid) {
      this.resettingForm();
    }
  };

  resettingForm = () => {
    const stateCloned = { ...this.state };
    for (const key in stateCloned) {
      if (key === 'genderDb' || key === 'roleDb') {
        continue;
      }
      stateCloned[key] = '';
    }
    this.setState({
      ...stateCloned,
    });
  };

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
    const { userEdit, reduxGenders, reduxRoles, reduxPositions, isLoading } =
      this.props;

    const {
      email,
      image,
      previewImgUrl,
      password,
      passwordConfirmed,
      firstName,
      lastName,
      address,
      phoneNumber,
      gender,
      roleId,
      position,
      isFullPreview,
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
      positionL,
      saveL,
      loadImg,
    } = textLangs;

    return (
      <div className='container'>
        <ModalHeader className='userRedux-header'>
          <FormattedMessage id={createNewUserL} />
        </ModalHeader>
        <ModalBody className='userRedux-body'>
          <h3>{isLoading ? 'Loading Gender-Role-Position' : ''}</h3>
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
              <Col lg='3'>
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
              <Col lg='3'>
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
              <Col lg='3'>
                <FormGroup>
                  <Label className='userRedux-label' for='PasswordFor'>
                    <FormattedMessage id={passwordL} />
                  </Label>
                  <Input
                    type='text'
                    name='password'
                    disabled={userEdit ? true : false}
                    value={password}
                    id='PasswordFor'
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col lg='3'>
                <FormGroup>
                  <Label className='userRedux-label' for='passwordConfirmedFor'>
                    <FormattedMessage id={passwordConfirmedL} />
                  </Label>
                  <Input
                    type='text'
                    name='passwordConfirmed'
                    disabled={userEdit ? true : false}
                    value={passwordConfirmed}
                    id='passwordConfirmedFor'
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg='2'>
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
                    {reduxGenders && reduxGenders.length > 0
                      ? this.renderOptionEle(reduxGenders)
                      : ''}
                  </Input>
                </FormGroup>
              </Col>
              <Col lg='2'>
                <FormGroup>
                  <Label className='userRedux-label' for='exampleSelect'>
                    <FormattedMessage id={positionL} />
                  </Label>
                  <Input
                    type='select'
                    name='position'
                    value={position}
                    id='exampleSelect'
                    onChange={this.handleChange}
                  >
                    {reduxPositions && reduxPositions.length > 0
                      ? this.renderOptionEle(reduxPositions)
                      : ''}
                  </Input>
                </FormGroup>
              </Col>
              <Col lg='2'>
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
                    {reduxRoles && reduxRoles.length > 0
                      ? this.renderOptionEle(reduxRoles)
                      : ''}
                  </Input>
                </FormGroup>
              </Col>
              <Col lg='3'>
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
              <Col lg='3'>
                <FormGroup>
                  {/* 39ms30ss */}
                  <Label className='userRedux-label'>
                    <FormattedMessage id={imageL} />
                  </Label>
                  <Input
                    ref='file'
                    type='file'
                    name='image'
                    value={image}
                    id='imageFor'
                    // multiple
                    hidden
                    onChange={this.handleImageUploaded}
                  />
                  {/* 40ms51ss */}
                  <Label className='userRedux-label-upload' for='imageFor'>
                    <i className='fas fa-upload'></i>
                    <FormattedMessage id={loadImg} />
                  </Label>
                  {/* 47ms35ss, v67xx2 */}
                  {previewImgUrl && (
                    <span
                      className='preview-image'
                      style={{ backgroundImage: `url(${previewImgUrl})` }} // 59ms20ss
                      onClick={this.previewClick}
                    ></span>
                  )}

                  {
                    // 1h02ms07ss, v67xx2
                    isFullPreview && (
                      <FullPreviewImg
                        imgUrl={previewImgUrl}
                        previewClick={this.previewClick}
                      />
                    )
                  }
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter className='userRedux-footer'>
          <h4 className='userRedux-footer-text'>
            {false ? 'Successfully request' : ''}
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
    isLoading: state.admin.isLoading, // 13ms18ss
    reduxGenders: state.admin.genderList,
    reduxRoles: state.admin.roleList,
    reduxPositions: state.admin.posList,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isFetching: () => dispatch(actions.isLoadingFromFetch()), //v67xx1
    loadingAllcodeAttrs: () => dispatch(actions.fetchAttrsOfAllcodeApi()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
