import MailItem from "./MailItem";

export default (props) => {
  const emails = props.emails;

  const mailList = emails.map((item) => (
    <MailItem key={item.id} item={item} isInbox={props.isInbox} />
  ));

  return <>{mailList}</>;
};
