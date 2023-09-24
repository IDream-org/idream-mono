import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const Copyright: React.FC = () => {
  return (
    <Typography mt={5} variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Categories App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
