import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";

type ToastProps = {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  isError?: boolean;
};

function Toast({ message, isOpen, onClose, isError = false }: ToastProps) {
  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={isOpen}
        onClose={onClose}
        message={message}
        ContentProps={{
          sx: {
            color: "white",
            bgcolor: isError ? "#9A0D03" : "#278700",
            fontWeight: "500",
            fontSize: "1em",
          },
        }}
      />
    </Box>
  );
}

export default Toast;
