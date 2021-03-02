import React from 'react';
import "./Login.css"
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
    };
  }

  onHandleChange = ({ target: { value } }) => {
    this.setState({ inputName: value });
  };

  onSubmitForm = async (e) => {
    e.preventDefault();
    const { inputName } = this.state;
    const { setLogin } = this.props;
    setLogin(inputName);
    this.setState({ inputName: '' });
  };

  render() {
    const { inputName } = this.state;
    return (
      <form className="inputname__form" onSubmit={this.onSubmitForm}>
        <label htmlFor="inputName">Enter your nickname below</label>
        <br />
        <input required
          id="inputName"
          type="text"
          value={inputName}
          onChange={this.onHandleChange} 
          placeholder="type here..."
        />
        <br />
        <button className="button-1" type="submit">Let me In</button>
        <br />
      </form>
    );
  }
}

export default Login;
