import React from 'react';

const Dashboard = () => {
    return (
         <div className="main">
        <h1>Create AI Animated Video</h1>
        <div className="row">
          {/* Generator */}
          <div style={{flex: 2}}>
            <div className="card">
              <label>Video Prompt</label>
              <textarea rows={3} defaultValue={"A robot discovering Earth and learning emotions\n"} />
              <h4>Animation Style</h4>
              <div className="style-grid">
                <div className="style-btn">Pixar</div>
                <div className="style-btn">Anime</div>
                <div className="style-btn">Cinematic</div>
                <div className="style-btn">Cartoon</div>
              </div>
              <br />
              <label>Duration</label>
              <select>
                <option>30 Seconds</option>
                <option>60 Seconds</option>
                <option>120 Seconds</option>
              </select>
              <br /><br />
              <label>Voice</label>
              <select>
                <option>Male</option>
                <option>Female</option>
              </select>
              <button className="generate-btn">
                Generate Video
              </button>
            </div>
          </div>
          {/* Preview */}
          <div style={{flex: 1}}>
            <div className="preview">
              <h3>Preview</h3>
              <img src="https://picsum.photos/400/250" />
              <p>
                Style: Pixar<br />
                Duration: 60 seconds<br />
                Voice: Male
              </p>
            </div>
          </div>
        </div>
        <h2>Recent Videos</h2>
        <div className="video-grid">
          <div className="video-card">
            <img src="https://picsum.photos/200/120" />
            <p>Journey to the Stars</p>
          </div>
          <div className="video-card">
            <img src="https://picsum.photos/200/121" />
            <p>Brave Little Hero</p>
          </div>
          <div className="video-card">
            <img src="https://picsum.photos/200/122" />
            <p>The Friendly Dragon</p>
          </div>
        </div>
      </div>
    );
};

export default Dashboard;