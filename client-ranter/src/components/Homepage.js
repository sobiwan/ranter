import React from "react";
import {Link} from "react-router-dom";
import MessageTimeline from "./MessageTimeline"

const Homepage = ({currentUser}) => {
    if(!currentUser.isAuthenticated){
        return(
            <div className="home-hero">
                <h1>What's On Your Mind?</h1>
                <h4>New to Ranter?</h4>
                <Link to="/signup" className="btn btn-primary">
                    signup here
                </Link>
            </div> 
        );
    }
    return (
        <div>
            <MessageTimeline profileImageUrl={currentUser.user.profileImageUrl} username={currentUser.user.username} />
        </div>
    )

}

export default Homepage;