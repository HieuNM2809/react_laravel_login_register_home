import React, { Component } from 'react';
import {  BrowserRouter as Router, Route, Link } from 'react-router-dom';

class ListComponent extends Component {
    render() {
        return (
            <>
                 <div style = {{minHeight: "80px" , textAlign:"center"}}>
                     <h1>Thông tin </h1>
                 </div>
                 <table class="table table-bordered "  >
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Birthday</th>
                        <th scope="col">Sex</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Nguyễn Minh Hiếu</td>
                            <td>nguyenminhhieu@gmail.com</td>
                            <td>28/09</td>
                            <td>Nam</td>
                        </tr>
                    </tbody>
                </table> 
               
            </>
        );
    }
}

export default ListComponent;