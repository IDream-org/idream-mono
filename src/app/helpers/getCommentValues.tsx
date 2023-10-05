import Link from "@mui/material/Link";
import { isValidHttpUrl } from "./isValidHttpUrl";

export const getCommentValues = (comments: string) => {
  const eachComment = comments.split(" ");
  let str: string;
  return eachComment.map((comment, index) => {
    if (comment.match(/\.(jpeg|jpg|gif|png)$/) != null) {
      return (
        <>
          <img src={comment} width={"100%"} height={"100%"} alt={comment} />{" "}
        </>
      );
    } else if (isValidHttpUrl(comment)) {
      return (
        <>
          <Link
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            href={comment}
          >
            {comment}
          </Link>{" "}
        </>
      );
    } else {
      return `${comment} `;
    }
  });
};
