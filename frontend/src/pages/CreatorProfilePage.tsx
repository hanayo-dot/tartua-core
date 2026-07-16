export default function CreatorProfilePage() {
  return (
    <div>
      <header style={{ marginBottom: 24 }}>
        <h1 className="page-title">Creator profile</h1>
        <p style={{ margin: 0, color: '#64748b' }}>
          Update your creator details and connected platforms.
        </p>
      </header>

      <div className="card form-card">
        <div className="form-field">
          <label htmlFor="name">Creator name</label>
          <input id="name" type="text" defaultValue="Ava Creator" />
        </div>
        <div className="form-field">
          <label htmlFor="niche">Niche</label>
          <input id="niche" type="text" defaultValue="Education & growth" />
        </div>
        <div className="form-field">
          <label htmlFor="bio">Bio</label>
          <textarea id="bio" rows={5} defaultValue="Helping creators grow with tools, workflows, and meaningful insights." />
        </div>
        <button className="button primary">Save profile</button>
      </div>
    </div>
  );
}
