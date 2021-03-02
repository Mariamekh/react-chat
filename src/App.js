/* eslint-disable array-callback-return */
import React ,{Component} from 'react';
import ReactModal from 'react-modal';
import Login from './components/Registration/Login';
import Header from './components/Header/Header';
import Message from './components/Messages/Messages';
import SendMessage from './components/Send/SendMessage';
import './App.css';

export class App extends Component {
  client = null;

  write = this.write.bind(this);

  setLogin = this.setLogin.bind(this);

  constructor(props) {
    super(props);
    this.state = {
      inputName: '',
      messages: [],
      sendMessages: [], 
      showModal: true,
    };
  }

  componentDidMount() {
    if (localStorage.getItem('inputName') !== '') {
      const loginPrew = localStorage.getItem('inputName');
      this.setState({ inputName: loginPrew, showModal: false });
      this.start();
    }
  }

  componentDidUpdate() {
    if (this.client !== null) {
      this.sendMessage();
    } 
  }

  setLogin(text) {
    this.setState({ inputName: text, showModal: text === '' });
    localStorage.setItem('inputName', text);
    if (text !== '') {
      this.start();
    } else {
      this.client.close();
      this.setState({ messages: [] });
    }
  }

  changeDate = (milliseconds) => {
    let hours = `${new Date(milliseconds).getHours()}`.slice(-2);
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = `${new Date(milliseconds).getMinutes()}`.slice(-2);
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    const time = `${hours}:${minutes}`;
    return time;
  }

  start() {
    
    this.client = new WebSocket('ws://chat.shas.tel');
    this.client.onopen = () => this.setState({ messages: [] });
    this.client.onclose = () => { 
      this.reconnect();
    };

    this.client.onmessage = ({ data }) => {
      const { messages } = this.state;
      const newData = JSON.parse(data); 
      newData.map((item) => {
         item.time = this.changeDate(item.time);
      });
      if (this.client.readyState !== 3 && this.client.readyState !== 0) {
        this.setState({ messages: [...newData, ...messages] });
      }
    };
  }

  reconnect() {
    const { inputName } = this.state;
    if (inputName !== '') {
      if (!this.client || this.client.readyState === 3) this.start();
    }
  }

  write(text) {
    const { inputName, sendMessages } = this.state;
    const newMessage = { inputName, text, send: false };
    this.setState({ sendMessages: [newMessage, ...sendMessages] });
  }

  sendMessage() {
    const { sendMessages } = this.state;
    if (this.client.readyState !== 3 && this.client.readyState !== 0) {
       sendMessages.filter((sendMessage) => sendMessage.send === false).map((value) => {
        this.client.send(JSON.stringify({ from: `${value.inputName}`, message: `${value.text}` }));
        value.send = true;
      });
    }
  }

  render() {
    const {
      messages,
      inputName, 
      showModal,
    } = this.state;
    return (
      <section className="app">
        <Header setLogin={this.setLogin} />
        <Message messages={messages} inputName={inputName} />
        <SendMessage inputName={inputName} write={this.write} />
        <ReactModal
          isOpen={showModal}
          ariaHideApp={false}
          className={"ReactModal__Content"}
          portalClassName={
            "ReactModalPortal"}
         >
          <section className="login__wrapper"   >
            <Login setLogin={this.setLogin} />
          </section>
        </ReactModal>
      </section>
    );
  }
}
export default App;
