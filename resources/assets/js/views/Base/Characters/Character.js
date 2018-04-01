import React, { Component } from 'react';
import axios from 'axios';

import {Card, CardHeader, CardBody, Table, Badge, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';

import ContactsTable from '../../../components/ContactsTable/ContactsTable';
import JournalTable from '../../../components/JournalTable/JournalTable';
import SkillsTable from '../../../components/SkillsTable/SkillsTable';
import TitlesTable from '../../../components/TitlesTable/TitlesTable';
import RolesTable from '../../../components/RolesTable/RolesTable';

import classnames from 'classnames';

class Character extends Component {

    constructor(props) {
        super(props);

        this.state = {
            character: null,
            activeTab: 'Sheet',
            loadedTabs: [],
        };
    }

    loadFromServer(){
        axios.get('http://interbus.test/api/characters/' + this.props.match.params.id)
            .then(res => {
                const character = res.data;
                this.setState({
                    character: character,
                });
            });
    }

    componentDidMount() {
        this.loadFromServer();
    }

    toggle = tab => {
        if (this.state.activeTab !== tab) {
            this.setState( (prevState) => {
                const isLoaded = prevState.loadedTabs.indexOf(tab);
                const newTabs = prevState.loadedTabs;
                if (isLoaded === -1) {
                    newTabs.push(tab);
                }
                return {
                    ...prevState,
                    activeTab: tab,
                    loadedTabs: newTabs,
                }
            });
        }
    }

    render() {

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12" className="mb-4">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === 'Sheet' })}
                                    onClick={() => { this.toggle('Sheet'); }} >
                                    Character Sheet
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === 'Contacts' })}
                                    onClick={() => { this.toggle('Contacts'); }} >
                                    Contacts
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === 'Journal' })}
                                    onClick={() => { this.toggle('Journal'); }} >
                                    Journal
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === 'Skills' })}
                                    onClick={() => { this.toggle('Skills'); }} >
                                    Skills
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === 'Roles' })}
                                    onClick={() => { this.toggle('Roles'); }} >
                                    Roles
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === 'Titles' })}
                                    onClick={() => { this.toggle('Titles'); }} >
                                    Titles
                                </NavLink>
                            </NavItem>
                        </Nav>
                        {this.state.character &&
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="Sheet">
                                    Test
                                </TabPane>
                                {(this.state.activeTab === 'Contacts' || this.state.loadedTabs.indexOf('Contacts') !== -1) &&
                                <TabPane tabId="Contacts">
                                    <ContactsTable id={this.state.character.character_id}
                                                   key={this.state.character.character_id}/>
                                </TabPane>
                                }
                                {(this.state.activeTab === 'Journal' || this.state.loadedTabs.indexOf('Journal') !== -1) &&
                                <TabPane tabId="Journal">
                                    <JournalTable id={this.state.character.character_id}
                                                   key={this.state.character.character_id}/>
                                </TabPane>
                                }
                                {(this.state.activeTab === 'Skills' || this.state.loadedTabs.indexOf('Skills') !== -1) &&
                                <TabPane tabId="Skills">
                                    <SkillsTable id={this.state.character.character_id}
                                                  key={this.state.character.character_id}/>
                                </TabPane>
                                }
                                {(this.state.activeTab === 'Roles' || this.state.loadedTabs.indexOf('Roles') !== -1) &&
                                <TabPane tabId="Roles">
                                    <RolesTable id={this.state.character.character_id}
                                                 key={this.state.character.character_id}/>
                                </TabPane>
                                }
                                {(this.state.activeTab === 'Titles' || this.state.loadedTabs.indexOf('Titles') !== -1) &&
                                <TabPane tabId="Titles">
                                    <TitlesTable id={this.state.character.character_id}
                                                 key={this.state.character.character_id}/>
                                </TabPane>
                                }
                            </TabContent>
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Character;