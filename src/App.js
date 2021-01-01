import React, { Component } from 'react';
import { Container, Menu, Message, Icon, Segment } from 'semantic-ui-react';

import Elections from "./components/Elections";


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false
		}
	}

	load = ()=>{this.setState({isLoading: true});}
	unload = ()=>{this.setState({isLoading: false})}

	render() {
		return (
			<div>
				<link async rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
				<script async src="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.js" />

				<Segment loading={this.state.isLoading}>


				<Container style={{ margin: '20px' }}>
					<Menu inverted>

						<Menu.Item>
							<Icon name='box' />

							Safe Elections
							<br />Tamper free ethereum based elections

						</Menu.Item>

						<Menu.Item position='right'>
							<Message negative>

								<b>ATTENTION !!!</b>
								<br />All transactions are demo transactions hosted on Kovan testing network.
								<br />Please switch your wallet to Kovan testing network.
								</Message>

						</Menu.Item>
					</Menu>

					<Container>
						<Elections 
						load={this.load}
						unload={this.unload}
						/>
					</Container>
				</Container>
				<br />

				<Container fluid>
					<p style={{ align: 'center' }}></p>
				</Container>

				</Segment>
			</div>
		);
	}
}

export default App;
