import React, { Component } from "react";
import { Segment, Icon, Header, Button, Message, Accordion } from "semantic-ui-react";

import ElectionObject from "./../eth/election"
import web3 from "./../eth/web3"


export default class OneElection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addr: props.addr,
            desc: null,
            election: null,
            candList: [],
            activeIndex: false,
            isManager: false,
            electionStatus: null,
            statusMessage: null,
            winner: "---",
        }
    }

    updateWinnerMessage = async () => {
        this.setState({
            statusMessage: <Message size="huge" positive>
                Winner: <b>{this.state.winner}</b>
            </Message>
        });
    }

    async componentDidMount() {
        try {
            this.setState({
                election: await ElectionObject(this.state.addr),
            });
            this.setState({
                desc: await this.state.election.methods.description().call(),
                candList: await this.state.election.methods.giveCandList().call(),
                electionStatus: await this.state.election.methods.votingStatus().call()
            });

            if (this.state.electionStatus === true) {
                this.setState({
                    statusMessage: <Message >You can vote.</Message>
                });
            } else {
                const _winner = await this.state.election.methods.winnerCand().call();
                this.setState({
                    winner: _winner,
                });
                await this.updateWinnerMessage();
            }


        } catch (err) {
            console.log("Error occured. ", err.message);
        }

        // Implement check manager function
        const realManager = await this.state.election.methods.ORGANIZER().call();
        const accounts = await web3.eth.getAccounts();

        if (accounts[0] === realManager) {
            this.setState({ isManager: true });
        }
    }

    processRequest = async (index) => {
        // Signal parent for loading 
        this.props.load();

        // Now process the transaction
        try {
            const accounts = await web3.eth.getAccounts();
            await this.state.election.methods.vote(index)
                .send({
                    from: accounts[0],
                    gas: '1000000'
                });
        } catch (err) {
            console.log("Error: ", err.message);
        }

        // Signal parent for stop loading
        this.props.unload();
    }

    endElection = async () => {
        // Signal parent for loading 
        this.props.load();

        // Process the transaction
        try {
            const accounts = await web3.eth.getAccounts();
            await this.state.election.methods.endVoting()
                .send({
                    from: accounts[0],
                    gas: '5000000'
                });
        } catch (err) {
            console.log("Error: ", err.message);
        }

        // Signal parent for stop loading
        this.props.unload();
    }

    render() {
        const options = this.state.candList.map((item, index) => {
            return (
                <Button
                    disabled={!this.state.electionStatus}
                    color="secondary"
                    key={index}
                    onClick={() => this.processRequest(index)}
                    content={item}
                />
            );
        });

        return (
            <Segment>
                <Header>{this.state.desc}</Header>
                <Segment>{options}</Segment>
                {this.state.statusMessage}

                <Accordion hidden={!this.state.isManager || this.state.votingStatus}>
                    <Accordion.Title as='h1' active={this.state.activeIndex}
                        onClick={() => { this.setState({ activeIndex: !this.state.activeIndex }) }}>
                        <Icon name='dropdown' />
                        Admin tools
                    </Accordion.Title>
                    <Accordion.Content active={this.state.activeIndex}>
                        <Button onClick={this.endElection} color="red">
                            End Election
                        </Button>
                    </Accordion.Content>
                </Accordion>
            </Segment>
        );
    }
}