export default function ReservationDetails({
  reservation,
}: {
  reservation: Reservation;
}) {
  return (
    <tr className="m-0">
      <td>{reservation.id}</td>
      <td>{reservation.startDate}</td>
      <td>{reservation.endDate}</td>
      <td>{reservation.carId}</td>
      <td>{reservation.userId}</td>
      <td>{reservation.totalPrice}</td>
    </tr>
  );
}
