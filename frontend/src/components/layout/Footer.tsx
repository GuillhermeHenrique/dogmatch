import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <>
      <footer className={classes.footer}>
        <p>
          <span className="bold">DogMatch</span> &copy; 2025
        </p>
      </footer>
    </>
  );
};

export default Footer;
