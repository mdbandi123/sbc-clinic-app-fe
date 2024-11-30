import { ContentPasteSearch, PersonOff } from "@mui/icons-material";
import styles from "./NoDataScreen.module.css"
import { Typography } from "@mui/material";

function NoDataScreen() {
  return <div className={styles.mainCont}>
    <PersonOff sx={{width: '7em', height: '7em'}}/>
    <Typography sx={{fontSize: '1.1em'}}>No such record exists</Typography>
  </div>;
}

export default NoDataScreen;
