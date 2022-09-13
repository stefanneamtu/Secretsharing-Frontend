import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  textInputLarge: {
    width: "100%",
    marginTop: "6px",
    "&&": {
      marginBottom: "10px",
    },
  },
  textInputSmall: {
    width: "100%",
    "&&": {
      marginBottom: "10px",
    },
  },
  timeInput: {
    width: "100%",
    "&&": {},
  },
  fileUpload: {
    width: "100%",
  },
  timeLockDialog: {},
}));

export default useStyles;
