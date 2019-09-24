import React, { Component } from 'react';
import { Layout, Icon, message, Input, Button } from 'antd';
import Constants from './constants.json';

const { dictionary } = Constants;
const { Content } = Layout;
const { TextArea } = Input;

export default class Downloader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            pinsText: null,
            fileName: null,
        };
    }
    componentDidMount() {
        this.generatePinsText();
    }
    generatePinsText = () => {
        const stateData = JSON.parse(localStorage.getItem('values'));
        if (!stateData) message.error('Unable to retrieve pin data');
        else {
            delete stateData.selected;
            delete stateData.visible;
            const values = ['To, Location'];
            Object.keys(stateData).forEach((pin) => {
                if (stateData[pin] !== '') {
                    values.push(`${stateData[pin]}, ${dictionary[pin]}`);
                }
            });
            const pinsText = values.join('\n');
            this.setState({
                loading: false,
                pinsText
            });
        }
    }
    download = (filename, text) => {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
    doDownload = () => {
        this.download(this.state.fileName || 'pins.txt', this.state.pinsText);
    }
    render() {
        const { loading, pinsText, fileName } = this.state;
        return (
            <Content style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                {
                    loading ?
                        <Icon type="loading" className="loadingIcon" /> :
                        <div style={{ flex: 1 }}>
                            <Input
                                style={{ outline: 'none' }}
                                placeholder="File Name [pins.txt]"
                                value={fileName}
                                onChange={e => this.setState({ fileName: e.target.value })}
                            />
                            <TextArea
                                style={{ resize: 'none', outline: 'none', height: '96%' }}
                                multiple
                                value={pinsText}
                                disabled
                            />
                            <Button
                                onClick={this.doDownload}
                                size="large"
                                shape="circle"
                                type="primary"
                                icon="download"
                                style={{ position: 'fixed', right: 20, bottom: 84 }}
                            />
                        </div>
                }
            </Content>
        );
    }
}