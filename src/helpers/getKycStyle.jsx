const getKycStyle = (status) => {
  switch (status?.toLowerCase()) {
    case "verified":
      return {
        backgroundColor: "#e6f4ea",
        color: "#2e7d32",
        border: "1px solid #b7e0c4",
      };
    case "pending":
      return {
        backgroundColor: "#fff8e1",
        color: "#f9a825",
        border: "1px solid #ffe082",
      };
    case "rejected":
      return {
        backgroundColor: "#fdecea",
        color: "#c62828",
        border: "1px solid #f5c6cb",
      };
    case "in-review":
      return {
        backgroundColor: "#e3f2fd",
        color: "#1565c0",
        border: "1px solid #90caf9",
      };
    default:
      return {
        backgroundColor: "#eee",
        color: "#555",
        border: "1px solid #ccc",
      };
  }
};


export default getKycStyle ;