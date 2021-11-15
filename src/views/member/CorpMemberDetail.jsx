import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function CorpMemberDetail() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8888/corpMember")
      .then((res) => setData(res.data));
  }, []);

  return (
    <>
      <Table>
        <tbody>
          <tr>
            <th scope="row">회사명</th>
            <td>{JSON.stringify(data)}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
