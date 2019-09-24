import React, { Component } from 'react';
import BoardComponents from './BoardComponents';
import { Popover } from 'antd';

const BOARD_LAYOUT = [
    [ // HEX DISPLAY REGION
        {
            name: "HEX7",
            type: BoardComponents.HEX_DISPLAY
        }, {
            name: "HEX6",
            type: BoardComponents.HEX_DISPLAY
        }, {
            name: "HEX5",
            type: BoardComponents.HEX_DISPLAY
        }, {
            name: "HEX4",
            type: BoardComponents.HEX_DISPLAY
        }, {
            name: "LEDG[8]",
            type: BoardComponents.GREEN_LED
        }, {
            name: "HEX3",
            type: BoardComponents.HEX_DISPLAY
        }, {
            name: "HEX2",
            type: BoardComponents.HEX_DISPLAY
        }, {
            name: "HEX1",
            type: BoardComponents.HEX_DISPLAY
        }, {
            name: "HEX0",
            type: BoardComponents.HEX_DISPLAY
        },
    ],
    [ // LED REGION
        {
            name: "LEDR[17]",
            type: BoardComponents.RED_LED
        }, {
            name: "LEDR[16]",
            type: BoardComponents.RED_LED
        }, {
            name: "LEDR[15]",
            type: BoardComponents.RED_LED
        }, {
            name: "LEDR[14]",
            type: BoardComponents.RED_LED
        }, {
            name: "LEDR[13]",
            type: BoardComponents.RED_LED
        }, {
            name: "LEDR[12]",
            type: BoardComponents.RED_LED
        }, {
            name: "LEDR[11]",
            type: BoardComponents.RED_LED
        }, {
            name: "LEDR[10]",
            type: BoardComponents.RED_LED
        }, {
            name: "LEDR[9]",
            type: BoardComponents.RED_LED
        }, {
            name: "LEDR[8]",
            type: BoardComponents.RED_LED
        }, {
            name: "LEDR[7]",
            type: BoardComponents.RED_LED
        }, {
            name: "LEDR[6]",
            type: BoardComponents.RED_LED
        }, {
            name: "LEDR[5]",
            type: BoardComponents.RED_LED
        }, {
            name: "LEDR[4]",
            type: BoardComponents.RED_LED
        }, {
            name: "LEDR[3]",
            type: BoardComponents.RED_LED
        }, {
            name: "LEDR[2]",
            type: BoardComponents.RED_LED
        }, {
            name: "LEDR[1]",
            type: BoardComponents.RED_LED
        }, {
            name: "LEDR[0]",
            type: BoardComponents.RED_LED
        }, {
            name: "LEDG[7]",
            type: BoardComponents.GREEN_LED
        }, {
            name: "LEDG[6]",
            type: BoardComponents.GREEN_LED
        }, {
            name: "LEDG[5]",
            type: BoardComponents.GREEN_LED
        }, {
            name: "LEDG[4]",
            type: BoardComponents.GREEN_LED
        }, {
            name: "LEDG[3]",
            type: BoardComponents.GREEN_LED
        }, {
            name: "LEDG[2]",
            type: BoardComponents.GREEN_LED
        }, {
            name: "LEDG[1]",
            type: BoardComponents.GREEN_LED
        }, {
            name: "LEDG[0]",
            type: BoardComponents.GREEN_LED
        },
    ],
    [ // SWITCH REGION
        {
            name: "SW[17]",
            type: BoardComponents.SWITCH,
        }, {
            name: "SW[16]",
            type: BoardComponents.SWITCH,
        }, {
            name: "SW[15]",
            type: BoardComponents.SWITCH,
        }, {
            name: "SW[14]",
            type: BoardComponents.SWITCH,
        }, {
            name: "SW[13]",
            type: BoardComponents.SWITCH,
        }, {
            name: "SW[12]",
            type: BoardComponents.SWITCH,
        }, {
            name: "SW[11]",
            type: BoardComponents.SWITCH,
        }, {
            name: "SW[10]",
            type: BoardComponents.SWITCH,
        }, {
            name: "SW[9]",
            type: BoardComponents.SWITCH,
        }, {
            name: "SW[8]",
            type: BoardComponents.SWITCH,
        }, {
            name: "SW[7]",
            type: BoardComponents.SWITCH,
        }, {
            name: "SW[6]",
            type: BoardComponents.SWITCH,
        }, {
            name: "SW[5]",
            type: BoardComponents.SWITCH,
        }, {
            name: "SW[4]",
            type: BoardComponents.SWITCH,
        }, {
            name: "SW[3]",
            type: BoardComponents.SWITCH,
        }, {
            name: "SW[2]",
            type: BoardComponents.SWITCH,
        }, {
            name: "SW[1]",
            type: BoardComponents.SWITCH,
        }, {
            name: "SW[0]",
            type: BoardComponents.SWITCH,
        }, {
            name: "KEY[3]",
            type: BoardComponents.KEY,
        }, {
            name: "KEY[2]",
            type: BoardComponents.KEY,
        }, {
            name: "KEY[1]",
            type: BoardComponents.KEY,
        }, {
            name: "KEY[0]",
            type: BoardComponents.KEY,
        }
    ]
];

export default class Board extends Component {
    render() {
        const { getContent, parentState, selected, setSelected } = this.props;
        return (
            <div className="boardContainer">
                {
                    BOARD_LAYOUT.map((region, index) =>
                        <section className="boardRegion" key={`board-region-${index}`}>
                            {
                                region.map((boardComponent, componentIndex) => {
                                    const bc = boardComponent.name;
                                    const isfull = (parentState[`${bc}[0]`] && parentState[`${bc}[1]`]
                                        && parentState[`${bc}[2]`] && parentState[`${bc}[3]`]
                                        && parentState[`${bc}[4]`] && parentState[`${bc}[5]`]
                                        && parentState[`${bc}[6]`]) || parentState[bc];
                                    return (
                                        <Popover
                                            arrowPointAtCenter
                                            content={getContent(boardComponent)}
                                            title={`[${boardComponent.type.name}] ${boardComponent.name}`}
                                            className={`boardComponentContainer ${isfull ? 'active' : 'inactive'} ${(selected === boardComponent.name) ? 'selected' : ''}`}
                                            key={`region-${index}-component-${componentIndex}`}
                                        >
                                            <img
                                                alt={`comp-${boardComponent.name}-${componentIndex}`}
                                                src={boardComponent.type.component}
                                                onClick={() => isfull ? setSelected(selected === bc ? null : bc) : null}
                                            />
                                        </Popover>
                                    );
                                })
                            }
                        </section>
                    )
                }
            </div>
        );
    }
}