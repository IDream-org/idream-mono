"use client";
import React, { useEffect, useState } from "react";
import { Roles } from "@prisma/client";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMediaQuery, useTheme } from "@mui/material";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";

import Users from "./Users";
import BackButton from "@/components/BackButton/BackButton";
import WrapperComponent from "@/components/WrapperComponent/WrapperComponent";
import { useGetCollectionQuery } from "@/app/redux/services/collectionApiSlice";
import Settings from "./Settings";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CollectionSettingsPage = () => {
  const params = useParams();
  const router = useRouter();
  const theme = useTheme();
  const mdSize = useMediaQuery(theme.breakpoints.down("md"));
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  const collectionId = String(params.collectionId);
  const { data, isLoading, error } = useGetCollectionQuery({ collectionId });

  useEffect(() => {
    if (!isLoading) {
      const currentUser = data?.users.find(
        (user) => user.userId === session?.user.id
      );
      const isAuthor = data?.authorId === session?.user.id;
      if (!isAuthor && currentUser?.role !== Roles.Owner) {
        router.push(`/collections/${collectionId}`);
      } else {
        setLoading(false);
      }
    }
  }, [data, session?.user.id, collectionId, router, isLoading]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderCollection = () => {
    if (!data) {
      return <></>;
    }

    return (
      <>
        <BackButton path={`/collections/${collectionId}`} />
        <Grid container justifyContent={"center"}>
          <Grid item xs={mdSize ? 12 : 10}>
            <Avatar
              alt="collection"
              src={data.image}
              sx={{
                width: "100%",
                height: "400px",
                display: "block",
                borderRadius: "10px",
                mr: "auto",
                ml: "auto",
                cursor: "pointer",
              }}
              variant="rounded"
            />
            <Typography
              textAlign={"center"}
              pb={4}
              pt={4}
              fontWeight={"bold"}
              fontSize={32}
            >
              {data.title}
            </Typography>
            <Divider />
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="tabs"
                  sx={{ height: "60px" }}
                >
                  <Tab
                    sx={{ height: "60px", width: mdSize ? "40px" : "unset" }}
                    label="Settings"
                    {...a11yProps(0)}
                  />
                  <Tab
                    sx={{ height: "60px", width: mdSize ? "40px" : "unset" }}
                    label="Users"
                    {...a11yProps(1)}
                  />
                  <Tab
                    sx={{ height: "60px", width: mdSize ? "40px" : "unset" }}
                    label="Requests"
                    {...a11yProps(3)}
                  />
                  <Tab
                    sx={{ height: "60px", display: "grid", ml: "auto" }}
                    label={<MoreHorizIcon />}
                    {...a11yProps(4)}
                  />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <Settings />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Users />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                Requests
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                Delete
              </CustomTabPanel>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <WrapperComponent
      loading={loading}
      error={error}
      component={renderCollection()}
    />
  );
};

export default CollectionSettingsPage;
