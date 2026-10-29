
import React, { useState } from "react";
import "./App.css";

function App() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("17:00");
  const [guests, setGuests] = useState("2");
  const [occasion, setOccasion] = useState("Birthday");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!date || Number(guests) < 1 || Number(guests) > 10) {
      setMessage("Please enter valid booking details.");
      return;
    }

    const selectedDate = new Date(date + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setMessage("Please select today or a future date.");
      return;
    }

    setMessage(
      `Booking details entered: ${date}, ${time}, ${guests} guests, ${occasion}.`
    );
  }

  return (
    <main className="booking-page">
      <header className="site-header">
        <h1>🍋 Little Lemon</h1>
        <p>Fresh Mediterranean food, made with love.</p>
      </header>

      <section className="booking-card">
        <h2>Reserve a Table</h2>
        <p>Book your next dining experience.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="date">Choose date</label>
          <input
            id="date"
            type="date"
            min={new Date().toLocaleDateString("en-CA")}
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />

          <label htmlFor="time">Choose time</label>
          <select
            id="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
          >
            <option value="17:00">5:00 PM</option>
            <option value="18:00">6:00 PM</option>
            <option value="19:00">7:00 PM</option>
            <option value="20:00">8:00 PM</option>
          </select>

          <label htmlFor="guests">Number of guests (1–10)</label>
          <input
            id="guests"
            type="number"
            min="1"
            max="10"
            value={guests}
            onChange={(event) => setGuests(event.target.value)}
            required
          />

          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            value={occasion}
            onChange={(event) => setOccasion(event.target.value)}
          >
            <option>Birthday</option>
            <option>Anniversary</option>
            <option>Other</option>
          </select>

          <button type="submit">Make Your Reservation</button>
          <p role="status" aria-live="polite">{message}</p>
        </form>
      </section>
    </main>
  );
}

export default App;
