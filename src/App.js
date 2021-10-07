import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import moment from "moment";

const api = new WooCommerceRestApi({
  url: "https://floyet.mars-cdn.com",
  consumerKey: "ck_67292b774e164a94c13c64e0b4059fabfcc036e5",
  consumerSecret: "cs_7625281ba845d6c75c7791b6a4d66ddf096c6afb",
  version: "wc/v3",
});

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  let fetchOrders = () => {
    api
      .get("orders", {
        per_page: 20,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data, "ddd");
          setOrders(response.data);
        }
      })
      .catch((error) => {});
  };

  return (
    <div className="App">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Name</th>
            <th>Email</th>
            <th>Adress</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            return (
              <tr key={index}>
                <td>{order.id}</td>
                <td>{moment(order.date).format("DD-MM-YYYY")}</td>
                <td>{order.total}</td>
                <td>{order.billing && order.billing.first_name}</td>
                <td>{order.billing && order.billing.email}</td>
                <td>{order.billing && order.billing.address_1}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
