import React from "react";
import {Input, Button} from '../Controllers';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import './style.css';
import store from "../Store";

function loginRequest(event) {
    event.preventDefault()
    store.dispatch({
        type: 'login',
        loginState: true
    })
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
        if (this.state.option === 'logout') {feedbackInfo = '注销凭据完成'}
        if (this.state.option === 'cache') {feedbackInfo = '保存凭据'+22+'天'}
        alert(feedbackInfo)
        event.preventDefault()
        const action = {
            type: 'certMan',
            logout: (this.state.option === 'logout')
        }
        store.dispatch(action)
    }

    render() {
        const handleRadioChange = (event) => {
            this.setState({'option': event.target.value})
        };
        return(
            <form onSubmit={(event) => this.CertChange(event)}>
                <RadioGroup name={'manageOption'} value={this.state.option} onChange={handleRadioChange}>
                    <FormControlLabel value={'logout'} control={<Radio/>} label={"登出"}/>
                    <FormControlLabel value={'cache'} control={<Radio/>} label={"保存凭据"}/>
                </RadioGroup>
                <Button type={'submit'}>
                    确定
                </Button>
            </form>
        )
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState()
        this.storeChange = this.storeChange.bind(this)
        store.subscribe(this.storeChange)
    }

    storeChange(){
        this.setState(store.getState())
    }

    render() {
        let FormSheet, hello
        const LoginForm = [
            <form onSubmit={(e) => loginRequest(e)}>
                <div className={"AuthForm"}>
                    <div>
                        <Input>
                            用户名称
                        </Input>
                        <Input type={"password"}>
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

        if (this.state.loginState) {
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