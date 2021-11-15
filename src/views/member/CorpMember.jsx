import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/Table";

export default function CorpMember() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let completed = false;

    async function get() {
      const result = await axios.get("http://localhost:8888/corpMember");
      if (!completed) setData(result.data);
    }
    get();

    return () => {
      completed = true;
    };
  }, []);

  // Link를 활용 페이지 새로고침 없이 화면 이동
  const LinkTo = ({ values }) => {
    return <Link to="/">{values}</Link>;
  };

  const columns = useMemo(
    () => [
      {
        accessor: "companyName",
        Header: "CompnayName",
        Cell: ({ cell: { value } }) => <LinkTo values={value} />,
      },
      {
        accessor: "represent",
        Header: "Represent",
      },
      {
        accessor: "manager",
        Header: "Manager",
      },
      {
        accessor: "address",
        Header: "Address",
      },
      {
        accessor: "approvalStatus",
        Header: "ApprovalStatus",
      },
      {
        accessor: "activeStatus",
        Header: "ActiveStatus",
      },
    ],
    []
  );

  return <Table columns={columns} data={data} />;
}
