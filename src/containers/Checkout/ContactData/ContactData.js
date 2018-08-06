import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import { axOrders } from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault()
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Riskey',
                address: {
                    street: 'test street',
                    zipCode: '401209',
                    country: 'India'
                },
                email: 'test@gmail.com'
            },
            deliveryMethod: 'fastest'
        };
        axOrders.post('/orders.json', order)
            .then(r => {
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(e => {
                console.error(e)
                this.setState({ loading: false })
            });
    }

    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your Name" />
                <input type="email" name="email" placeholder="Your Mail" />
                <input type="text" name="street" placeholder="Street" />
                <input type="text" name="postal" placeholder="Postal Code" />
                <Button
                    btnType="Success"
                    clicked={this.orderHandler}>ORDER</Button>
            </form>
        )
        if ( this.state.loading ) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact data</h4>
                {form}
            </div>
        )
    }
    
}

export default ContactData