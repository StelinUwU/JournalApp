import {
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';
import { useAppSelector } from '../../store';
import { SidebarItem } from './SidebarItem';

interface Props {
  drawerWidth: number;
}

export const Sidebar = ({ drawerWidth }: Props) => {
  const { displayName } = useAppSelector((state) => state.auth);
  const { notes } = useAppSelector((state) => state.journal);

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />

        <List>
          {notes.map((note) => (
            <SidebarItem note={note} key={note.id} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
