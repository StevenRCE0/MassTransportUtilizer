import React from 'react'
import {Dock} from "./Sheets"
import Overview from "./Overview";
import Popup from "./Controllers/Popup";
import Input from "./Controllers/Input";

function App() {
  return (
      <React.Fragment>
          <Popup title={"测试用的盒子"}>
              <Input>
                  "Nyan"
              </Input>
          </Popup>
        <Overview />
        <Dock />
      </React.Fragment>
  );
}

export default App;
