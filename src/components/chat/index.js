import React from 'react';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
      messages: [],
    };

    // eslint-disable-next-line no-undef
    this.socket = io();

    this.socket.on('RECEIVE_MESSAGE', (data) => {
      console.log(data);
      this.setState(state => ({
        messages: [...state.messages, data.message],
      }));
    });

    // this.socket.emit('SEND_MESSAGE', { message: 'hello!' });
  }

  sendMessage(message) {
    this.socket.emit('SEND_MESSAGE', { message });
  }

  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.sendMessage(this.state.message);
    this.setState({
      message: null,
    });
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.message}
            onChange={this.handleInput}
            name="message" />
          <button type="submit">Send</button>
        </form>
        <div>
          {this.state.messages.map(message => (<p>{message}</p>))}
        </div>
      </>
    )
  }
}