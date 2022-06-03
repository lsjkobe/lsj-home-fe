import UserHandler from "@/common/user-handler";

const PermButton = (props) => {
    const {perm, children} = props
    const permList = UserHandler.getPermList();
    return (
        permList && permList.includes(perm) ? children : null
    )
}

export default PermButton;