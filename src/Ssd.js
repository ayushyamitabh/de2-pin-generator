import React from 'react';
import { Alert, Button } from 'antd';
import { Link } from 'react-router-dom';

const Ssd = (props) => {
    window.location = props.url;
    return (
        <div>
            <Alert message="Your download should start soon..." type="success" />
            <Link to="/">
                <Button block type="link"> Back to editor </Button>
            </Link>
        </div>
    );
}

export default Ssd;