import * as React from "react";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import LooksOneOutlinedIcon from "@mui/icons-material/LooksOneOutlined";
import LooksTwoOutlinedIcon from "@mui/icons-material/LooksTwoOutlined";
import Looks3OutlinedIcon from "@mui/icons-material/Looks3Outlined";
import Looks4OutlinedIcon from "@mui/icons-material/Looks4Outlined";
import Looks5OutlinedIcon from "@mui/icons-material/Looks5Outlined";
import { Typography } from "@mui/material";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 35,
  },
  direction: theme.direction,
}));

const customIcons = {
  1: {
    icon: <LooksOneOutlinedIcon color="primary" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <LooksTwoOutlinedIcon color="primary" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <Looks3OutlinedIcon color="primary" />,
    label: "Neutral",
  },
  4: {
    icon: <Looks4OutlinedIcon color="primary" />,
    label: "Satisfied",
  },
  5: {
    icon: <Looks5OutlinedIcon color="primary" />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

export default function Question(props) {
  const handleChange = (event, value) => {
    props.onChange(event, value);
  };

  return (
    < >
      <Typography fontSize={18} align="center">
        {props.question}
      </Typography>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '15px' }}>
        
            <Typography sx={{color : '#2979ff', fontStyle: 'italic', flex: 1}}  align="center" variant="body2">
              {props.descFive}
            </Typography>
                {props.descFive && <Typography>⇢</Typography>}
            <StyledRating
              name="highlight-selected-only"
              value={props.val}
              IconContainerComponent={IconContainer}
              getLabelText={(value) => customIcons[value].label}
              highlightSelectedOnly
              onChange={handleChange}
            />
                {props.descOne && <Typography>⇠</Typography>}
            <Typography sx={{color : '#2979ff', fontStyle: 'italic', flex: 1}}  align="center" variant="body2">
              {props.descOne}
            </Typography>
      </div>
    </>
  );
}
