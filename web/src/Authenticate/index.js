import React from "react";
import { Input, Button } from '../Controllers';
import { FormGroup, Slider, FormLabel } from '@material-ui/core'
import axios from "axios";
import './style.css';
import store, { setExpiration } from "../Store";
import { ThemeSwitch } from "../Controllers/Switch";

function loginRequest(username, password) {
    try {
        axios.post('/api/log', {
            'username': username,
            'password': password
        }).then(function (response) {
            console.log(response.data)
            alert(response.data.msg)
            if (response.data.code === 200) {
                store.dispatch({
                    type: 'login',
                    loginState: true,
                    session: response.data
                })
            }
        })
    }
    catch (error) {
        alert('网络连接出现了一些问题')
        console.error(error);
    }
}

class CertForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            duration: 1,
        }
    }
    CertChange(type) {
        let feedbackInfo
        if (type === 'logout') {
            feedbackInfo = '注销凭据完成'
            const action = {
                type: 'certMan',
                logout: true
            }
            store.dispatch(action)
        }
        if (type === 'cache') {
            feedbackInfo = '保存凭据' + this.state.duration +'天'
            setExpiration(this.state.duration)
        }
        alert(feedbackInfo)
    }
    handleSlider = (event, newValue) => {
        this.setState({duration: newValue})
    }

    render() {
        return(
            <React.Fragment>
                <ThemeSwitch/>
                <form
                    style={{marginTop: '2em'}}
                    onSubmit={() => this.CertChange('cache', this.state.duration)}
                >
                    <FormGroup>
                        <FormLabel style={{color: 'var(--ThemeColor)'}} component={'legend'}>保存凭据时长（天）</FormLabel>
                        <div style={{margin: '0 auto', width: 'calc(100% - 20px)'}}>
                            <Slider
                                defaultValue={1}
                                valueLabelDisplay="auto"
                                step={5}
                                marks
                                min={1}
                                max={31}
                                onChange={this.handleSlider}
                            />
                        </div>
                    </FormGroup>
                    <Button type={'submit'}>
                        保存凭据
                    </Button>
                    <br />
                    <div style={{marginTop: '20px'}}>
                        <Button onClick={() => this.CertChange('logout')}>
                            注销凭据
                        </Button>
                    </div>
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