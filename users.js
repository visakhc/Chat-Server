const users = [];

const addUser = ({id, user_id}) => {
    user_id = user_id.trim().toLowerCase();

    const existingUser = users.find((user) => user.id === id);

    if (existingUser) {
        return {error: 'Username is taken'};
    }

    const user = {id, user_id};

    users.push(user);

    return {user};
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (user_id) => users.find((user) => user.user_id === user_id);

const getUserCount = () => users.length;


module.exports = {addUser, removeUser, getUser,getUserCount};