import { useState } from "react";
import style from "./ContactForm.module.css";
import { nanoid } from "nanoid";
import { itemsSelector } from "./../../redux/contacts/selectors";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "../../redux/contacts/operations";

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const contacts = useSelector(itemsSelector);
  const dispatch = useDispatch();

  const handleNameChange = (evt) => {
    const { value } = evt.target;
    setName(value);
  };

  const handleNumberChange = (evt) => {
    const { value } = evt.target;
    setNumber(value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const existingContact = contacts.find((contact) => contact.name === name);
    if (existingContact !== undefined) {
      alert(`${event.name} is already in contacts`);
    } else {
      const contact = {
        id: nanoid(),
        name: name,
        number: number,
      };

      dispatch(createContact(contact));
    }
    form.reset();
  };

  return (
    <form on onSubmit={handleFormSubmit}>
      <h3 className={style.subtitle}>Name</h3>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleNameChange}
        className={style.input}
      />
      <br />
      <h3 className={style.subtitle}>Number</h3>
      <input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleNumberChange}
        className={style.input}
      />
      <br />
      <button type="submit" className={style.add_contact_button}>
        Add contact
      </button>
    </form>
  );
};
