import * as React from 'react';
import { useState, useContext, useReducer, useEffect } from 'react';
import ListQuestionContext from '../../../../contexts/ListQuestionContext';
import styles from '../Pollas.module.scss';
import Loader from '../Loader/Loader';

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
import { DefaultButton, MessageBarButton } from 'office-ui-fabric-react/lib/Button';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import TextField from '@material-ui/core/TextField/TextField';
import { PrimaryButton, Stack, IStackTokens, MessageBar, MessageBarType } from 'office-ui-fabric-react';
import { sp } from '@pnp/sp/presets/all';
//import { SPService } from '../../../../Services/SPService';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    headerCell: {
        fontWeight: 600
    }
});

export interface IItemDetailProps {

}
// Example formatting
const stackTokens: IStackTokens = { childrenGap: 15 };

const ItemDetail: React.FC<IItemDetailProps> = (props) => {


    const { spContext, state, dispatch } = useContext(ListQuestionContext);
    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    //const spService = SPService(spContext);

    const [selectedQuestion, setSelectedQuestion] = useState({
        ...state.selectedQuestion
    });

    const onChangeValue = (event?: any) => {
        if (event.target.value) {
            //let currentItem = selectedItem;
            //currentItem[event.target.name] = event.target.value;
            //setSelectedItem({ ...selectedItem, currentItem });
            const { name, value } = event.target;
            setSelectedQuestion(prevState => ({
                ...prevState,
                [name]: value
            }));

        }
    };

    const onClickSaveItem = async (event?: any) => {
        event.preventDefault();
        setLoading(true);
        var data = {
            Title: selectedQuestion.question,
            LastName: selectedQuestion.question,
            Email: selectedQuestion.question,
            Company: selectedQuestion.question,
            Country: selectedQuestion.question,
        };
        /*let response = await spService.updateListItem(selectedItem.ID, data);        
        const items: any[] = await spService.getAllListItems();        
        dispatch({
            type: "GET_ALLITEMS",
            payload: items
        });
        setIsSuccess(true);
        setLoading(false);*/
    };

    const showSuccessMessage = (message) => {
        return (
            <MessageBar
                messageBarType={MessageBarType.success}
                isMultiline={false}
            >
                {message}
            </MessageBar>
        );
    };


    return (
        <>
            <div className={styles.listItems}>
                <div className={styles.container}>
                    <div className={css(styles.row, styles.column12)}>

                        {isLoading ? <Loader message="please wait!" /> : ""}
                        {isSuccess ? showSuccessMessage("Record has been succesfully updated!") : ""}
                    </div>
                    <div className={css(styles.row)}>
                        <div className={css(styles.column12)}>
                            <Stack tokens={stackTokens}>
                                <TextField
                                    label="First Name"
                                    value={selectedQuestion.question}
                                    name="Title"
                                    onChange={onChangeValue}
                                />
                                <TextField
                                    label="Last Name"
                                    value={selectedQuestion.type}
                                    name="LastName"
                                    onChange={onChangeValue}
                                />
                                <TextField
                                    label="Email"
                                    value={selectedQuestion.type}
                                    name="Email"
                                    onChange={onChangeValue}
                                />
                                <TextField
                                    label="Company"
                                    value={selectedQuestion.type}
                                    name="Company"
                                    onChange={onChangeValue}
                                />
                                <TextField
                                    label="Country"
                                    value={selectedQuestion.type}
                                    name="Country"
                                    onChange={onChangeValue}
                                />
                            </Stack>
                        </div>
                    </div>
                    <div className={css(styles.row)}>
                        <div className={css(styles.column12)}>
                            <Stack horizontal tokens={stackTokens}>
                                <PrimaryButton text="Save" onClick={onClickSaveItem} allowDisabledFocus />
                                <DefaultButton text="Cancel" allowDisabledFocus />
                            </Stack>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};
export default ItemDetail;