import React, { useEffect, useState } from "react";

export default function Contact(props) {
  let [contact, setContact] = useState([]);
  let [input, setInput] = useState({});

  useEffect(() => {
    getContact();
  }, []);

  const getContact = () => {
    fetch("/contact")
      .then((response) => response.json())
      .then((contact) => {
        console.log(contact);
        setContact(contact);
      })
      .catch((error) => {
        console.log("Error in getContact");
      });
  };

  const handleChange = (e) => {
    //console.log(e.target.value);
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addContact();
    return false;
  };

  /* const handleRemove = (e, contactID) => {
    console.log(contactID);
    deleteContact(contactID);
  }; */

  //ADD NEW CONTACT
  const addContact = () => {
    fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((res) => {
        return res.json();
        //console.log(res.json());
      })
      .then((data) => {
        setContact(data);
        console.log("New Contact Added", data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  //DELETE CONTACT by ID
  const deleteContact = (contactID) => {
    //console.log("in Fetch", id); //to check if it's passing through
    fetch(`/contact/${contactID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setContact(res);
        console.log("Contact Deleted");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div className="rounded-3 border border-info bg-white  p-4">
      {/* <div className="mb-3 rounded-3 border border-info bg-white p-4 mt-2"> */}
      {/* START OF LIST  */}
      <h4>Central Contact List</h4>
      <small className="text-muted">
        Shared contact list of the 'village' that helps looks after our
        dependents
      </small>

      <div className="list group">
        {contact.map((item) => {
          return (
            <div
              className="list-group-item-action row p-1 m-0 "
              key={item.contactID}
            >
              <p className="col m-0 p-0 align-middle">
                <img
                  className="pe-1 align-middle"
                  src="https://i.postimg.cc/0rRgmFtB/Ssyang-Contact.png"
                  height="25"
                  alt="contact icon"
                ></img>
                <span className="fs-5">{item.contactName}</span> (
                {item.relationship})
              </p>
              <p className="p-0 m-0" style={{ textAlign: "right" }}>
                Contact: {item.telNo}
              </p>
            </div>
          );
        })}
      </div>
      {/* END OF CONTACT NAME LIST */}

      <p />
      {/* ADD NEW CONTACT BUTTON */}
      <button
        className="btn btn-outline-info btn-sm rounded-pill shadow  mt-3 ps-3 pe-3"
        type="button" /* 
        data-bs-toggle="collapse"
        data-bs-target="#addNewContact"
        aria-expanded="false"
        aria-controls="addNewContact" */
        data-bs-toggle="modal"
        data-bs-target="#addContactModal"
      >
        + New Contact
      </button>
      {/* END OF ADD NEW CONTACT BUTTON */}

      <p />
      {/* START OF NEW ADD CONTACT FORM, OLD ONE PASTED AT THE END OF CODE  */}
      <div
        className="modal fade"
        id="addContactModal"
        tabindex="-1"
        aria-labelledby="addContactModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addContactModalLabel">
                Add New Contact
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <small className="text-muted">Enter Frequent Contacts here</small>
              <div className="form-group">
                <form className="form-floating">
                  <div className="form-floating m-3">
                    <input
                      id="floatingInputValue"
                      type="text"
                      className="form-control"
                      placeholder="Enter Contact Name"
                      name="contactName"
                      onChange={(e) => handleChange(e)}
                    />
                    <label for="floatingInputValue">Contact Name</label>
                  </div>

                  <div className="form-floating m-3">
                    <input
                      id="floatingInputValue"
                      type="text"
                      className="form-control"
                      placeholder="Enter Tel No"
                      name="telNo"
                      onChange={(e) => handleChange(e)}
                    />
                    <label for="floatingInputValue">Tel No</label>
                  </div>

                  <div className="form-floating m-3">
                    <input
                      id="floatingInputValue"
                      type="text"
                      className="form-control"
                      placeholder="Relationship to Dependent"
                      name="relationship"
                      onChange={(e) => handleChange(e)}
                    />
                    <label for="floatingInputValue">Relationship</label>
                  </div>

                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="btn btn-outline-info btn-sm rounded-pill shadow  mt-3 ps-3 pe-3"
                    type="submit"
                    value="submit"
                  >
                    Click to Add
                  </button>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm rounded-pill shadow  mt-3 ps-3 pe-3"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* END OF NEW ADD FORM  */}
    </div>
  );
}
// {/* START OF OLD ADD FORM  */}
// <div className="collapse" id="addNewContact">
// <div className="card card-body">
//   <h5>Add New Contact</h5>
//   <small className="text-muted">Enter Frequent Contacts here</small>

//   <p />
//   <div className="form-group">
//     <form className="form-floating">
//       <div className="form-floating m-3">
//         <input
//           id="floatingInputValue"
//           type="text"
//           className="form-control"
//           placeholder="Enter Contact Name"
//           name="contactName"
//           onChange={(e) => handleChange(e)}
//         />
//         <label for="floatingInputValue">Contact Name</label>
//       </div>

//       <div className="form-floating m-3">
//         <input
//           id="floatingInputValue"
//           type="text"
//           className="form-control"
//           placeholder="Enter Tel No"
//           name="telNo"
//           onChange={(e) => handleChange(e)}
//         />
//         <label for="floatingInputValue">Tel No</label>
//       </div>

//       <div className="form-floating m-3">
//         <input
//           id="floatingInputValue"
//           type="text"
//           className="form-control"
//           placeholder="Relationship to Dependent"
//           name="relationship"
//           onChange={(e) => handleChange(e)}
//         />
//         <label for="floatingInputValue">Relationship</label>
//       </div>

//       <button
//         onClick={(e) => handleSubmit(e)}
//         className="btn btn-outline-info btn-sm rounded-pill shadow  mt-3 ps-3 pe-3"
//         type="submit"
//         value="submit"
//       >
//         Click to Add
//       </button>
//     </form>
//   </div>
// </div>
// </div>
// {/* START OF OLD ADD FORM  */}
