import supabase from "../supabase.ts";

async function signUpNewUser(userEmail: string, userPassword: string) {
  const { data, error } = await supabase.auth.signUp({
    email: userEmail,
    password: userPassword,
    options: {
      emailRedirectTo: "http://https://tasksphere-amber.vercel.app/auth/login",
    },
  });

  if (error) throw new Error(error.message);

  // return { data, error };
  return data;
}

async function loginUser(userEmail: string, userPassword: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: userEmail,
    password: userPassword,
  });

  if (error) throw new Error(error.message);

  // return { data, error };
  return data;
}

async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);

  return error;
}

async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  // return { user, error };
  return user;
}

async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo:
      "http://https://tasksphere-amber.vercel.app/auth/reset-password",
  });

  if (error) {
    throw new Error(error.message);
  }
  // return { data, error };
  return data;
}
async function updateUser(userEmail: string, userPassword: string) {
  const { data, error } = await supabase.auth.updateUser({
    email: userEmail,
    password: userPassword,
    data: { hello: "world" },
  });

  if (error) throw new Error(error.message);

  // return { data, error };
  return data;
}

async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo:
        "http://https://tasksphere-amber.vercel.app/dashboard/profile",
    },
  });
  if (error) throw new Error(error.message);

  // return { data, error };
  return data;
}
async function getSession() {
  const { data, error } = await supabase.auth.getSession();
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
  getSession,
};
