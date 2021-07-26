import React from 'react';
import './NavComponent.css';
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
class SearchComponent extends React.Component {
    render() {
        return (
            <div>
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
            </div>
        );
    }
}

class NavComponent extends React.Component {

    onLogoutHandler = () => {
        localStorage.clear();
        this.setState({
          navigate: true,
        });
      };
      
    render() {
        return (
            <>
                <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top">                 
                    <a className="navbar-brand" href="#">
                        <img src="logo512.png" alt="Logo" style={{width: "40px"}}  />
                    </a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link  className="nav-link" to='home'>Trang chủ</Link>
                            </li>
                            
                            <li className="nav-item">
                              <Link  className="nav-link" to='/'>Đăng ký</Link>
                            </li>
                        </ul>
                         <SearchComponent/>
                    </div>
                    <Button
                        className="btn btn-primary text-right"
                        onClick={this.onLogoutHandler}
                    >
                        Logout
                    </Button>
                </nav>
                <div style={{marginTop : "66px"}}></div>
            </>
        );
    }
}

export default NavComponent;



