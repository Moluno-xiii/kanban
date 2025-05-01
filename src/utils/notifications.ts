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
    throw new Error(error.message);
  }

  return notification;
}

async function getUserNotifications(user_id: string, status: boolean) {
  const { data: notifications, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user_id)
    .eq("has_read", status)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return notifications;
}

async function deleteUserNotifications(user_id: string, status?: boolean) {
  let query = supabase.from("notifications").delete().eq("user_id", user_id);

  if (status === true || status === false) {
    query = query.eq("has_read", status);
  }

  const { data: notifications, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return notifications;
}

async function markNotificationAsRead(
  user_id: string,
  notification_id: string,
) {
  const { data: notifications, error } = await supabase
    .from("notifications")
    .update({ has_read: true })
    .eq("user_id", user_id)
    .eq("id", notification_id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return notifications;
}

export {
  getUserNotifications,
  sendNotification,
  deleteUserNotifications,
  markNotificationAsRead,
};
