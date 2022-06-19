import { TurnedInNot } from '@mui/icons-material';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Grid,
  ListItemText,
} from '@mui/material';
import { useMemo } from 'react';
import { INote } from '../../interfaces';
import { useAppDispatch } from '../../store';
import { setActiveNote } from '../../store/journal';

interface Props {
  note: INote;
}

export const SidebarItem = ({ note }: Props) => {
  const dispatch = useAppDispatch();
  const { title, id, body } = note;

  const newTitle = useMemo(
    () => (title.length > 13 ? title.substring(0, 13) + '...' : title),
    [title]
  );

  const handleClick = () => {
    dispatch(setActiveNote(note));
  };

  return (
    <ListItem key={id} disablePadding onClick={handleClick}>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
