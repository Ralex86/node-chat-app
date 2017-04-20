// [{
//   id:
//   name:
//   room:
// }]

// addUser(id, name, room)
// removeuser(id)
// getUser(id)
// getUserList(room)

class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    var user = this.getUser(id);

    if (user){
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user; // return undefined if failed
    //return user that was removed
  }
  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
  }
  getUserList (room) {
    var users = this.users.filter((user) => user.room === room ); // short ES6 notation
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = {Users};

// class Person {
//   constructor (name, age) {
//       this.name = name;
//       this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} ksd`
//   }
// }
// var me = new Person('Alex', 25);
// console.log(me.getUserDescription);
