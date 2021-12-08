import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Coin from './Coin';
import Coins from './Coins';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/crypto-coin-tracker/:coinId">
          <Coin />
        </Route>
        <Route path="/crypto-coin-tracker">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
