import React, { Component } from "react";
import { axOrders } from "../../axios";

import Order from "../../components/Order/Order";

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axOrders
            .get("/orders.json")
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({ loading: false, orders: fetchedOrders });
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => {
                    return (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                        />
                    );
                })}
            </div>
        );
    }
}

export default Orders;
