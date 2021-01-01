import React, { Component } from "react";
import { Segment, Icon, Header, Button, Input, Form, Container, Message, Card, Item, Accordion, Grid } from "semantic-ui-react";

import factory from "./../eth/factory"
import OneElection from "./OneElection";
import web3 from "./../eth/web3";

export default class Election extends Component {
    messagesEndRef = React.createRef();
    scrollToBottom = () => {
        this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    constructor(props) {
        super(props);
        this.state = {
            electionAddress: [],
            isLoading: false,
            inputCand: "",
            inputDesc: ""
        }
    }

    onSubmit = async (event) => {
        event.preventDefault();
        console.log("SUBMITTING THE ELECTION.");


        const _names = '';
        const _desc = '';

        // Signal parent for loading 
        this.loadFunction();
        // Now process the transaction

        try {
            // const accounts = await web3.eth.getAccounts();
            // const res = await factory.methods
            // .createElection(_names, _desc)
            // .send({
            //     from: accounts[0],
            //     gas: '5000000'
            // });
        } catch (err) {

        }

        // Signal parent for stop loading
        this.unloadFunction();
    }

    async componentDidMount() {
        try {

            const _addr = await factory.methods.getDeployedElections().call();

            this.setState({
                electionAddress: _addr
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    loadFunction = () => {
        this.setState({
            isLoading: true
        });
    }
    unloadFunction = () => {
        this.setState({
            isLoading: false
        });
    };




    render() {
        const listItems = this.state.electionAddress.map((addr) => (
            <OneElection
                key={addr}
                loadFunction={this.loadFunction}
                unloadFunction={this.unloadFunction}
                addr={addr} />
        ));

        return (
            <Container>
                <Button
                    onClick={this.scrollToBottom}
                    primary floated="right" content="HOST YOUR ELECTION" />

                <Header as='h2'>
                    <Icon name='box' />
                    <Header.Content>
                        Elections
      			        <Header.Subheader>
                            Safe and Controlled.
						</Header.Subheader>
                    </Header.Content>
                </Header>

                <Segment loading={this.state.isLoading}>
                    {/* {listItems} */}
                </Segment>

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
                        >
                        </Input>
                        <br />
                        <br />
                        <Input
                            type="text"
                            placeholder="name1,name2,name3"
                            label="Names, comma separated."
                            labelPosition='left'
                            value={this.state.inputCand}
                            onChange={event => this.setState({ inputCand: event.target.value })}
                        >
                        </Input>
                        <br />
                        <br />

                        <Button
                            primary
                            onClick={this.onSubmit}
                        >
                            Submit form.
                        </Button>
                    </Form>
                </Segment>

            </Container>
        );
    }

}