class UserMapper {
    static userToResponse(user) {
        return {
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
    }

    static usersToResponse(users) {
        return users.map(UserMapper.userToResponse)
    }
}

module.exports = UserMapper;