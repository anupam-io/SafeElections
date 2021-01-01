import React, { Component } from 'react';
import { Header, Button, Icon, Segment,} from 'semantic-ui-react';

export default class CounterApp extends Component {
	state = { activeItem: 0 }

	inc = () => {
		this.setState({ activeItem: this.state.activeItem + 1 });
	}

	render() {
		const { activeItem } = this.state;

		return (
			<Segment>
				<Header as='h2'>
					<Icon name='chess rock' />
					<Header.Content>
						CounterApp
      			<Header.Subheader>
							Tap as much as you can.
						</Header.Subheader>
					</Header.Content>
				</Header>

				<Segment>

				<h1>
					Your Score: {activeItem}
				</h1>
				<Button color='green' onClick={this.inc}>
					<div>
						<Icon primary loading name="plus" size="huge"></Icon>
					</div>
				</Button>
				</Segment>

			</Segment>

		);
	}
}