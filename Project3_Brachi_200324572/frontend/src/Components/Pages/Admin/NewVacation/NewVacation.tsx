import { Box, Button, Stack } from "@mui/joy";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Vacation from "../../../../model/vacations";
import vacationActions from "../../../../Util/vacationActions";
import "./NewVacation.css";

function NewVacation(): JSX.Element {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [userInput, setUserInput] = useState<Vacation>();

  const { register, handleSubmit } = useForm<Vacation>();

  const navigate = useNavigate();
  const params = useParams();
  const vacationId = +(params.id || "");

  const [pageNumber, setPageNumber] = useState(1);

  async function send(vacation: Vacation) {
    try {
      await vacationActions.addVacation(vacation);
      console.log("vacation:", vacation);

      navigate("/api/admin/vacations");
    } catch (error) {
      console.log(vacation);
      console.error(error);
    }
  }

  async function getOneVacation(vacationId: number) {
    let userInputValue = await vacationActions.getOneVacation(vacationId);
    setUserInput(userInputValue);
  }

  useEffect(() => {
    if (vacationId > 0) {
      getOneVacation(vacationId);
    }
    vacationActions
      .getAllVacationsPagination(pageNumber,2)
      .then((vacations) => setVacations(vacations))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="NewVacation">
      <Button
        variant="outlined"
        onClick={() => navigate("/api/admin/vacations")}
      >
        Home
      </Button>

      <form onSubmit={handleSubmit(send)}>
        <h1>Create New Vacation</h1>

        <label>Destination</label>
        <input
          required
          type="text"
          {...register("destination")}
          value={userInput?.destination}
        />

        <label>Description</label>
        <input
          required
          type="text"
          {...register("description")}
          value={userInput?.description}
        />

        <label>Image</label>
        <input
          required
          type="text"
          {...register("image")}
          value={userInput?.image}
        />

        <label>Start Date</label>
        <input
          required
          type="date"
          {...register("start_date")}
          value={userInput?.start_date.toLocaleString().split("T")[0]}
        />

        <label>End Date</label>
        <input
          required
          type="date"
          {...register("end_date")}
          value={userInput?.end_date.toLocaleString().split("T")[0]}
        />

        <label>Price</label>
        <input
          required
          type="number"
          {...register("price")}
          value={userInput?.price}
        />

        <button >Create</button>
      </form>
    </div>
  );
}

export default NewVacation;
