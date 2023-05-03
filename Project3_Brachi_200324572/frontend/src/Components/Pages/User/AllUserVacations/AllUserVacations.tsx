import {
    Card,
    Typography,
    IconButton,
    AspectRatio,
    Box,
    Button,
  } from "@mui/joy";
  import { useState, useEffect } from "react";
  import { useLocation, useNavigate, useParams } from "react-router-dom";
  import User from "../../../../model/user";
  import Vacation from "../../../../model/vacations";
  import vacationActions from "../../../../Util/vacationActions";
  import "./AllUserVacations.css";
  
  import { styled } from "@mui/material/styles";
  import Grid from "@mui/material/Grid";
  import Paper from "@mui/material/Paper";
  
  import Pagination from "@mui/material/Pagination";
  import Stack from "@mui/material/Stack";
  
  import ThumbUpIcon from "@mui/icons-material/ThumbUp";
  import Swal from "sweetalert2";
  import userActions from "../../../../Util/userActions";
  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  
  function AllUserVacations(): JSX.Element {
    // vacations
    const [vacations, setVacations] = useState<Vacation[]>([]);
    const [vacationsLength, setVacationsLength] = useState(0);
  
    const params = useParams();
    const [userId, setUserId] = useState(0);
  
    // users
    const [user, setUser] = useState<User>();
    const location = useLocation();
  
    // followers
    const [isActive, setIsActive] = useState(true);
  
    // pagination
    const [pageNumber, setPageNumber] = useState(1);
  
    // navigate
    const navigate = useNavigate();
  
    async function getOneUser() {
      let user = location.state.user;
      console.log("user", user);
      setUser(user);
    }
    useEffect(() => {
      console.log("USE EFFECT!!!");
  
      //let user = location.state.user;
      // console.log("user", user);
      // setUser(user);
  
      userActions.getAllUsers().then((users) =>
        users.map((item) => {
          console.log("item", item);
  
          item.user_name === location.state.user?.user_name && setUserId(item.id);
        })
      );
  
      // vacations Length
      vacationActions.getAllVacations().then((res) => {
        setVacationsLength(res.length);
      });
      //.getAllVacationsPagination(pageNumber, user!.id)
      vacationActions
        .getAllVacationsPagination(pageNumber, 2)
        .then((res) => {
          let result = res.map((item)=>({...item, isActive: false}));
          // setVacations(result);
          res.map((vacation) => {
            vacationActions.getFollowers(vacation.id).then((followers) => {
              vacation.followers = followers.length;
            });
          });
          console.log("result:",result);
          setVacations(result);
          getOneUser();
        })
        .catch((err) => console.log(err));
    }, []);
    return (
      <div className="AllUserVacations">
        <h1>Hey {user?.first_name}!</h1>
        <Button
          onClick={() => {
            vacationActions
              .getAllVacationsPagination(pageNumber, user!.id)
              .then((vacations) => {
                setVacations(vacations);
                vacations.map((vacation) =>
                  vacationActions.getFollowers(vacation.id).then((res) => {
                    vacation.followers = res.length;
                  })
                );
                // .toLocaleString().split("T")[0]
                console.log("vacations onClick: ", vacations);
                vacationActions
                  .getAllVacationsPagination(pageNumber, user!.id)
                  .then((vacationsLength) => {
                    // setVacationsLength(vacationsLength.length);
                  });
                getOneUser();
              });
            // setVacations(vacations);
          }}
          variant="outlined"
        >
          Home
        </Button>
        <Button
          onClick={() => {
            vacationActions.getUserVacations(userId).then((userVacations) => {
              console.log(userVacations);
  
              setVacations(
                vacations.filter((item) =>
                  userVacations.map((e) => e.id).includes(item.id)
                )
              );
              if (userVacations.length === 0) {
                Swal.fire({
                  title: "You Don't Follow any Vacation Yet...😅",
                  showClass: {
                    popup: "animate__animated animate__fadeInDown",
                  },
                  hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                  },
                });
              }
              console.log("user?.id", user?.id);
            });
          }}
          variant="outlined"
        >
          My Vacations
        </Button>
        <Box sx={{ width: "100%" }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {vacations.map((vacation) => (
              <Grid item xs={2} key={vacation.id}>
                <Item>
                  <Card variant="outlined">
                    <IconButton>
                      <ThumbUpIcon
                        style={vacation.isActive ? {color: "blue"} : {color: "black"} }
                      // <span class="material-icons" style="color: rgb(0, 0, 255);">thumb_up_off_alt</span>
                        onClick={() => {
                          console.log("isActive", isActive);
  
                          setIsActive(!isActive);
  
                          if (isActive) {
                            vacationActions
                              .follow(userId, vacation.id)
                              .then((userVacations) => {
                                console.log("user id ", userId);
                                console.log("vacation id ", vacation?.id);
                                console.log(
                                  "userVacations after follow",
                                  userVacations
                                );
                                vacationActions
                                  .getFollowers(vacation.id)
                                  .then((followers) => {
                                    console.log("vacation followers updated");
  
                                    vacation.followers = followers.length;
                                    setVacations(vacations);
                                    console.log("vacation updated");
                                  });
                                window.location.reload();
                              })
  
                              .catch(() => {
                                setIsActive(!isActive)
                                vacationActions
                                  .unFollow(userId, vacation.id)
                                  .then((userVacations) => {
                                    console.log(
                                      "userVacations after unFollow",
                                      userVacations
                                    );
                                    vacationActions
                                      .getFollowers(vacation.id)
                                      .then((followers) => {
                                        vacation.followers = followers.length;
                                      })
                                      .then(() => {
                                        setVacations(vacations);
                                      });
                                  });
                                window.location.reload();
                              });
                          }
                          //  else {
  
                          // }
                        }}
                      ></ThumbUpIcon>
                    </IconButton>
                    <Typography>
                      <b>{vacation.followers} </b>
                      Followers
                    </Typography>
                    <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
                      {vacation.destination}{" "}
                    </Typography>
                    <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
                      {vacation.description}
                    </Typography>
                    <AspectRatio
                      minHeight="120px"
                      maxHeight="200px"
                      sx={{ my: 2 }}
                    >
                      <img src={vacation.image} loading="lazy" alt="" />
                    </AspectRatio>
                    <Typography level="body2">
                      {vacation.start_date.toString()}
                    </Typography>
                    <Typography level="body2">
                      {vacation.end_date.toString()}
                    </Typography>
                    <Box sx={{ display: "flex" }}>
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
        <Stack spacing={4}>
          <Pagination
            onClick={(e) => {
              let pageNumber = Number((e.target as HTMLInputElement).textContent);
              console.log("pageNumber", pageNumber);
  
              setPageNumber(pageNumber);
              vacationActions
                .getAllVacationsPagination(pageNumber, user!.id)
                .then((response) => {
                  response.sort((a, b) => {
                    return (
                      new Date(a.start_date).getTime() -
                      new Date(b.start_date).getTime()
                    );
                  });
                  setVacations(response);
                });
            }}
            count={Math.ceil(Number(vacationsLength) / 10)}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
    );
  }
  
  export default AllUserVacations;