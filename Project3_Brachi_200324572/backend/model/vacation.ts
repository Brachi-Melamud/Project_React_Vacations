class Vacation {
    id: number = 0;
    description: string;
    destination: string;
    image: string;
    start_date: Date ;
    end_date: Date ;
    price: number;
    // followers:number
    constructor(vacation: Vacation) {
      this.description = vacation.description;
      this.destination = vacation.destination;
      this.image = vacation.image;
      this.start_date = vacation.start_date;
      this.end_date = vacation.end_date;
      this.price = vacation.price;
      // this.followers = vacation.followers
    }
  }
  
  export default Vacation;