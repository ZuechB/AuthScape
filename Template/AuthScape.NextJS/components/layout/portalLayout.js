import React, {useEffect, useState} from 'react';
import { Sidebar, Menu, MenuItem, SubMenu  } from 'react-pro-sidebar';
import Link from 'next/link'
import { Avatar, Box, Button, IconButton, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import {apiService, authService, StripeConnect, ReactDraft} from 'authscape';

import {Menu as MMenu} from '@mui/material';
import {MenuItem as MMenuItem} from '@mui/material';


import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import SettingsInputComponentRoundedIcon from '@mui/icons-material/SettingsInputComponentRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { useRouter } from 'next/navigation'
import AppBar from '@mui/material/AppBar';

export default function PortalLayout({children, currentUser, pageProps}) {

  const router = useRouter()

  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const stringToColor = (string) => {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }



  const navigationLayout = {
    rtl: false,
    broken: false,
    theme: "light", // dark
    menu: [
      {
        title: "Dashboard",
        nav: [
          {name: "Dashboard", icon: <ShoppingCartRoundedIcon/>, href: "/", disabled: true}
        ]
      },
      {
        title: "Communication",
        nav: [
          {name: "Inbox", icon: <ShoppingCartRoundedIcon/>, href: "/inbox", disabled: true},
          {name: "Chat", icon: <ShoppingCartRoundedIcon/>, href: "/chat", disabled: true}
        ]
      },
      {
        title: "User Management",
        nav: [
          {name: "Roles", icon: <BarChartRoundedIcon />, href: "/usermanagement/roles", disabled: false},
          {name: "Permissions", icon: <BarChartRoundedIcon />, href: "/usermanagement/permissions", disabled: false},
          {name: "Users", icon: <MapRoundedIcon/>, href: "/usermanagement/users", disabled: false},
          {name: "Companies", icon: <MapRoundedIcon/>, href: "/usermanagement/companies", disabled: false},
          {name: "Custom Fields", icon: <MapRoundedIcon/>, href: "/usermanagement/customfields", disabled: false},
          {name: "Examples", icon: <MapRoundedIcon/>, href: "/usermanagement/sandbox", disabled: false},
        ]
      },
      {
        title: "Pages",
        nav: [
          {name: "Profile", icon: <BarChartRoundedIcon />, href: "/profile", disabled: true},
          // {name: "Mapping", icon: <DarkModeRoundedIcon/>, href: "/mapping", disabled: false},
          {name: "Analytics", icon: <DarkModeRoundedIcon/>, href: "/analytics", disabled: false},
          {name: "Kanban", icon: <DarkModeRoundedIcon/>, href: "/kanban", disabled: false},
          {name: "FAQ", icon: <MapRoundedIcon/>, href: "/faq", disabled: false},

          {name: "Pricing", icon: <MapRoundedIcon/>, subnav: [
            {name: "Plans", href:"/pricing/plans" },
            {name: "Products", href:"/pricing/product" },
          ]},

          {name: "Error", icon: <SettingsInputComponentRoundedIcon/>, href: "/404"},
          {name: "Coming Soon", icon: <ShoppingCartRoundedIcon/>, href: "/comingsoon", disabled: true},
          {name: "Not Authorized", icon: <ShoppingCartRoundedIcon/>, href: "/NA", disabled: true},
          
          {name: "Products", icon: <ShoppingCartRoundedIcon/>, href: "/products", disabled: true},
          {name: "Mail", icon: <ShoppingCartRoundedIcon/>, href: "/mail", disabled: false},
        ]
      },
      {
        title: "Authentication",
        nav: [
          {name: "Login", icon: <BarChartRoundedIcon />, href: "/login"},
          {name: "Register", icon: <MapRoundedIcon/>, href: "/signup"},
          {name: "Verify Email", icon: <DarkModeRoundedIcon/>, href: "/verify", disabled: true},
          {name: "Reset Password", icon: <SettingsInputComponentRoundedIcon/>, href: "/resetpassword", disabled: true},
          {name: "Forgot Password", icon: <ShoppingCartRoundedIcon/>, href: "/forgotpassword", disabled: true},
          {name: "Invite User", icon: <ShoppingCartRoundedIcon/>, href: "/authentication/invite", disabled: false},
        ]
      },
      {
        title: "Components and Modals",
        nav: [
          {name: "Pricing", icon: <BarChartRoundedIcon />, href: "/pricing", disabled: true},
          {name: "Spreadsheet", icon: <DarkModeRoundedIcon/>, href: "/spreadsheet" , disabled: false},
          {name: "Tickets", icon: <DarkModeRoundedIcon/>, href: "/tickets" , disabled: false},
          {name: "Calendar", icon: <DarkModeRoundedIcon/>, href: "/calendar" , disabled: false},
          {name: "Toasts", icon: <DarkModeRoundedIcon/>, href: "/toasts" , disabled: false},

          {name: "Mapping", icon: <MapRoundedIcon/>, subnav: [
            {name: "Upload", href:"/mapping" },
            {name: "Datasources", href:"/mapping/Datasources" },
          ]},

          {name: "Web Editor", icon: <MapRoundedIcon/>, subnav: [
            {name: "Pages", href:"/editor/1" },
          ]},

          {name: "Wallet", icon: <MapRoundedIcon/>, subnav: [
            {name: "Invoice", href:"/wallet/Invoice" },
            {name: "Store Credit", href:"/wallet/storeCredit", disabled: true },
          ]},

          {name: "Stripe", icon: <MapRoundedIcon/>, subnav: [
            {name: "Stripe Connect", href:"/stripe/stripeConnect", disabled: false },
            {name: "Stripe Payment Link", href:"/stripe/stripePaymentLink", disabled: true },
            {name: "Stripe Subscription", href:"/stripe/stripeSubscription", disabled: false },
            {name: "Stripe Pay", href:"/stripe/stripePay" },
            {name: "Add To Wallet", href:"/stripe/stripeAddPaymentToWallet" },
          ]},

          {name: "Color Picker", icon: <DarkModeRoundedIcon/>, href: "/components/colorpicker" , disabled: false},


          {name: "Add New Address", icon: <DarkModeRoundedIcon/>, href: "/address" , disabled: true},
          {name: "Refer and Earn", icon: <SettingsInputComponentRoundedIcon/>, href: "/refer", disabled: true},
          {name: "Edit User", icon: <ShoppingCartRoundedIcon/>, href: "/profile", disabled: true},
          {name: "Enable One Time Password", icon: <ShoppingCartRoundedIcon/>, href: "/otp", disabled: true},
          {name: "Enable Two Factor", icon: <ShoppingCartRoundedIcon/>, href: "/enabletwofactor", disabled: true},
        ]
      },
      {
        title: "General",
        nav: [
          {name: "Private Label", icon: <BarChartRoundedIcon />, subnav: [{name: "Manage", href:"/privateLabel", disabled: false }]},
          {name: "Charts", icon: <BarChartRoundedIcon />, subnav: [
            {name: "Area Charts", href:"/charts/areaChart", disabled: false },
            {name: "Bar Charts", href:"/charts/barChart", disabled: false },
            {name: "Bubble Charts", href:"/charts/bubbleChart", disabled: false },
            {name: "CandleStick Charts", href:"/charts/candleStickChart", disabled: false },
            {name: "Gauge", href:"/charts/GaugeChart", disabled: false },
            {name: "Pie Chart", href:"/charts/pieChart", disabled: false },
            {name: "Histogram Chart", href:"/charts/histogramChart", disabled: false },
            {name: "Timeline Chart", href:"/charts/timelineChart", disabled: false },
            {name: "Wordtree Chart (in dev)", href:"/charts/wordTreeChart", disabled: false },
            {name: "Sankey Chart (in dev)", href:"/charts/sankeyChart", disabled: false },
          ]},
          {name: "Maps", icon: <MapRoundedIcon/>, href: "/maps", disabled: false},
          {name: "Themes", icon: <DarkModeRoundedIcon/>, href: "/themes", disabled: true},
          {name: "Components", icon: <SettingsInputComponentRoundedIcon/>, href:"/components", disabled: true},
          {name: "E-commerce", icon: <ShoppingCartRoundedIcon/>, href:"/ecommerce", disabled: true},
          {name: "Calendar", icon: <ShoppingCartRoundedIcon/>, href: "/calendar", disabled: true},
          {name: "Invoice", icon: <ShoppingCartRoundedIcon/>, href: "/invoices", disabled: true},
          {name: "Support", icon: <ShoppingCartRoundedIcon/>, href: "/support", disabled: true}
        ]
      },
    ]
  }


  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
  
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const menuClasses = {
    root: 'ps-menu-root',
    menuItemRoot: 'ps-menuitem-root',
    subMenuRoot: 'ps-submenu-root',
    button: 'ps-menu-button',
    prefix: 'ps-menu-prefix',
    suffix: 'ps-menu-suffix',
    label: 'ps-menu-label',
    icon: 'ps-menu-icon',
    subMenuContent: 'ps-submenu-content',
    SubMenuExpandIcon: 'ps-submenu-expand-icon',
    disabled: 'ps-disabled',
    active: 'ps-active',
    open: 'ps-open',
  };

  const themes = {
    light: {
      sidebar: {
        backgroundColor: '#ffffff',
        color: '#607489',
      },
      menu: {
        menuContent: '#fbfcfd',
        icon: '#0098e5',
        hover: {
          backgroundColor: '#c5e4ff',
          color: '#44596e',
        },
        disabled: {
          color: '#9fb6cf',
        },
      },
    },
    dark: {
      sidebar: {
        backgroundColor: '#0b2948',
        color: '#8ba1b7',
      },
      menu: {
        menuContent: '#082440',
        icon: '#59d0ff',
        hover: {
          backgroundColor: '#00458b',
          color: '#b6c8d9',
        },
        disabled: {
          color: '#3e5e7e',
        },
      },
    },
  };

  const menuItemStyles = {
    root: {
      fontSize: '13px',
      fontWeight: 400,
    },
    icon: {
      color: themes[navigationLayout.theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[navigationLayout.theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(themes[navigationLayout.theme].menu.menuContent, navigationLayout.image != null && !collapsed ? 0.4 : 1)
          : 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[navigationLayout.theme].menu.disabled.color,
      },
      '&:hover': {
        backgroundColor: hexToRgba(themes[navigationLayout.theme].menu.hover.backgroundColor, navigationLayout.image != null ? 0.8 : 1),
        color: themes[navigationLayout.theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <>
    <div style={{ display: 'flex', height: '100%', direction: (navigationLayout.rtl != null && navigationLayout.rtl) ? 'rtl' : 'ltr' }}>
      
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        image={navigationLayout.image}
        rtl={(navigationLayout.rtl != null && navigationLayout.rtl)}
        breakPoint="md"
        backgroundColor={hexToRgba(themes[navigationLayout.theme].sidebar.backgroundColor, navigationLayout.image != null ? 0.9 : 1)}
        rootStyles={{
          color: themes[navigationLayout.theme].sidebar.color,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

          <div style={{ flex: 1, marginBottom: '32px' }}>
            <div style={{ padding: '0 24px', marginBottom: '8px' }}>
              <Box sx={{paddingTop:2, paddingBottom:1}}>
                <Stack direction="row" spacing={2}>
                  <Image src={"/icons/icon-192x192.png"} alt='logo' width={50} height={50} />
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px', marginTop:14, fontSize:16 }}>
                    AuthScape
                  </Typography>
                </Stack>
              </Box>
            </div>

            {navigationLayout.menu.map((menu, index) => {

              return (
                <>
                <div key={index} style={{ padding: '0 24px', marginBottom: '8px', marginTop: '32px' }}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px', fontSize:12 }}>
                    {menu.title}
                  </Typography>
                </div>

                {menu.nav != null && menu.nav.map((menuItem, index) => {
                  return (

                    <Menu key={index} menuItemStyles={menuItemStyles}>

                      {menuItem.href != null &&
                      <MenuItem icon={menuItem.icon} disabled={menuItem.disabled} onClick={() => {

                        if (menuItem.href != null)
                        {
                          router.push(menuItem.href);
                        }

                      }}>{menuItem.name}</MenuItem>
                      }

                      {menuItem.href == null &&
                      <SubMenu label={menuItem.name} icon={menuItem.icon} disabled={menuItem.disabled} onClick={() => {

                        if (menuItem.href != null)
                        {
                          router.push(menuItem.href);
                        }

                      }}>
                        
                        {menuItem.subnav.map((nav, index) => {
                          return (
                            <MenuItem key={index} disabled={nav.disabled} onClick={() => {

                              if (nav.href != null)
                              {
                                router.push(nav.href);
                              }

                            }}>{nav.name}</MenuItem>
                          )
                        })}
                      </SubMenu>
                        }

                    </Menu>

                  )
                })}

                </>
              )

            })}

          </div>
        </div>
      </Sidebar>

      <main style={{flex:1}}>
        <div style={{ padding: '0px 0px', color: '#44596e' }}>
          <div style={{ marginBottom: '16px' }}>
            {broken && (

              <AppBar position="static">
                <Toolbar>
                  <Button variant="text" color='inherit' className="sb-button" onClick={() => setToggled(!toggled)}>
                    <MenuRoundedIcon />
                  </Button>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    News
                  </Typography>

                  <IconButton onClick={handleClick} sx={{ p: 0, paddingRight:2, fontSize:30 }}>
                    {currentUser != null &&
                    <Avatar {...stringAvatar(currentUser.firstName + " " + currentUser.lastName)} alt={currentUser.firstName + " " + currentUser.lastName} sx={{ width: 45, height: 45, fontSize:18 }}></Avatar> 
                    }
                  </IconButton>

                </Toolbar>
              </AppBar>
            )}
          </div>

          {/* {!broken &&
          <Box sx={{ position:"absolute", right:20, top:20,  }}>
            <Tooltip title="Account">
                <IconButton onClick={handleClick} sx={{ p: 0, fontSize:30 }}>
                  {currentUser != null &&
                  <Avatar {...stringAvatar(currentUser.firstName + " " + currentUser.lastName)} alt={currentUser.firstName + " " + currentUser.lastName} sx={{ width: 45, height: 45, fontSize:18 }} ></Avatar> 
                  }
                </IconButton>
            </Tooltip>
          </Box>
          } */}

          <Box sx={{p:2}}>

{/* 
            OEM is {pageProps.oemCompanyId == 1 ? "enabled" : "disabled"}<br/>
            companyId: {pageProps.oemCompanyId}  */}


            {children}
          </Box>

        </div>
      </main>
    </div>

    <MMenu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}>
      <MMenuItem onClick={handleClose}>Profile</MMenuItem>
      <MMenuItem onClick={handleClose}>My account</MMenuItem>
      <MMenuItem onClick={async () => {

        await authService().logout();
        handleClose();

      }}>Logout</MMenuItem>
    </MMenu>

    </>
  )
};