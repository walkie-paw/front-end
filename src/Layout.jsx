import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Button from './pages/Button';
export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <div>
          <Button text={"검색"} />
        </div>
      </Header>
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}