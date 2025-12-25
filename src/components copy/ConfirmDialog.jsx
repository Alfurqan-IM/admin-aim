import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  confirmColor = "error",
  loading = false,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      aria-labelledby="confirm-dialog-title"
      PaperProps={{
        sx: {
          margin: 0, // Remove default margins
          position: "absolute", // Make it absolute
          top: 20, // Distance from top of window
          left: "50%", // Center horizontally
          transform: "translateX(-50%)",
        }, // Center horizontally
      }}
    >
      <DialogTitle id="confirm-dialog-title" color="warning">
        {title}
      </DialogTitle>

      <DialogContent>
        <Typography variant="h6" color="error">
          {message}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          {cancelText}
        </Button>

        <Button onClick={onConfirm} color={confirmColor} variant="contained" disabled={loading}>
          {loading ? "Please wait…" : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmColor: PropTypes.oneOf(["primary", "info", "success", "warning", "error"]),
  loading: PropTypes.bool,
};
