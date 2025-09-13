const Footer = () => {
  return (
    <footer className="bg-accent w-full p-8  border-t mt-1">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center text-center space-y-1">
          <p className="text-xs font-medium">
            &copy; {new Date().getFullYear()} E-commerce BeWear.
          </p>
          <p className="text-muted-foreground text-xs font-medium">
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
