import { useState } from "react";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Srishti", score: 75 },
    { id: 2, name: "Maddie", score: 35 }
  ]);

  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const addStudent = (e) => {
    e.preventDefault();
    if (!name || !score) return;

    setStudents([
      ...students,
      { id: Date.now(), name, score: Number(score) }
    ]);

    setName("");
    setScore("");
  };

  const deleteStudent = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    setStudents(students.filter((s) => s.id !== id));
  };

  const updateScore = (id, value) => {
    setStudents(
      students.map((s) =>
        s.id === id ? { ...s, score: Number(value) } : s
      )
    );
  };

  // FILTER + SORT
  const filteredStudents = students
    .filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.score - b.score : b.score - a.score
    );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎓 Student Scoreboard</h1>

      {/* SEARCH + SORT */}
      <div style={styles.topBar}>
        <input
          style={styles.input}
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          style={styles.sortBtn}
          onClick={() =>
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
          }
        >
          Sort: {sortOrder === "asc" ? "Low → High" : "High → Low"}
        </button>
      </div>

      {/* FORM */}
      <form onSubmit={addStudent} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          type="number"
          placeholder="Enter Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />

        <button style={styles.addBtn}>Add Student</button>
      </form>

      {/* TABLE */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.map((s, index) => {
            const isPass = s.score >= 40;

            return (
              <tr key={s.id} style={styles.row}>
                {/* RANK */}
                <td style={styles.cell}>#{index + 1}</td>

                <td style={styles.cell}>{s.name}</td>

                <td>
                  <input
                    style={styles.scoreInput}
                    type="number"
                    value={s.score}
                    onChange={(e) =>
                      updateScore(s.id, e.target.value)
                    }
                  />
                </td>

                <td
                  style={{
                    color: isPass ? "#00ff99" : "#ff4d6d",
                    fontWeight: "bold"
                  }}
                >
                  {isPass ? "PASS" : "FAIL"}
                </td>

                <td>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => deleteStudent(s.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;

/* 🌌 STYLES */
const styles = {
  container: {
    textAlign: "center",
    padding: "40px",
    fontFamily: "Arial",
    background: "#0f0f1a",
    minHeight: "100vh",
    color: "#fff"
  },

  title: {
    fontSize: "42px",
    marginBottom: "25px",
    color: "#00f5ff",
    textShadow: "0 0 10px #00f5ff, 0 0 25px #7c3aed"
  },

  topBar: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "15px"
  },

  form: {
    marginBottom: "25px"
  },

  input: {
    padding: "12px",
    margin: "8px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    backgroundColor: "#1f1f2e",
    color: "#fff",
    fontSize: "15px"
  },

  addBtn: {
    padding: "12px 18px",
    background: "linear-gradient(45deg, #7c3aed, #00f5ff)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  },

  sortBtn: {
    padding: "12px 15px",
    background: "#222",
    color: "#00f5ff",
    border: "1px solid #00f5ff",
    borderRadius: "10px",
    cursor: "pointer"
  },

  table: {
    margin: "0 auto",
    borderCollapse: "collapse",
    width: "85%",
    backgroundColor: "#1a1a2e",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 0 20px rgba(0,245,255,0.2)"
  },

  row: {
    borderBottom: "1px solid #333",
    transition: "0.3s"
  },

  cell: {
    fontSize: "16px",
    padding: "10px"
  },

  scoreInput: {
    width: "70px",
    padding: "6px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#111",
    color: "#fff",
    textAlign: "center"
  },

  deleteBtn: {
    backgroundColor: "#ff2e63",
    color: "white",
    border: "none",
    padding: "7px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 0 10px #ff2e63"
  }
};