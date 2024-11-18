import { useState } from "react";
import { Table } from "./table";

export function Form({ formData, setformData }) {
  // Local state for the current form entry
  const [formState, setFormState] = useState({
    childname: "",
    race: "",
    gender: "",
    adoptername: "",
    email: "",
    phone: "",
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Handle input changes for the local form state
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setformData((prev) => [...prev, formState]);
    setFormState({
      childname: "",
      race: "",
      gender: "",
      adoptername: "",
      email: "",
      phone: "",
    });
    alert("Form submitted successfully!");
    setIsFormSubmitted(true);
  };

  // Handle going back to the form
  const handleBackToForm = () => {
    setIsFormSubmitted(false);
  };

  return (
    <>
      {!isFormSubmitted ? (
        <form
          id="mainform"
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            justifyContent: "center",
            gap: "10px",
            fontSize: "25px",
          }}
        >
          <label>
            Childname:
            <input
              type="text"
              name="childname"
              value={formState.childname}
              style={{ marginLeft: "10px", height: "25px", width: "300px" }}
              onChange={handleInput}
            />
          </label>
          <label>
            Race:
            <input
              type="text"
              name="race"
              value={formState.race}
              style={{ marginLeft: "25px", height: "25px", width: "300px" }}
              onChange={handleInput}
            />
          </label>
          <label>
            Gender:
            <input
              type="text"
              name="gender"
              value={formState.gender}
              style={{ marginLeft: "25px", height: "25px", width: "300px" }}
              onChange={handleInput}
            />
          </label>
          <label>
            Adopter Name:
            <input
              type="text"
              name="adoptername"
              value={formState.adoptername}
              style={{ marginLeft: "25px", height: "25px", width: "300px" }}
              onChange={handleInput}
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={formState.email}
              style={{ marginLeft: "25px", height: "25px", width: "300px" }}
              onChange={handleInput}
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={formState.phone}
              style={{ marginLeft: "25px", height: "25px", width: "300px" }}
              onChange={handleInput}
            />
          </label>
          <button
            style={{
              width: "100px",
              height: "30px",
              marginLeft: "200px",
              marginTop: "25px",
              fontSize:'20px'
            }}
          >
            Submit
          </button>
        </form>
      ) : (
        <div>
          <Table formData={formData} />
          <button style={{marginLeft:'270px',marginTop:'25px',fontSize:'25px'}}onClick={handleBackToForm}>Back to Form</button>

        </div>
      )}
    </>
  );
}
