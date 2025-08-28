import supabase from "../database/supabaseClient.js";
import bcrypt from 'bcrypt';

// ==========================================================
// 1. User List
// ==========================================================
export async function getUsers(req, res) {
  try {
    const { data, error } = await supabase
      .from("users") //table name
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

// ==========================================================
// 2. Create User
// ==========================================================
export async function createUser(req, res) {
    // console.log("req.body:", req.body);

    try {
        const { email, password, first_name, middle_name, last_name } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword);
        // Insert into Supabase
        const { data, error } = await supabase
            .from('users')
            .insert([
                {
                    email,
                    password_hash: hashedPassword,
                    first_name,
                    middle_name,
                    last_name
                }
            ])
            .select(); // return inserted row

        if (error) throw error;

        res.status(201).json({ message: "User registered successfully!", user: data[0] });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// ==========================================================
// 3. Edit User
// ==========================================================
export async function editUser(req, res) {
    try {
        const { id } = req.params; // user ID from URL
        const { email, first_name, middle_name, last_name } = req.body;

        if (!id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const { data, error } = await supabase
            .from('users')
            .update({ email, first_name, middle_name, last_name })
            .eq('id', id)
            .select();

        if (error) throw error;

        if (!data.length) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully!", user: data[0] });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// ==========================================================
// 4. Delete User
// ==========================================================
export async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const { data, error } = await supabase
            .from('users')
            .delete()
            .eq('id', id)
            .select();

        if (error) throw error;

        if (!data.length) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully!", user: data[0] });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
