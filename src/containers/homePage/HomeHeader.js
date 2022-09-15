//src12, 29ms03ss
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl'; //58ms01ss
import { LANGUAGES } from '../../utils'; //20ms26ss
import { changeLangsApp } from '../../store/actions'; //25ms24ss

class HomeHeader extends Component {
  // 18ms50ss
  changeLangs = (lang) => {
    this.props.langsHandle(lang); //25ms24ss
  };

  render() {
    const { language } = this.props; //42ms30ss

    // 31ms22ss
    return (
      <>
        <div className='home-header-container'>
          <div className='home-header-content'>
            <div className='header-content-left'>
              <i className='fas fa-bars header-left-icon'></i>
              <span className='header-left-logo'></span>
            </div>
            <div className='header-content-mid'>
              <div className='header-mid-section'>
                {/* 58ms01ss */}
                <span className='header-mid-text1'>
                  <FormattedMessage id='home-header.speciality' />
                </span>
                <span className='header-mid-text2'>
                  <FormattedMessage id='home-header.findingDoctor' />
                </span>
                {/* <span className='header-mid-text1'>Chuyên khoa</span>
                <span className='header-mid-text2'>
                  Tìm bác sĩ theo chuyên khoa
                </span> */}
              </div>
              <div className='header-mid-section'>
                <span className='header-mid-text1'>
                  <FormattedMessage id='home-header.healthFacilities' />
                </span>
                <span className='header-mid-text2'>
                  <FormattedMessage id='home-header.selectHospitalClinic' />
                </span>
              </div>
              <div className='header-mid-section'>
                <span className='header-mid-text1'>
                  <FormattedMessage id='home-header.doctor' />
                </span>
                <span className='header-mid-text2'>
                  <FormattedMessage id='home-header.chooseAGoodDoctor' />
                </span>
              </div>
              <div className='header-mid-section'>
                <span className='header-mid-text1'>
                  <FormattedMessage id='home-header.checkupPackage' />
                </span>
                <span className='header-mid-text2'>
                  <FormattedMessage id='home-header.generalHealthCheck' />
                </span>
              </div>
            </div>
            <div className='header-content-right'>
              <i className='fas fa-question-circle header-right-icon'></i>
              <span className='header-mid-text2'>
                <FormattedMessage id='home-header.support' />
              </span>
              <span
                //42ms30ss
                className={`switch-to-vi ${language === 'vi' ? 'active' : ''}`}
                onClick={() => this.changeLangs(LANGUAGES.VI)} //20ms26ss
              >
                VI
              </span>
              <span>-</span>
              <span
                className={`switch-to-en ${language === 'en' ? 'active' : ''}`}
                onClick={() => this.changeLangs(LANGUAGES.EN)}
              >
                EN
              </span>
            </div>
          </div>
        </div>

        {/*  3ms59ss */}
        <div className='home-header-banner'>
          <div className='header-banner-content'>
            <span className='header-banner-text'>
              <FormattedMessage id='bannerTitle.title1_1' /> <br />
              <span>
                <FormattedMessage id='bannerTitle.title1_2' />
              </span>
            </span>
            {/* <span className='header-banner-text'>
              nền tảng y tế
              <br />
              <span> chăm sóc sức khỏe toàn diện</span>
            </span> */}
            <div className='header-banner-search'>
              <i className='fas fa-search banner-search-icon'></i>
              <input className='banner-search-input' placeholder={''} />
            </div>
            <div className='header-banner-badge'>
              <span className='banner-badge-google'></span>
              <span className='banner-badge-appStore'></span>
            </div>
          </div>
          <div className='banner-footer-content'>
            <div className='footer-content-blocks'>
              <span className='content-blocks-outlined content-icon-bgr-1'></span>
              {/* 1h12ms45ss */}
              <span className='content-block-text'>
                <FormattedMessage id='bannerTitle.title3_1' /> <br />
                <FormattedMessage id='bannerTitle.title3_2' />
              </span>
            </div>
            <div className='footer-content-blocks'>
              <span className='content-blocks-outlined content-icon-bgr-2'></span>
              <span className='content-block-text'>
                <FormattedMessage id='bannerTitle.title4_1' /> <br />
                <FormattedMessage id='bannerTitle.title4_2' />
              </span>
            </div>
            <div className='footer-content-blocks'>
              <span className='content-blocks-outlined content-icon-bgr-3'></span>
              <span className='content-block-text'>
                <FormattedMessage id='bannerTitle.title5_1' /> <br />
                <FormattedMessage id='bannerTitle.title5_2' />
              </span>
            </div>
            <div className='footer-content-blocks'>
              <span className='content-blocks-outlined content-icon-bgr-4'></span>
              <span className='content-block-text'>
                <FormattedMessage id='bannerTitle.title6_1' /> <br />
                <FormattedMessage id='bannerTitle.title6_2' />
              </span>
            </div>
            <div className='footer-content-blocks'>
              <span className='content-blocks-outlined content-icon-bgr-5'></span>
              <span className='content-block-text'>
                <FormattedMessage id='bannerTitle.title7_1' /> <br />
                <FormattedMessage id='bannerTitle.title7_2' />
              </span>
            </div>
            <div className='footer-content-blocks'>
              <span className='content-blocks-outlined content-icon-bgr-6'></span>
              <span className='content-block-text'>
                <FormattedMessage id='bannerTitle.title8_1' /> <br />
                <FormattedMessage id='bannerTitle.title8_2' />
              </span>
            </div>
            <div className='footer-content-blocks'>
              <span className='content-blocks-outlined content-icon-bgr-7'></span>
              <span className='content-block-text'>
                <FormattedMessage id='bannerTitle.title9_1' /> <br />
                <FormattedMessage id='bannerTitle.title9_2' />
              </span>
            </div>
            <div className='footer-content-blocks'>
              <span className='content-blocks-outlined content-icon-bgr-8'></span>
              <span className='content-block-text'>
                <FormattedMessage id='bannerTitle.title10_1' /> <br />
                <FormattedMessage id='bannerTitle.title10_2' />
              </span>
            </div>
            <div className='footer-content-blocks'>
              <span className='content-blocks-outlined content-icon-bgr-9'></span>
              <span className='content-block-text'>
                <FormattedMessage id='bannerTitle.title11_1' /> <br />
                <FormattedMessage id='bannerTitle.title11_2' />
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language, //50ms11ss, 42ms30ss
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    langsHandle: (lang) => dispatch(changeLangsApp(lang)), //25ms24ss
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
