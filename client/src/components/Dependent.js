import React, { useEffect, useState } from "react";

export default function Dependent() {
  let [dependent, setDependent] = useState([]);
  let [depMedsup, setDepMedSup] = useState([]);
  let [active, setActive] = useState("");
  let [input, setInput] = useState({});

  useEffect(() => {
    getDependent();
  }, []);

  const getDependent = () => {
    fetch("/dependent")
      .then((response) => response.json())
      .then((dependent) => {
        console.log(dependent);
        setDependent(dependent);
      })
      .catch((error) => {
        console.log("Error in getDependent");
      });
  };

  const getDepMedSup = (id) => {
    fetch(`/details/${id}`)
      .then((response) => response.json())
      .then((medsup) => {
        console.log(medsup);
        setDepMedSup(medsup);
      })
      .catch((error) => {
        console.log("Error in medsup");
      });
  };

  const handleChange = (e) => {
    //console.log(e.target.value);
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDependent();
    return false;
  };

  //ADD NEW DEPENDENT
  const addDependent = () => {
    fetch("/dependent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDependent(data);
        console.log("New Dependent Added", data);
        //props.updateDependent()
        //alert(`New Dependent ${dependent.dep_name} Added`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //DELETE DEPENDENT BY ID
  const deleteDependent = (depID) => {
    //console.log("in Fetch", id); //to check if it's passing through
    fetch(`/dependent/${depID}`, {
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
        setDependent(res);
        //props.updateEvent();
        console.log("Dependent Deleted");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div className="rounded-3 border border-info bg-white p-4">
      {/* <div className="mb-3 rounded-3 border border-info bg-white p-4 mt-2"> */}
      {/* START OF DEPENDENT NAME LIST */}
      <h4>Dependents List</h4>
      <small className="text-muted">Click to view details</small>

      <div className="list-group">
        {dependent.map((item) => {
          return (
            /* className="list-group-item list-group-item-action" */
            <div
              className="list-group-item-action rounded-2 row p-1 m-0"
              key={item.depID}
            >
              <p className="col m-0 align-middle">
                <img
                  className="pe-1 align-middle"
                  src="https://i.postimg.cc/NjM6jxd8/sayang-profile1.png"
                  height="25"
                  alt="phonebook icon"
                />
                {/* (ID:{item.depID}) */}
                <span className="fs-5">{item.dep_name}</span>
              </p>
              <span className="col-5 m-0 p-0 clearfix">
                <button
                  className="btn btn-sm btn-outline-secondary float-end"
                  /* className="link link-info" */
                  type="button"
                  value="submit"
                  onClick={() => {
                    getDepMedSup(item.depID);
                    setActive(item.dep_name);
                  }}
                  /* data-bs-toggle="collapse"
                  data-bs-target="#medsView"
                  aria-expanded="false"
                  aria-controls="medsView" */
                  data-bs-toggle="modal"
                  data-bs-target="#viewMedsModal"
                >
                  View Medication
                </button>
              </span>
            </div>
          );
        })}
      </div>
      {/* END OF DEPENDENT NAME LIST */}
      {/* ADD NEW DEPENDENT BUTTON */}
      <button
        className="btn btn-outline-info btn-sm rounded-pill shadow  mt-3 ps-3 pe-3"
        type="button"
        /* data-bs-toggle="collapse"
        data-bs-target="#addNewDependent"
        aria-expanded="false"
        aria-controls="addNewDependent" */
        data-bs-toggle="modal"
        data-bs-target="#addDepModal"
      >
        {" "}
        + New Dependent
      </button>
      {/* END OF BUTTON */}

      <p />
      {/* START OF NEW ADD NEW DEPENDENT FORM; old pone pasted at the end */}
      <div
        className="modal fade"
        id="addDepModal"
        tabindex="-1"
        aria-labelledby="addDepLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addDepModalLabel">
                Add New Dependant
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <small className="text-muted">Enter dependent details here</small>
              <div className="form-group">
                <form
                  className="form-floating"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <div className="form-floating m-3">
                    <input
                      id="floatingInputValueName"
                      type="text"
                      className="form-control"
                      placeholder="Enter Dependent Name"
                      name="dep_name"
                      onChange={(e) => handleChange(e)}
                    />
                    <label for="floatingInputValueName">Name</label>
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
      {/* END OF NEW ADD NEW DEPENDENT FORM  */}

      {/* START OF ADD NEW DEPENDENT FORM  */}
      <div className="collapse" id="addNewDependent">
        <div className="card card-body">
          <h5>Add New Dependant</h5>
          <small className="text-muted">Enter dependent details here</small>

          <p />
          <div className="form-group">
            <form className="form-floating">
              <div className="form-floating m-3">
                <input
                  id="floatingInputValueName"
                  type="text"
                  className="form-control"
                  placeholder="Enter Dependent Name"
                  name="dep_name"
                  onChange={(e) => handleChange(e)}
                />
                <label for="floatingInputValueName">Name</label>
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
      </div>
      {/* END OF ADD NEW DEPENDENT FORM  */}

      {/* START OF NEW MEDICATION VIEW; old one pasted below */}
      <div
        className="modal fade"
        id="viewMedsModal"
        tabindex="-1"
        aria-labelledby="viewMedsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="viewMedsModalLabel">
                Medication / Supplements for {active}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="list group">
                {depMedsup.map((i) => {
                  return (
                    <p key={i.medID}>
                      {/* <p>Dependent Name: {medsup.dep_name}</p> */}
                      <span className="fw-bold">{i.medName} </span>
                      {i.medType} for {i.medCondition}
                      <br />
                      {i.dosage}, {i.frequency}
                    </p>
                  );
                })}
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
      {/* END OF NEW MEDICATION VIEW */}
    </div>
  );
}

// {/* START OF OLD MEDICATION VIEW */}
// <div className="collapse" id="medsView">
// {/*   <div className="card rounded-3 border border-info bg-light p-4"> */}
// <h5>Medication / Supplements for {active} </h5>
// <div className="card-body">
//   <div className="list group">
//     {depMedsup.map((i) => {
//       return (
//         <p key={i.medID}>
//           {/* <p>Dependent Name: {medsup.dep_name}</p> */}
//           <span className="fw-bold">{i.medName} </span>
//           {i.medType} for {i.medCondition}
//           <br />
//           {i.dosage}, {i.frequency}
//         </p>
//       );
//     })}
//   </div>
// </div>
// </div>
// {/* END OF OLD MEDICATION VIEW */}

// {/* START OF OLD ADD NEW DEPENDENT FORM  */}
// <div className="collapse" id="addNewDependent">
//   <div className="card card-body">
//     <h5>Add New Dependant</h5>
//     <small className="text-muted">Enter dependent details here</small>

//     <p />
//     <div className="form-group">
//       <form className="form-floating">
//         <div className="form-floating m-3">
//           <input
//             id="floatingInputValueName"
//             type="text"
//             className="form-control"
//             placeholder="Enter Dependent Name"
//             name="dep_name"
//             onChange={(e) => handleChange(e)}
//           />
//           <label for="floatingInputValueName">Name</label>
//         </div>

//         <button
//           onClick={(e) => handleSubmit(e)}
//           className="btn btn-outline-info rounded-pill btn-block shadow rounded"
//           type="submit"
//           value="submit"
//         >
//           Click to Add
//         </button>
//       </form>
//     </div>
//   </div>
// </div>
// {/* END OF OLD ADD NEW DEPENDENT FORM  */}
