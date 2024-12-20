import { ContentPasteSearch } from "@mui/icons-material";
import styles from "./InitialDataScreen.module.css"
import { Typography } from "@mui/material";

function InitialDataScreen() {
  return <div className={styles.mainCont}>
    <ContentPasteSearch sx={{width: '7em', height: '7em'}}/>
    <Typography sx={{fontSize: '1.1em'}}>No data loaded</Typography>
  </div>;
}

export default InitialDataScreen;
