start 
mongoexport.exe -d "ifc" -c "groups" -o "..\dumpdata\groups.json" --jsonArray --pretty "mongodb://root:123456@localhost:27017/?authSource=admin" 
mongoexport.exe -d "ifc" -c "groups_users" -o "..\dumpdata\groups_users.json" --jsonArray --pretty "mongodb://root:123456@localhost:27017/?authSource=admin" 
mongoexport.exe -d "ifc" -c "projects" -o "..\dumpdata\projects.json" --jsonArray --pretty "mongodb://root:123456@localhost:27017/?authSource=admin" 
mongoexport.exe -d "ifc" -c "projects_groups" -o "..\dumpdata\projects_groups.json" --jsonArray --pretty "mongodb://root:123456@localhost:27017/?authSource=admin" 
mongoexport.exe -d "ifc" -c "roles" -o "..\dumpdata\roles.json" --jsonArray --pretty "mongodb://root:123456@localhost:27017/?authSource=admin" 
mongoexport.exe -d "ifc" -c "users" -o "..\dumpdata\users.json" --jsonArray --pretty "mongodb://root:123456@localhost:27017/?authSource=admin" 
mongoexport.exe -d "ifc" -c "users_projects" -o "..\dumpdata\users_projects.json" --jsonArray --pretty "mongodb://root:123456@localhost:27017/?authSource=admin" 

exit