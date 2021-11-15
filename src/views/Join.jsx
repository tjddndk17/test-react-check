import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

export default function Join() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    group: "",
    position: "",
    mobileNum: "",
    telNum: "",
  });

  const {
    name,
    email,
    password,
    passwordConfirm,
    group,
    position,
    mobileNum,
    telNum,
  } = inputs;

  const [duplication, setDuplication] = useState(false);
  const [check, setCheck] = useState(false);

  const emailCheck = () => {
    axios
      .get("http://localhost:8888/users")
      .then(function (response) {
        console.log(response);
        //email을 파라미터로 전달하여서 존재여부 체크 가능한 API가 있다면
        //response를 받아서 처리가 가능
      })
      .catch(function (error) {
        console.log(error);
      });
    setCheck(true);
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (check) {
      if (password === passwordConfirm) {
        if (!duplication) {
          alert("운영자 가입 신청이 완료되었습니다.");
        } else {
          alert("ID 중복");
          setDuplication(false);
          setCheck(false);
        }
      } else {
        alert("비밀번호가 일치하지 않습니다");
      }
    } else {
      alert("ID 중복 여부를 확인해주세요");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <table className="table_join">
        <caption className="caption-top">Check Up 운영자 가입신청</caption>
        <tbody>
          <tr>
            <td>* 이름</td>
            <td>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td>* ID(e-mail)</td>
            <td>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
              <Button
                className="btn btn-secondary"
                type="button"
                onClick={emailCheck}
              >
                중복체크
              </Button>
            </td>
          </tr>
          <tr>
            <td>* 비밀번호</td>
            <td>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td>* 비밀번호 확인</td>
            <td>
              <Form.Control
                type="password"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={onChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td>* 소속부서</td>
            <td>
              <Form.Control
                type="text"
                name="group"
                value={group}
                onChange={onChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td>* 직급/직책</td>
            <td>
              <Form.Control
                type="text"
                name="position"
                value={position}
                onChange={onChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td>* 휴대폰번호</td>
            <td>
              <Form.Control
                type="text"
                name="mobileNum"
                value={mobileNum}
                onChange={onChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td>전화번호</td>
            <td>
              <Form.Control
                type="text"
                name="telNum"
                value={telNum}
                onChange={onChange}
              />
            </td>
          </tr>
          <tr>
            <td>개인정보 처리 방침을 확인하고 동의합니다.</td>
            <td>
              <input type="checkbox"></input>동의합니다
            </td>
          </tr>
          <tr>
            <td>
              <Button className="btn btn-primary" type="submit">
                가입완료
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
