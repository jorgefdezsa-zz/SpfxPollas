import * as React from 'react';
import { useState, useContext, useReducer, useEffect } from 'react';
import ListQuestionContext from '../../../../contexts/ListQuestionContext';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';

//Office UI Fabric
import { useConstCallback } from '@uifabric/react-hooks';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Question } from '../../../../models/Question';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    headerCell: {
        fontWeight: 600
    }
});

export interface IListPollasProps {
}

const ListPollas: React.FC<IListPollasProps> = (props) => {

    const [isOpen, setIsOpen] = React.useState(false);
    const openPanel = useConstCallback(() => setIsOpen(true));
    const dismissPanel = useConstCallback(() => setIsOpen(false));

    const { state, dispatch } = useContext(ListQuestionContext);

    const onClickEditItem = (selectedItem: Question) => {
        if (selectedItem != null) {
            alert(JSON.stringify(selectedItem));
            dispatch({
                type: "SET_SELECTEDITEM",
                payload: selectedItem
            });
            setIsOpen(true);
        }
    };

    const classes = useStyles();
    return (
        <>
        <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead style={{ backgroundColor: '#eaeaea' }}>
                        <TableRow>
                            <TableCell className={classes.headerCell} align="center"></TableCell>                            
                            <TableCell className={classes.headerCell} align="left">First Name</TableCell>
                            <TableCell className={classes.headerCell} align="left">Last Name</TableCell>
                            <TableCell className={classes.headerCell} align="left">Email</TableCell>
                            <TableCell className={classes.headerCell} align="left">Company</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.questions.length > 0 && state.questions.map((row) => (
                            <TableRow key={row.question}>
                                <TableCell style={{ cursor: 'pointer' }} onClick={() => onClickEditItem(row)} align="center">{<EditIcon />}</TableCell>
                                <TableCell component="th" scope="row">
                                    {row.question}
                                </TableCell>
                                <TableCell align="left">{row.category}</TableCell>
                                <TableCell align="left">{row.difficulty}</TableCell>
                                <TableCell align="left">{row.type}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ListPollas;