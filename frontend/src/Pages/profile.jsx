import React, { useEffect, useState } from "react";
import Service from "../utils/http.js";

const service = new Service();

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProfileData = async () => {
    try {
      const res = await service.get("user/me");
      setUser(res);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <style>{`
        .profile-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #699fafa6 0%, #c47767a0 100%);
          font-family: "Poppins", sans-serif;
          padding: 20px;
        }
        .profile-card {
          background: #fcf3f3ce;
          padding: 35px 45px;
          border-radius: 24px;
          text-align: center;
          box-shadow: 0 8px 24px rgba(255, 7, 7, 0.08);
          width: 370px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-top: 6px solid #020202fb;
        }
        .profile-card:hover {
          transform: translateY(-6px);
          box-shadow: 0px 14px 32px rgba(0, 0, 0, 0.15);
        }
        .profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 20px;
          border: 4px solid #ef1313ff;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 12px rgba(239, 0, 0, 1);
        }
        .profile-avatar:hover {
          transform: scale(1.08);
        }
        .profile-name {
          font-size: 1.8rem;
          color: #000000ff;
          margin: 12px 0;
          font-weight: 600;
        }
        .profile-email {
          font-size: 1rem;
          color: #555;
          margin-bottom: 12px;
        }
        .profile-id {
          font-size: 0.9rem;
          color: #6c63ff;
          background: #e7eceeff;
          padding: 6px 14px;
          border-radius: 10px;
          display: inline-block;
          margin-top: 8px;
          font-weight: 500;
        }
        .profile-actions {
          margin-top: 25px;
          display: flex;
          justify-content: center;
          gap: 14px;
        }
        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .edit-btn {
          background: #6c63ff;
          color: white;
          box-shadow: 0 4px 10px rgba(108, 99, 255, 0.4);
        }
        .edit-btn:hover {
          background: #574fd6;
        }
        .logout-btn {
          background: #ff6b6b;
          color: white;
          box-shadow: 0 4px 10px rgba(255, 107, 107, 0.4);
        }
        .logout-btn:hover {
          background: #e64545;
        }
        .loading {
          color: #6c63ff;
          font-size: 1.2rem;
          text-align: center;
          margin-top: 40px;
        }
        .error {
          color: #ff4d4d;
          font-size: 1.2rem;
          text-align: center;
          margin-top: 40px;
        }
      `}</style>

      <div className="profile-container">
        <div className="profile-card">
          <img
            src={user?.avatar || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="profile-avatar"
          />
          <h2 className="profile-name">{user?.name || "No Name Available"}</h2>
          <p className="profile-email">{user?.email || "No Email Available"}</p>
          <p className="profile-id">ID: {user?._id}</p>

          <div className="profile-actions">
            <button className="btn edit-btn">Edit Profile</button>
            <button className="btn logout-btn">Logout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
