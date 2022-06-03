class ListUtil {
    static calListHeight = ({ref, refClassName = "ant-table-thead", footerHeight = 64, extra = 0} = {}) => {
        let tHeader
        if (ref && ref.current) {
            tHeader = ref.current.getElementsByClassName(refClassName)[0]
        } else {
            tHeader = document.getElementsByClassName(refClassName)[0]
        }
        //表格内容距离顶部的距离
        let tHeaderBottom = 0
        if (tHeader) {
            tHeaderBottom = tHeader.getBoundingClientRect().bottom
        }
        return `calc(100vh - ${tHeaderBottom + footerHeight}px)`;
    }
}

export default ListUtil;