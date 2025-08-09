const Footer = () => {
  return (
    <footer className="bg-accent w-full gap-1 p-8">
      <p className="text-xs font-medium">
        &copy; {new Date().getFullYear()} E-commerce.
      </p>
      <p className="text-muted-foreground text-xs font-medium">
        All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
