import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItemButton,
  listItemButtonClasses,
  ListItemIcon,
  listItemIconClasses,
  ListItemText
} from '@mui/material';
import React, { Fragment } from 'react';
import { NavigateOptions, useLocation } from 'react-router';
import useCustomNavigate from '../hooks/useCustomNavigate';
import useToggle from '../hooks/useToggle';

export type DrawerItemProps = {
  title?: string;
  link?: string;
  linkOptions?: NavigateOptions;
  onClick?: () => void;
  icon?: React.FC;
  children?: DrawerItemProps[];
  closeDrawer?: () => void;
};

const selectedSx = {
  [`&.${listItemButtonClasses.selected}`]: {
    bgcolor: 'background.dark',
    color: 'common.white',
    [`.${listItemIconClasses.root}`]: {
      color: 'primary.main'
    }
  }
};

const DrawerItem = ({
  title,
  link,
  linkOptions,
  icon: Icon,
  onClick,
  children,
  closeDrawer
}: DrawerItemProps) => {
  const navigate = useCustomNavigate();
  const { isOpen, toggle } = useToggle();
  const location = useLocation();

  const click = () => {
    if (onClick) {
      onClick();
    } else if (children) {
      toggle();
    } else if (link) {
      closeDrawer?.();
      navigate(link, linkOptions);
    }
  };

  return (
    <Fragment>
      <ListItemButton
        onClick={click}
        selected={location.pathname === link}
        sx={selectedSx}
      >
        <ListItemIcon sx={{ color: 'secondary.light', minWidth: 0, mr: 4 }}>
          {Icon && <Icon />}
        </ListItemIcon>
        <ListItemText
          primary={title}
          primaryTypographyProps={{
            sx: {
              textTransform: 'uppercase'
            }
          }}
          sx={{ pr: 8 }}
        />
        {children ? isOpen ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItemButton>
      {children && children.length > 0 && (
        <Collapse in={isOpen} timeout="auto">
          <List>
            {children.map((item, i) => (
              <ListItemButton
                key={i}
                selected={location.pathname === item.link}
                onClick={() => {
                  closeDrawer?.();
                  item.link && navigate(item.link, item.linkOptions);
                }}
                sx={{ pl: 8, ...selectedSx }}
              >
                <ListItemIcon
                  sx={{ color: 'secondary.light', minWidth: 0, mr: 4 }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  inset={!item.icon}
                  primary={item.title}
                  sx={{ pr: 4, textTransform: 'uppercase' }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </Fragment>
  );
};

export default DrawerItem;
