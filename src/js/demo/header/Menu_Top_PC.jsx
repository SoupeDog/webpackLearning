import React from 'react';
import classNames from 'classnames'
import LogHelper from "../../utils/LogHelper.jsx";
import CallBackViewHelper from "../../utils/CallBackViewHelper.jsx";
import WindowsEventHelper from "../../utils/WindowsEventHelper.jsx";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Typography from "@material-ui/core/Typography/Typography";

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from "@material-ui/core/InputBase/InputBase";
import {withStyles} from "@material-ui/core/styles/index";
import {fade} from '@material-ui/core/styles/colorManipulator';
import LeftDrawerMenu from "./LeftDrawerMenu.jsx";


const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
                borderRadius: theme.shape.borderRadius,
                backgroundColor: fade(theme.palette.common.black, 0.25),
            },
        },
    },
});

class Menu_Top_PC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            swipeableDrawerIsOpen: false,
            menu_Top_BackgroundTransparent: true
        };
        this.openSwipeableDrawer = this.toggleDrawer.bind(this, true);
        this.closeSwipeableDrawer = this.toggleDrawer.bind(this, false);
        LogHelper.info({className: "Menu_Top_PC", msg: "constructor----------"});
    }

    toggleDrawer(isOpen) {
        this.setState({swipeableDrawerIsOpen: isOpen});
    }

    componentWillMount() {
        LogHelper.info({className: "Menu_Top_PC", msg: "componentWillMount----------"});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        LogHelper.info({className: "Menu_Top_PC", msg: "componentWillReceiveProps----------"});
        LogHelper.debug({className: "Menu_Top_PC", tag: "nextProps", msg: nextProps, isJson: true});
        LogHelper.debug({className: "Menu_Top_PC", tag: "nextContext", msg: nextContext, isJson: true});
        LogHelper.debug({msg: ""});
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        LogHelper.info({className: "Menu_Top_PC", msg: "shouldComponentUpdate----------"});
        LogHelper.debug({className: "Menu_Top_PC", tag: "nextProps", msg: nextProps, isJson: true});
        LogHelper.debug({className: "Menu_Top_PC", tag: "nextState", msg: nextState, isJson: true});
        LogHelper.debug({className: "Menu_Top_PC", tag: "nextContext", msg: nextContext, isJson: true});
        LogHelper.debug({msg: ""});
        if (this.state.menu_Top_BackgroundTransparent == nextState.menu_Top_BackgroundTransparent &&
            this.state.swipeableDrawerIsOpen == nextState.swipeableDrawerIsOpen) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <div>
                <LeftDrawerMenu swipeableDrawerIsOpen={this.state.swipeableDrawerIsOpen}
                                openSwipeableDrawer={this.openSwipeableDrawer}
                                closeSwipeableDrawer={this.closeSwipeableDrawer}/>
                <AppBar position="fixed"
                        elevation={this.state.menu_Top_BackgroundTransparent ? 0 : 1}
                        className={classNames({"backgroundTransparent": this.state.menu_Top_BackgroundTransparent})}>
                    <Toolbar>
                        <IconButton className={this.props.classes.menuButton} color="inherit" aria-label="Open drawer"
                                    onClick={this.openSwipeableDrawer}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography className={this.props.classes.title} variant="h6" color="inherit" noWrap>
                            我的小宅子
                        </Typography>
                        <div className={this.props.classes.grow}/>
                        <div className={this.props.classes.search}>
                            <div className={this.props.classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="未启用的搜索…"
                                classes={{
                                    root: this.props.classes.inputRoot,
                                    input: this.props.classes.inputInput,
                                }}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

    componentDidMount() {
        let _react = this;
        WindowsEventHelper.addCallback_Scroll({
            name: "APPBar 透明判定", delta: 50, callbackFunction: function ({currentScrollY}) {
                if (currentScrollY > 270) {
                    _react.setState({menu_Top_BackgroundTransparent: false});
                } else {
                    _react.setState({menu_Top_BackgroundTransparent: true});
                }
            }
        });
        LogHelper.info({className: "Menu_Top_PC", msg: "componentDidMount----------"});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        LogHelper.info({className: "Menu_Top_PC", msg: "componentDidUpdate----------"});
        LogHelper.debug({className: "Menu_Top_PC", tag: "prevProps", msg: prevProps, isJson: true});
        LogHelper.debug({className: "Menu_Top_PC", tag: "prevState", msg: prevState, isJson: true});
        LogHelper.debug({className: "Menu_Top_PC", tag: "snapshot", msg: snapshot, isJson: true});
        LogHelper.debug({msg: ""});
    }

    componentWillUnmount() {
        LogHelper.info({className: "Menu_Top_PC", msg: "componentWillUnmount----------"});
    }
}

export default withStyles(styles)(Menu_Top_PC);