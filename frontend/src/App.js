import ProfileForm from "./components/ProfileForm"; 
import DietPlan from './components/DietPlan';


function App() {
  return (
  <div>
    <div className="App">
      <ProfileForm userId="PUT_USER_ID_HERE" />
    </div>
    <div>
      {/* Other components */}
      <DietPlan />
    </div>
  </div>
  );
}
export default App;
