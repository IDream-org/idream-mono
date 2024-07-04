"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ReactPlayer from "react-player";
import { useSession } from "next-auth/react";
import { CategoryItems } from "@prisma/client";
import "./RenderItem.css";

import SendIcon from "@mui/icons-material/Send";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import InputAdornment from "@mui/material/InputAdornment";

import BasicRating from "@/components/BasicRating/BasicRating";
import { getIcons } from "@/components/IconsList/IconstArray";
import { useGetUsersQuery } from "@/app/redux/services/usersApiSlice";
import { useGetCollectionQuery } from "@/app/redux/services/collectionApiSlice";
import { useParams } from "next/navigation";
import { UserActions } from "@/classes/UserActions";
import { defaultImage } from "@/app/helpers/defaultImage";

interface Comment {
  value: string;
  handleAdd: () => void;
  handleChange: React.Dispatch<React.SetStateAction<string>>;
  handleRemove?: (comentId: string) => void;
}

export interface CategoriesItemsProps {
  item: Partial<CategoryItems>;
  comment?: Comment;
}

const RenderItem: React.FC<CategoriesItemsProps> = ({ item, comment }) => {
  const { data: session } = useSession();
  const params = useParams();

  const collectionId = String(params.collectionId);
  const theme = useTheme();
  const mdSize = useMediaQuery(theme.breakpoints.down("md"));
  const lgSize = useMediaQuery(theme.breakpoints.down("lg"));

  const { data } = useGetUsersQuery({});
  const { data: collection } = useGetCollectionQuery({ collectionId });

  const userActions = new UserActions(session, collection);

  const largeGrid = lgSize ? 12 : 6;
  const largeGridSize = lgSize ? 10 : 8;
  const gridSize = mdSize ? 12 : largeGridSize;
  const flexDirection = lgSize ? "column" : "row";
  const justifyContentEnd = lgSize ? "end" : "unset";

  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid
          item
          xs={gridSize}
          display={"flex"}
          flexDirection={flexDirection}
          justifyContent={"space-between"}
        >
          <Grid item xs={largeGrid}>
            <Typography fontWeight={"bold"} variant="h4" mb={1}>
              {item.title} {`(${item.subtitle})`}
            </Typography>

            <BasicRating
              value={item.rating?.total ?? 0}
              handleChange={() => {}}
              disabled={true}
            />

            <Typography mt={4} mr={lgSize ? 0 : 8} mb={6} textAlign={"justify"}>
              {item.description}
            </Typography>

            {item.icons?.map((icon) => getIcons(icon))}
          </Grid>
          <Grid item height={500} xs={largeGrid} overflow={"hidden"}>
            <Image
              height={0}
              width={0}
              alt={item.image ?? defaultImage}
              src={item.image ?? defaultImage}
              priority={true}
              loading="eager"
              quality={80}
              sizes="100vw"
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                objectFit: "cover",
                borderRadius: "20px",
              }}
            />
          </Grid>
        </Grid>
        <Grid
          item
          pt={10}
          xs={gridSize}
          display={"flex"}
          alignItems={"center"}
          flexDirection={flexDirection}
          justifyContent={"space-between"}
        >
          <Grid
            item
            pr={lgSize ? 0 : 8}
            xs={largeGrid}
            display={"flex"}
            justifyContent={"center"}
            width={"100%"}
          >
            <ReactPlayer
              className="react-player"
              controls={true}
              width={"100%"}
              url={item.video ? item.video : "t"}
            />
          </Grid>
          <Grid
            item
            xs={largeGrid}
            width={"100%"}
            pt={lgSize ? 10 : 0}
            textAlign={lgSize ? "center" : "unset"}
          >
            {item.details &&
              Object.keys(item.details).map((detail) => (
                <Grid key={detail}>
                  <Typography mt={2} mb={1} fontWeight={"bold"}>
                    {detail}
                  </Typography>
                  {detail === "Link" ? (
                    <Link
                      href={(item as any).details[detail]}
                      target="blank"
                      style={{ textDecoration: "none" }}
                    >
                      {(item as any).details[detail]}
                    </Link>
                  ) : (
                    <Typography>{(item as any).details[detail]}</Typography>
                  )}
                  <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        pb={lgSize ? 5 : 10}
        container
        mt={lgSize ? 10 : 16}
        justifyContent={"center"}
      >
        <Grid
          item
          xs={gridSize}
          display={"flex"}
          flexDirection={flexDirection}
          justifyContent={"space-between"}
        >
          <Grid item xs={largeGrid} display={"flex"} flexDirection={"column"}>
            <Grid
              item
              xs={12}
              pb={2}
              margin={"auto"}
              width={"100%"}
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
            >
              <Grid item xs={6}>
                <Typography>Quality</Typography>
              </Grid>
              <Grid item xs={6}>
                <BasicRating
                  showLabel={!lgSize}
                  size="large"
                  value={item.rating?.quality ?? 0}
                  disabled={true}
                  width={"unset"}
                  justifyContent={justifyContentEnd}
                  boxWidth="80px"
                  handleChange={() => {}}
                  sx={{ fontSize: "2rem" }}
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              pb={2}
              margin={"auto"}
              width={"100%"}
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
            >
              <Grid item xs={6}>
                <Typography>Expectations</Typography>
              </Grid>
              <Grid item xs={6}>
                <BasicRating
                  showLabel={!lgSize}
                  size="large"
                  value={item.rating?.expectations ?? 0}
                  justifyContent={justifyContentEnd}
                  boxWidth="80px"
                  disabled={true}
                  width={"unset"}
                  handleChange={() => {}}
                  sx={{ fontSize: "2rem" }}
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              pb={2}
              margin={"auto"}
              width={"100%"}
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
            >
              <Grid item xs={6}>
                <Typography>Performance</Typography>
              </Grid>
              <Grid item xs={6}>
                <BasicRating
                  showLabel={!lgSize}
                  size="large"
                  value={item.rating?.performance ?? 0}
                  justifyContent={justifyContentEnd}
                  boxWidth="80px"
                  disabled={true}
                  width={"unset"}
                  handleChange={() => {}}
                  sx={{ fontSize: "2rem" }}
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              pb={2}
              margin={"auto"}
              width={"100%"}
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
            >
              <Grid item xs={6}>
                <Typography>Recommendation</Typography>
              </Grid>
              <Grid item xs={6}>
                <BasicRating
                  showLabel={!lgSize}
                  size="large"
                  value={item.rating?.recommendation ?? 0}
                  justifyContent={justifyContentEnd}
                  boxWidth="80px"
                  disabled={true}
                  width={"unset"}
                  handleChange={() => {}}
                  sx={{ fontSize: "2rem" }}
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              pb={2}
              margin={"auto"}
              width={"100%"}
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
            >
              <Grid item xs={6}>
                <Typography>Overall</Typography>
              </Grid>
              <Grid item xs={6}>
                <BasicRating
                  showLabel={!lgSize}
                  size="large"
                  value={item.rating?.overall ?? 0}
                  justifyContent={justifyContentEnd}
                  boxWidth="80px"
                  disabled={true}
                  width={"unset"}
                  handleChange={() => {}}
                  sx={{ fontSize: "2rem" }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            pt={lgSize ? 10 : 0}
            xs={largeGrid}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            sx={{ maxHeight: "300px" }}
          >
            <Grid
              item
              height={lgSize ? "300px" : "unset"}
              display={"flex"}
              flexDirection={"column"}
              overflow={"auto"}
            >
              {item.comments?.map((itemComment, index) => {
                const user = data?.find(
                  (user) => user.id === itemComment.userId
                );
                return (
                  <ListItem key={index} button>
                    <ListItemAvatar>
                      <Avatar alt="Profile Picture" src={user?.avatar ?? ""} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={itemComment.author}
                      secondary={itemComment.comment}
                    />
                    {userActions.isAuthorOrOwnerOrCommentOwner(itemComment) && (
                      <DeleteOutlineIcon
                        color="warning"
                        onClick={() => comment?.handleRemove!(itemComment.id)}
                      />
                    )}
                  </ListItem>
                );
              })}
            </Grid>

            <Grid display={"flex"} alignItems={"center"}>
              <ListItemAvatar>
                <Avatar alt="Profile Picture" src={session?.user.avatar} />
              </ListItemAvatar>

              <TextField
                disabled={!comment}
                label="Add a comment..."
                fullWidth
                value={comment?.value}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    comment?.handleAdd();
                  }
                }}
                onChange={(e) => comment?.handleChange(e.target.value)}
                InputProps={{
                  sx: { borderRadius: "30px" },
                  endAdornment: (
                    <InputAdornment
                      sx={{ cursor: "pointer" }}
                      onClick={comment?.handleAdd}
                      position="start"
                    >
                      <SendIcon fontSize="large" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RenderItem;
