/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

// export async function updateCurrentUser({ password, fullName, avatar }) {
//   let updatedata = {};
//   if (password) updateData.password = password;
//   if (fullName) updateData.data = { display_name: fullName };

//   const { data, error } = supabase.auth.updateUser({ updatedata });

//   if (error) throw new Error(error.message);

//   if (!avatar) return data;

//   const fileName = `avatar=${data.user.id}-${Math.random()}`;

//   const { error: storageError } = await supabase.storage
//     .from("avatars")
//     .upload(fileName, avatar);

//   if (storageError) throw new Error(storageError.message);

//   const { data: updatedUser, error: error2 } = supabase.auth.updateUser({
//     data: {
//       avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
//     },
//   });

//   if (error2) throw new Error(error2.message);

//   return updatedUser;
// }

// export async function updateCurrentUser({ fullName }) {
//   if (!fullName) throw new Error("Full name is required");

//   const { data, error } = await supabase.auth.updateUser({
//     data: { display_name: fullName },
//   });

//   if (error) throw new Error(error.message);

//   return data;
// }

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updateData = { data: {} }; // Ensure correct structure

  if (password) updateData.password = password;
  if (fullName) updateData.data.display_name = fullName; // Fix merging issue

  // Update user in Supabase Auth
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data; // If there's no avatar, return updated user data

  // Generate a unique file name for the avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  // Upload new avatar to Supabase Storage
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // Construct the public URL for the uploaded avatar
  const avatarUrl = supabase.storage.from("avatars").getPublicUrl(fileName)
    .data.publicUrl;

  // Update user metadata with new avatar URL
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: { avatar: avatarUrl },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser;
}
