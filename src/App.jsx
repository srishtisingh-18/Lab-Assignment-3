import { useState } from "react";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Srishti", score: 75 },
    { id: 2, name: "Maddie", score: 35 }
  ]);

  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  const addStudent = (e) => {
    e.preventDefault();

    if (!name || !score) return;

    setStudents([
      ...students,
      { id: Date.now(), name: name, score: Number(score) }
    ]);

    setName("");
    setScore("");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🎓 Student Scoreboard</h1>

      {/* Add Student Form */}
      <form onSubmit={addStudent}>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />

        <button type="submit">Add Student</button>
      </form>

      {/* Table */}
      <table
        border="1"
        style={{ margin: "20px auto", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>

              <td>
                <input
                  type="number"
                  value={s.score}
                  onChange={(e) => {
                    const updated = students.map((stu) =>
                      stu.id === s.id
                        ? { ...stu, score: Number(e.target.value) }
                        : stu
                    );
                    setStudents(updated);
                  }}
                />
              </td>

              <td style={{ color: s.score >= 40 ? "green" : "red" }}>
                {s.score >= 40 ? "Pass" : "Fail"}
              </td>

              <td>
                <button
                  onClick={() => {
                    const filtered = students.filter(
                      (stu) => stu.id !== s.id
                    );
                    setStudents(filtered);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;