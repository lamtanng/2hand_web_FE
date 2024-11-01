import { Carousel } from 'antd';
import React from 'react';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '450px',
  color: '#fff',
  lineHeight: '450px',
  textAlign: 'center',
  background: '#364d79',
  borderRadius: '20px'
};

const CustomCarousel = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  return (
    <Carousel dots={false} arrows autoplay infinite={true} afterChange={onChange}>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  );
};

export default CustomCarousel;
