import { useAppSelector } from '../../store/hooks';
import LeaderboardTierFromPointsSync from './LeaderboardTierFromPointsSync';
import Sidebar from './Sidebar/Sidebar';
import MainView from './MainView/MainView';

const Layout = () => {
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

  return (
    <>
      <LeaderboardTierFromPointsSync />
      <Sidebar isOpen={sidebarOpen} />
      <MainView sidebarOpen={sidebarOpen} />
    </>
  );
};

export default Layout;
