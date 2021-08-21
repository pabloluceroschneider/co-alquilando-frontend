import React from "react";
import SockJsClient from "react-stomp";
import { TalkBox } from "react-talk";
import ApiRequest from '../../util/ApiRequest';

class WebSocket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientConnected: false,
      messages:[]
    };
  }

  onMessageReceive = (msg, topic) => {
    this.setState(prevState => ({
      messages: [...prevState.messages, msg]
    }));
  }

  sendMessage = (msg, selfMsg) => {
    try {
      selfMsg = { ...selfMsg, groupId: this.props.groupId, channel: this.props.channel } /**Debemos enviar el groupId al back */
      this.clientRef.sendMessage("/app/all-interno", JSON.stringify(selfMsg));  /**Este topico donde se publica se debe customizar -> groupId-intern  // groupId-owner  */
      //this.clientRef.sendMessage(`/app/${this.props.channel}`, JSON.stringify(selfMsg));  /**Este topico donde se publica se debe customizar -> groupId-intern  // groupId-owner  */
      return true;
    } catch (e) {
      return false;
    }
  }

  async componentDidMount() {
    let mes = await ApiRequest.get(`/chat/history/${this.props.channel}`);
    this.setState({ messages: mes.data });
  }

  render() {
    const wsSourceUrl = "https://ec2-34-219-1-255.us-west-2.compute.amazonaws.com:8080/handler";
    return (
      <div>
        
        <TalkBox
          topic={this.props.channelName}
          currentUserId={this.props.id}
          currentUser={this.props.name}
          messages={this.state.messages}
          onSendMessage={this.sendMessage}
          connected={this.state.clientConnected}
        />

        <SockJsClient
          url={wsSourceUrl}
          topics={[`/topic/${this.props.channel}`]} /**Este topico se debe customizar donde se escuchen los msj -> groupId-intern  // groupId-owner  */
          onMessage={this.onMessageReceive}
          ref={(client) => { this.clientRef = client }}
          onConnect={() => { this.setState({ clientConnected: true }) }}
          onDisconnect={() => { this.setState({ clientConnected: false, channel: null }) }}
          debug={false}
        />

      </div>
    );

  }
}

export default WebSocket;