import React from "react";
import ReactDOM from "react-dom";
import Main from './components/Main/';
require('.././styles/style.scss');

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Main></Main>
            </div>
        );
    }
}

document.addEventListener("DOMContentLoaded",function(){
    ReactDOM.render(
        <App/>,
        document.getElementById("app"),
    )
});