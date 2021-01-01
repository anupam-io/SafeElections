import React, { Component } from "react";
import { Segment, Header, Button, Input, Form, Container, Message } from "semantic-ui-react";

import factory from "./../eth/factory"
import OneElection from "./OneElection";
import web3 from "./../eth/web3";

export default class Election extends Component {
    constructor(props) {
        super(props);
        this.state = {
            electionAddress: [],
            inputCand: "",
            inputDesc: ""
        }
    }

    messagesEndRef = React.createRef();
    scrollToBottom = () => {
        this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    onSubmit = async (event) => {
        event.preventDefault();
        
        // Signal parent for loading 
        this.props.load();

        // Now process the transaction
        try {
            const _names = this.state.inputCand.split(',');
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createElection(_names, this.state.inputDesc)
                .send({
                    from: accounts[0],
                    gas: '5000000'
                });
        } catch (err) {

        }

        // Signal parent for stop loading
        this.props.unload()
    }

    async componentDidMount() {
        try {
            const _addr = await factory.methods.getDeployedElections().call();
            this.setState({ electionAddress: _addr });
        } catch (err) {
            console.log(err.message);
        }
    }

    render() {
        const listItems = this.state.electionAddress.map((addr) => (
            <OneElection
                key={addr}
                loadFunction={this.loadFunction}
                unloadFunction={this.unloadFunction}
                addr={addr} 
                load={this.props.load}
                unload={this.props.unload}
                
                />
        ));

        return (
            <Container>
                <div style={{paddingBottom: '50px'}}>
                    <Button
                        onClick={this.scrollToBottom}
                        primary floated="right"
                        content="HOST YOUR ELECTION"
                        />
                </div>
                {listItems}

                <div ref={this.messagesEndRef} />

                <Segment>
                    <Form>
                        <Header>
                            Launch your own election
                        </Header>
                        <Message>
                            Rules:
                            <li>After registering the election, voting would immediately begin for all users.</li>
                            <li>After registering the election, you won't be able to change any information about candidates.</li>
                            <li>After registering the election, you can end the election simply by going under admin tool.</li>
                            <li>Admin tools would only be visible to you, when you login as your admin account.</li>

                        </Message>

                        <Input
                            type="text"
                            placeholder="National elections."
                            label="Description"
                            labelPosition="left"
                            value={this.state.inputDesc}
                            onChange={event => this.setState({ inputDesc: event.target.value })}
                        />
                        <br />
                        <br />
                        <Input
                            type="text"
                            placeholder="name1,name2,name3"
                            label="Names, comma separated."
                            labelPosition='left'
                            value={this.state.inputCand}
                            onChange={event => this.setState({ inputCand: event.target.value })}
                        />
                        <br />
                        <br />

                        <Button
                            primary
                            onClick={this.onSubmit}
                            content="Start your election!"
                        />
                        <br />
                    </Form>
                </Segment>
            </Container>
        );
    }
}