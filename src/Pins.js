import React, { Component } from 'react';
import Constants from './constants.json';
import { Button, Typography, Collapse, Icon, Tooltip } from 'antd';

const { dictionary } = Constants;
const { Text } = Typography;
const { Panel } = Collapse;

export default class Pins extends Component {
    downloader = (e) => {
        e.stopPropagation();
        this.props.save();
        this.props.history.push('/download');
    }
    getExtra = () => {
        return (
            <div>
                <Tooltip title="Delete" placement="left">
                    <Icon style={{ margin: 'auto 10px' }} onClick={this.props.clear} type="delete" />
                </Tooltip>
                <Tooltip title="Save" placement="left">
                    <Icon style={{ margin: 'auto 10px' }} onClick={this.props.save} type="save" />
                </Tooltip>
                <Tooltip title="Save & Download" placement="left">
                    <Icon style={{ margin: 'auto 10px' }} onClick={this.downloader} type="download" />
                </Tooltip>
            </div>
        );
    }
    render() {
        const { parentState, setSelected, selected } = this.props;
        const values = [];
        Object.keys(parentState).forEach(function (kn) {
            if (kn !== 'selected' && kn !== 'visible') {
                if (parentState[kn] !== "") {
                    const isHex = kn.slice(0, 3) === "HEX";
                    if (!isHex) {
                        values.push({
                            bc: kn,
                            to: parentState[kn],
                            location: dictionary[kn]
                        });
                    } else {
                        const bc = kn.slice(0, kn.length - 3);
                        const isfull = (parentState[`${bc}[0]`] && parentState[`${bc}[1]`]
                            && parentState[`${bc}[2]`] && parentState[`${bc}[3]`]
                            && parentState[`${bc}[4]`] && parentState[`${bc}[5]`]
                            && parentState[`${bc}[6]`]);
                        const to = [], location = [];
                        for (let i of [0, 1, 2, 3, 4, 5, 6]) {
                            to.push(`${bc}[${i}]`);
                            location.push(dictionary[`${bc}[${i}]`]);
                        }
                        if (isfull) {
                            if (values.find((e) => e.bc === bc) === undefined) {
                                values.push({
                                    bc,
                                    to: to.join(','),
                                    location: location.join(',')
                                });
                            }
                        }
                    }
                }
            }
        });
        return (
            <Collapse bordered={false} defaultActiveKey={['1']} style={{ background: '#f7f7f7' }}>
                <Panel header={`Pin Assignments ${values.length > 0 ? '[click on pin to highlight switch]' : ''}`} key="1" style={{ background: '#f7f7f7', padding: 0 }} extra={values.length > 0 ? this.getExtra() : null}>
                    <div className="pinCardContainer">
                        {
                            values.length > 0 ?
                                values.map((v, i) => (
                                    <div
                                        className={`pinCard ${selected === v.bc ? "selected" : ""}`}
                                        onClick={() => setSelected(selected === v.bc ? null : v.bc)}
                                        key={`pin${i}`}
                                    >
                                        <div style={{ display: 'flex', fontFamily: 'consolas' }}>
                                            <Text style={{ margin: 2 }} code type="secondary">Switch:</Text>
                                            <Text type="warning">{v.bc}</Text>
                                        </div>

                                        <div style={{ display: 'flex', fontFamily: 'consolas' }}>
                                            <Text style={{ margin: 2 }} code type="secondary">To:</Text>
                                            <Text type="warning">{v.to}</Text>
                                        </div>

                                        <div style={{ display: 'flex', fontFamily: 'consolas' }}>
                                            <Text style={{ margin: 2 }} code type="secondary">Location:</Text>
                                            <Text type="warning">{v.location}</Text>
                                        </div>

                                    </div>
                                )) :
                                <div style={{ flex: 1, marginBottom: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Text type="secondary" style={{ margin: '5px 0' }}>No pin assignments yet</Text>
                                    <Button onClick={this.props.toggleVisible} type="primary" size="small">HOW TO USE GUIDE</Button>
                                </div>
                        }
                    </div>
                </Panel>
            </Collapse>
        );
    }
}