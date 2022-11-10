import React, { Component } from "react";
import CardDataService from "../services/card.service";

export default class CardsList extends Component {
    constructor(props) {
        super(props);
        this.retrieveCards = this.retrieveCards.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.saveCard = this.saveCard.bind(this);
        this.OnChangeName = this.OnChangeName.bind(this);
        this.OnChangeCardNo = this.OnChangeCardNo.bind(this);
        this.OnChangeLimit = this.OnChangeLimit.bind(this);

        this.state = {
            cards: [],
            name: "",
            card_no: "",
            limit: "",
            balance: 0,
            submitted: false,
            errors: false,
            error_msg: ""
        };
    }

    componentDidMount() {
        this.retrieveCards();
    }

    retrieveCards() {
        CardDataService.getAll()
            .then(response => {
                this.setState({
                    cards: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    saveCard() {
        let data = {
            name: this.state.name,
            card_no: this.state.card_no,
            limit: this.state.limit
        };

        CardDataService.create(data)
            .then(response => {
                this.refreshList();
                this.setState({
                    name: "",
                    card_no: "",
                    limit: "",
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                if (e.response.status === 422) {
                    let msg ="";
                    e.response.data.errors.forEach(i => msg += `${i.msg}, `);
                    this.setState({
                        errors: true,
                        error_msg: msg
                    })
                    console.log("validation error", e.response.data);
                   }
                console.log(e);
            });
    }

    OnChangeName(e) {
        this.setState({
            name: e.target.value,
            submitted: false,
            errors: false
        });
    }

    OnChangeCardNo(e) {
        this.setState({
            card_no: e.target.value,
            submitted: false,
            errors: false
        });
    }

    OnChangeLimit(e) {
        this.setState({
            limit: e.target.value,
            submitted: false,
            errors: false
        });
    }

    refreshList() {
        this.retrieveCards();
    }

    render() {
        const { cards } = this.state;

        return (
            <><div className="list row">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        value={this.state.name}
                        onChange={this.OnChangeName}
                        name="name" />
                </div>

                <div className="form-group">
                    <label htmlFor="cardNo">Card Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cardNo"
                        required
                        value={this.state.card_no}
                        onChange={this.OnChangeCardNo}
                        name="card_no" />
                </div>

                <div className="form-group">
                    <label htmlFor="limit">Limit</label>
                    <input
                        type="text"
                        className="form-control"
                        id="limit"
                        required
                        value={this.state.limit}
                        onChange={this.OnChangeLimit}
                        name="limit" />
                </div>
                <div className="form-group">
                    <br></br>
                    <button onClick={this.saveCard} className="btn btn-success">
                        Add
                    </button>

                </div>
                {this.state.errors &&
                        <div className="alert alert-danger">
                            <small id="cardHelper"
                                className="form-text text-muted">{this.state.error_msg}
                            </small>
                        </div>}
                    {this.state.submitted && <div className="alert alert-success">
                        <small id="cardHelper"
                            className="form-text text-muted alert-success">Success
                        </small>
                    </div>}
            </div>

                <div className="list row">
                    <p></p>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Card Number</th>
                                <th scope="col">Balance</th>
                                <th scope="col">Limit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cards.length &&
                                cards.map((card, index) => (
                                    <tr key={index}>
                                        <td>{card.name}</td>
                                        <td>{card.card_no}</td>
                                        <td>£{card.balance}</td>
                                        <td>£{card.limit}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div></>
        );
    }
}