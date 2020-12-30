import React, { Component } from 'react';
import { Container, Grid, Header, Icon, Image, Menu, Message, Segment, Sidebar, Input, Divider } from 'semantic-ui-react';

import CounterApp from "./components/CounterApp";
import GiveAndTake from './components/GiveAndTake';


class App extends Component {
	state = {
		activeItem: 'CounterApp',
		activeContent: <CounterApp />
	}

	handleItemClick = (e, { name }) => {
		this.setState({
			activeItem: name,
		});

		switch (name) {
			case 'CounterApp':
				this.setState({ activeContent: <CounterApp /> });
				break;
				case 'GiveAndTake':
					this.setState({ activeContent: <GiveAndTake /> });
				break;
				
				default:
					this.setState({ activeContent: <CounterApp /> });
					break;
		}

	};


	render() {
		const { activeItem } = this.state;

		return (
			<div>
				<link async rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
				<script async src="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.js" />
				<Container style={{ marginTop: '20px' }}>
					<Menu inverted>
						<Menu.Item
							name='CounterApp'
							active={activeItem === 'CounterApp'}
							onClick={this.handleItemClick}
						/>
						<Menu.Item
							name='GiveAndTake'
							active={activeItem === 'GiveAndTake'}
							onClick={this.handleItemClick}
						/>
						<Menu.Item
							name='friends'
							active={activeItem === 'friends'}
							onClick={this.handleItemClick}
						/>
					</Menu>
					<Container>
					<Message info>
						<Message.Header>ATTENTION !!! Testing Phase</Message.Header>
						All transactions are demo transactions hosted on Kovan testing network.
						<br />Please switch your wallet to Kovan testing network.

					</Message>
						{this.state.activeContent}
					</Container>
				</Container>
			</div>
		);
	}
}

export default App;
