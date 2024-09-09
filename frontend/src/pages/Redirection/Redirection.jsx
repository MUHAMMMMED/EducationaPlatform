// // import { useContext, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { UserContext } from '../../desing-system/Authentication/UserProvider';

// // const Redirection = () => {
// //   const navigate = useNavigate();
// //   const { userData } = useContext(UserContext);

// //   useEffect(() => {
// //     if (!userData) {
// //       refrsh this page
// //       return;
// //     }
// //     switch (userData.user_type) {
// //       case 'S':
// //         navigate('/MyLearning');
// //         break;
// //       case 'T':
// //         navigate('/Teacher_Dashboard');
// //         break;
// //       case 'M':
// //         navigate('/dashboard');
// //         break;
// //       default:
// //         navigate('/');
// //         break;
// //     }
// //   }, [userData, navigate]);

// //   return null;
// // };

// // export default Redirection;

// import { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from '../../desing-system/Authentication/UserProvider';

// const Redirection = () => {
//   const navigate = useNavigate();
//   const { userData } = useContext(UserContext);


//     // useEffect to handle component mount and fetch exam data
//     useEffect(() => {
//       const fetchData = async () => {
//           try {
//               // Check if the page has already been refreshed
//               const hasRefreshed = localStorage.getItem('hasRefreshed');
//               if (!hasRefreshed) {
//                   // Set the refresh flag to avoid multiple reloads
//                   localStorage.setItem('hasRefreshed', 'true');
//                   window.location.reload(); // Reload the page if user data isn't available
//                   return;
//               }
//               // Clear the refresh flag after successful data load
//               localStorage.removeItem('hasRefreshed');


//           } catch (error) {
//               console.error('Error fetching data:', error);
//               setError('Error fetching data.'); // Set error message in case of failure
//           } finally {
//               setLoading(false); // Stop loading after data is fetched
//           }
//       };

//   }, [ , navigate]); // Rerun the effect if examId or navigate changes









//   useEffect(() => {
//     if (!userData) {
//       // window.location.reload(); // Refresh the page if userData is not available
//       return;
//     }

//     switch (userData.user_type) {
//       case 'S':
//         navigate('/MyLearning');
//         break;
//       case 'T':
//         navigate('/Teacher_Dashboard');
//         break;
//       case 'M':
//         navigate('/dashboard');
//         break;
//       default:
//         navigate('/');
//         break;
//     }
//   }, [userData, navigate]);

//   return null;
// };

// export default Redirection;


import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../desing-system/Authentication/UserProvider'; // Importing UserContext for user data

const Redirection = () => {
  const navigate = useNavigate(); // Hook to handle navigation
  const { userData } = useContext(UserContext); // Getting user data from UserContext

  // useEffect to handle page reload logic
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if the page has already been refreshed
        const hasRefreshed = localStorage.getItem('hasRefreshed');
        if (!hasRefreshed) {
          // Set the refresh flag to avoid multiple reloads
          localStorage.setItem('hasRefreshed', 'true');
          window.location.reload(); // Reload the page if userData is not available
          return;
        }
        // Clear the refresh flag after successful data load
        localStorage.removeItem('hasRefreshed');
      } catch (error) {
        console.error('Error fetching data:', error); // Log any errors during fetching
      }
    };

    fetchData(); // Call fetchData to handle page refresh logic
  }, [navigate]); // This effect depends on the navigate function

  // useEffect to handle user redirection based on their role
  useEffect(() => {
    if (!userData) {
      // If userData is not available, don't redirect yet
      return;
    }

    // Switch case to handle redirection based on user type
    switch (userData.user_type) {
      case 'S': // If the user is a student
        navigate('/MyLearning');
        break;
      case 'T': // If the user is a teacher
        navigate('/Teacher_Dashboard');
        break;
      case 'M': // If the user is a manager or admin
        navigate('/dashboard');
        break;
      default: // Redirect to home for any other user type
        navigate('/');
        break;
    }
  }, [userData, navigate]); // Effect depends on userData and navigate

  return null; // The component doesn't render anything
};

export default Redirection;