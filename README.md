Pre-Milestone: Project Planning and Proposal

Project Concept:
I plan to create a Music Store themed application. 
It should allow users to find, review, and borrow CDs and admin can add, update, or delete CDs.
I chose this because it incorporates an idea I'm familiar with because I've used similar programs before in the real world so it helps me to better understand how it should work.

Scope and Functionality:
The endpoints will include POST endpoints to sign in and log into accounts. 
There will be GET endpoints to see all of the CDs and to find specific CDs, a POST endpoint for admins to add CDs, a PUT endpoint for admins to update CD information, and a DELETE endpoint for admin to remove CDs.
For reviews, there will be GET and POST endpoints for users to read and leave comments, and a DELETE endpoint for admins to use.
For authenticated users to borrow CDs, there will be a GET endpoint to see all of the CDs that are unavailable, PUT endpoint to update statuses, and a PUT endpoint to return borrowed CDs.

Course Content Alignment:
The CRUD endpoint creation, authentication/authorization, error handling, Joi validation for input, code documentation, and testing concepts that will be used in this project have been covered in this course.
A new component that we have not discussed is express-rate-limits to prevent users from sending too many requests at once. This will stop users from making too many login attempts or borrowing too many CDs, or posting too many reviews.

GitHub Project Setup Plan:
Milestone 1: Set up API documentation, research express-rate-limit, design database schema and endpoints, implement CRUD operations, and create unit tests.
Milestone 2: Implement the express-rate-limit component, prepare sprint demo to present progress, and build onto existing CRUD operations.
Milestone 3: Implement filtering or sorting for CDs, complete API documentation, and set up authentication and authorization.
Any work in progress will be done in the feature branch, once it is completed it will be merged into the development branch. Work in the development branch will require a PR before being pushed into main.