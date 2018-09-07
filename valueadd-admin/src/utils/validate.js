export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export var checkMobile = (rule, value, callback) => {
  if (!/^1(3|4|5|7|8)\d{9}$/.test(value)) {
      callback(new Error("请输入正确的手机号码"));
  } else callback();
}
