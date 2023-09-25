import React, { useState } from "react";
import { Roles, Users } from "@prisma/client";
import { useAppDispatch } from "@/app/redux/hooks";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useGetUsersQuery } from "@/app/redux/services/usersApiSlice";
import {
  errorSnackbar,
  successSnackbar,
} from "@/app/redux/features/snackbarSlice";
import {
  useAddUserMutation,
  useEditUserRoleMutation,
  useGetCollectionQuery,
  useRemoveUserMutation,
} from "@/app/redux/services/collectionApiSlice";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { getRows } from "./helpers/getRows";
import UserStack from "@/components/UserStack/UserStack";
import BasicDialog from "@/components/BasicDialog/BasicDialog";
import WrapperComponent from "@/components/WrapperComponent/WrapperComponent";
import CustomizedTables from "@/components/CustomizedUsersTables/CustomizedUsersTables";
import { getNotIncludedUsers } from "./helpers/getNotIncludedUsers";
import {
  Autocomplete,
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const UsersTab = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const mdSize = useMediaQuery(theme.breakpoints.down("md"));
  const { data: session } = useSession();
  const collectionId = String(params.collectionId);
  const {
    data: collection,
    isLoading: isLoadingCollection,
    error: errorCollection,
  } = useGetCollectionQuery({ collectionId });
  const {
    data: users,
    isLoading: isLoadingUsers,
    error: errorUsers,
  } = useGetUsersQuery({});
  const [addUser] = useAddUserMutation();
  const [removeUser] = useRemoveUserMutation();
  const [editUserRole] = useEditUserRoleMutation();
  const author = users?.find((user) => user.id === collection?.authorId);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState<{
    open: boolean;
    userToEdit: Users | undefined;
    editRole: Roles;
  }>({
    open: false,
    userToEdit: undefined,
    editRole: Roles.Member,
  });
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);

  const [userToRemove, setUserToRemove] = useState<Users>();
  const handlOpenDialog = (user: Users) => {
    setUserToRemove(user);
    setOpenRemoveDialog(true);
  };

  const handleEditUserRole = (event: SelectChangeEvent) => {
    setOpenEditDialog((prev) => ({
      ...prev,
      editRole: event.target.value as Roles,
    }));
  };

  const getEditUserRole = (user: Users) => {
    const foundUser = collection?.users.find(
      (users) => users.userId === user?.id
    );
    return foundUser?.role;
  };

  const handleEditDialog = (user: Users) => {
    setOpenEditDialog({
      open: true,
      userToEdit: user,
      editRole: getEditUserRole(user) ?? Roles.Member,
    });
  };

  const handleEditUser = async () => {
    if (!openEditDialog.userToEdit) return;
    try {
      await editUserRole({
        collectionId,
        userId: openEditDialog.userToEdit.id,
        userRole: openEditDialog.editRole,
      }).unwrap();
      setOpenEditDialog({
        open: false,
        userToEdit: undefined,
        editRole: Roles.Member,
      });
      dispatch(successSnackbar({ message: "Successfully edited user" }));
    } catch (error) {
      console.error("Failed adding comment");
      dispatch(errorSnackbar({ message: "Failed to edit user" }));
    }
  };

  const handleRemoveUser = async () => {
    if (!userToRemove) return;
    try {
      await removeUser({
        collectionId,
        userId: userToRemove.id,
      }).unwrap();
      setUserToRemove(undefined);
      setOpenRemoveDialog(false);
      dispatch(successSnackbar({ message: "Successfully removed user" }));
    } catch (error) {
      console.error("Failed adding comment");
      dispatch(errorSnackbar({ message: "Failed to remove user" }));
    }
  };

  const handleAddUser = async (user: Users) => {
    try {
      await addUser({
        collectionId,
        user: {
          user: `${user.firstName} ${user.lastName}`,
          userId: user.id,
          role: Roles.Member,
        },
      }).unwrap();
      dispatch(successSnackbar({ message: "Successfully added user" }));
    } catch (error) {
      dispatch(errorSnackbar({ message: "Failed to add user" }));
    }
  };

  const columns = ["User", "Role", "Actions"];
  const rows = getRows(
    collection,
    author,
    users,
    session,
    handlOpenDialog,
    handleEditDialog
  );

  const notIncludedUsers = getNotIncludedUsers(collection, users);

  const renderUsers = () => {
    if (!collection || !users) {
      return <></>;
    }

    return (
      <>
        <CustomizedTables columns={columns} rows={rows} />
        <BasicDialog
          title="Add User"
          text=""
          confirmText=""
          cancelText="Close"
          open={openAddDialog}
          handleClose={() => setOpenAddDialog(false)}
          handleConfirm={() => {}}
          showButton={false}
        >
          <Grid maxWidth={600} width={mdSize ? 350 : 600} item xs={12}>
            {notIncludedUsers && notIncludedUsers.length > 0 && (
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={
                  notIncludedUsers?.map(
                    (user) => `${user.firstName} ${user.lastName}`
                  ) ?? []
                }
                sx={{
                  width: mdSize ? "80%" : 400,
                  pt: 2,
                  pb: 4,
                  margin: "0 auto",
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Users" />
                )}
              />
            )}
            {notIncludedUsers && notIncludedUsers.length > 0 ? (
              notIncludedUsers.map((user, index) => {
                return (
                  <Grid item xs={12} key={index}>
                    <UserStack
                      image={user?.avatar ?? ""}
                      message={`${user.firstName} ${user.lastName}`}
                      component={
                        <Button
                          variant="contained"
                          onClick={() => handleAddUser(user)}
                        >
                          Add
                        </Button>
                      }
                    />
                  </Grid>
                );
              })
            ) : (
              <Typography pt={2} fontStyle={"italic"} textAlign={"center"}>
                No users found
              </Typography>
            )}
          </Grid>
        </BasicDialog>
        <BasicDialog
          title="Edit User"
          text=""
          confirmText="Save"
          cancelText="Close"
          open={openEditDialog.open}
          handleClose={() => {
            setOpenEditDialog({
              open: false,
              userToEdit: undefined,
              editRole: Roles.Member,
            });
          }}
          handleConfirm={handleEditUser}
        >
          <Grid maxWidth={600} width={mdSize ? 350 : 600} item xs={12}>
            <Avatar
              src={openEditDialog.userToEdit?.avatar ?? ""}
              sx={{ margin: "0 auto", width: 70, height: 70 }}
            />
            <Grid pt={4} item display={"flex"} justifyContent={"center"}>
              <Typography mr={1} fontWeight={"bold"}>
                Name:
              </Typography>
              <Typography>
                {openEditDialog.userToEdit?.firstName}{" "}
                {openEditDialog.userToEdit?.lastName}
              </Typography>
            </Grid>
            <Grid pt={1} display={"flex"} justifyContent={"center"}>
              <Typography mr={1} fontWeight={"bold"}>
                Email:
              </Typography>
              <Typography>{openEditDialog.userToEdit?.email}</Typography>
            </Grid>
            <Grid
              pt={2}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography fontWeight={"bold"}>Role</Typography>
              <FormControl sx={{ width: "150px", ml: 1 }}>
                <InputLabel id="role">Role:</InputLabel>
                <Select
                  labelId="role"
                  id="role-select"
                  value={openEditDialog.editRole}
                  defaultValue={openEditDialog.editRole}
                  label="Role"
                  onChange={handleEditUserRole}
                  inputProps={{ sx: { padding: "6px 8px" } }}
                >
                  <MenuItem value={Roles.Owner}>{Roles.Owner}</MenuItem>
                  <MenuItem value={Roles.Admin}>{Roles.Admin}</MenuItem>
                  <MenuItem value={Roles.Member}>{Roles.Member}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </BasicDialog>
        <BasicDialog
          title="Remove User"
          text="Are you sure you want to remove this user from this collection?"
          confirmText="Confirm"
          cancelText="Cancel"
          open={openRemoveDialog}
          handleClose={() => setOpenRemoveDialog(false)}
          handleConfirm={handleRemoveUser}
          confirmColor="error"
        />
        <Button sx={{ mt: 4 }} onClick={() => setOpenAddDialog(true)}>
          Add User
        </Button>
      </>
    );
  };

  return (
    <WrapperComponent
      loaderStyles={{ bottom: "30%" }}
      loading={isLoadingCollection || isLoadingUsers}
      error={errorCollection ?? errorUsers}
      component={renderUsers()}
    />
  );
};

export default UsersTab;
