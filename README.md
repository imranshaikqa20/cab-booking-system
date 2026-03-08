                <h1 align="center">🚖 Cab Booking System</h1>

## 1️⃣ About the Project




The Cab Booking System is a web-based application designed to simplify and automate the process of booking taxi rides. It provides a digital platform where riders, drivers, and administrators can interact efficiently. The system allows users to easily register and log in to request rides from their dashboard. Riders can enter their pickup and drop locations to book a cab in a few simple steps. Once a ride request is submitted, nearby drivers can view and accept the request. The application includes an OTP verification system to ensure secure ride confirmation between the rider and driver. Drivers can start and complete rides after successful OTP verification. The system also supports real-time ride updates and live location tracking to enhance user experience. After completing the ride, users can choose from different payment options to pay for the service. Riders can also submit reviews and ratings based on their ride experience. The admin module allows administrators to monitor system activities and manage users and drivers. Admins can view ride statistics and suspend users if necessary. The system improves efficiency, transparency, and reliability in the ride-booking process. It also reduces manual effort by automating ride management and tracking. The project is developed using modern technologies such as Spring Boot for backend development and React for frontend development. These technologies ensure a scalable, responsive, and user-friendly application.


## 2️⃣ AIM

The main aim of this project is to develop a secure and efficient cab booking platform that simplifies the process of booking and managing taxi rides. The system is designed to connect riders, drivers, and administrators through a single digital platform. It aims to provide users with a simple and user-friendly interface for requesting rides quickly and conveniently. The platform allows riders to enter their pickup and drop locations and send ride requests with ease. Drivers can view available ride requests and accept them based on their availability. The system also ensures smooth communication between riders and drivers during the ride process. OTP verification is implemented to provide secure authentication before starting a ride. This helps confirm that the correct rider and driver are connected for the trip. The platform aims to improve efficiency by automating the ride booking and management process. It also helps reduce manual effort and waiting time for both riders and drivers. The system provides multiple payment options to make transactions convenient for users. After completing a ride, users can submit ratings and reviews for the driver. The admin module allows administrators to monitor rides, manage users, and maintain system control. Administrators can also suspend users if any policy violations occur. Overall, the aim of this project is to create a reliable, secure, and user-friendly transportation solution.



## 3️⃣ Summary


The Cab Booking System is developed to automate and simplify the traditional taxi booking process through a web-based platform. It allows users to easily register and log in to access the system and request rides from their personal dashboard. Riders can enter their pickup and drop locations to send ride requests to available drivers. Once a ride request is created, drivers can view the request details and choose to accept or reject the ride. After a driver accepts the request, the system generates an OTP for secure ride verification. The rider shares the OTP with the driver to confirm the ride before it begins. This process helps ensure safety and prevents unauthorized ride starts. During the ride, the system can display route information using map integration. Drivers can start the ride after OTP verification and complete it once the destination is reached. After completing the trip, the ride status is updated in the system. Riders are then given options to select their preferred payment method. The system supports easy and convenient payment processing. Users can also provide ratings and reviews based on their ride experience. This helps maintain service quality and driver performance. The admin module allows administrators to monitor the entire system. Admins can manage users, drivers, ride details, and suspend accounts if necessary.



## 4️⃣ Introduction


With the rapid growth of technology and internet-based services, online cab booking platforms have become increasingly popular. People now prefer digital solutions for transportation because they are faster, more convenient, and easily accessible. Traditional taxi booking methods often involve long waiting times, lack of transparency, and poor communication between drivers and passengers. These challenges can lead to inefficiency and inconvenience for both riders and drivers. The Cab Booking System is developed to overcome these issues by providing a modern digital platform for ride booking. The system connects riders and drivers in real time through a web-based application. Users can easily register, log in, and request rides using a simple and user-friendly interface. Once a ride request is submitted, drivers can view and accept the request based on their availability. The system ensures secure ride confirmation through OTP verification between the rider and the driver. It also allows users to track ride progress and manage their bookings efficiently. After completing the ride, users can make payments using available payment options. Riders can also provide feedback and ratings for the driver to maintain service quality. The system includes an admin module that allows administrators to monitor and manage the platform. Administrators can view ride activities, manage users and drivers, and control the overall system. The application is developed using modern technologies such as Spring Boot for backend development and React for frontend development. These technologies help create a scalable, responsive, and efficient cab booking solution.


## 5️⃣ Tech Stack


The Cab Booking System is developed using a combination of modern frontend, backend, database, and development tools to ensure efficiency, scalability, and a smooth user experience. Each technology used in the project plays an important role in building a complete and functional application.



### Frontend

React.js  
HTML  
CSS  
JavaScript  
Axios (API communication)



The frontend of the application is developed using React.js, which helps create a dynamic and responsive user interface. React allows the application to update components efficiently without reloading the entire page. HTML is used to structure the content of the web pages, while CSS is used to design and style the user interface for better visual appearance. JavaScript is used to implement interactive features and handle client-side logic. Axios is used to communicate with the backend APIs and fetch or send data between the frontend and backend services.




### Backend

Spring Boot  
Java  
REST APIs  
Spring Security



The backend of the system is developed using Spring Boot, a powerful Java framework used to build secure and scalable web applications. Java is used as the core programming language to implement the business logic of the system. REST APIs are created to allow communication between the frontend and backend modules. Spring Security is used to provide authentication and authorization, ensuring that only authorized users can access specific functionalities within the application.



### Database

PostgreSQL

The system uses PostgreSQL as the database to store and manage application data such as user details, driver information, ride requests, payments, and reviews. PostgreSQL provides reliable data storage and efficient data retrieval for the application.


### Tools \& Technologies

Git & GitHub  
Postman  
Google Maps API  
VS Code  
IntelliJ IDEA



Several development tools and technologies are used in this project to support efficient development, testing, collaboration, and deployment of the Cab Booking System. These tools help developers manage the codebase, test application functionality, and integrate external services smoothly. Git is used as a version control system to track changes in the project files and maintain different versions of the code. It allows developers to manage updates, fix issues, and collaborate efficiently during development. GitHub is used as an online repository hosting platform where the project source code is stored and shared. It also helps in managing project versions, maintaining documentation, and collaborating with team members.

Postman is used for testing and validating backend REST APIs during development. It allows developers to send HTTP requests such as GET, POST, PUT, and DELETE to verify that backend services are working correctly. Google Maps API is integrated into the system to provide location-based services such as displaying maps, tracking ride routes, and showing pickup and drop locations. This integration improves the user experience by providing real-time location visualization during the ride.

For development purposes, Visual Studio Code (VS Code) is used as the primary code editor for building the frontend application with React, HTML, CSS, and JavaScript. It provides useful extensions, debugging tools, and an easy-to-use interface that improves productivity. IntelliJ IDEA is used for backend development with Spring Boot and Java. It provides powerful features such as code completion, debugging tools, project management support, and seamless integration with build tools like Maven or Gradle.

These tools and technologies play an important role in building, testing, and maintaining the Cab Booking System effectively, ensuring a smooth and organized development process.



## 6️⃣ Use Cases



The Cab Booking System supports different types of users, each having specific roles and responsibilities within the application. The system is mainly divided into three user roles: Rider (User), Driver, and Administrator. Each role interacts with the system in a different way to ensure smooth functioning of the ride booking process.


### User (Rider)

The Rider is the person who books the cab using the application. A user must first register in the system by providing basic details such as name, email, and password. After successful registration, the user can log in to access the dashboard. From the dashboard, the rider can request a ride by entering the pickup and drop locations. Once the ride request is sent, drivers can view and accept the request. The system generates an OTP verification code which the rider shares with the driver before starting the ride to ensure security. During the ride, the rider can track the ride progress and route using map integration. After the ride is completed, the rider can select a payment option to complete the transaction. The rider can also provide ratings and reviews based on their ride experience, which helps maintain service quality.


### Driver

The Driver is responsible for accepting and completing ride requests from users. Drivers log in to the system using their credentials and access the driver dashboard. From the dashboard, drivers can view available ride requests submitted by riders. They can accept or reject the ride request depending on their availability. After accepting a ride, the driver verifies the ride using the OTP provided by the rider. Once the OTP is verified, the driver can start the ride and follow the route to reach the destination. After reaching the drop location, the driver marks the ride as completed in the system. Drivers can also view ride details such as pickup location, drop location, and ride status.




### Admin


The Administrator manages and monitors the entire Cab Booking System. Admin users log in to the admin panel to view system statistics such as total users, drivers, and rides. The admin has the authority to monitor ride activities and manage user accounts. If any user violates system policies or causes issues, the admin can suspend or restrict that account. The admin can also manage drivers and ensure that the system operates smoothly. Through the admin dashboard, administrators maintain control over the overall platform and ensure proper system management.





## 7️⃣ Screenshots with Explanations



This section explains the major interfaces of the Cab Booking System. Each screenshot represents an important functionality of the system and demonstrates how users interact with the application. These screenshots help illustrate the working flow of the platform from user authentication to ride completion and system administration.



### Home Page





<img src="./screenshots/HomePage.png" width="800"/>





The Home Page is the main entry point of the Cab Booking System. It is the first screen users see when they open the application. This page provides basic navigation options such as login and registration for new and existing users. The design is simple and user-friendly so that users can easily understand how to access the system. From this page, users can move to the authentication section to start using the application.





### Login Page



<img src="./screenshots/LoginPage.png" width="800"/>



<img src="./screenshots/SuccessLoginPageStatus.png" width="800"/>





The Login Page allows registered users to securely access their accounts. Users must enter their credentials such as email or username and password to log in to the system. The system verifies the user details before granting access to the dashboard. This page ensures that only authorized users can access the application features. Proper authentication helps maintain system security and user privacy.





### Register Page



<img src="./screenshots/RegisterPage.png" width="800"/>

<img src="./screenshots/SuccessRegisterPageStatus.png" width="800"/>





The Register Page allows new users to create an account in the system. Users must provide required information such as name, email, phone number, and password. After submitting the registration form, the system stores the user details in the database. Once the account is created successfully, the user can log in and start using the cab booking services. This process ensures that every user has a unique account.



### User Dashboard



<img src="./screenshots/UserDashboard.png" width="800"/>





The User Dashboard is the main interface for riders after logging into the system. From this dashboard, users can view their ride details, request new rides, and manage their bookings. The dashboard provides a clear overview of the user's activity within the application. It also helps users quickly navigate to important features such as booking rides and checking ride status.





### Book Ride





<img src="./screenshots/BookTheRide.png" width="800"/>



<img src="./screenshots/UserSentRideRequest.png" width="800"/>





The Book Ride Page allows users to request a new ride by entering the pickup and destination locations. The system processes the request and sends it to available drivers. This page simplifies the ride booking process by providing an easy-to-use interface for selecting locations and confirming ride requests. It ensures that users can book a ride quickly and efficiently.





### Cancel Ride

<img src="./screenshots/CancleRide.png" width="800"/>



The Cancel Ride feature allows users to cancel a ride request before the ride begins. This option is useful if the rider changes their plan or if the ride is no longer needed. From the user dashboard, the rider can select the cancel option for a requested ride. Once the cancel button is clicked, the system updates the ride status as cancelled in the database. This ensures that the driver is notified that the ride request is no longer active. The cancellation process helps prevent unnecessary waiting for both riders and drivers. 






### Driver Dashboard



<img src="./screenshots/DriverDashboard.png" width="800"/>



The Driver Dashboard is designed for drivers to manage ride requests. After logging in, drivers can see a list of available ride requests from riders. Drivers can choose to accept or reject ride requests depending on their availability. This dashboard also allows drivers to track their assigned rides and manage ride status updates.





### OTP Verification



<img src="./screenshots/DriverRequestedOTP.png" width="800"/>

<img src="./screenshots/UserOTP.png" width="800"/>



<img src="./screenshots/UserOTPSubmitted.png" width="800"/>



The OTP Verification feature is used to ensure ride security. After a driver accepts a ride request, the system generates a One-Time Password (OTP). The rider shares this OTP with the driver before the ride begins. Once the driver enters the correct OTP, the ride is verified and can officially start. This feature prevents unauthorized ride starts.





### Live Location



<img src="./screenshots/LiveLocation.png" width="800"/>



The Live Location Page displays the route and location during the ride using map integration. This feature helps both the rider and driver track the progress of the ride. It improves transparency and ensures that the ride follows the correct route from pickup to destination.





### Ride Completed



<img src="./screenshots/RideStarts.png" width="800"/>



<img src="./screenshots/RideCompleted.png" width="800"/>



The Ride Completed Page confirms that the ride has been successfully finished. Once the destination is reached and payment is processed, the system updates the ride status to completed. This page provides confirmation to both the rider and driver that the trip has ended.







### Payment Option



<img src="./screenshots/PaymentOption.png" width="800"/>



<img src="./screenshots/SelectPaymentOptions.png" width="800"/>



<img src="./screenshots/Paymentsuccessful.png" width="800"/>



The Payment Option Page appears after the ride is completed. Users can select their preferred payment method to complete the transaction. The system processes the payment and updates the ride status accordingly. This feature ensures that users can complete payments easily and securely.





### Review System



<img src="./screenshots/ReviewOption.png" width="800"/>



<img src="./screenshots/ReviewSubmittedSuccessfully.png" width="800"/>



<img src="./screenshots/RiderReviews.png" width="800"/>





The Review System allows riders to rate and provide feedback about their ride experience. Users can submit reviews about the driver’s service quality and overall ride experience. This feature helps maintain service quality and improves trust between users and drivers.





### Admin Dashboard



<img src="./screenshots/AdminLogin.png" width="800"/>





<img src="./screenshots/AdminPannel.png" width="800"/>





<img src="./screenshots/AdminDashboard.png" width="800"/>



The Admin Dashboard provides administrators with a complete overview of the system. Admins can monitor total users, drivers, rides, and other system statistics. This dashboard helps administrators manage the platform efficiently and ensure that the system operates smoothly.







### Suspend User





<img src="./screenshots/SuspendOption.png" width="800"/>



<img src="./screenshots/SuspenedRider.png" width="800"/>



The Suspend User Feature allows administrators to suspend riders or drivers who violate system policies. This functionality helps maintain discipline and security within the platform. Suspended users will not be able to access the system until the restriction is removed.









## 8️⃣ Future Enhancements



The Cab Booking System can be further improved by adding several advanced features to enhance functionality and user experience. In the future, the application can include a mobile application version for Android and iOS to make the service more accessible to users on smartphones. The system can also integrate real-time GPS tracking to provide more accurate live location updates during the ride. Another improvement would be the implementation of online payment gateways such as credit cards, debit cards, and digital wallets for secure and seamless transactions. The platform can also include ride scheduling, allowing users to book rides in advance for a specific date and time. A driver rating and performance system can be enhanced to help maintain service quality and improve trust between riders and drivers. Push notifications can be added to inform users about ride status, driver arrival, and payment confirmations. The system can also support dynamic pricing, where fares change based on demand and distance. Another enhancement could be the addition of ride history and analytics, allowing users and admins to view detailed ride records. The admin panel can be improved with more advanced monitoring tools and reporting features. The platform could also support multiple vehicle types such as bikes, mini cabs, and luxury cars. Integration with AI-based route optimization could help drivers choose faster and more efficient routes. Security can be improved by implementing two-factor authentication for user accounts. Multi-language support can also be added to make the application accessible to a wider audience. These future enhancements will make the Cab Booking System more powerful, scalable, and suitable for real-world transportation services. 





## 9️⃣ Conclusion



The Cab Booking System successfully demonstrates the development of a modern and efficient ride booking platform using web technologies. The system provides a convenient solution for users to book rides and for drivers to manage ride requests through a single application. By automating the traditional taxi booking process, the platform reduces manual effort and improves overall efficiency. The system offers a simple and user-friendly interface that allows riders to easily request rides and track their journey. Drivers can view ride requests, accept rides, and manage their trips efficiently. The implementation of OTP verification ensures secure communication between riders and drivers before starting a ride. Live location tracking improves transparency and allows users to monitor ride progress. The system also supports different payment options for completing transactions after a ride. Riders can submit reviews and ratings, which help maintain service quality and driver performance. The admin module plays an important role in managing the overall system activities. Administrators can monitor users, drivers, and rides through a centralized dashboard. They also have the ability to suspend users if any issues or violations occur. The integration of frontend and backend technologies ensures smooth communication within the system. Using technologies such as React, Spring Boot, and MySQL makes the application scalable and reliable. Overall, this project demonstrates how modern web technologies can be used to build a practical and user-friendly cab booking solution.





