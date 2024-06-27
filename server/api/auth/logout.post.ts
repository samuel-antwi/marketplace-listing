export default defineEventHandler(async (event) => {
  if (!event.context.session) {
    throw createError({
      statusCode: 403,
    });
  }
  await lucia.invalidateSession(event.context.session.id);
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createBlankSessionCookie().serialize()
  );
  event.context.session = null; // Set session to null to immediately reflect logout
});
