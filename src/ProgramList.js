import React, { useState } from "react";
import "./ProgramsList.css"; // Import your CSS file
import "bootstrap/dist/css/bootstrap.min.css";
import { CMultiSelect } from "@coreui/react";

const options = [
  {
    value: 0,
    label: "Angular",
    selected: true,
  },
  {
    value: 1,
    label: "Bootstrap",
    selected: true,
    disabled: true,
  },
  {
    value: 2,
    label: "React.js",
  },
  {
    value: 3,
    label: "Vue.js",
  },
  {
    label: "backend",
    options: [
      {
        value: 4,
        label: "Django",
      },
      {
        value: 5,
        label: "Laravel",
        selected: true,
      },
      {
        value: 6,
        label: "Node.js",
      },
    ],
  },
];

const ProgramsList = () => {
  const [programs, setPrograms] = useState([
    {
      id: 1,
      programName: "Program A",
      description: "Description of Program A.",
      deliveryMethod: "in person",
      status: "Active",
      endDate: "",
      team: "Language Services",
      eligibilityCriteria: "Targeted at women",
      geographicAvailability: "HRM",
      literacyRequirement: "CLB4",
      ageTargeting: "",
      genderTargeting: "",
      staffMember: "John Doe",
      eligibility: { immigrantType1: true, immigrantType2: false },
    },
    {
      id: 2,
      programName: "Program B",
      description: "Description of Program B.",
      deliveryMethod: "online only",
      status: "Active",
      endDate: "2025-12-31",
      team: "Business and Workforce Integration",
      eligibilityCriteria: "Open to all",
      geographicAvailability: "Nova Scotia",
      literacyRequirement: "CLB3",
      ageTargeting: "18-30",
      genderTargeting: "Women",
      staffMember: "Jane Smith",
      eligibility: { immigrantType1: true, immigrantType2: true },
    },
    {
      id: 3,
      programName: "Program C",
      description: "Description of Program C.",
      deliveryMethod: "in person and online",
      status: "Inactive",
      endDate: "2024-05-15",
      team: "Language Services",
      eligibilityCriteria: "Targeted at seniors",
      geographicAvailability: "HRM",
      literacyRequirement: "CLB5",
      ageTargeting: "65+",
      genderTargeting: "All",
      staffMember: "Alice Johnson",
      eligibility: { immigrantType1: false, immigrantType2: true },
    },
    // Add more default programs as needed
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [newProgram, setNewProgram] = useState({
    programName: "",
    description: "",
    deliveryMethod: "",
    status: "",
    endDate: "",
    team: "",
    eligibilityCriteria: "",
    geographicAvailability: "",
    literacyRequirement: "",
    ageTargeting: "",
    genderTargeting: "",
    staffMember: "",
    eligibility: {
      immigrantType1: false,
      immigrantType2: false,
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Set how many items to display per page

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProgram({ ...newProgram, [name]: value });
  };

  const handleCheckboxChange = (type) => (e) => {
    setNewProgram((prevProgram) => ({
      ...prevProgram,
      eligibility: {
        ...prevProgram.eligibility,
        [type]: e.target.checked,
      },
    }));
  };

  const addProgram = (e) => {
    e.preventDefault();
    if (newProgram.programName) {
      setPrograms([...programs, { id: programs.length + 1, ...newProgram }]);
      setNewProgram({
        programName: "",
        description: "",
        deliveryMethod: "",
        status: "",
        endDate: "",
        team: "",
        eligibilityCriteria: "",
        geographicAvailability: "",
        literacyRequirement: "",
        ageTargeting: "",
        genderTargeting: "",
        staffMember: "",
        eligibility: {
          immigrantType1: false,
          immigrantType2: false,
        },
      }); // Reset input fields
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // If exiting edit mode, reset new program fields
      setNewProgram({
        programName: "",
        description: "",
        deliveryMethod: "",
        status: "",
        endDate: "",
        team: "",
        eligibilityCriteria: "",
        geographicAvailability: "",
        literacyRequirement: "",
        ageTargeting: "",
        genderTargeting: "",
        staffMember: "",
        eligibility: {
          immigrantType1: false,
          immigrantType2: false,
        },
      });
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(programs.length / itemsPerPage);

  // Get current programs for the current page
  const indexOfLastProgram = currentPage * itemsPerPage;
  const indexOfFirstProgram = indexOfLastProgram - itemsPerPage;
  const currentPrograms = programs.slice(
    indexOfFirstProgram,
    indexOfLastProgram
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="programs-list-container">
      <h2 className="programs-list-title">Programs List</h2>
      {isEditing ? (
        <form className="programs-list-form" onSubmit={addProgram}>
          <input
            className="programs-list-input"
            type="text"
            name="programName"
            placeholder="Program Name"
            value={newProgram.programName}
            onChange={handleChange}
            required
          />
          <textarea
            className="programs-list-textarea"
            name="description"
            placeholder="Description"
            value={newProgram.description}
            onChange={handleChange}
            required
          />
          <input
            className="programs-list-input"
            type="text"
            name="deliveryMethod"
            placeholder="Delivery Method"
            value={newProgram.deliveryMethod}
            onChange={handleChange}
            required
          />
          <select
            className="programs-list-select"
            name="status"
            value={newProgram.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <input
            className="programs-list-input"
            type="date"
            name="endDate"
            value={newProgram.endDate}
            onChange={handleChange}
          />
          <input
            className="programs-list-input"
            type="text"
            name="team"
            placeholder="Team"
            value={newProgram.team}
            onChange={handleChange}
            required
          />
          <textarea
            className="programs-list-textarea"
            name="eligibilityCriteria"
            placeholder="Eligibility Criteria"
            value={newProgram.eligibilityCriteria}
            onChange={handleChange}
          />
          <input
            className="programs-list-input"
            type="text"
            name="geographicAvailability"
            placeholder="Geographic Availability"
            value={newProgram.geographicAvailability}
            onChange={handleChange}
          />
          <input
            className="programs-list-input"
            type="text"
            name="literacyRequirement"
            placeholder="Literacy Requirement"
            value={newProgram.literacyRequirement}
            onChange={handleChange}
          />
          <input
            className="programs-list-input"
            type="text"
            name="ageTargeting"
            placeholder="Age Targeting"
            value={newProgram.ageTargeting}
            onChange={handleChange}
          />
          <input
            className="programs-list-input"
            type="text"
            name="genderTargeting"
            placeholder="Gender Targeting"
            value={newProgram.genderTargeting}
            onChange={handleChange}
          />
          <input
            className="programs-list-input"
            type="text"
            name="staffMember"
            placeholder="Staff Member"
            value={newProgram.staffMember}
            onChange={handleChange}
          />
          {/* Checkboxes for eligibility criteria */}
          <h4>Eligibility:</h4>
          <CMultiSelect options={options} selectionType="tags" />
          {/* <label>
            Immigrant Type 1:
            <input
              type="checkbox"
              checked={newProgram.eligibility.immigrantType1 || false} // Use || false to prevent errors
              onChange={handleCheckboxChange("immigrantType1")}
            />
          </label>
          <label>
            Immigrant Type 2:
            <input
              type="checkbox"
              checked={newProgram.eligibility.immigrantType2 || false} // Use || false to prevent errors
              onChange={handleCheckboxChange("immigrantType2")}
            />
          </label> */}
          <button type="submit" className="programs-list-button">
            Add Program
          </button>
        </form>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="programs-list-table">
            <thead>
              <tr>
                <th>Program Name</th>
                <th>Description</th>
                <th>Delivery Method</th>
                <th>Status</th>
                <th>End Date</th>
                <th>Team</th>
                <th>Eligibility Criteria</th>
                <th>Geographic Availability</th>
                <th>Literacy Requirement</th>
                <th>Age Targeting</th>
                <th>Gender Targeting</th>
                <th>Staff Member</th>
              </tr>
            </thead>
            <tbody>
              {currentPrograms.map((program) => (
                <tr key={program.id}>
                  <td>{program.programName}</td>
                  <td>{program.description}</td>
                  <td>{program.deliveryMethod}</td>
                  <td>{program.status}</td>
                  <td>{program.endDate}</td>
                  <td>{program.team}</td>
                  <td>{program.eligibilityCriteria}</td>
                  <td>{program.geographicAvailability}</td>
                  <td>{program.literacyRequirement}</td>
                  <td>{program.ageTargeting}</td>
                  <td>{program.genderTargeting}</td>
                  <td>{program.staffMember}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
      <button onClick={handleEditToggle} className="programs-list-button">
        {isEditing ? "Cancel" : "Edit Programs"}
      </button>
    </div>
  );
};

export default ProgramsList;
