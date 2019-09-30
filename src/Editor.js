import Pins from './Pins';
import Board from './Board';
import React, { Component } from 'react';
import BoardComponents from './BoardComponents';
import { Button, Input, Layout, Modal, message, Table } from 'antd';

const { Content } = Layout;

export default class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            visible: false,
        };
    }
    componentDidMount() {
        const oldState = JSON.parse(localStorage.getItem('values'));
        if (oldState) {
            this.setState({ ...oldState });
        }
    }
    popoverValueChange = (e, bc) => {
        this.setState({ [bc]: e.target.value });
    }
    getContent = (b) => {
        const bc = b.name;
        const isfull = (this.state[`${bc}[0]`] && this.state[`${bc}[1]`]
            && this.state[`${bc}[2]`] && this.state[`${bc}[3]`]
            && this.state[`${bc}[4]`] && this.state[`${bc}[5]`]
            && this.state[`${bc}[6]`]) || this.state[bc];
        if (b.type === BoardComponents.HEX_DISPLAY) {
            return (
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <Input
                                        placeholder={`Input ${bc}[0]`}
                                        size="small"
                                        value={this.state[bc + '[0]']}
                                        onChange={(e) => this.popoverValueChange(e, bc + '[0]')}
                                        style={{
                                            marginBottom: 5,
                                            fontFamily: 'consolas'
                                        }}
                                    />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <Input
                                        placeholder={`Input ${bc}[5]`}
                                        size="small"
                                        value={this.state[bc + '[5]']}
                                        onChange={(e) => this.popoverValueChange(e, bc + '[5]')}
                                        style={{
                                            marginBottom: 5,
                                            fontFamily: 'consolas'
                                        }}
                                    />
                                </td>
                                <td></td>
                                <td>
                                    <Input
                                        placeholder={`Input ${bc}[1]`}
                                        size="small"
                                        value={this.state[bc + '[1]']}
                                        onChange={(e) => this.popoverValueChange(e, bc + '[1]')}
                                        style={{
                                            marginBottom: 5,
                                            fontFamily: 'consolas'
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <Input
                                        placeholder={`Input ${bc}[6]`}
                                        size="small"
                                        value={this.state[bc + '[6]']}
                                        onChange={(e) => this.popoverValueChange(e, bc + '[6]')}
                                        style={{
                                            marginBottom: 5,
                                            fontFamily: 'consolas'
                                        }}
                                    />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <Input
                                        placeholder={`Input ${bc}[4]`}
                                        size="small"
                                        value={this.state[bc + '[4]']}
                                        onChange={(e) => this.popoverValueChange(e, bc + '[4]')}
                                        style={{
                                            marginBottom: 5,
                                            fontFamily: 'consolas'
                                        }}
                                    />
                                </td>
                                <td></td>
                                <td>
                                    <Input
                                        placeholder={`Input ${bc}[2]`}
                                        size="small"
                                        value={this.state[bc + '[2]']}
                                        onChange={(e) => this.popoverValueChange(e, bc + '[2]')}
                                        style={{
                                            marginBottom: 5,
                                            fontFamily: 'consolas'
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <Input
                                        placeholder={`Input ${bc}[3]`}
                                        size="small"
                                        value={this.state[bc + '[3]']}
                                        onChange={(e) => this.popoverValueChange(e, bc + '[3]')}
                                        style={{
                                            marginBottom: 5,
                                            fontFamily: 'consolas'
                                        }}
                                    />
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    {
                        isfull ?
                        <Button
                            block 
                            type="danger"
                            style={{ flex: 1 }}
                            size="small"
                            onClick={
                                () => {
                                    for (let i = 0; i < 7; i++) {
                                        this.popoverValueChange({
                                            target : {
                                                value: ''
                                            }
                                        }, bc + `[${i}]`);
                                    }
                                }
                            }
                        >
                                Remove
                        </Button>
                        : null
                    }
                </div>
            );
        }
        return (
            <div>
                <Input
                    placeholder="Input Name"
                    size="small"
                    value={this.state[bc]}
                    onChange={(e) => this.popoverValueChange(e, bc)}
                    style={{
                        marginBottom: 5,
                        fontFamily: 'consolas'
                    }}
                />
                    {
                        isfull ?
                        <Button
                            block 
                            type="danger"
                            style={{ flex: 1 }}
                            size="small"
                            onClick={
                                () => {
                                    this.popoverValueChange({
                                        target : {
                                            value: ''
                                        }
                                    }, bc );
                                }
                            }
                        >
                                Remove
                        </Button>
                        : null
                    }
            </div>
        );
    }
    setSelected = (bc) => {
        this.setState({ selected: bc });
    }
    save = (e) => {
        if (e) e.stopPropagation();
        localStorage.setItem('values', JSON.stringify(this.state));
        message.success('Saved state to cache');
    }
    clear = (e) => {
        if (e) e.stopPropagation();
        localStorage.removeItem('values');
        message.success(
            <span>Emptied cache
                <br />
                <Button
                    style={{ margin: 5 }}
                    size="small"
                    block
                    type="primary"
                    onClick={() => window.location.reload()}
                >
                    Reload to empty state
                </Button>
            </span>
        );
    }
    toggleVisible = () => this.setState({ visible: !this.state.visible });
    render() {
        const dataSource = [];
        Object.keys(BoardComponents).forEach((k) => {
            dataSource.push({
                name: BoardComponents[k].name,
                component: <img src={BoardComponents[k].component} alt={`howtouse-${k}`} />
            });
        });
        return (
            <Content style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                <Modal
                    title="How To Use"
                    visible={this.state.visible}
                    footer={null}
                    closable
                    maskClosable
                    onCancel={this.toggleVisible}
                >
                    Hover over the switches to enter the input name or output name for the component.
                    This value will be mapped to the "To" value, the "Location" value is handled for you.
                    <br /> <br />
                    You can click on filled inputs/outputs to then highlight their pin assignment and vice versa.
                    Click on download in the top right when done to save the file to your computer.
                    <br /> <br />
                    Layout based on DE-2 Board:
                    <Button block type="primary" href="http://hamblen.ece.gatech.edu/DE2/DE2.jpg">
                        View Board Image
                    </Button>
                    <br /> <br />
                    <Table
                        columns={[
                            {
                                title: 'Component',
                                dataIndex: 'component',
                                key: 'comp'
                            },
                            {
                                title: 'Name',
                                dataIndex: 'name',
                                key: 'name'
                            }
                        ]}
                        dataSource={dataSource}
                        pagination={false}
                    />
                </Modal>
                <Pins
                    save={this.save}
                    clear={this.clear}
                    history={this.props.history}
                    parentState={this.state}
                    setSelected={this.setSelected}
                    toggleVisible={this.toggleVisible}
                    selected={this.state.selected}
                />
                <Board
                    getContent={this.getContent}
                    parentState={this.state}
                    setSelected={this.setSelected}
                    selected={this.state.selected}
                />
            </Content>
        );
    }
}