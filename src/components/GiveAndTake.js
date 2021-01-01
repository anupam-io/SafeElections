import React, { Component } from "react";
import { Segment, Icon, Header, Button, Input, Form, Container, Message } from "semantic-ui-react";

import giveAndTake from "./../eth/giveAndTake"
import web3 from "./../eth/web3"

export default class GiveAndTake extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentBalance: <div>Fetching  <Icon loading name='circle notch' /></div>,
			contractBalance: <div>Fetching  <Icon loading name='circle notch' /></div>,
			errorMessage: '',
			loading: false,
			transAmountGive: '',
			transMessageTake: '',
			errorOcc: false,
			transMessageHidden: true
		}
	}


	fetchBalance = async()=>{
		this.setState({
			contractBalance: await giveAndTake.methods.getBalance().call()
		});

	}

	async componentDidMount(){

		try {
			await this.fetchBalance();
			const accounts = await web3.eth.getAccounts();
			this.setState({
				currentBalance: await web3.eth.getBalance(accounts[0])
			});
		} catch (error) {

		}
	}



	give = async (event) => {
		this.setState({ loading: true });
		event.preventDefault();

		try {
			const accounts = await web3.eth.getAccounts();
			const res = await giveAndTake.methods.give()
				.send({
					from: accounts[0],
					gas: '1000000',
					value: this.state.transAmountGive
				});
			this.fetchBalance();
			this.setState({
				transMessage: 'Transaction successful. We have successfully received your amount.',
				errorOcc: false
			});
		} catch (err) {
			this.setState({
				errorOcc: true,
				transMessage: err.message,
			});
		}

		this.setState({
			loading: false,
			transMessageHidden: false
		});
	}


	take = async (event) => {
		this.setState({ loading: true });
		event.preventDefault();

		try {
			const accounts = await web3.eth.getAccounts();
			const res = await giveAndTake.methods.take(this.state.transAmountTake)
				.send({
					from: accounts[0],
					gas: '1000000',
				});

			this.fetchBalance();
			this.setState({
				transMessage: 'Transaction successful. We have successfully deposited funds into your account.',
				errorOcc: false
			});
		} catch (err) {
			this.setState({
				errorOcc: true,
				transMessage: err.message,
			});
		}

		this.setState({
			loading: false,
			transMessageHidden: false
		});
	}



	render() {

		return (
			<Segment loading={this.state.loading}>
				<Header as='h2'>
					<Icon name='handshake' />
					<Header.Content>
						Give And Take
      			<Header.Subheader>
							No boundaries whatsoever.
						</Header.Subheader>
					</Header.Content>
				</Header>

				<Segment.Group>
					<Segment>
						<Icon name='dollar sign' />
						<b>Contract Balance:</b>  {this.state.contractBalance}  Wei
					</Segment>
					<Segment>
						<Icon name='money bill alternate' />
						<b>Your Balance:</b>  {this.state.currentBalance}  Wei

					</Segment>
				</Segment.Group>

				<Segment>
					<Form onSubmit={this.give} error={!!this.state.errorMessage}>
						<Button disabled={this.state.loading} color='green'>
							Give
					</Button>
						<Input
							labelPosition='right'
							label='Wei'
							placeholder='0'
							value={this.state.transAmountGive}
							onChange={event => this.setState({ transAmountGive: event.target.value, errorOcc: false, transMessageHidden: true })}
							type='number'
							min='0'
						>
						</Input>
					</Form>
				</Segment>

				<Segment>
					<Form onSubmit={this.take} error={!!this.state.errorMessage}>
						<Button disabled={this.state.loading} color='blue'>
							Take
					</Button>
						<Input
							labelPosition='right'
							label='Wei'
							placeholder='0'
							value={this.state.transAmountTake}
							onChange={event => this.setState({ transAmountTake: event.target.value, errorOcc: false, transMessageHidden: true })}
							type='number'
							min='0'
						>
						</Input>
					</Form>
				</Segment>
				<Message
					hidden={this.state.transMessageHidden}
					positive={!this.state.errorOcc}
					negative={this.state.errorOcc}
					content={this.state.transMessage}
				/>
			</Segment>
		);
	}
}