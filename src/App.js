import React, { Component } from 'react';
import { Container, Menu, Message, Icon } from 'semantic-ui-react';

import Elections from "./components/Elections";


class App extends Component {
	render() {
		return (
			<div>
				<link async rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
				<script async src="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.js" />
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
						<Elections />
					</Container>
				</Container>
				<br />
				
				<Container fluid>
      		<p style={{align: 'center'}}></p>
    		</Container>

			</div>
		);
	}
}

export default App;
