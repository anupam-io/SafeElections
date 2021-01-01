import React, { Component } from 'react';
import { Container, Menu, Message, Header, Icon } from 'semantic-ui-react';

import Elections from "./components/Elections";


class App extends Component {
	render() {
		return (
			<div>
				<link async rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
				<script async src="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.js" />
				<Container style={{ margin: '20px' }}>
					<Menu >
						
						<Menu.Item>
							<Header as='h2'>
								<Icon name='box' />
								<Header.Content>
									Elections
									<Header.Subheader>
									Safe and Controlled.
									</Header.Subheader>
								</Header.Content>
							</Header>
						</Menu.Item>

						<Menu.Item position='right'>
							<Message info>
								<Message.Header>ATTENTION !!! Testing Phase</Message.Header>
								All transactions are demo transactions hosted on Kovan testing network.
								<br />Please switch your wallet to Kovan testing network.

							</Message>
						</Menu.Item>
					</Menu>

					<Container>

						<Elections />
					</Container>
				</Container>
			</div>
		);
	}
}

export default App;
