import { Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { Navbar, Sidebar } from '../components';
import { SnackBarAlert } from '../../ui/components/SnackbarAlert';

interface Props {
  children: React.ReactNode;
}

const drawerWidth = 240;

export const JournalLayout = ({ children }: Props) => {
  return (
    <Box
      sx={{ display: 'flex' }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Navbar drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} />
      <SnackBarAlert />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
