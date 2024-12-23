import { motion } from "motion/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const StyledForm = styled.form``;

const StyledInput = styled(motion.input)`
  padding: 0 1ex;
  height: 2em;

  outline: none;
  background-color: #313244;

  border-radius: 2em;
  border-style: double;
  border-color: transparent;
  border-width: 0.2em;
  background-image: linear-gradient(rgb(13, 14, 33), rgb(13, 14, 33)),
    linear-gradient(90deg, #fc5c7d, #6a82fb);
  background-origin: border-box;
  background-clip: padding-box, border-box;

  text-align: center;
  font-family: "Comic Neue";
  font-size: 16px;
  color: rgba(255, 255, 255, 0.87);
  text-overflow: ellipsis;

  &:focus {
    box-shadow: #bc96e680 0px 0px 20px 0px;
    &::placeholder {
      color: transparent;
    }
  }
`;

interface SearchBarProps {
  onSubmit: (e: any) => void;
  written: string | null;
}

export function SearchBar({ onSubmit, written }: SearchBarProps) {
  const { register, handleSubmit, setFocus } = useForm();

  // Focus on '/'
  useEffect(() => {
    function hotkeyPress(e: KeyboardEvent) {
      if (e.key === "/") {
        e.preventDefault();
        setFocus("search");
        return;
      }
    }

    document.addEventListener("keydown", hotkeyPress);
    return () => document.removeEventListener("keydown", hotkeyPress);
  }, []);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledInput
        id={"search"}
        placeholder="Search..."
        defaultValue={written || ""}
        {...register("search")}
        onFocus={(e) => e.target.select()} // Select all text on focus
        initial={{
          width: "10em",
          scale: 1,
        }}
        whileFocus={{
          width: "15em",
          scale: 1.2,
        }}
        transition={{
          default: {
            type: "spring",
            duration: 0.3,
            bounce: 0.5,
          },
          borderWidth: {
            easing: "easeOut",
            duration: 0.1,
          },
          margin: {
            easing: "easeIn",
            duration: 0.1,
          },
        }}
      />
    </StyledForm>
  );
}
