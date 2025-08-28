import supabase from "../database/supabaseClient.js";

export async function getUsers(req, res) {
  try {
    const { data, error } = await supabase
      .from("user_profiles") //table name
      .select("*");

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data); // send the list of users
  } catch (err) {
    console.error("Error fetching users:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
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