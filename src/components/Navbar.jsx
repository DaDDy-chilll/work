import { Badge, Box, Tab, Tabs, Typography } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';
import {
  AccountTree as WorkFlowIcon,
  ApartmentOutlined as DepartmentIcon,
  InsertDriveFileOutlined as AllRequestsIcon,
  AddShoppingCartOutlined as RequestIcon,
  ShoppingCartCheckoutOutlined as PurchaseOrderIcon,
  MailOutline as InboxIcon,
  Person as UserIcon,
} from '@mui/icons-material';
import { colors } from '../assets/theme/theme';
import { ROLES } from '../constants';
import PropTypes from 'prop-types';
import { AuthContext } from '../providers/AuthProvider';
import { useContext } from 'react';

export default function Navbar() {
  const { usersCount } = useContext(AuthContext);
  // const { data: users } = useGetAllUsers({ limit: 0 });

  const { user } = useAuth();


  

  const currentPath = useLocation(); //an object including the 'pathname' property

  const navItems = [
    {
      icon: <UserIcon />,
      label: 'Users',
      to: '/users',
        roles: [ROLES.SUPER_ADMIN],
      count: usersCount,
      index: 0,
    },
    {
      icon: <WorkFlowIcon />,
      label: 'Work Flows',
      to: '/workflows',
      roles: [ROLES.SUPER_ADMIN],
      index: 1,
    },
    {
      icon: <DepartmentIcon />,
      label: 'Departments',
      to: '/departments',
      roles: [ROLES.SUPER_ADMIN],
      index: 2,
    },
    {
      icon: <InboxIcon />,
      label: 'Inbox',
      to: '/',
      roles: [ROLES.AUTHORIZED, ROLES.BASIC],
      index: 0,
    },
    {
      icon: <RequestIcon />,
      label: 'Purchase Request',
      to: '/purchase-request',
      roles: [ROLES.AUTHORIZED, ROLES.BASIC],
      index: 1,
    },
    {
      icon: <PurchaseOrderIcon />,
      label: 'Purchase Order',
      to: '/purchase-order',
      roles: [ROLES.AUTHORIZED, ROLES.BASIC],
      index: 2,
    },
    {
      icon: <AllRequestsIcon />,
      label: 'All Requests',
      to: '/all',
      roles: [ROLES.AUTHORIZED, ROLES.BASIC],
      index: 3,
    },
  ];

  const getCurrentIndex = (path) => {
    return navItems.filter((item) => item.to === path)[0].index;
  };

  return (
    <Box sx={{ borderBottom: `1px solid ${colors.grey[400]}` }}>
      <Tabs
        value={getCurrentIndex(currentPath.pathname)}
        aria-label="navbar-tab"
      >
        {navItems
          .filter((value) => value.roles.includes(user?.role))
          .map((item) => (
            <Badge
              key={item.to}
              badgeContent={item?.count}
              invisible={false}
              overlap="circular"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '13px',
                  fontWeight: 500,
                  color: colors.white[100],
                  backgroundColor: colors.paleBlue[700],
                },
              }}
              max={item?.count + 1}
            >
              <Tab
                component={Link}
                label={
                  <Typography
                    sx={{
                      fontSize: '16px',
                      fontWeight: 400,
                      color: colors.black[100],
                    }}
                  >
                    {item.label}
                  </Typography>
                }
                to={item.to}
                icon={<div style={{ fontSize: '20px' }}>{item.icon}</div>}
                iconPosition="start"
              />
            </Badge>
          ))}
      </Tabs>
    </Box>
  );
}

Navbar.propTypes = {
  users: PropTypes.number
};

Navbar.defaultProps = {
  users: 0
};
