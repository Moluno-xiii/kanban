import supabase from "../supabase.ts";

async function signUpNewUser(userEmail: string, userPassword: string) {
  const { data, error } = await supabase.auth.signUp({
    email: userEmail,
    password: userPassword,
    options: {
      emailRedirectTo: "http://localhost:5173/auth/login",
    },
  });

  return { data, error };
}

async function loginUser(userEmail: string, userPassword: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: userEmail,
    password: userPassword,
  });

  return { data, error };
}

async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("error logging out : ", error.message);
    return error;
  }
}

async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);
  return user;
}

async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/auth/reset-password",
  });
  return { data, error };
}
async function updateUser(userEmail: string, userPassword: string) {
  const { data, error } = await supabase.auth.updateUser({
    email: userEmail,
    password: userPassword,
    data: { hello: "world" },
  });
  return { data, error };
}

async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:5173/dashboard",
    },
  });
  return { data, error };
}

export {
  signUpNewUser,
  loginUser,
  logoutUser,
  getUser,
  resetPassword,
  updateUser,
  signInWithGoogle,
};
