import React, {Component} from 'react';
 import "./SendMessage.css"
class SendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageInput: '', 
    };
  }

  handleMessage = ({ target: { value } }) => {
    this.setState({ messageInput: value });
  }

  submitForm = (e) => {
    e.preventDefault();
    const { messageInput } = this.state;
    const { write } = this.props;
    write(messageInput);
    this.setState({ messageInput: '' });
  }
 
  render() {
    const { messageInput } = this.state;
    return (
      <>
        <form className="message__send" onSubmit={this.submitForm}>
          <input  required
            type="text"
            value={messageInput}
            onChange={this.handleMessage}
            placeholder="Type here..."
          />
        </form> 
      </>
    );
  }
}

export default SendMessage;