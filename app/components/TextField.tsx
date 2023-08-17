import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  type?: string;
  onMouseDownHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField = (props: TextFieldProps) => {
  const {
    label,
    placeholder,
    value,
    type = "text",
    onChangeHandler,
    onClickHandler,
    onMouseDownHandler,
  } = props;

  return (
    <FormControl sx={{ width: "25ch" }}>
      <OutlinedInput
        placeholder={placeholder}
        fullWidth
        sx={{
          borderRadius: "50px",
        }}
        className="bg-gray-100 font-poppins font-semibold px-4 bg-opacity-80 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
        value={value}
        onChange={onChangeHandler}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="search button"
              onClick={onClickHandler}
              onMouseDown={onMouseDownHandler}
              edge="end"
              sx={{ p: 2 }}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export { TextField };
