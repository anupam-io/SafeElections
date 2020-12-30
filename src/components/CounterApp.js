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

				<Header>
					Your Score: {activeItem}
				</Header>

				<Button color='green' onClick={this.inc}>
					<div>
						<Icon primary loading name="plus" size="huge"></Icon>
					</div>
				</Button>

			</Segment>

		);
	}
}