import { styled } from '@mui/material/styles';

// import '@fontsource/montez';
import { Badge, Button } from '@mui/material';

export const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    padding: '0 0px',
    width: '4px',
    fontSize: '8px',
  },
  marginRight: '8px',
}));
export const MyButton = styled(Button)(({ theme }) => ({
  marginRight: '4px',
  color: 'white',
  '&:hover': {
    color: 'black',
  },
}));
