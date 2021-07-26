import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "./signup.css";
import { Link,NavLink } from "react-router-dom";

export default class Signup extends Component {
    userData;
    constructor(props) {
        super(props);
        this.state = {
        signupData: {
            name: "",
            email: "",
            phone: "",
            password: "",
            isLoading: "",
        },
        msg: "",
        errName: "",
        errEmail: "",
        errSDT: "",
        errMK: "",
        };
    }

    onChangehandler = (e, key) => {
        const { signupData } = this.state;
        signupData[e.target.name] = e.target.value;
        this.setState({ signupData });
    };
    onSubmitHandler = (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });
        axios
        .post("http://localhost:8000/api/user-signup", this.state.signupData)
        .then((response) => {
            this.setState({ isLoading: false });
            if (response.data.status === 200) {
                this.setState({
                    msg: response.data.message,
                    signupData: {
                        name: "",
                        email: "",
                        phone: "",
                        password: "",
                    },
                    errName: "",
                    errEmail: "",
                    errSDT: "",
                    errMK: "",
                });
                setTimeout(() => {
                    this.setState({ msg: "" });
                }, 3000);
            }

            if (response.data.status === "failed") {
                this.setState({ 
                    errName: response.data.errors.name,
                    errEmail: response.data.errors.email,
                    errSDT: response.data.errors.phone,
                    errMK: response.data.errors.password,
               });
            // setTimeout(() => {
            //     this.setState({ msg: "" });
            // }, 2000);
            }
        });
    };
    render() {
        const isLoading = this.state.isLoading;
        const login = localStorage.getItem("isLoggedIn");
        let text = 'Sign In';
        if (login) {
            text = 'Home';
        }
        return (
        <div>
            <div className="Tab">
                <NavLink to="/sign-in" activeClassName="activeLink" className="signIn">
                    {text}
                </NavLink>
                <NavLink exact to="/" activeClassName="activeLink" className="signUp">
                    Sign Up
                </NavLink>
            </div>
            <Form className="containers shadow">
            <FormGroup>
                <Label for="name">Tên</Label>
                <Input
                type="name"
                name="name"
                placeholder="Nhập Tên"
                value={this.state.signupData.name}
                onChange={this.onChangehandler}
                />
            </FormGroup>
            <p className="text-danger">{this.state.errName}</p>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input
                type="email"
                name="email"
                placeholder="Nhập email"
                value={this.state.signupData.email}
                onChange={this.onChangehandler}
                />
            </FormGroup>
            <p className="text-danger">{this.state.errEmail}</p>

            <FormGroup>
                <Label for="phone">Số điện thoại</Label>
                <Input
                type="phone"
                name="phone"
                placeholder="Nhập số điện thoại"
                value={this.state.signupData.phone}
                onChange={this.onChangehandler}
                />
            </FormGroup>
            <p className="text-danger">{this.state.errSDT}</p>

            <FormGroup>
                <Label for="password">Mật khẩu</Label>
                <Input
                type="password"
                name="password"
                placeholder="Nhập Password"
                value={this.state.signupData.password}
                onChange={this.onChangehandler}
                />
            </FormGroup>
            <p className="text-danger">{this.state.errMK}</p>
            <p className="text-danger">{this.state.msg}</p>
            <Button
                className="text-center mb-4"
                color="success"
                onClick={this.onSubmitHandler}
            >
                Đăng ký 
                {isLoading ? (
                <span
                    className="spinner-border spinner-border-sm ml-5"
                    role="status"
                    aria-hidden="true"
                ></span>
                ) : (
                <span></span>
                )}
            </Button>
            <br/>
            <Link to="/sign-in" className="text-white ml-5">Tôi đã là thành viên</Link>
            </Form>
        </div>
        );
    }
}