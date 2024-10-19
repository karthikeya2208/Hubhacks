import React, { useState } from "react";

const ClientDefinitions = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      category: "Canadian Citizen",
      irccDefinition:
        "A person described as a citizen  under the Citizenship Act. This means a person who: Is Canadian by birth (either born in Canada or born outside Canada to a Canadian citizen who was themselves either born in Canada or granted citizenship) or • has applied for a grant of citizenship and has received Canadian citizenship (naturalization).",
      nsoiDefinition:
        "A person who is Canadian by birth or who has applied for citizenship through Citizenship and Immigration Canada and has received a citizenship certificate.",
      isVisible: true,
    },
    {
      id: 2,
      category: "Convention Refugee",
      irccDefinition:
        "A person who Is outside of their home country or country where they normally live and fears returning to that country because of a well founded fear of persecution for reasons of race, religion, nationality, membership in a particular social group or political opinion",
      nsoiDefinition:
        "A Convention refugee IS a person who, by reason of a well-founded fear of persecution for reasons of race, religion, nationality. membership in a particular social group or political opinion,• is outside each of their countries of nationality and is unable or, by reason of that fear, unwilling to avail themself of the protection of each of those countries; or .not having a country of nationality. is outside the country of their former habitual residence and is unable or, by reason of that fear, unwilling to return to that country.",

      isVisible: true,
    },
    {
      id: 3,
      category: "Client C",
      irccDefinition: "IRCC description for Client C.",
      nsoiDefinition: "NSOI description for Client C.",
      isVisible: true,
    },
    {
      id: 4,
      category: "Client D",
      irccDefinition: "IRCC description for Client D.",
      nsoiDefinition: "NSOI description for Client D.",
      isVisible: true,
    },
    {
      id: 5,
      category: "Client E",
      irccDefinition: "IRCC description for Client E.",
      nsoiDefinition: "NSOI description for Client E.",
      isVisible: true,
    },
    {
      id: 6,
      category: "Client F",
      irccDefinition: "IRCC description for Client F.",
      nsoiDefinition: "NSOI description for Client F.",
      isVisible: true,
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [newClient, setNewClient] = useState({
    category: "",
    irccDefinition: "",
    nsoiDefinition: "",
  });
  const [action, setAction] = useState("");
  const [selectedClients, setSelectedClients] = useState([]);
  const [isHideConfirmation, setIsHideConfirmation] = useState(false);
  const [isUnhideConfirmation, setIsUnhideConfirmation] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setAction(""); // Reset action when toggling edit mode
    setNewClient({ category: "", irccDefinition: "", nsoiDefinition: "" }); // Reset input fields
    setSelectedClients([]);
  };

  const addClient = (e) => {
    e.preventDefault();
    if (
      newClient.category &&
      newClient.irccDefinition &&
      newClient.nsoiDefinition
    ) {
      setClients([
        ...clients,
        {
          id: clients.length + 1,
          ...newClient,
          isVisible: true,
        },
      ]);
      setNewClient({ category: "", irccDefinition: "", nsoiDefinition: "" }); // Reset input fields
      setAction(""); // Reset action after adding
    }
  };

  const toggleSelection = (id) => {
    setSelectedClients((prev) =>
      prev.includes(id)
        ? prev.filter((clientId) => clientId !== id)
        : [...prev, id]
    );
  };

  const confirmHide = () => {
    setClients(
      clients.map((client) =>
        selectedClients.includes(client.id)
          ? { ...client, isVisible: false }
          : client
      )
    );
    setIsHideConfirmation(false);
    setSelectedClients([]);
  };

  const confirmUnhide = () => {
    setClients(
      clients.map((client) =>
        selectedClients.includes(client.id)
          ? { ...client, isVisible: true }
          : client
      )
    );
    setIsUnhideConfirmation(false);
    setSelectedClients([]);
  };

  const handleHide = () => {
    if (selectedClients.length > 0) {
      setIsHideConfirmation(true);
    }
  };

  const handleUnhide = () => {
    if (selectedClients.length > 0) {
      setIsUnhideConfirmation(true);
    }
  };

  const handleDelete = () => {
    setClients(
      clients.filter((client) => !selectedClients.includes(client.id))
    );
    setSelectedClients([]);
  };

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 3; // Number of clients to display per page
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;

  // Filter clients based on search query
  const filteredClients = clients.filter(
    (client) =>
      client.isVisible &&
      (client.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.irccDefinition
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        client.nsoiDefinition.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const currentClients = filteredClients.slice(
    indexOfFirstClient,
    indexOfLastClient
  );
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(filteredClients.length / clientsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        Client Categories and their Funding Definitions 2023-2024
      </h2>

      {/* Search Bar */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: "5px", width: "300px" }}
        />
      </div>

      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr>
            {isEditing && <th style={{ textAlign: "center" }}>Select</th>}
            <th style={{ textAlign: "center" }}>Category</th>
            <th style={{ textAlign: "center" }}>IRCC Definitions</th>
            <th style={{ textAlign: "center" }}>NSOI Definitions</th>
          </tr>
        </thead>
        <tbody>
          {currentClients.map((client) => (
            <tr key={client.id}>
              {isEditing && (
                <td>
                  <input
                    type="checkbox"
                    checked={selectedClients.includes(client.id)}
                    onChange={() => toggleSelection(client.id)}
                  />
                </td>
              )}
              <td>{client.category}</td>
              <td>{client.irccDefinition}</td>
              <td>{client.nsoiDefinition}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <div>
          <h3 style={{ marginTop: "20px" }}>Edit Options</h3>
          <button onClick={() => setAction("add")}>Add</button>
          <button onClick={handleHide}>Hide</button>
          <button onClick={handleUnhide}>Unhide</button>
          <button onClick={handleDelete}>Delete</button>

          {action === "add" && (
            <div>
              <h4>Add New Client Definition</h4>
              <form onSubmit={addClient}>
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={newClient.category}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="irccDefinition"
                  placeholder="IRCC Definition"
                  value={newClient.irccDefinition}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="nsoiDefinition"
                  placeholder="NSOI Definition"
                  value={newClient.nsoiDefinition}
                  onChange={handleChange}
                  required
                />
                <button type="submit">Add Client</button>
              </form>
            </div>
          )}
        </div>
      )}

      <div style={{ margin: "20px 0", textAlign: "center" }}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            style={{ margin: "0 5px" }}
          >
            {number}
          </button>
        ))}
      </div>

      {isHideConfirmation && (
        <div>
          <h4>Confirm Hide</h4>
          <p>Are you sure you want to hide the selected clients?</p>
          <button onClick={confirmHide}>OK</button>
          <button onClick={() => setIsHideConfirmation(false)}>Cancel</button>
        </div>
      )}

      {isUnhideConfirmation && (
        <div>
          <h4>Confirm Unhide</h4>
          <p>Are you sure you want to unhide the selected clients?</p>
          <button onClick={confirmUnhide}>OK</button>
          <button onClick={() => setIsUnhideConfirmation(false)}>Cancel</button>
        </div>
      )}

      <button onClick={handleEditToggle} style={{ marginTop: "20px" }}>
        {isEditing ? "Done" : "Edit"}
      </button>
    </div>
  );
};

export default ClientDefinitions;
