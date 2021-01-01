import React, { Component } from "react";
import { Segment, Icon, Header, Button, Input, Form, Container, Message, Menu } from "semantic-ui-react";
import simpleStorage from "./../eth/simpleStorage"

import web3 from "../eth/web3"

export default class SimpleStorage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            message: '',
            showMessage: false,
            isPositive: true,
            sendData: '',

            tMessage: '',
            tShowMessage: false,
            tIsPositive: true,
        }
    };

    updateData = async (event) => {
        this.setState({ loading: true });
        event.preventDefault();

        try {
            const data = await simpleStorage.methods.get().call();
            console.log(data);

            this.setState({
                message: data,
                showMessage: true,
                isPositive: true
            });

        } catch (err) {
            this.setState({
                message: err.message,
                showMessage: true,
                isPositive: false
            });
        }

        this.setState({ loading: false});

        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(5000);

        this.setState({ showMessage: false });
    }

    saveData = async(event)=>{
        this.setState({ loading: true });
        event.preventDefault();

        try {
            const accounts = await web3.eth.getAccounts();
            await simpleStorage.methods.set(this.state.sendData)
            .send({
                from: accounts[0],
                minGas: '1000000'
            });

            this.setState({
                tMessage: 'Your value is saved successfully.',
                tShowMessage: true,
                tIsPositive: true
            });
        } catch (err) {
            
        }
        this.setState({ loading: false, sendData: ''});
    
        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(5000);

        this.setState({ tShowMessage: false });
    }


    render() {
        return (
            <Segment loading={this.state.loading}>
                <Header as='h2'>
                    <Icon name='database' />
                    <Header.Content>
                        Simple Storage
      			<Header.Subheader>
                            Safely storing your data.
						</Header.Subheader>
                    </Header.Content>
                </Header>

                <Segment>
                    <Message
                        hidden={!this.state.showMessage}
                        positive={this.state.isPositive}
                        negative={!this.state.isPositive}>
                        {this.state.message}
                    </Message>
                    <Button loading={this.loading} floated color="blue" onClick={this.updateData}>
                        <Icon primary name="unhide" />
                        Reveal my data
                    </Button>
                </Segment>

                <Segment>
                    <Form>
                        <Message 
                        hidden={!this.state.tShowMessage}
                        positive={this.state.tIsPositive}
                        negative={!this.state.tIsPositive}
                        >
                            {this.state.tMessage}
                        </Message>
                        <Input 
                        fluid 
                        placeholder='Enter your data' 
                        value={this.state.sendData}
                        onChange={event => this.setState({sendData: event.target.value })}
                        />
                        <div style={{marginTop:"10px"}}>

                        <Button 
                        color="green"
                        onClick={this.saveData}
                        >
                            Save my data
                        </Button>
                            </div>

                    </Form>

                </Segment>


            </Segment>
        );
    }
}
