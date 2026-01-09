export default function InputForm({ age, setAge, gender, setGender, onSubmit, loading }) {
  return (
    <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Enter Student Details</h2>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            placeholder="e.g. 17"
            min="10"
            max="100"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="1">Male</option>
            <option value="0">Female</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn-primary"
          style={{ width: '100%' }}
          disabled={loading}
        >
          {loading ? "Predicting..." : "Predict Performance"}
        </button>
      </form>
    </div>
  );
}
