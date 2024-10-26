import './index.scss';
// import Icon from 'src/components/Icon';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {

  return (
    <main className="Main">
      {/* <Icon className="Logo" name="logo" /> */}
      {children}
    </main>
  );
};

export default Layout;