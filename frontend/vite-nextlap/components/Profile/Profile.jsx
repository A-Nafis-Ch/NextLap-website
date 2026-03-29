import React from 'react';

function Profile({ userInfo }) {
  if (!userInfo) {
    return <div className="text-center py-20 font-bold">Please log in to view your profile.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header Background */}
        <div className="h-32 bg-gradient-to-r from-red-500 to-red-700"></div>
        
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12">
            <img 
              src={userInfo.picture} 
              alt="Profile" 
              className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg bg-white"
            />
            <button className="bg-gray-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-gray-800 transition">
              Edit Profile
            </button>
          </div>

          <div className="mt-6">
            <h1 className="text-3xl font-black text-gray-900">{userInfo.name}</h1>
            <p className="text-gray-500 font-medium">{userInfo.email}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase">Account Type</p>
              <p className="text-gray-900 font-bold">Google Verified</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase">Total Orders</p>
              <p className="text-gray-900 font-bold">0 Orders</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase">Member Since</p>
              <p className="text-gray-900 font-bold">March 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;