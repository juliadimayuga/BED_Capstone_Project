Pre-Milestone: Project Planning and Proposal

# Project Concept:
I plan to create a Gym Equipment themed application. 
It should allow users to find, review, and schedule times to use equipment, while admins can add, update, or delete equipment.
I chose this because it incorporates an idea I'm familiar with because I've used similar programs before in the real world so it helps me to better understand how it should work.

## Scope and Functionality:
The endpoints will include POST endpoints to sign in and log into accounts. 
There will be GET endpoints to see all of the equipment and to find specific equipment, a POST endpoint for admins to add equipment, a PUT endpoint for admins to update equipment information, and a DELETE endpoint for admin to remove equipment.
For reviews, there will be GET and POST endpoints for users to read and leave comments, and a DELETE endpoint for admins to use.
For authenticated users to borrow equipment, there will be a GET endpoint to see all of the schedule records, and a PUT endpoint to update records.

## Course Content Alignment:
The CRUD endpoint creation, authentication/authorization, error handling, Joi validation for input, code documentation, and testing concepts that will be used in this project have been covered in this course.
A new component that we have not discussed is express-rate-limits to prevent users from sending too many requests at once. This will stop users from making too many login attempts and creating too many records for equipment, or posting too many reviews.

## GitHub Project Setup Plan:
Milestone 1: Set up API documentation, research express-rate-limit, design database schema and endpoints, implement CRUD operations, and create unit tests.
Milestone 2: Implement the express-rate-limit component, prepare sprint demo to present progress, and build onto existing CRUD operations.
Milestone 3: Implement filtering for equipment and reviews, complete API documentation, and set up authentication and authorization.
Any work in progress will be done in the feature branch, once it is completed it will be merged into the development branch. Work in the development branch will require a PR before being pushed into main.

## Installation Instructions
Once you have a clone of the repository, you can install any dependencies required and start the API to host it on the server. 
Then you can open Postman or a brower with the URL http://localhost:3000/api/v1 to begin using the endpoints.

## Link to Public Documentation
You can use this link to find the public API documentation: https://juliadimayuga.github.io/BED_Capstone_Project/

## Local Documentation Access
Start the server and enter http://localhost:3000/api-docs into Postman or a browser to see the endpoint documentation.