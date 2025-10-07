// import React from "react";
import useAppState from "./hooks/useAppState.js"; // Added .js extension
//  // Added .jsx extension
// import Header from "./components/layout/Header.jsx";
import Toast from "./components/Layout/Toast.jsx"; // Added .jsx extension
import Spinner from "./components/Layout/Spinner.jsx"; // Added .jsx extension
import LoginScreen from "./components/auth/LoginScreen.jsx"; // Added .jsx extension
import Dashboard from "./Dashboard.jsx"; // <-- CRITICAL: Changed to Dashboard.jsx
import Header from "./components/Layout/Header.jsx"

const App = () => {
  const {
    user,
    isAuthReady,
    isLoading: isAuthLoading,
    toast,
    searchData,
    apiClient,
    handleLogin,
    handleLogout,
    showToast,
    setSearchData,
  } = useAppState();

  if (!isAuthReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Spinner className="w-10 h-10 text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <Header user={user} handleLogout={handleLogout} />
      <main>
        {!user ? (
          <LoginScreen handleLogin={handleLogin} isLoading={isAuthLoading} />
        ) : (
          <Dashboard
            user={user}
            apiClient={apiClient}
            showToast={showToast}
            searchData={searchData}
            setSearchData={setSearchData}
          />
        )}
      </main>
      <Toast toast={toast} />
    </div>
  );
};

export default App;
