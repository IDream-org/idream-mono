import { Session } from "next-auth";
import { NextResponse } from "next/server";
import { Collections, Comments, Photos, Roles } from "@prisma/client";

import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import NotesIcon from "@mui/icons-material/Notes";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

interface GetActions {
  create: () => void;
  settings?: () => void;
  remove: () => void;
  notes?: () => void;
  gallery?: () => void;
}

export class UserActions {
  private session: Session | null;
  private collection: Collections | undefined;

  constructor(session: Session | null, collection: Collections | undefined) {
    this.session = session;
    this.collection = collection;
  }

  isAuthenticated() {
    if (!this.session?.user) {
      return new NextResponse("Not Authorized", { status: 401 });
    }
  }

  isAuthorOrOwnerOrCommentOwner(comment: Comments) {
    const currentUser = this.collection?.users.find(
      (user) => user.userId === this.session?.user.id
    );
    const isAuthorOrOwner =
      this.session?.user.id === this.collection?.authorId ||
      currentUser?.role === Roles.Owner;

    const isCommentOwner = this.session?.user.id === comment.userId;

    return isAuthorOrOwner || isCommentOwner;
  }

  isAuthorOrOwnerOrPhotoOwner(photo: Photos) {
    const currentUser = this.collection?.users.find(
      (user) => user.userId === this.session?.user.id
    );
    const isAuthorOrOwner =
      this.session?.user.id === this.collection?.authorId ||
      currentUser?.role === Roles.Owner;

    const isCommentOwner = this.session?.user.id === photo.userId;

    return isAuthorOrOwner || isCommentOwner;
  }

  getAuthorPrivilegesActions({ create, settings, remove }: GetActions) {
    const currentUser = this.collection?.users.find(
      (user) => user.userId === this.session?.user.id
    );

    const isAuthor = this.session?.user.id === this.collection?.authorId;
    const isAuthorOrOwner =
      this.session?.user.id === this.collection?.authorId ||
      currentUser?.role === Roles.Owner;
    const isMember = currentUser?.role === Roles.Member;
    const actions = [
      ...(!isMember
        ? [
            {
              icon: <AddIcon onClick={create} />,
              name: "Create",
            },
          ]
        : []),
      ...(isAuthorOrOwner
        ? [
            {
              icon: <SettingsIcon onClick={settings} />,
              name: "Settings",
            },
          ]
        : []),
      ...(isAuthor
        ? [
            {
              icon: <DeleteOutlineIcon onClick={remove} />,
              name: "Delete",
            },
          ]
        : []),
    ];

    return actions;
  }
  getAuthorAndOwnerPrivilegesActions({ create, remove }: GetActions) {
    const currentUser = this.collection?.users.find(
      (user) => user.userId === this.session?.user.id
    );

    const isAuthorOrOwner =
      this.session?.user.id === this.collection?.authorId ||
      currentUser?.role === Roles.Owner;
    const isMember = currentUser?.role === Roles.Member;
    const actions = [
      ...(!isMember
        ? [
            {
              icon: <AddIcon onClick={create} />,
              name: "Create",
            },
          ]
        : []),
      ...(isAuthorOrOwner
        ? [
            {
              icon: <DeleteOutlineIcon onClick={remove} />,
              name: "Delete",
            },
          ]
        : []),
    ];

    return actions;
  }

  getAuthorAndOwnerPrivilegesItemsActions({
    create,
    remove,
    notes,
    gallery,
  }: GetActions) {
    const currentUser = this.collection?.users.find(
      (user) => user.userId === this.session?.user.id
    );

    const isAuthorOrOwner =
      this.session?.user.id === this.collection?.authorId ||
      currentUser?.role === Roles.Owner;
    const isMember = currentUser?.role === Roles.Member;
    const actions = [
      ...(!isMember
        ? [
            {
              icon: <AddIcon onClick={create} />,
              name: "Create",
            },
          ]
        : []),
      ...(isAuthorOrOwner
        ? [
            {
              icon: <NotesIcon onClick={notes} />,
              name: "Notes",
            },
            {
              icon: <AddAPhotoIcon onClick={gallery} />,
              name: "Gallery",
            },
            {
              icon: <DeleteOutlineIcon onClick={remove} />,
              name: "Delete",
            },
          ]
        : []),
    ];

    return actions;
  }
}
