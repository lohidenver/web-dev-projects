import chip from "../images/chip.png";
import nfc from "../images/contactless.png";
import visa from "../images/visa.png";
import amex from "../images/amex.png";
import discover from "../images/discover.png";
import mastercard from "../images/mastercard.png";

const CreditCard = ({ formData, side }) => {
  // ---------------------------------------------//
  // Variables
  // ---------------------------------------------//
  const startCardNumber = [
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
  ];

  const startCVV = ["X", "X", "X"];
  // ---------------------------------------------//
  // functions
  // ---------------------------------------------//

  const getCreditCardType = () => {
    if (formData.cardNumber.slice(0, 1) === "3") {
      return amex;
    }
    if (formData.cardNumber.slice(0, 1) === "4") {
      return visa;
    }
    if (formData.cardNumber.slice(0, 1) === "5") {
      return mastercard;
    }
    if (formData.cardNumber.slice(0, 1) === "6") {
      return discover;
    }

    return visa;
  };

  const logo = getCreditCardType();

  // ---------------------------------------------//
  // Display
  // ---------------------------------------------//
  return (
    <div className="credit-card">
      {side === "front" && (
        <div className={`${getCreditCardType()}-front-side card`}>
          <div className="card-details-container">
            <div className="cardholder">
              <h2>{formData.name}</h2>
            </div>
          </div>
          <div className="chip">
            <img src={chip} alt="Chip" />
          </div>
          <div className="nfc">
            <img src={nfc} alt="nfc" />
          </div>
          <div className="logo">
            <img src={logo} alt="cardtype" />
          </div>
        </div>
      )}

      {side === "back" && (
        <div className={`${getCreditCardType()}-back-side card`}>
          <div className="magstripe"></div>
          <div className="signature">{formData.name}</div>
          <div className="cvv-display">
            {/* <p>{formData.cardVerification}</p> */}
            {startCVV.map((item, index) => (
              <p key={index}>{formData.cardVerification[index] || item}</p>
            ))}
          </div>
          <div className="number-display">
            {/* <h3>{formData.cardNumber}</h3> */}
            {startCardNumber.map((item, index) => (
              <h3 key={index}>{formData.cardNumber[index] || item}</h3>
            ))}
          </div>
          <div className="date">
            <p>Good Thru:</p>
            <h2>{formData.dateExpiry}</h2>
          </div>
        </div>
      )}
    </div>
  );
  // ---------------------------------------------//
  // Event Listeners
  // ---------------------------------------------//
};

export default CreditCard;
