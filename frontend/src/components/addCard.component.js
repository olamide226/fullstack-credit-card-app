import React, { Component } from "react";
import CardDataService from "../services/card.service";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.OnChangeCardNo = this.OnChangeCardNo.bind(this);
    this.saveCard = this.saveCard.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      name: "",
      card_no: null, 
      limit: null,
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      name: e.target.value
    });
  }

  OnChangeCardNo(e) {
    this.setState({
      card_no: e.target.value
    });
  }

  saveCard() {
    var data = {
      name: this.state.name,
      description: this.state.description
    };

    CardDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.name}
                onChange={this.onChangeTitle}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_no">Description</label>
              <input
                type="text"
                className="form-control"
                id="card_no"
                required
                value={this.state.card_no}
                onChange={this.OnChangeCardNo}
                name="card_no"
              />
            </div>

            <button onClick={this.saveCard} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}