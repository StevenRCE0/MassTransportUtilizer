import React from "react";
import {Input, Button} from '../Controllers'
import './style.css';
import store from "../Store";

function loginRequest(e) {
    e.preventDefault()
    store.dispatch({
        type: 'login',
        loginState: true
    })
    alert('wow')
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        console.info(store.getState())
    }


    render() {
        const hello = "登录"
        return (
            <React.Fragment>
                <div id={'Amaze'}/>
                <div id={'ActualCard'}>
                    <h1>
                        {hello}
                    </h1>
                </div>
                <div id={'Maze'}/>
                <form onSubmit={(e) => loginRequest(e)}>
                    <section className={"AuthCard"}>
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

                    </section>
                </form>
            </React.Fragment>


        )
    }
}

export default Login