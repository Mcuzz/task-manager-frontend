type AppFooterProps = {
  courseName: string;
};

function AppFooter({ courseName }: AppFooterProps) {
  return (
    <footer>
      <p>{courseName}</p>
    </footer>
  );
}

export default AppFooter;