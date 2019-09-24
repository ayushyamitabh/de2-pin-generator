import GreenLED from './components/greenled.png';
import RedLED from './components/redled.png';
import Switch from './components/switch.png';
import HexDisplay from './components/hex.png';
import Key from './components/key.png';
import Empty from './components/empty.png';

const BoardComponents = {
    GREEN_LED: {
        name: "Green LED",
        component: GreenLED,
    },
    RED_LED: {
        name: "Red LED",
        component: RedLED,
    },
    SWITCH: {
        name: "Switch",
        component: Switch
    },
    HEX_DISPLAY: {
        name: "Hex Display",
        component: HexDisplay,
    },
    KEY: {
        name: "Toggle Key",
        component: Key,
    },
    EMPTY: {
        name: "Empty",
        component: Empty,
    },
};

export { GreenLED, RedLED, Switch, HexDisplay, Key, Empty };
export default BoardComponents;
