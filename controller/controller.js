let users = require('../database/users.json');
const fs = require('fs');
// const { use } = require('../routes/route');

exports.getAll = (req, res) => {
     res.json(users);
};

exports.loadUsers = () => {
     const fileBuffer = fs.readFileSync('./database/users.json', 'utf-8');
     const users = JSON.parse(fileBuffer);
     return users;
}

exports.create = (req, res) => {
     const { email, password } = req.body;

     const user = {
          id: users[users.length - 1].id + 1,
          email,
          password,
     };

     users.push(user);
     fs.writeFileSync('./database/users.json', JSON.stringify(users));

     res.status(201).json(user);
};

exports.show = (req, res) => {
     const { id } = req.params;

     const user = users.find((i) => i.id === parseInt(id));

     res.json(user);
};

exports.update = (req, res) => {
     const { id } = req.params;

     let user = users.find((i) => i.id === parseInt(id));

     const { email, password } = req.body;

     user = {
          ...user,
          email: email === undefined ? user.email : email,
          password: password === undefined ? user.password : password,
     }

     users = user.map((i) => {
          if(i.id === user.id) {
               return user;
          }
          return i;
     });

     res.json(users);


};

exports.delete = (req, res) => {
     const { id } = req.params;

     users = users.filter((i) => i.id !== parseInt(id));

     res.json(users);
};


exports.checkUser = (email, password) => {
     if (email && password) {
          this.loadUsers;
          let user = users.find((i) => i.email === email);
          console.log(user);
     }
};

