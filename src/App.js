import React, { useEffect, useState, Component } from 'react';

import "./App.css";
import Cleave from "cleave.js/react";
import axios from "axios";

const normalizeCardNumber = (value) => {
    return value.replace(/\s/g, "").match(/.{1,4}/g)?.join(" ").substr(0, 19) || ""
}

const normalizeCVC = (value) => {
    return value.substr(0, 3) || ""
}








export class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cardHolder: "",
            cardNumber: "2345 2312 2314 5941",
            expiryDate: "12/20",
            cvc: "232",
            email: "2312@gmail.com",
            amount: "23132313"
        };
        this.cardHolderChange = this.cardHolderChange.bind(this);
        this.cardNumberChange = this.cardNumberChange.bind(this);

    }
    cardHolderChange(e) {
        this.setState({
            cardHolder: e.target.value
        });

    }
    cardNumberChange(e) {
        this.setState({
            cardNumber: e.target.value
        });

    }
    componentDidUpdate() {
        console.log(this.state);
    }

    submitPayment() {
        axios.post('/ports', this.state)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
        console.log(this.cardHolder)
    }

    render() {
        return <div className="wrapper">
            <div className="form-wrapper">
                <h1> URFU Payment </h1>
                <form onSubmit={this.handleSubmit} noValidate>


                   
                    <div className="CardHolder">
                        <label htmlFor="Card Holder"> Card Holder</label>
                        <input

                            type="text"
                            className=""
                            placeholder="Charles Semaan"
                            type="text"
                            name="cardName"
                            
                            onChange={this.cardHolderChange}
                        />
                    </div>
                    <div className="CardNumber">
                        <label htmlFor="Card Number"> Card Number</label>
                        <input
                            type="tel"
                            className=""
                            placeholder="0000 0000 0000 0000"
                            inputMode="numeric"
                            autoComplete="cc-number"
                            name="cardNumber"
                            onChange={this.cardNumberChange}
                            onChange={(event) => {
                                const { value } = event.target
                                event.target.value = normalizeCardNumber(value)
                            }
                            }
                        />
                    </div>
                    <div className="ExpiryDate">
                        <label htmlFor="Expiry Date">Expiry Date</label>
                        <input
                            type="text"
                            className=""
                            placeholder="12/21"
                            type="text"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="CVC">
                        <label htmlFor="CVC">CVC</label>
                        <input
                            type="text"
                            className=""
                            placeholder="123"
                            type="text"
                            name="CVC"
                            noValidate
                            onChange={(event) => {
                                const { value } = event.target
                                event.target.value = normalizeCVC(value)
                            }
                            }                        />
                    </div>
                    <div className="email">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            className=""
                            placeholder="c.semaan@urfu.ru"
                            type="email"
                            name="email"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="amount">
                        <label htmlFor="amount">Amount</label>
                        <input
                            input type= "number"
                            className=""
                            placeholder="999.99$"
                            name="amount"
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="payButton">
                        <button type="submit" onClick={this.submitPayment}>Pay</button>
                        </div>

                    </form>
            </div>
            </div>
    }
}


export default App;
