import { NavigationContainer } from "@react-navigation/native";
import StartNavigator from "./app/Screens/Stacks/StackNavigators/StartNavigat";

const App = () => {
  return(
    <NavigationContainer>
        <StartNavigator/>
    </NavigationContainer>
  );
};

export default App;