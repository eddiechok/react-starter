import useCustomNavigate from '@/hooks/useCustomNavigate';
import useToggle from '@/hooks/useToggle';
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

export type DrawerItemProps = {
  title?: string;
  link?: string;
  linkOptions?: NavigateOptions;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
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

  const click = (
    event: React.MouseEvent<HTMLElement>,
    drawerItem: DrawerItemProps
  ) => {
    if (drawerItem.onClick) {
      drawerItem.onClick(event);
    } else if (drawerItem.children) {
      toggle();
    } else if (drawerItem.link) {
      closeDrawer?.();
      navigate(drawerItem.link, drawerItem.linkOptions);
    }
  };

  return (
    <Fragment>
      <ListItemButton
        onClick={(e) =>
          click(e, {
            onClick,
            children,
            link,
            linkOptions
          })
        }
        selected={location.pathname === link}
        sx={selectedSx}
      >
        <ListItemIcon sx={{ color: 'secondary.light', minWidth: 0, mr: 4 }}>
          {Icon && <Icon />}
        </ListItemIcon>
        <ListItemText
          primary={title}
          primaryTypographyProps={{
            color: 'secondary.contrastText',
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
                onClick={(e) => click(e, item)}
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
