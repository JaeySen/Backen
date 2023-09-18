start mongoimport.exe -d "ifc" -c "groups" --jsonArray "mongodb://localhost:27017/?authSource=admin" "..\dumpdata\groups.json" 
mongoimport.exe -d "ifc" -c "groups_users" --jsonArray "mongodb://localhost:27017/?authSource=admin" "..\dumpdata\groups_users.json" 
mongoimport.exe -d "ifc" -c "projects" --jsonArray "mongodb://localhost:27017/?authSource=admin" "..\dumpdata\projects.json" 
mongoimport.exe -d "ifc" -c "projects_groups" --jsonArray "mongodb://localhost:27017/?authSource=admin" "..\dumpdata\projects_groups.json" 
mongoimport.exe -d "ifc" -c "roles" --jsonArray "mongodb://localhost:27017/?authSource=admin" "..\dumpdata\roles.json" 
mongoimport.exe -d "ifc" -c "users" --jsonArray "mongodb://localhost:27017/?authSource=admin" "..\dumpdata\users.json" 
mongoimport.exe -d "ifc" -c "users_projects" --jsonArray "mongodb://localhost:27017/?authSource=admin" "..\dumpdata\users_projects.json" 


exit