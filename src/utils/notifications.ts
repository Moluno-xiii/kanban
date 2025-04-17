import supabase from "../supabase";

async function sendNotification(
  user_id: string,
  title: string,
  message: string,
  email: string,
) {
  const { data: notification, error } = await supabase
    .from("notifications")
    .insert({
      user_id,
      title,
      message,
      email,
      has_read: false,
    });
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return notification;
}

async function getUserNotifications(user_id: string) {
  const { data: notifications, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return notifications;
}

async function deleteUserNotifications(user_id: string) {
  const { data: notifications, error } = await supabase
    .from("notifications")
    .delete()
    .eq("user_id", user_id);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return notifications;
}

export { getUserNotifications, sendNotification, deleteUserNotifications };
