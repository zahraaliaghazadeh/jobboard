import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";


export default function LandingPage() {
    return (
        <div className="LandingPage">
            <div className="container">
                <div className="row">
                    <div className="col-md-auto">
                            <h3 className="welcome-message">Welcome! </h3>
                            {/* <button className="landingPageButton btn btn-warning"><a className="btn-link" href="/free-game">Free Game</a></button>
                            <button className="landingPageButton btn btn-warning"><a className="btn-link" href="/normal-game">Normal Game</a></button> */}
                    </div>
                </div>
                <div className="row">
                </div>
            </div>

        </div>


    )
}
