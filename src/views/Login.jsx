import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/scss/login.scss";
// import { useCookies } from "react-cookie";

export default function Login() {
  const [inputs, setInputs] = useState({
    id: "",
    password: "",
    isRemember: false,
  });
  const { id, password, isRemember } = inputs;
  const reg = {
    id: {
      exp: /^[a-zA-Z0-9]{4,10}$/g,
      desc: "영문/숫자 조합하여 최대 10자리",
    },
    password: {
      exp: /^[a-zA-Z0-9`~!@#$%^&*()+]{8,30}$/g,
      desc: "영문/숫자/특수문자(`~!@#$%^&*()+)를 조합하여 8~30자",
    },
  };
  /* const [cookies, setCookie, removeCookie] = useCookies(["rememberId"]);
  console.log("cookies: ", cookies);

  useEffect(() => {
    if (cookies.rememberId !== undefined) {
      setInputs({
        id: cookies.rememberId,
        isRemember: true,
      });
    }
  }, []); */

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const chkId = () => {
    if (!id) {
      alert("아이디를 입력하세요");
      return false;
    } else if (id.search(reg.id.exp) < 0) {
      alert(reg.id.desc);
      return false;
    }

    return true;
  };

  const chkPw = () => {
    if (!password) {
      alert("비밀번호를 입력하세요");
      return false;
    } else if (password.search(reg.password.exp) < 0) {
      alert(reg.password.desc);
      // return false;
    }

    return true;
  };

  /* const handleRemember = (e) => {
    setInputs({
      isRemember: e.target.checked,
    });
    if (e.target.checked) {
      setCookie("rememberId", id);
    } else {
      removeCookie("rememberId");
    }
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (chkId() && chkPw()) {
      const result = await axios
        .get("http://localhost:8888/users")
        .then((res) => {
          return res && res.data ? res.data : null;
        });

      const user = result.find((user, index) => {
        return user.id === id && user.password === password;
      });

      if (user) {
        alert("성공");
      } else {
        alert(`로그인에 실패하였습니다.\n정확한 정보를 입력해 주세요`);
      }
    }
  };

  return (
    <div className="login-wrap">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col xs lg="6" xl="5">
            <div className="login-wrap__head">
              <h1 className="login-wrap__tit mb-4 fs-3 text-center">
                Hunet Check Up 통합관리시스템
              </h1>
            </div>
            <div className="login-wrap__body">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="login-wrap__input mb-3">
                  <Form.Control
                    type="text"
                    name="id"
                    value={id}
                    onChange={onChange}
                    placeholder="ID"
                  />
                </Form.Group>
                <Form.Group className="login-wrap__input mb-3">
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="비밀번호"
                  />
                </Form.Group>
                <Form.Group
                  className="login-wrap__info mb-3"
                  controlId="saveId">
                  <Form.Check
                    type="checkbox"
                    // onChange={handleRemember}
                    // checked={isRemember}
                    label="아이디 저장"
                  />
                  <Link to="" className="link-secondary">
                    아이디/비밀번호찾기
                  </Link>
                </Form.Group>
                <Button type="submit" className="login-wrap__submit">
                  로그인
                </Button>
              </Form>
            </div>
            <div className="login-wrap__foot mt-3">
              <p className="m-0">신규 운영자는 가입신청을 진행해 주세요</p>
              <Link to="/join" className="btn btn-outline-secondary">
                가입하기
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
