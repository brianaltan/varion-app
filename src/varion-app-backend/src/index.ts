import { Canister, update, text } from 'azle';

export default Canister({
    getString: update([], text, () => {
        return "This is an update method!!";
    })
});
