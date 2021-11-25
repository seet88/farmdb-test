import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const DialogQuestion = ({
  isAlertOpen,
  disagreeHandler,
  agreeHandler,
  title,
  contentText,
}) => {
  return (
    <Dialog
      open={isAlertOpen}
      onClose={disagreeHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" data-testid="dialogQuestionTitle">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={disagreeHandler} data-testid="dialogQuestionDisagree">
          Disagree
        </Button>
        <Button
          onClick={agreeHandler}
          autoFocus
          data-testid="dialogQuestionAgree"
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogQuestion;
