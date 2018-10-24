# Strawnimals

<p><u>Demo</u>: <a class='link' href='https://youtu.be/55Cx_l1hBVQ' target="_blank">youtu.be/55Cx_l1hBVQ</a></p>
<p>Website: <a class='link' href="http://54.183.223.25/" target="_blank">http://54.183.223.25/</a></p>
		
<p><u>Technologies</u>:  JavaScript, MongoDB, Express.js, Angular, Node.js, Bcrypt, Bootstrap, Amazon EC2, Multer. </p>
<p><u>Role</u>: Worked independently, built the UI, CRUD functionality, and server to user connections.</p>
<p><u>Description</u>: The Strawnimals e-commerce web application is a personal project, in which users are able to buy straw figures I made and allows the admin to add and edit products and orders. This project was built in the MEAN stack and uses Bcrypt and Bootstrap. The User Interface was built using Bootstrap and Angular, for displaying information and utilizing submit/click events. The back end uses a Node.js server component with an Express.js framework and MongoDB database. Bcrypt is use to hash and salt passwords when users create accounts. Multer is used for uploading images onto MongoDB.Strawnimals has full CRUD functionality, so whenever an item or order is created or edited, a request is sent to the server through RESTful routes and returns a response if the request went through or not. When users add items to the cart, data is sent to the service and stored on the service for other components to access.</p>
<p><u>Challenges</u>:  One of the challenges for this project was being able to upload images and displaying them on the website. I thought about using an Image Schema and linking the id with the item, but that would require multiple callbacks. I figured out a solution in which I temporarily store the image and convert the image into a Buffer, then into base64, and then converting it into a string for the path. That way, the item can store the images as strings and can use the path to render the images on the site directly.</p>
