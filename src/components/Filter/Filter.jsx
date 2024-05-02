import style from "./Filter.module.css";
import { useSelector, useDispatch } from "react-redux";
import { filterSelector } from "../../redux/contacts/selectors";
import { setFilter } from "../../redux/contacts/filterSlice";

export const Filter = () => {
  const value = useSelector(filterSelector);
  const dispatch = useDispatch();
  const handleFilterChange = (event) => {
    const { value } = event.target;
    dispatch(setFilter(value));
  };

  return (
    <>
      <label className={style.description}>Find contacts by name</label>
      <br />
      <input
        type="text"
        name="filter"
        value={value}
        onChange={handleFilterChange}
        placeholder="Enter contact to search"
        className={style.input}
      ></input>
    </>
  );
};
