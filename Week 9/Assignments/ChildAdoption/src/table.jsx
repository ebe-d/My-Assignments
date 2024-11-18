
export function Table({ formData }) {
    return (
      <div>
        <h1>Submitted Forms</h1>
        {formData.length === 0 ? (
          <p>No forms submitted yet.</p>
        ) : (
            <div>
          <table border="1" style={{ width: "100%", borderCollapse: "collapse",fontSize:"22px" }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Child Name</th>
                <th>Race</th>
                <th>Gender</th>
                <th>Adopter Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.childname}</td>
                  <td>{data.race}</td>
                  <td>{data.gender}</td>
                  <td>{data.adoptername}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                </tr>
              ))}
            </tbody>
          </table> 
          </div>
        )}
      </div>
    );
  }
  