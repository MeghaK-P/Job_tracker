# ApplyTrack – Job Application Tracker

- Decided the project idea: Job Application Tracker
  -> Designed the application to help users manage, track and analyse
     their job applications from a single platform.

- Created the project using Vite + React

  -> Created React application using Vite
  -> Set up the initial frontend project
  -> Removed unnecessary codes and styling.
  -> Started the development server.


- Created separate frontend and backend structure

  -> Created jobtracker for the React frontend
  -> Created jt-server for the backend


- Installed required packages

  -> React Router DOM
     -> Used for client-side routing and navigation

  -> Axios
     -> Used for making HTTP requests between React and the backend

  -> React Bootstrap / Bootstrap
     -> Used for responsive UI components and styling

  -> Lucide React
     -> Used for icons throughout the application

  -> Chart.js
     -> Used for displaying application analytics

  -> react-chartjs-2
     -> Used to integrate Chart.js charts with React


- Project structuring

  -> Created separate folders for Pages, Components, API and Services

  -> Created pages for:

     -> Login
     -> Register
     -> Home
     -> Applications
     -> Add Application
     -> View Application
     -> Edit Application
     -> Analytics

  -> Created reusable components:

     -> Header
     -> Sidebar

- Implemented React Router

  -> Installed react-router-dom

  -> Wrapped the application with BrowserRouter in main.jsx

  -> Defined routes using Routes and Route in the application

  -> Used dynamic routing for viewing and editing individual
     applications using the application ID


- Created JSON Server backend

  -> Created db.json to store application data

  -> Created collections for:

     -> users
     -> applications

  -> Configured JSON Server to run on port 3000

- Created user registration

  -> Created registration form

  -> Collected user details using React state

  -> Used controlled form inputs with value and onChange

  -> Checked whether the email already exists before registration

  -> Sent new user details to JSON Server using POST request


- Created login functionality

  -> Created login form

  -> Collected email and password using React state

  -> Checked the entered credentials against the users stored
     in JSON Server

  -> Stored the logged-in user's information in localStorage

  -> Used the stored user information to identify the current user

  -> Added logout functionality by removing loggedUser from
     localStorage


- Implemented Axios configuration

  -> Created a separate Axios instance.

  -> Created response interceptors to handle API responses
     and errors

- Created reusable API service

  -> Created a common apiService function

  -> Passed HTTP method, URL and request body to the service

  -> Used the Axios instance to make the actual request

  -> Created separate API functions inside allAPI.js

    
- Implemented CRUD operations for applications

  -> Create
     -> Added new job applications using POST request

  -> Read
     -> Retrieved all applications belonging to the logged-in user

  -> Update
     -> Edited existing application details using PUT request

  -> Delete
     -> Deleted applications using DELETE request

- Created Add Application form

  -> Created controlled form inputs using useState

  -> Stored form data as an object in state

  -> Added fields for:

     -> Company
     -> Position
     -> Location
     -> Job Type
     -> Status
     -> Application Date
     -> Reminder Date
     -> Salary
     -> Job Link
     -> Notes

  -> Used a common handleChange function to update form state

  -> Added required validation for important fields

  -> Submitted application data to JSON Server using the API service


- Implemented application status tracking

  -> Added different stages for tracking application progress

     -> Applied
     -> Shortlisted
     -> Interview
     -> Offer
     -> Rejected

  -> Used the status field to identify the current stage of
     each application

  -> Displayed the status throughout the application list,
     details page and dashboard


- Implemented user-specific applications

  -> Added userId to each application

  -> Connected each application with the user who created it

  -> Retrieved applications using the logged-in user's ID

  -> Used:

     GET /applications?userId=userId

  -> This prevents applications belonging to different users
     from being displayed together


- Created Applications page

  -> Retrieved applications from JSON Server

  -> Displayed application information in the UI

  -> Added search functionality

  -> Added filtering functionality

  -> Allowed users to find applications based on their details

  -> Added navigation to view individual applications


- Created View Application page

  -> Used dynamic route parameter to identify the application

  -> Retrieved the selected application using its ID

  -> Added options to edit or delete the application


- Created Edit Application page

  -> Retrieved existing application data

  -> Loaded the data into the form

  -> Allowed the user to modify application information

  -> Sent updated data to JSON Server using PATCH request

  -> Refreshed the displayed information after updating


- Added delete functionality

  -> Added delete option to application details

  -> Used application ID to identify the record

  -> Sent DELETE request to JSON Server

  -> Removed the deleted application from the interface

  -> Added confirmation before deleting an application


- Created Home  page

  -> Designed a dashboard to provide a quick overview of the
     user's job search

  -> Added ApplyTrack branding and navigation

  -> Added user information

  -> Added logout option

  -> Added notification bell

  -> Added quick navigation buttons for:

     -> Add Application
     -> View Applications


- Added application statistics to dashboard

  -> Calculated total number of applications

  -> Calculated number of Applied applications

  -> Calculated number of Shortlisted and Interview applications

  -> Calculated number of Offers

  -> Displayed the statistics using dashboard cards


- Added Recent Applications section

  -> Sorted applications according to application date

  -> Displayed the most recent applications on the dashboard

  -> Limited the number of applications displayed in the
     recent applications section

  -> Added navigation to individual application details


- Created Application Journey section

  -> Added a visual representation of the application process

  -> Created a stepper-style design

- Added notification and reminder system

  -> Added reminderDate to applications

  -> Created logic to compare the reminder date with the
     current date

  -> Added notification bell to the interface

  -> Displayed notifications for:

     -> Overdue reminders
     -> Reminders due today
     -> Reminders due tomorrow
     -> Reminders within the next 3 days

  -> Excluded Offer and Rejected applications from active reminders

  -> Added notification dropdown


- Created Analytics page

  -> Retrieved the logged-in user's applications

  -> Calculated application statistics dynamically

  -> Added job type distribution

  -> Used Chart.js and react-chartjs-2 for data visualization


- Added Response Rate

  -> Calculated the number of applications that received a response

  -> Considered the following statuses as responded:

     -> Shortlisted
     -> Interview
     -> Offer

  -> Formula:

     Response Rate =
     (Shortlisted + Interview + Offer)/Total Applications × 100

- Added Success Rate

  -> Calculated the number of applications that resulted in an offer

  -> Formula:

     Success Rate =
     Offer Applications/ Total Applications × 100


- Added search and filtering

  -> Added search functionality for applications

  -> Added filtering based on application information

  -> Made it easier for users to locate a particular application
     from a large list


- Improved UI using Bootstrap

  -> Used Bootstrap classes for responsive layouts

  -> Improved forms, buttons, cards and navigation

- Added reusable components

  -> Header
     -> Contains navigation, user information and notifications

  -> Sidebar
     -> Provides navigation between application sections


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
