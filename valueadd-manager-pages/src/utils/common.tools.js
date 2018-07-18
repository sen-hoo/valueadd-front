//去除前后空格
export const trim = (val) => {
    return val.replace(/(^\s*)|(\s*$)/g, "");
}
//格式化字符串
export const convertTime = (timestamp) => {
    return new moment(timestamp).format("YYYY-MM-DD HH:mm:ss");
}
//是否为空对象
export const isEmptyObject = (obj) => {
    for (var props in obj) {
        return false;
    }
    return true;
}