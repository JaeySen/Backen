 API DOCUMENTATION
-------------------

1. LOGIN               -->    http://localhost:5000/auth/login                         [POST] 
2. REGISTER            -->    http://localhost:5000/auth/login                         [POST]


3. Add one users       -->    http://localhost:5000/employee/addEmployee               [POST]
4. Get all users       -->    http://localhost:5000/employee/getAllEmployee            [GET]
5. Get user by id      -->    http://localhost:5000/employee/getEmployeeById/:id       [GET]
6. Update user by id   -->    http://localhost:5000/employee/updateEmployeeById/:id    [PUT]
7. Patch user by id    -->    http://localhost:5000/employee/patchEmployeeById/:id     [PUT]
8. Delete user by id   -->    http://localhost:5000/employee/deleteEmployeeById/:id    [DELETE]
9. Search from users   -->    http://localhost:5000/employee/search/:key               [GET]

#################################################################################################################

Params
1. 
    email:qwerty@yopmail.com
    password:qwerty@123


2.
    email:qwerty@yopmail.com
    password:qwerty@123
    name:qwerty


3.
    name:test
    email:test@yopmail.com
    title:testy
    avatar:avatar
    dept:finance
    position:developer
    status:active


6.
    name:test
    email:test@yopmail.com
    title:testy
    avatar:avatar
    dept:finance
    position:developer
    status:active