const Footer = () => {
  return (
    <footer className="bg-muted p-7">
      <p className="text-foreground text-xs font-semibold">
        &copy; {new Date().getFullYear()} Aparatus. Todos direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;
