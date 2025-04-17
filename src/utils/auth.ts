import supabase from "../supabase.ts";

async function signUpNewUser(userEmail: string, userPassword: string) {
  const { data, error } = await supabase.auth.signUp({
    email: userEmail,
    password: userPassword,
    options: {
      emailRedirectTo: "http://https://tasksphere-amber.vercel.app/auth/login",
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
    error,
  } = await supabase.auth.getUser();
  return { user, error };
}

async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo:
      "http://https://tasksphere-amber.vercel.app/auth/reset-password",
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
      redirectTo:
        "http://https://tasksphere-amber.vercel.app/dashboard/profile",
    },
  });
  return { data, error };
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
