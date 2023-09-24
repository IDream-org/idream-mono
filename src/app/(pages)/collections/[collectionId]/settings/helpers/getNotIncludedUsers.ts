import { Collections, Users } from "@prisma/client";

export const getNotIncludedUsers = (
  collection: Collections | undefined,
  users: Users[] | undefined
) => {
  const userIds: string[] = [];
  collection?.users.forEach((user) => userIds.push(user.userId));
  const notIncludedUsers = users?.filter(
    (user) => !userIds.includes(user.id) && user.id !== collection?.authorId
  );

  return notIncludedUsers;
};
