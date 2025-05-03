interface Car {
  id: number;
  model: string;
  brand: string;
  pricePerDay: number;
  imageUrl: string;
  company: RentalCompany;
  reservation?: Reservation;
}
