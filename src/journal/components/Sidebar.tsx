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

interface Props {
  drawerWidth: number;
}

export const Sidebar = ({ drawerWidth }: Props) => {
  const { displayName } = useAppSelector((state) => state.auth);

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
          {[
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                  <ListItemText primary={text} />
                  <ListItemText
                    secondary={'Lorem ipsum dolor sit amet consectetur.'}
                  />
                </Grid>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
