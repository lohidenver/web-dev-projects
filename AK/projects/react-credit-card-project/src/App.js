import { useState } from "react";
import CreditCard from "./components/CreditCard";

const App = () => {
  const currentMonth = new Date().getMonth() + 1;
  const formatting = String(currentMonth).length <= 1 ? "0" : null;
  const formattedMonth = formatting + currentMonth;
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    dateExpiry: currentYear + "-" + formattedMonth,
    cardVerification: "",
  });
  const [side, setSide] = useState("front");
  const [message, setMessage] = useState(
    "Please enter your credit card details"
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("Your credit card has been successfully stolen!");
  };

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    let value = e.target.value;

    if (name === "cardNumber" || name === "cardVerification") {
      value = value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
    }

    if (name === "name") {
      setSide("front");
    } else {
      setSide("back");
    }

    setFormData({ ...formData, [name]: value });

    console.log(formData);
  };

  return (
    <div>
      <form action="" className="form-container" onSubmit={handleSubmit}>
        <CreditCard formData={formData} side={side} />{" "}
        <div className="input-container">
          <label htmlFor="">
            Name on Card{" "}
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Name"
              maxLength={20}
              required
              onChange={handleChange}
            />{" "}
          </label>{" "}
        </div>{" "}
        <div className="input-container">
          <label htmlFor="">
            Card Number{" "}
            <input
              onKeyUp={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
              type="text"
              placeholder="0000 0000 0000 0000"
              minLength={16}
              maxLength={16}
              required
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
            />{" "}
          </label>{" "}
        </div>{" "}
        <div className="input-container-details">
          <label htmlFor="">
            Expiry Date{" "}
            <input
              type="month"
              required
              name="dateExpiry"
              value={formData.dateExpiry}
              onChange={handleChange}
            />{" "}
          </label>{" "}
          <label htmlFor="">
            CVV{" "}
            <input
              onKeyUp={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
              type="text"
              placeholder="123"
              minLength={3}
              maxLength={3}
              onChange={handleChange}
              required
              id="CVV"
              name="cardVerification"
              value={formData.cardVerification}
            />{" "}
          </label>{" "}
        </div>{" "}
        <input type="submit" value="Submit" />
        <p className="info-message"> {message} </p>{" "}
      </form>{" "}
    </div>
  );
};

export default App;
