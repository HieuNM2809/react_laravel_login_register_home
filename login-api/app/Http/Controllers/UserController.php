<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    // code: thanh cong
    private $status_code    =        200;

    public function userSignUp(Request $request) {
        // kiem tra du lieu   ( ko $this->validate dc )
        $validator  = Validator::make($request->all(), [
            "name"              =>          "required",
            "email"             =>          "required|email|unique:users,email",
            "password"          =>          "required",
            "phone"             =>          "required"
        ],[
            "name.required" => "Vui lòng nhập tên",
            "email.required" => " Vui lòng nhập email",
            "email.email" => " Vui lòng nhập đúng định dạng email",
            "email.unique" => "Email đã được sử dụng",
            "password.required" => " Vui lòng nhập mật khẩu",
            "phone.required" => " Vui lòng nhập số điện thoại",
        ]);

        if($validator->fails()) {
            return response()->json([
                "status" => "failed",
                "message" => "validation_error",
                "errors" => $validator->errors()]);
        }

        $user  = new User();
        // tách Tên
        $name            =  $request->name;
        $name            =  explode(" ", $name);

        $user->first_name      =  $name[0];
        $user->last_name       =  "";

        if(isset($name[1])) {
            $user->last_name   =  $name[1];
        }
        $user->full_name       =  $request->name;
        $user->email           =  $request->email;
        $user->password       =   md5($request->password);
        $user->phone           =    $request->phone;

        $check =  $user->save();
     
        if($check) {
            return response()->json(["status" => $this->status_code, "success" => true, "message" => "Đăng ký thành công", "data" => $user]);
        }
        else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Đăng ký thật bại"]);
        }
    }


    // ------------ [ User Login ] -------------------
    public function userLogin(Request $request) {

        $validator   =    Validator::make($request->all(),
            [
                "email"       =>    "required|email",
                "password"    =>     "required"
            ],[
                "email.required" => " Vui lòng nhập email",
                "email.email" => " Vui lòng nhập đúng định dạng email",
                "password.required" => " Vui lòng nhập mật khẩu",
            ]);

        if($validator->fails()) {
            return response()->json(["status" => "failed", "validation_error" => $validator->errors()]);
        }

        // kiểm tra email có tồn tại ko
        $email_status       =       User::where("email", $request->email)->first();

        if(!is_null($email_status)) {
            $password_status    =   User::where("email", $request->email)->where("password", md5($request->password))->first();

            // nếu pass đúng 
            if(!is_null($password_status)) {
                $user           =       $this->userDetail($request->email);

                return response()->json(["status" => $this->status_code, "success" => true, "message" => "Bạn đã đăng nhập thành công", "data" => $user]);
            }

            else {
                return response()->json(["status" => "failed", "success" => false, "message" => "Không thể đăng nhập. Mật khẩu không đúng."]);
            }
        }

        else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Không thể đăng nhập. Email không tồn tại."]);
        }
    }

    // ------------------ [ User Detail ] ---------------------
    public function userDetail($email) {
        $user               =       array();
        if($email != "") {
            $user           =       User::where("email", $email)->first();
            return $user;
        }
    }
}