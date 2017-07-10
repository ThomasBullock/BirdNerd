import React from 'react';
import '../styles/css/components/App.css';

import TopBar from './TopBar';

class App extends React.Component {
    render() {
        return (
            <div>
            	<TopBar>
            		
            	</TopBar>
            	<h1 className="heading">Welcome To BirdNerd App!</h1>
            </div>
        );
    }
}

export default App;