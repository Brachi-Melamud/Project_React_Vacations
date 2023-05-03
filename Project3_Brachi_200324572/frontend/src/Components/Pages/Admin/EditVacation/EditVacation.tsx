import { Button, Stack } from "@mui/joy";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Vacation from "../../../../model/vacations";
import vacationActions from "../../../../Util/vacationActions";
import "./EditVacation.css";

function EditVacation(): JSX.Element {
  const [vacations, setVacations] = useState<Vacation[]>([]);

  const [userInput, setUserInput] = useState<Vacation>();

  const { register, handleSubmit, setValue } = useForm<Vacation>();

  const navigate = useNavigate();
  const params = useParams();
  const vacationId = +(params.id || "");

  const [pageNumber, setPageNumber] = useState(1);

  async function send(vacation: Vacation) {
    try {
      console.log("vacation being sent: ", vacation);
      await vacationActions
        .updateVacation(vacation, vacationId)
        .then((response) => console.log("updated vacation array", response))
        .then(() => {
          navigate("/api/admin/vacations");
        });
      console.log("after update: ", vacation);
      console.log("vacation before sending: ", userInput);
    } catch (error) {
      console.error(error);
    }
  }

  async function getOneVacation(vacationId: number) {
    let userInputValue = await vacationActions.getOneVacation(vacationId);
    setUserInput(userInputValue);
  }

  useEffect(() => {
    console.log("vacationId: " + vacationId);

    if (vacationId > 0) {
      getOneVacation(vacationId);
    }

    vacationActions
      .getAllVacationsPagination(pageNumber,2)
      .then((vacations) => setVacations(vacations))
      .catch((err) => console.error(err + "useEffect"));
  }, []);
  return (
    <div className="EditVacation">
      <Stack spacing={2} direction="row">
        <Button
          variant="outlined"
          onClick={() => navigate("/api/admin/vacations")}
        >
          Home
        </Button>
      </Stack>
      <form onSubmit={handleSubmit(send)} autoComplete="on">
        <h1>Create New Vacation</h1>
        <label>Destination</label>
        <input
          // required
          {...register("destination", {
            onChange: (e) => setValue("destination", e.target.value),
          })}
          placeholder={userInput?.destination}
          type="text"
        />

        <label>Description</label>
        <input
          // required
          {...register("description", {
            onChange: (e) => setValue("description", e.target.value),
          })}
          type="text"
          placeholder={userInput?.description}
        />

        <label>Image</label>
        <input
          // required
          type="text"
          {...register("image", {
            onChange: (e) => setValue("image", e.target.value),
          })}
          placeholder={userInput?.image}
        />

        <label>Start Date</label>
        <input
          // required
          type="date"
          {...register("start_date", {
            onChange: (e) => setValue("start_date", e.target.value),
          })}
          placeholder={userInput?.start_date.toLocaleString().split("T")[0]}
        />

        <label>End Date</label>
        <input
          // required
          {...register("end_date", {
            onChange: (e) => setValue("end_date", e.target.value),
          })}
          type="date"
          placeholder={userInput?.end_date.toLocaleString().split("T")[0]}
        />

        <label>Price</label>
        <input
          // required
          {...register("price", {
            onChange: (e) => setValue("price", e.target.value),
          })}
          type="number"
          placeholder={String(userInput?.price)}
        />

        <button>Update</button>
      </form>
    </div>
  );
}

export default EditVacation;
