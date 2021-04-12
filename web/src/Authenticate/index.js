import React from "react";
import {Input, Button} from '../Controllers';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import axios from "axios";
import './style.css';
import store, { setExpiration } from "../Store";

function loginRequest(username, password) {
    try {
        axios.post('http://47.110.95.97:8080/log', {
            'username': username,
            'password': password
        }).then(function (response) {
            alert(response.data.msg)
            if (response.data.code === 200) {
                store.dispatch({
                    type: 'login',
                    loginState: true,
                    session: response.data.data
                })
            }
        })
    }
    catch (error) {
        console.error(error);
    }
}

function switchTheme() {
    if (store.getState().theme === 'light') {
        store.dispatch({
            type: 'switchTheme',
            theme: 'dark'
        })
    }
    else if (store.getState().theme === 'dark') {
        store.dispatch({
            type: 'switchTheme',
            theme: 'light'
        })
    }
}

class CertForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'option': ''
        }
    }
    CertChange(event) {
        let feedbackInfo
        if (this.state.option === 'logout') {
            feedbackInfo = '注销凭据完成'
            const action = {
                type: 'certMan',
                logout: (this.state.option === 'logout')
            }
            store.dispatch(action)
        }
        if (this.state.option === 'cache') {
            feedbackInfo = '保存凭据'+22+'天'
            setExpiration()
        }
        alert(feedbackInfo)
        event.preventDefault()

    }

    render() {
        const handleRadioChange = (event) => {
            this.setState({'option': event.target.value})
        };
        return(
            <React.Fragment>
                <Button onClick={() => switchTheme()}>
                    切换主题
                </Button>
                <br /><br />
                <form onSubmit={(event) => this.CertChange(event)}>
                    <RadioGroup name={'manageOption'} value={this.state.option} onChange={handleRadioChange}>
                        <FormControlLabel value={'logout'} control={<Radio/>} label={"登出"}/>
                        <FormControlLabel value={'cache'} control={<Radio/>} label={"保存凭据"}/>
                    </RadioGroup>
                    <Button type={'submit'}>
                        确定
                    </Button>
                </form>
            </React.Fragment>
        )
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            store: store.getState(),
            username: '',
            password: ''
        }
        this.storeChange = this.storeChange.bind(this)
        store.subscribe(this.storeChange)
    }

    storeChange(){
        this.setState(store.getState())
    }
    handleLogin(event) {
        event.preventDefault()
        loginRequest(this.state.username, this.state.password)
    }
    handleForm(event, type) {
        if (type === 'username') {
            this.setState({username: event.target.value})
        }
        if (type === 'password') {
            this.setState({password: event.target.value})
        }
    }

    render() {
        let FormSheet, hello
        const LoginForm = [
            <form onSubmit={(e) => this.handleLogin(e)}>
                <div className={"AuthForm"}>
                    <div>
                        <Input handler={(e) => {this.handleForm(e, 'username')}}>
                            用户名称
                        </Input>
                        <Input type={"password"} handler={(e) => {this.handleForm(e, 'password')}}>
                            密码
                        </Input>
                    </div>
                    <div className={"Button"}>
                        <Button type={"submit"}>
                            好
                        </Button>
                    </div>
                </div>
            </form>
        ]

        if (this.state.store.loginState) {
            FormSheet = [<CertForm/>]
            hello = "认证管理"
        }
        else {
            FormSheet = LoginForm
            hello = "认证"
        }

        return (
            <React.Fragment>
                <div id={'Amaze'}/>
                <div id={'ActualCard'}>
                    <h1>
                        {hello}
                    </h1>
                </div>
                <div id={'Maze'}/>
                    <section className={"AuthCard"}>
                        {FormSheet}
                    </section>
            </React.Fragment>
        )
    }
}

export default Login