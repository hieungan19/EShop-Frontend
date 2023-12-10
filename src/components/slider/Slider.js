import { useState, useEffect } from 'react';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Box, Paper, Typography } from '@mui/material';
import sliderData from './sliderData';
import './Slider.scss';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;
  const autoScroll = true;
  let slideInterval;
  const intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide, slideInterval, autoScroll]);

  return (
    <Box className='slider'>
      <ArrowBack className='arrow prev' onClick={prevSlide} />
      <ArrowForward className='arrow next' onClick={nextSlide} />

      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <Paper
            key={index}
            className={index === currentSlide ? 'slide current' : 'slide'}
          >
            {index === currentSlide && (
              <>
                <img
                  src={image}
                  alt='slide'
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <Box className='content'>
                  <Typography variant='h6' textTransform={'uppercase'}>
                    {heading}
                  </Typography>
                  <Typography variant='body1'>{desc}</Typography>
                  <hr />
                </Box>
              </>
            )}
          </Paper>
        );
      })}
    </Box>
  );
};

export default Slider;
