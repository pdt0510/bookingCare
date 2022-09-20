import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Category.scss';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

//src13,
class Category extends Component {
  render() {
    return (
      <>
        <div className='section-bgr'>
          <div className='container-section'>
            <div className='section-content'>
              <div className='section-title'>
                <span className='section-title-text'>Cẩm nang</span>
                <span className='section-moreBtn'>Tất cả bài viết</span>
              </div>
              <div className='section-body'>
                <Slider {...this.props.settings}>
                  <div href='##' className='section-blocks category-blocks'>
                    <div className='category-pics category-pic1'></div>
                    <div className='section-content-text category-content-text'>
                      Review Nha khoa 360 Dental có uy tín không? Dịch vụ thế
                      mạnh
                    </div>
                  </div>

                  <div href='##' className='section-blocks category-blocks'>
                    <div className='category-pics category-pic2'></div>
                    <div className='section-content-text category-content-text'>
                      7 bệnh viện, phòng khám chấn thương chỉnh hình uy tín tại
                      TP.HCM
                    </div>
                  </div>

                  <div href='##' className='section-blocks category-blocks'>
                    <div className='category-pics category-pic3'></div>
                    <div className='section-content-text category-content-text'>
                      8 bệnh viện, phòng khám Hô hấp uy tín tại TP.HCM
                    </div>
                  </div>

                  <div href='##' className='section-blocks category-blocks'>
                    <div className='category-pics category-pic4'></div>
                    <div className='section-content-text category-content-text'>
                      13 bác sĩ Da liễu giỏi và uy tín tại TP.HCM{' '}
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
