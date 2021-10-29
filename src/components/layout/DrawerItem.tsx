import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import React, { Fragment, ReactNode } from 'react';
import { useHistory } from 'react-router';
import useToggle from '../../hooks/useToggle';

export type DrawerItemProps = {
  title?: string;
  link?: string;
  icon?: ReactNode;
  children?: DrawerItemProps[];
};

const DrawerItem = ({ title, link, icon, children }: DrawerItemProps) => {
  const history = useHistory();
  const { isOpen, toggle } = useToggle();

  const click = () => {
    if (children) {
      toggle();
    } else if (link) {
      history.push(link);
    }
  };

  return (
    <Fragment>
      <ListItemButton onClick={click}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} sx={{ pr: 8 }} />
        {children ? isOpen ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItemButton>
      {children && children.length > 0 && (
        <Collapse in={isOpen} timeout="auto">
          <List>
            {children.map((item, i) => (
              <ListItemButton
                key={i}
                onClick={() => item.link && history.push(item.link)}
                sx={{ pl: 8 }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} sx={{ pr: 4 }} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </Fragment>
  );
};

export default DrawerItem;
