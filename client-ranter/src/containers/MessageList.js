import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchMessages} from "../store/actions/messages";
import MessageItem from "../components/MessageItem";
import message from "../store/reducers/messages";

class MessageList extends Component {
        componentDidMount(){
            this.props.fetchMessages();
        }
        render (){
            const {messages} = this.props
            let messageList = messages.map(m=> (
                <MessageItem
                    key={m._id}
                    date={m.createdAt}
                    text={m.text}
                    username={m.user.username}
                    profileImageUrl={m.user.profileImageUrl}
                />
            ));
            return (
                <div className="row col-sm-10">
                    <div className="offset-1 col-sm-10">
                        <ul className="list-group" id="messages">
                            {messageList}
                        </ul>
                    </div>
                </div>
            )
        }
}

function mapStateToProps(state) {
    return {
        messages: state.messages
    }
}

export default connect(mapStateToProps, {fetchMessages})(MessageList);
