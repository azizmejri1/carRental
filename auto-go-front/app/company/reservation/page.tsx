"use client";
import ReservationDetails from "@/app/company/components/reservationDetails";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReservationPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));

  useEffect(() => {
    const url =
      "http://localhost:8080/reservation/getReservationByCompany/" + id;
    axios.get(url, { withCredentials: true }).then((response) => {
      console.log(response.data);
      setReservations(response.data);
    });
  }, []);
  return (
    <table>
      <thead>
        <tr>
          <th>Reservation ID</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Car ID</th>
          <th>User ID</th>
          <th>total amount</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation) => (
          <ReservationDetails key={reservation.id} reservation={reservation} />
        ))}
      </tbody>
    </table>
  );
}
