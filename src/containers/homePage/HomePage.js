import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import HomeHeader from './section/HomeHeader';
import Speciality from './section/Specialty';
import MedicalFacility from './section/MedicalFacility';
import Doctors from './section/Doctors';
import Category from './section/Category';
import About from './section/About';
import HomeFooter from './section/HomeFooter';

class HomePage extends Component {
  render() {
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
    };

    return (
      <>
        <HomeHeader />

        {/* v59xx1, 20ms05ss */}
        <Speciality settings={settings} />
        <MedicalFacility settings={settings} />
        <Doctors settings={settings} />
        <Category
          settings={{ ...settings, slidesToShow: 2, slidesToScroll: 1 }}
        />
        <About />
        <HomeFooter />
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
