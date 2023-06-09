import {
  Box,
  Typography,
  makeStyles,
  Button,
  Divider,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import HomeDialog from "../Dialogs/HomeDialog";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const useStyle = makeStyles((theme) => ({
  component: {
    marginTop: 12,
    background: "#FFFFFF",
  },
  image: {
    width: "auto",
    height: 150,
  },
  text: {
    fontSize: 14,
    marginTop: 5,
  },
  deal: {
    display: "flex",
    padding: "15px 20px",
  },
  dealText: {
    fontSize: 22,
    fontWeight: 600,
    lineHeight: "32px",
    marginRight: 25,
  },
  button: {
    marginLeft: "auto",
    backgroundColor: "#2874f0",
    borderRadius: 2,
    fontSize: 13,
  },
  wrapper: {
    padding: "25px 15px",
  },
}));

const MultiSlide = ({ data }) => {
  const classes = useStyle();

  const [appliedID, setAppliedID] = useState(-1);

  const [open, setOpen] = useState(false);

  const openHomeDialog = (id) => {
    setOpen(true);
    setAppliedID(id);
  };

  return (
    <Box className={classes.component}>
      {data.map((temp) => (
        <Box textAlign="center" className={classes.wrapper}>
          {/* <img src={temp.image} className={classes.image} alt="" /> */}
          <Typography
            className={classes.text}
            style={{ fontWeight: 600, color: "#212121" }}
          >
            Job id:
            {temp.jobID}
          </Typography>
          <Typography
            className={classes.text}
            style={{ fontWeight: 600, color: "#212121" }}
          >
            Job name:
            {temp.jobName}
          </Typography>
          <Typography className={classes.text} style={{ color: "green" }}>
            Industry:
            {temp.industry}
          </Typography>
          <Typography
            className={classes.text}
            style={{ color: "#212121", opacity: ".6" }}
          >
            Post date:
            {temp.postDate}
          </Typography>
          <Typography
            className={classes.text}
            style={{ color: "#212121", opacity: ".6" }}
          >
            End date:
            {temp.endDate}
          </Typography>

          <Button variant="contained" onClick={() => openHomeDialog(temp.jobID)}>
            Apply
          </Button>
          <HomeDialog jobID={appliedID} open={open} setOpen={setOpen} />
        </Box>
      ))}
    </Box>
  );
};

const HomeSlide = (props) => {
  return <>{props.multi === true ? <MultiSlide {...props} /> : ""}</>;
};

export default HomeSlide;
