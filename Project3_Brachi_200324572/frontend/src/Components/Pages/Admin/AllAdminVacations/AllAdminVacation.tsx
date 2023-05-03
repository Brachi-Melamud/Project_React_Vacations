import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import vacationActions from "../../../../Util/vacationActions";
//import "./AllAdminVacations.css";
import Vacation from "../../../../model/vacations";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import User from "../../../../model/user";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function AllVacations(): JSX.Element {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const navigate = useNavigate();
  const [vacationsLength, setVacationsLength] = useState(0);

  const [pageNumber, setPageNumber] = useState(1);
  const location = useLocation();
  const [user, setUser] = useState<User>();


  async function getOneUser() {
    let user = location.state.user;
    console.log("user", user);
    setUser(user);
  }

  useEffect(() => {
    // vacationActions
    //   .getAllVacationsPagination(2,pageNumber)
    //   .then((vacations) => {
    //     setVacations(vacations);
    console.log("USE EFFECT!!!");

    //let user = location.state.user;
    // console.log("user", user);
    // setUser(user);

    // vacations Length
    vacationActions.getAllVacations().then((res) => {
      setVacationsLength(res.length);
    });
    //.getAllVacationsPagination(pageNumber, user!.id)
    vacationActions
      .getAllVacationsPagination(pageNumber, 2)
      .then((res) => {
        setVacations(res);
        res.map((vacation) => {
          vacationActions.getFollowers(vacation.id).then((followers) => {
            vacation.followers = followers.length;
          });
        });
        console.log(res);
        setVacations(res);
        getOneUser();
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="AllVacations">
      <Button variant="outlined" onClick={() => navigate("/api/addVacation")}>
        Add Vacation
      </Button>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {vacations.map((vacation) => (
            <Grid key={vacation.id} item xs={2}>
              <Item>
                <Card variant="outlined">
                  <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
                    {vacation.destination}{" "}
                  </Typography>
                  <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
                    {vacation.description}
                  </Typography>
                  <Typography level="body2">{vacation.start_date.toString()}</Typography>
                  <Typography level="body2">{vacation.end_date.toString()}</Typography>
                  <IconButton
                    onClick={() => {
                      console.log("delete");
                      vacationActions.deleteVacation(vacation.id);
                      setVacations(
                        vacations.filter((item) => vacation.id != item.id)
                      );
                    }}
                    aria-label="bookmark Bahamas Islands"
                    variant="plain"
                    color="neutral"
                    size="sm"
                    sx={{
                      position: "absolute",
                      top: "0.5rem",
                      right: "0.5rem",
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      navigate("/api/update/" + vacation.id);
                    }}
                    aria-label="bookmark Bahamas Islands"
                    variant="plain"
                    color="neutral"
                    size="sm"
                    sx={{ position: "absolute", top: "0.5rem", right: "3rem" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <AspectRatio
                    minHeight="120px"
                    maxHeight="200px"
                    sx={{ my: 2 }}
                  >
                    <img src={vacation.image} loading="lazy" alt="" />
                  </AspectRatio>
                  <Box>
                    <div>
                      <Typography level="body3">Total price:</Typography>
                      <Typography fontSize="lg" fontWeight="lg">
                        {vacation.price}
                      </Typography>
                    </div>
                  </Box>
                </Card>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default AllVacations;