import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath: 'static/hero.jpeg',
  },
  {
    label: 'Bird',
    imgPath: 'static/hero2.jpg',
  },
  {
    label: 'Hero3',
    imgPath: 'static/hero4.jpg',
  },
  {
    label: 'Hero5',
    imgPath: 'static/hero5.png',
  },
];

function SwipeableTextMobileStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <AutoPlaySwipeableViews index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
        {images.map((step) => (
          <Box
            component="img"
            key={step.label}
            sx={{
              objectFit: 'cover',
              maxWidth: '100%',
              maxHeight: '100%',
            }}
            src={step.imgPath}
            alt={step.label}
          />
        ))}
      </AutoPlaySwipeableViews>
    </Box>
  );
}

export default SwipeableTextMobileStepper;
