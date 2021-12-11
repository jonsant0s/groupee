import React from "react";
import Button from "react-bootstrap/esm/Button";
import "./HomeScreen.css";

export const HomeScreen = () => {
    return (
        <div className="outerDiv">
            <div className="d-grid gap-3">
                <Button href="/requestform" variant="primary" size="lg">
                    Create Group Request
                </Button>
                <Button variant="secondary" size="lg">
                    Update Group Request
                </Button>
                <Button variant="secondary" size="lg">
                    View Group
                </Button>
            </div>
        </div>
    );
};
