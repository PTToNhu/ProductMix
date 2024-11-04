# How to run this project ?

1. Clone this project
Copy file .env.example -> create a .env file at the root folder -> fill all app variables in the .evn file
Example:
    NODE_ENV=development
    PORT=8081
    HOST_NAME=localhost
    DB_SERVER=<your-sqlserver>
    DB_USER=sa
    DB_PASSWORD=<your-password>
    DB_NAME=<name-of-database>
    DB_INSTANCENAME=SQLEXPRESS
Run the "npm install" to test project at the localhost
2. Start project
   npm start
   Project will start on localhost:8081 (or localhost:8888 if localhost:8081 isn't available)
