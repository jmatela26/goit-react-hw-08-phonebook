import { ContactItem } from "../ContactItem/ContactItem";
import { useSelector } from "react-redux";
import { filterSelector, itemsSelector } from "../../redux/contacts/selectors";
import style from "./ContactList.module.css";

export const ContactList = () => {
  const contacts = useSelector(itemsSelector);
  const filter = useSelector(filterSelector);

  const filteredContacts = contacts.filter((contact) => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <ul className={style.contact_list}>
      {filteredContacts.map((contact) => (
        <ContactItem
          name={contact.name}
          number={contact.number}
          id={contact.id}
        ></ContactItem>
      ))}
    </ul>
  );
};
