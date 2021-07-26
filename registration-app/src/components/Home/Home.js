import React, { Component } from "react";
import { Button } from "reactstrap";
import { Redirect, Link } from "react-router-dom";
import './Home.css';

export default class Home extends Component {
  state = {
    navigate: false,
  };

  onLogoutHandler = () => {
    localStorage.clear();
    this.setState({
      navigate: true,
    });
  };
  render() {
    const user = JSON.parse(localStorage.getItem("userData"));
    const { navigate } = this.state;
    if (navigate) {
      return <Redirect to="/sign-in" push={true} />;
    }
    // nếu chưa đăng nhập
    const login = localStorage.getItem("isLoggedIn");
    if (!login) {
      return <Redirect to="/sign-in" />;
    }
    return (
      <>
        <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
          <a className="navbar-brand" href="#">
            <img src="logo512.png" alt="Logo" style={{ width: "40px" }} />
          </a>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to='home'>Trang chủ</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to='/'>Đăng ký</Link>
              </li>
            </ul>
            <div style ={{display:'flex'}}>
              <form className="form-inline" method="GET">
                  <div className="input-group">
                      <input type="text" className="form-control" placeholder="Nhập từ khóa tìm kiếm"/>
                      <div className="input-group-append">
                          <button className="btn btn-success" type="submit"><i className="fa fa-search" aria-hidden="true"></i>
                              Tìm
                              kiếm</button>
                      </div>
                  </div>
              </form>
              <Button
                className="btn btn-primary text-right" style ={{marginLeft:'10px'}}
                onClick={this.onLogoutHandler}
              >
                Logout
              </Button>
            </div>
          </div>
        </nav>
        <div style={{ marginTop: "66px" }}></div>
        <div style={{ minHeight: "80px", textAlign: "center" }}>
          <h1>Thông tin {user.full_name}</h1>
        </div>
        <table class="table table-bordered "  >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Tên đầy đủ</th>
              <th scope="col">Email</th>
              <th scope="col">Số điện thoại</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{user.id}</th>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}


{/* <div className="container  border">
  <h3> HomePage</h3>
  <div className="row">
    <div className="col-xl-9 col-sm-12 col-md-9 text-dark">
      <h5> Welcome, {user.first_name} </h5> You have Logged in
      successfully.
    </div>
    <div className="col-xl-3 col-sm-12 col-md-3">
      <Button
        className="btn btn-primary text-right"
        onClick={this.onLogoutHandler}
      >
        Logout
      </Button>
    </div>
  </div>
</div> */}