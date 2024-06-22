import {
    Canister,
    text,
    update,
    StableBTreeMap,
    nat8,
} from 'azle';

export default Canister({
    getString: update([], text, () => {
        return "This is an update method!!";
    }),
});
