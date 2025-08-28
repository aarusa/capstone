export function getUsers(req, res) {
    res.status(200).send("You just fetched user list.");
}

export function createUser(req, res) {
    res.status(201).json({message:"User registered successfully!"});
}

export function editUser(req, res) {
    res.status(200).json({message:"User updated successfully!"});
}

export function deleteUser(req, res) {
    res.status(200).json({message:"User deleted successfully!"});
}