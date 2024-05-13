import {Box, SxProps, Tab, Tabs} from "@mui/material";
import {SyntheticEvent, useState} from "react";
import Views from "./Views.js";

const BoxStyle: SxProps = {
    flexGrow: "1",
    display: 'flex',
    flexDirection: "column",
    marginTop: '30px'
};

export default function TabsWrappedLabel() {
    const [value, setValue] = useState('one');

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={BoxStyle}>
            <Tabs
                sx={{
                    background: "var(--chat-colour)",
                    padding: "3px 0 0px 14px",
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px"
                }}

                value={value}
                onChange={handleChange}
                aria-label="wrapped label tabs example"
            >
                <Tab value="one" label="Likes"/>
                <Tab value="two" label="Viewers"/>
                <Tab value="three" label="Earnings"/>
            </Tabs>
            <Views/>
        </Box>
    );
}