import React from "react";
import Image from "next/image";
import { CategoryItems } from "@prisma/client";
import { useMediaQuery, useTheme } from "@mui/material";

import Grid from "@mui/material/Grid";
import { useDropzone } from "react-dropzone";
import { useAppDispatch } from "@/app/redux/hooks";
import { errorSnackbar } from "@/app/redux/features/snackbarSlice";

interface SelectImageProps {
  file: string;
  setData: React.Dispatch<React.SetStateAction<Partial<CategoryItems>>>;
  setFile: React.Dispatch<React.SetStateAction<string>>;
  setFileToUpadload: React.Dispatch<any>;
}

const SelectImage: React.FC<SelectImageProps> = ({
  file,
  setData,
  setFile,
  setFileToUpadload,
}) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const lgSize = useMediaQuery(theme.breakpoints.down("lg"));
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
    maxFiles: 1,
    onDropAccepted(files, event) {
      const reader = new FileReader();
      setFileToUpadload(files[0]);
      reader.readAsDataURL(files[0]);

      reader.onload = () => {
        if (reader.result) {
          setFile(reader.result as string);
          setData((prev) => ({
            ...prev,
            image: reader.result as string,
          }));
        } else {
          console.error('"Failed converting to base64"');
          dispatch(errorSnackbar({ message: "Failed converting to base64" }));
        }
      };
    },
  });

  return (
    <Grid>
      <section className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag drop image for you categorie here, or click to select file</p>
        </div>
      </section>
      {file && (
        <Grid
          pt={10}
          item
          xs={lgSize ? 12 : 4}
          overflow={"hidden"}
          display={"block"}
          ml={"auto"}
          mr={"auto"}
        >
          <Image
            height={500}
            width={500}
            alt={file}
            src={file}
            loading="lazy"
            style={{
              width: "100%",
              overflow: "hidden",
              objectFit: "cover",
              borderRadius: "20px",
            }}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default SelectImage;
