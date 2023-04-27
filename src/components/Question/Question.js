import * as React from 'react';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined';
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined';
import Looks3OutlinedIcon from '@mui/icons-material/Looks3Outlined';
import Looks4OutlinedIcon from '@mui/icons-material/Looks4Outlined';
import Looks5OutlinedIcon from '@mui/icons-material/Looks5Outlined';
import { Typography } from '@mui/material';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 35,
  },
  direction: theme.direction,
}));

const customIcons = {
  1: {
    icon: <LooksOneOutlinedIcon color='error' />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <LooksTwoOutlinedIcon color='warning' />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <Looks3OutlinedIcon sx={{ color: '#fbc02d' }} />,
    label: 'Neutral',
  },
  4: {
    icon: <Looks4OutlinedIcon sx={{ color: '#64dd17' }} />, 
    label: 'Satisfied',
  },
  5: {
    icon: <Looks5OutlinedIcon color='success' />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

export default function Question(props) {

  const handleChange = (event, value) => {
    props.onChange(event, value);
    console.log(value)
  };

  

  return (
    <div dir='rtl'>
      <Typography fontSize={18} >
        {props.question}
        {props.val}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '15px' }}>
        <StyledRating
          name='highlight-selected-only'
          defaultValue={1}
          IconContainerComponent={IconContainer}
          getLabelText={(value) => customIcons[value].label}
          highlightSelectedOnly
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
