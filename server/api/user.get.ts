// export default defineEventHandler((event) => {
//   return event.context.user;
// });

export default defineEventHandler((event) => {
  const user = event.context.user;

  if (!user) {
    // throw new Error("User not found");
    return null;
  }

  // Remove the password_hash field from the user object
  const { password_hash, ...safeUser } = user;
  return safeUser;
});
