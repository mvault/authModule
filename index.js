import User from './classes/User';
import Interface from './classes/Interface';
const auth = new User();
global.auth = auth
const ui = new Interface();
export {
    auth,
    ui
}