import React from 'react';
import profile from '../../profile.jpg';
import "./Messages.css";

const Message = (props) => {
  const { messages, inputName } = props;
  return (
    <ul className="message__box">
      {messages.map((message) => (
        <li className={message.from === inputName ? 'message from__me' : 'message'} key={message.id}>
          <img src={profile} className={message.from === inputName ? 'profile__from__me' : 'profile__other'} alt="" />
          <div className={message.from === inputName ? 'message__wrapper me' : 'message__wrapper'}>
            <div>
              {`${message.from}, ${message.time}`}
            </div>
            <div>
              {message.message}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Message;
