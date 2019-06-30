import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const drawerWidth = 240;
const useNavigationStyles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
});

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };

        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    }

    handleDrawerToggle() {
        this.setState({
            open: !this.state.open,
        });
    }


    render() {
        const { classes } = this.props;
        const drawer = (
            <div>
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <ListItem button>
                        <ListItemText primary={'Dev'}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary={<Link to="/simple-kit-form">SimpleKitForm</Link>}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary={<Link to="/complex-kit-form">ComplexKitForm</Link>}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary={<Link to="/example-form">ExampleForm</Link>}/>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {['Temp1', 'Temp2', 'Temp3'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );
        return (
            <div className={classes.root}>
                <Hidden smUp implementation="css">
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                edge="start"
                                onClick={this.handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap>
                                Legal Cabinet
                        </Typography>
                        </Toolbar>
                    </AppBar>
                </Hidden>
                <nav className={classes.drawer} aria-label="Mailbox folders">
                    <Hidden smUp implementation="css">
                        <Drawer
                            variant="temporary"
                            open={this.state.open}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <Hidden smUp implementation="css">
                        <div className={classes.toolbar} />
                    </Hidden>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default withStyles(useNavigationStyles)(Navigation);