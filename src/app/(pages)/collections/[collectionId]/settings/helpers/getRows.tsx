import { CollectionUsers, Collections, Users } from "@prisma/client";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PersonIcon from "@mui/icons-material/Person";
import { createRow } from "@/components/CustomizedUsersTables/CustomizedUsersTables";
import { Session } from "next-auth";

interface UsersRow extends Partial<Users>, Partial<CollectionUsers> {}

export const getRows = (
  collection: Collections | undefined,
  author: Users | undefined,
  users: Users[] | undefined,
  session: Session | null,
  handleDelete: (user: any) => void,
  handleEdit: (user: any) => void
) => {
  const usersArray: UsersRow[] = [];

  if (author) usersArray.push(author);
  collection?.users.map((user) => {
    const fetchedUser = users?.find((data) => user.userId === data.id);
    const newUser = { ...fetchedUser, ...user };
    if (fetchedUser) usersArray.push(newUser);
  });

  const rows = usersArray
    .sort((a, b) => {
      if (a.id === author?.id) {
        return -1;
      } else if (b.id === author?.id) {
        return 1;
      }
      if (a.role === "Owner") {
        return -1;
      } else if (b.role === "Owner") {
        return 1;
      }
      if (a.role === "Admin") {
        return -1;
      } else if (b.role === "Admin") {
        return 1;
      }
      return 0;
    })
    .map((user) =>
      createRow({
        image: user.avatar ?? "",
        name: `${user.firstName} ${user.lastName}`,
        role: user.role ?? "Author",
        actions:
          session?.user.id !== user.userId && user.role !== undefined ? (
            <>
              {" "}
              <EditIcon
                sx={{ cursor: "pointer" }}
                onClick={() => handleEdit(user)}
              />{" "}
              <DeleteOutlineIcon
                color="error"
                onClick={() => handleDelete(user)}
                sx={{ cursor: "pointer" }}
              />{" "}
            </>
          ) : (
            <PersonIcon />
          ),
      })
    );

  return rows;
};
